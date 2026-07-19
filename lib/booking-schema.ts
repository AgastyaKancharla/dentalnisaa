import { z } from "zod";

// ----------------------------------------------------------------------------
// Patient details — Step 5. Validated with react-hook-form + zod, real-time.
// ----------------------------------------------------------------------------
export const patientDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  reason: z.string().trim().max(300, "Keep it under 300 characters").optional().or(z.literal("")),
  patientType: z.enum(["new", "existing"], {
    error: "Select whether you're a new or existing patient",
  }),
  medicalNotes: z.string().trim().max(500, "Keep it under 500 characters").optional().or(z.literal("")),
});

export type PatientDetails = z.infer<typeof patientDetailsSchema>;

// ----------------------------------------------------------------------------
// Full booking draft — everything accumulated across steps 1-5, autosaved.
// treatmentId/doctorName/date/slot are validated per-step (a step can't be
// left until its own field is set); this schema describes the shape once
// complete, used before final submission on the Review step.
// ----------------------------------------------------------------------------
export const bookingDraftSchema = z.object({
  treatmentId: z.string().min(1),
  doctorName: z.string().min(1), // "no-preference" is a valid value
  date: z.string().min(1), // ISO yyyy-mm-dd
  slot: z.string().min(1), // e.g. "10:30 AM"
  patient: patientDetailsSchema,
});

export type BookingDraft = z.infer<typeof bookingDraftSchema>;

export const BOOKING_STEPS = [
  "treatment",
  "doctor",
  "date",
  "time",
  "details",
  "review",
] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number];

export const STEP_LABELS: Record<BookingStep, string> = {
  treatment: "Treatment",
  doctor: "Doctor",
  date: "Date",
  time: "Time",
  details: "Your Details",
  review: "Review",
};

// "no-preference" is a legitimate real option (most patients don't have a
// preferred dentist) — not a placeholder standing in for missing data.
export const NO_DOCTOR_PREFERENCE = "no-preference";

// The confirmed booking, persisted briefly (sessionStorage) so the
// /book/confirmation route — a separate page load — can render it and
// generate the calendar file / WhatsApp message without re-asking anything.
export type ConfirmedBooking = BookingDraft & {
  appointmentId: string;
  submittedAt: string; // ISO timestamp
};
