"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { treatments, doctors, clinic } from "@/lib/site-data";
import { formatDateLong } from "@/lib/booking-availability";
import { NO_DOCTOR_PREFERENCE, ConfirmedBooking } from "@/lib/booking-schema";
import { useBooking } from "./BookingProvider";

function EditRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-ink/10 last:border-b-0">
      <div>
        <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide">{label}</p>
        <div className="mt-1 text-ink font-medium">{value}</div>
      </div>
      <button type="button" onClick={onEdit} className="focus-ring shrink-0 text-sm font-semibold text-gold-dark hover:underline">
        Edit
      </button>
    </div>
  );
}

export default function StepReview() {
  const { state, goToStep, back, resetDraft } = useBooking();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const treatment = treatments.find((t) => t.id === state.treatmentId);
  const doctor = doctors.find((d) => d.name === state.doctorName);
  const doctorDisplay = state.doctorName === NO_DOCTOR_PREFERENCE ? "No preference (first available)" : doctor?.name;

  if (!treatment || !state.date || !state.slot || !state.patient.firstName) return null;
  const date = state.date;
  const slot = state.slot;

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);

    const appointmentId = `DN-${Date.now().toString(36).toUpperCase()}`;

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Existing fields the webhook already expects (kept for backward
          // compatibility with the original /booking widget's contract):
          name: `${state.patient.firstName} ${state.patient.lastName}`,
          phone: state.patient.phone,
          email: state.patient.email || undefined,
          treatment: treatment.name,
          day: formatDateLong(date),
          slot,
          notes: state.patient.medicalNotes || undefined,
          // New fields for this flow:
          appointmentId,
          doctor: doctorDisplay,
          reasonForVisit: state.patient.reason || undefined,
          patientType: state.patient.patientType,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const confirmed: ConfirmedBooking = {
        treatmentId: treatment.id,
        doctorName: state.doctorName!,
        date,
        slot,
        patient: state.patient as ConfirmedBooking["patient"],
        appointmentId,
        submittedAt: new Date().toISOString(),
      };
      sessionStorage.setItem("dentalnisaa-confirmed-booking", JSON.stringify(confirmed));
      resetDraft();
      router.push("/book/confirmation");
    } catch {
      setError(
        `We couldn't send that automatically. Please call or WhatsApp us at ${clinic.phone} to confirm — we'll be happy to lock in your slot directly.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={back} className="focus-ring text-sm text-ink/50 hover:text-ink mb-4">
        ← Back
      </button>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Review your appointment</h1>
      <p className="text-ink/55 mb-8">Check everything looks right before confirming.</p>

      <div className="rounded-2xl border border-ink/10 bg-white/60 px-6">
        <EditRow label="Treatment" value={treatment.name} onEdit={() => goToStep("treatment")} />
        <EditRow label="Doctor" value={doctorDisplay} onEdit={() => goToStep("doctor")} />
        <EditRow label="Date" value={formatDateLong(date)} onEdit={() => goToStep("date")} />
        <EditRow label="Time" value={slot} onEdit={() => goToStep("time")} />
        <EditRow
          label="Patient details"
          value={
            <div className="space-y-0.5 font-normal text-sm">
              <p className="font-medium text-ink">
                {state.patient.firstName} {state.patient.lastName} ·{" "}
                {state.patient.patientType === "new" ? "New patient" : "Existing patient"}
              </p>
              <p className="text-ink/60">{state.patient.phone}</p>
              {state.patient.email && <p className="text-ink/60">{state.patient.email}</p>}
              {state.patient.reason && <p className="text-ink/60 italic">"{state.patient.reason}"</p>}
            </div>
          }
          onEdit={() => goToStep("details")}
        />
      </div>

      {error && (
        <p className="mt-5 text-sm text-gold-dark bg-gold/5 border border-gold/20 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={submitting}
        className="focus-ring mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gold text-ink px-8 py-3.5 font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 min-h-[48px]"
      >
        {submitting ? "Confirming…" : "Confirm appointment"}
      </button>
    </div>
  );
}
