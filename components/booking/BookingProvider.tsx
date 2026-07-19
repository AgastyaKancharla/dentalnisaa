"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BOOKING_STEPS, BookingStep, PatientDetails } from "@/lib/booking-schema";

const STORAGE_KEY = "dentalnisaa-booking-draft";

type BookingState = {
  treatmentId: string | null;
  doctorName: string | null;
  date: string | null;
  slot: string | null;
  patient: Partial<PatientDetails>;
};

const emptyState: BookingState = {
  treatmentId: null,
  doctorName: null,
  date: null,
  slot: null,
  patient: {},
};

type BookingContextValue = {
  state: BookingState;
  stepIndex: number;
  currentStep: BookingStep;
  setTreatment: (id: string) => void;
  setDoctor: (name: string) => void;
  setDate: (iso: string) => void;
  setSlot: (time: string) => void;
  setPatient: (patient: PatientDetails) => void;
  goToStep: (step: BookingStep) => void;
  next: () => void;
  back: () => void;
  canLeaveStep: (step: BookingStep) => boolean;
  resetDraft: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(emptyState);
  const [stepIndex, setStepIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Load any autosaved draft on mount (client-only; avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { state: BookingState; stepIndex: number };
        setState(parsed.state ?? emptyState);
        setStepIndex(parsed.stepIndex ?? 0);
      }
    } catch {
      // Corrupt or missing draft — start fresh rather than fail the page.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ state, stepIndex }));
    } catch {
      // Storage full or unavailable (private browsing) — not fatal, just no autosave.
    }
  }, [state, stepIndex, hydrated]);

  const currentStep = BOOKING_STEPS[stepIndex];

  const canLeaveStep = useCallback(
    (step: BookingStep) => {
      switch (step) {
        case "treatment":
          return !!state.treatmentId;
        case "doctor":
          return !!state.doctorName;
        case "date":
          return !!state.date;
        case "time":
          return !!state.slot;
        case "details":
          return !!(state.patient.firstName && state.patient.lastName && state.patient.phone && state.patient.patientType);
        case "review":
          return true;
        default:
          return false;
      }
    },
    [state]
  );

  const goToStep = useCallback((step: BookingStep) => {
    const idx = BOOKING_STEPS.indexOf(step);
    if (idx >= 0) setStepIndex(idx);
  }, []);

  const next = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, BOOKING_STEPS.length - 1));
  }, []);

  const back = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      stepIndex,
      currentStep,
      setTreatment: (id) => setState((s) => ({ ...s, treatmentId: id })),
      setDoctor: (name) => setState((s) => ({ ...s, doctorName: name })),
      setDate: (iso) => setState((s) => ({ ...s, date: iso, slot: null })), // changing date clears a stale slot pick
      setSlot: (time) => setState((s) => ({ ...s, slot: time })),
      setPatient: (patient) => setState((s) => ({ ...s, patient })),
      goToStep,
      next,
      back,
      canLeaveStep,
      resetDraft: () => {
        setState(emptyState);
        setStepIndex(0);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      },
    }),
    [state, stepIndex, currentStep, goToStep, next, back, canLeaveStep]
  );

  // Avoid flashing an empty step-1 before the autosaved draft loads.
  if (!hydrated) return null;

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
