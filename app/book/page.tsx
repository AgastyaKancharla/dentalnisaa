"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookingProvider, useBooking } from "@/components/booking/BookingProvider";
import Stepper from "@/components/booking/Stepper";
import StepTreatment from "@/components/booking/StepTreatment";
import StepDoctor from "@/components/booking/StepDoctor";
import StepDate from "@/components/booking/StepDate";
import StepTime from "@/components/booking/StepTime";
import StepPatientDetails from "@/components/booking/StepPatientDetails";
import StepReview from "@/components/booking/StepReview";

function BookingWizard() {
  const { currentStep } = useBooking();

  const steps: Record<string, React.ReactNode> = {
    treatment: <StepTreatment />,
    doctor: <StepDoctor />,
    date: <StepDate />,
    time: <StepTime />,
    details: <StepPatientDetails />,
    review: <StepReview />,
  };

  return (
    <section className="bg-porcelain min-h-screen">
      <div className="max-w-2xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20">
        <Stepper />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function BookPage() {
  return (
    <BookingProvider>
      <BookingWizard />
    </BookingProvider>
  );
}
