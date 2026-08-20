import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import BookingSidebar from "@/components/BookingSidebar";
import { clinic } from "@/lib/site-data";

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
  return (
    <section className="bg-porcelain min-h-[80vh]">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24">
        <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
          Book an appointment
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
          Pick a time that{" "}
          <span className="italic text-gold-dark">works for you.</span>
        </h1>
        <p className="text-ink/60 mb-10 max-w-lg">
          Choose a day and time below. The clinic will confirm your slot by
          phone or WhatsApp shortly after.
        </p>

        {/* `grid-cols-1` is load-bearing on mobile, not decorative: without
            an explicit base track, this grid cell has no width ceiling, so
            its `min-width: auto` default lets deep content (the day-picker
            and time-slot grid inside BookingWidget) size the whole column
            to its own max-content width instead of the viewport — the page
            visibly overflows right, hidden by `overflow-x: hidden` on
            desktop's mouse-wheel scroll but still reachable by touch-panning
            on real mobile browsers. `minmax(0, 1fr)` (what `grid-cols-1`
            compiles to) is what actually clamps it. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">
          <div className="order-1">
            <BookingWidget initialTreatment={searchParams.treatment} />
          </div>
          <div className="order-2">
            <BookingSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
