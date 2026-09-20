"use client";

import { useEffect, useMemo, useState } from "react";
import { clinic, treatments } from "@/lib/site-data";
import Icon from "@/components/Icon";

type DayInfo = {
  date: Date;
  label: string;
  dayName: string;
  closed: boolean;
};

function getUpcomingDays(count: number): DayInfo[] {
  const days: DayInfo[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; days.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
    const closed = d.getDay() === 0; // Sunday closed
    days.push({
      date: d,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      dayName,
      closed,
    });
  }
  return days;
}

function getSlotsForDay(): string[] {
  const slots: string[] = [];
  const push = (h: number, m: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    slots.push(`${hour12}:${m === 0 ? "00" : m} ${period}`);
  };
  // Morning session: 10:30 am – 2 pm (matches clinic.hours exactly)
  push(10, 30);
  for (let h = 11; h < 14; h++) {
    push(h, 0);
    push(h, 30);
  }
  // Evening session: 4:30 – 8 pm
  push(16, 30);
  for (let h = 17; h < 20; h++) {
    push(h, 0);
    push(h, 30);
  }
  return slots;
}

function slotKey(day: string, slot: string): string {
  return `${day}__${slot}`;
}

const emptyForm = (initialTreatment?: string) => ({
  name: "",
  phone: "",
  treatment:
    initialTreatment && treatments.some((t) => t.id === initialTreatment)
      ? initialTreatment
      : treatments[0].id,
  email: "",
  notes: "",
});

