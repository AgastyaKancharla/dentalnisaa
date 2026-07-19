"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientDetailsSchema, PatientDetails } from "@/lib/booking-schema";
import { useBooking } from "./BookingProvider";

export default function StepPatientDetails() {
  const { state, setPatient, next, back } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientDetails>({
    resolver: zodResolver(patientDetailsSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: state.patient.firstName ?? "",
      lastName: state.patient.lastName ?? "",
      phone: state.patient.phone ?? "",
      email: state.patient.email ?? "",
      reason: state.patient.reason ?? "",
      patientType: state.patient.patientType,
      medicalNotes: state.patient.medicalNotes ?? "",
    },
  });

  const onSubmit = (data: PatientDetails) => {
    setPatient(data);
    next();
  };

  const inputClass = (hasError: boolean) =>
    `focus-ring w-full rounded-lg border bg-white/70 px-4 py-3 text-sm min-h-[48px] ${
      hasError ? "border-red-400" : "border-ink/15"
    }`;

  return (
    <div>
      <button type="button" onClick={back} className="focus-ring text-sm text-ink/50 hover:text-ink mb-4">
        ← Back
      </button>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Your details</h1>
      <p className="text-ink/55 mb-8">So the clinic knows who's coming, and can reach you to confirm.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink/70 mb-1.5">
              First name
            </label>
            <input
              id="firstName"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={inputClass(!!errors.firstName)}
            />
            {errors.firstName && (
              <p id="firstName-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink/70 mb-1.5">
              Last name
            </label>
            <input
              id="lastName"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={inputClass(!!errors.lastName)}
            />
            {errors.lastName && (
              <p id="lastName-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink/70 mb-1.5">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && (
              <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink/70 mb-1.5">
              Email <span className="text-ink/40 font-normal">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-ink/70 mb-2">Are you a new or existing patient?</legend>
          <div className="flex gap-3">
            {(["new", "existing"] as const).map((val) => (
              <label
                key={val}
                className={`focus-within:ring-2 focus-within:ring-gold flex-1 flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium cursor-pointer min-h-[48px] ${
                  state.patient.patientType === val ? "border-gold bg-gold/10" : "border-ink/15"
                }`}
              >
                <input type="radio" value={val} {...register("patientType")} className="accent-gold-dark" />
                {val === "new" ? "New patient" : "Existing patient"}
              </label>
            ))}
          </div>
          {errors.patientType && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.patientType.message}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-ink/70 mb-1.5">
            Reason for visit <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="reason"
            {...register("reason")}
            placeholder="e.g. Sensitivity in my lower left molar"
            className={inputClass(!!errors.reason)}
          />
        </div>

        <div>
          <label htmlFor="medicalNotes" className="block text-sm font-medium text-ink/70 mb-1.5">
            Medical notes <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <textarea
            id="medicalNotes"
            {...register("medicalNotes")}
            rows={3}
            placeholder="Allergies, medications, or anything the dentist should know beforehand"
            className={inputClass(!!errors.medicalNotes)}
          />
        </div>

        <button
          type="submit"
          className="focus-ring w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-8 py-3.5 font-semibold hover:bg-teal-dark transition-colors min-h-[48px]"
        >
          Continue to review
        </button>
      </form>
    </div>
  );
}
