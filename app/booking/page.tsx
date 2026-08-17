import type { Metadata } from "next";
import { clinic, treatments } from "@/lib/site-data";
import BookingWidget from "@/components/BookingWidget";
import BookingSidebar from "@/components/BookingSidebar";
import Reveal from "@/components/Reveal";
import SectionSeam from "@/components/SectionSeam";
import ClinicOpenStatus from "@/components/ClinicOpenStatus";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Book your appointment at ${clinic.name} in Kadarenahalli, Bengaluru. Pick a day and time, confirmed by call or WhatsApp.`,
  alternates: { canonical: "/booking" },
};

export default function BookingPage({
  searchParams,
}: {
  searchParams: { treatment?: string };
}) {
  const matchedTreatment = treatments.find((t) => t.id === searchParams.treatment);

  return (
    <>
      <section className="bg-gradient-to-b from-mist-soft to-porcelain">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-16">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Book an appointment
            </p>
            {matchedTreatment ? (
              <>
                <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
                  Booking your{" "}
                  <span className="italic text-gold-dark">{matchedTreatment.name}</span>{" "}
                  visit.
                </h1>
                <p className="text-ink/60 max-w-lg">
                  Choose a day and time below, and the clinic will confirm
                  your {matchedTreatment.name.toLowerCase()} slot shortly after.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
                  Pick a time that{" "}
                  <span className="italic text-gold-dark">works for you.</span>
                </h1>
                <p className="text-ink/60 max-w-lg">
                  Choose a day and time below. The clinic will confirm your
                  slot shortly after.
                </p>
              </>
            )}
          </Reveal>

          <Reveal delay={90} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ClinicOpenStatus tone="light" />
            <span className="inline-flex items-center gap-2 text-sm text-ink/60">
              <Icon name="shield" className="w-4 h-4 text-ink/40 shrink-0" />
              We'll confirm your slot by phone or WhatsApp
            </span>
          </Reveal>
        </div>
      </section>

      <SectionSeam />

      <section className="bg-porcelain min-h-[60vh]">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-24">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">
            <div className="order-1">
              <BookingWidget initialTreatment={searchParams.treatment} />
            </div>
            <div className="order-2">
              <BookingSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