export default function BookingWidget({ initialTreatment }: { initialTreatment?: string }) {
  const days = useMemo(() => getUpcomingDays(10).filter((d) => !d.closed), []);
  const slots = useMemo(() => getSlotsForDay(), []);

  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ day: string; slot: string; name: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState(() => emptyForm(initialTreatment));

  // Real booked slots, read from the clinic's Sheet via /api/availability —
  // replaces the old fake "looks busy" demo pattern.
  const [bookedKeys, setBookedKeys] = useState<Set<string>>(new Set());
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  const loadAvailability = () => {
    setAvailabilityLoading(true);
    fetch("/api/availability", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { booked?: { day: string; slot: string }[] }) => {
        const next = new Set<string>();
        (data.booked ?? []).forEach((b) => next.add(slotKey(b.day, b.slot)));
        setBookedKeys(next);
      })
      .catch(() => {
        // Fail open: if we can't reach the backend, don't block visitors
        // from requesting a slot — the clinic still confirms every request.
      })
      .finally(() => setAvailabilityLoading(false));
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const selectedDay = days[selectedDayIdx];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || submitting) return;
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          treatment: treatments.find((t) => t.id === form.treatment)?.name ?? form.treatment,
          day: selectedDay.label,
          slot: selectedSlot,
          notes: form.notes || undefined,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted({ day: selectedDay.label, slot: selectedSlot, name: form.name });
      // Optimistically grey the slot out immediately, then reconcile with
      // the sheet in the background.
      setBookedKeys((prev) => new Set(prev).add(slotKey(selectedDay.label, selectedSlot)));
    } catch {
      setErrorMsg(
        "We couldn't send that automatically. Please call or WhatsApp us directly to confirm your slot."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const bookAnother = () => {
    setSubmitted(null);
    setSelectedSlot(null);
    setForm(emptyForm(initialTreatment));
    setErrorMsg(null);
    loadAvailability();
  };

  if (submitted) {
    const treatmentName =
      treatments.find((t) => t.id === form.treatment)?.name ?? treatments[0].name;

    return (
      <div className="rounded-2xl bg-white border border-teal/20 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-16px_rgba(20,50,45,0.18)] overflow-hidden">
        <div className="bg-teal/8 px-8 py-10 text-center border-b border-teal/15">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal text-porcelain shadow-[0_6px_18px_-6px_rgba(20,80,70,0.5)]">
            <Icon name="check" className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold text-teal-dark uppercase tracking-wide mb-2">
            Request received
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-ink mb-3">
            {submitted.name.split(" ")[0]}, you're almost booked in.
          </h3>
          <p className="text-ink/60 max-w-md mx-auto">
            The clinic will confirm your slot shortly by call or WhatsApp.
          </p>
        </div>

        <div className="px-8 py-7">
          <dl className="grid sm:grid-cols-3 gap-5 mb-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-teal">
                <Icon name="calendar" className="w-5 h-5" />
              </span>
              <div>
                <dt className="text-xs font-semibold text-ink/40 uppercase tracking-wide">
                  Day &amp; time
                </dt>
                <dd className="text-ink font-medium">
                  {submitted.day} · {submitted.slot}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-teal">
                <Icon name="tooth" className="w-5 h-5" />
              </span>
              <div>
                <dt className="text-xs font-semibold text-ink/40 uppercase tracking-wide">
                  Treatment
                </dt>
                <dd className="text-ink font-medium">{treatmentName}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-teal">
                <Icon name="phone" className="w-5 h-5" />
              </span>
              <div>
                <dt className="text-xs font-semibold text-ink/40 uppercase tracking-wide">
                  We'll reach you on
                </dt>
                <dd className="text-ink font-medium">{form.phone}</dd>
              </div>
            </div>
          </dl>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={bookAnother}
              className="focus-ring inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-7 py-3 font-semibold hover:bg-teal-dark transition-colors"
            >
              Book another appointment
            </button>
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center rounded-full border border-ink/15 text-ink px-7 py-3 font-semibold hover:border-teal/40 transition-colors"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          1. Pick a day
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {days.map((d, i) => (
            <button
              type="button"
              key={d.label}
              onClick={() => {
                setSelectedDayIdx(i);
                setSelectedSlot(null);
              }}
              className={`focus-ring shrink-0 rounded-xl px-4 py-3 text-sm font-semibold border transition-colors ${
                i === selectedDayIdx
                  ? "bg-ink text-porcelain border-ink"
                  : "bg-white/60 text-ink/70 border-ink/10 hover:border-ink/30"
              }`}
            >
              <div className="text-xs opacity-70">{d.dayName}</div>
              <div>{d.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          2. Pick a time
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const booked = bookedKeys.has(slotKey(selectedDay.label, slot));
            const selected = selectedSlot === slot;
            return (
              <button
                type="button"
                key={slot}
                disabled={booked || availabilityLoading}
                onClick={() => setSelectedSlot(slot)}
                className={`focus-ring rounded-lg px-3 py-2.5 text-sm font-medium border transition-colors ${
                  booked
                    ? "bg-ink/5 text-ink/25 border-ink/5 cursor-not-allowed line-through"
                    : selected
                    ? "bg-gold text-ink-soft border-gold"
                    : availabilityLoading
                    ? "bg-white/40 text-ink/30 border-ink/5 cursor-wait"
                    : "bg-white/60 text-ink/70 border-ink/10 hover:border-gold/50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink/40">
          {availabilityLoading
            ? "Checking live availability…"
            : "Greyed-out slots have already been requested by another patient."}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">
          3. Your details
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Full name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base"
          />
          <input
            required
            type="tel"
            placeholder="Phone number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base"
          />
          <select
            value={form.treatment}
            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base sm:col-span-2"
          >
            {treatments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base sm:col-span-2"
          />
          <textarea
            placeholder="Notes for the clinic (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="focus-ring rounded-lg border border-ink/15 bg-white/70 px-4 py-3 text-base sm:col-span-2"
          />
        </div>
        <p className="mt-2 text-xs text-ink/40">* Required so the clinic can confirm your slot.</p>
      </div>

      {errorMsg && (
        <p className="text-sm text-gold-dark bg-gold/5 border border-gold/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!selectedSlot || submitting}
        className="focus-ring w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-8 py-3.5 font-semibold hover:bg-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Request this slot"}
      </button>
      <p className="text-xs text-ink/40 -mt-4">
        Clinic: {clinic.phone} · You can also book by calling or WhatsApp directly.
      </p>
      <p className="text-xs text-ink/30">
        Your details are shared only with the clinic to confirm this appointment.
      </p>
    </form>
  );
}
