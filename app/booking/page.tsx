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

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">
          {/* min-w-0: grid items default to min-width:auto, so they refuse to
              shrink below their content's intrinsic width. BookingWidget's
              day-picker row uses overflow-x-auto to scroll internally, but
              without min-w-0 here that row's full un-scrolled width forces
              this whole column open instead — past the viewport on mobile,
              silently clipped by body's overflow-x:hidden. */}
          <div className="order-1 min-w-0">
            <BookingWidget initialTreatment={searchParams.treatment} />
          </div>
          <div className="order-2 min-w-0">
            <BookingSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
