import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import { clinic } from "@/lib/site-data";
import SignatureMark from "@/components/SignatureMark";

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
    <section className="relative bg-porcelain min-h-[80vh] overflow-hidden">
      {/* Soft gradient wash + oversized signature marks fill the wide side
          margins around the centered form on tablet/desktop, instead of
          flat empty porcelain either side. Purely decorative — absolutely
          positioned, aria-hidden, zero effect on the widget's layout. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 600px at 12% -5%, rgba(184,147,90,0.14), transparent 60%), radial-gradient(900px 700px at 100% 40%, rgba(110,143,135,0.14), transparent 55%)",
        }}
        aria-hidden
      />
      <SignatureMark
        className="pointer-events-none hidden lg:block absolute -top-10 -right-24 w-[420px] h-[420px] text-gold rotate-12"
        strokeOpacity={0.22}
      />
      <SignatureMark
        className="pointer-events-none hidden lg:block absolute bottom-10 -left-28 w-[360px] h-[360px] text-teal -rotate-6"
        strokeOpacity={0.18}
      />
      <SignatureMark
        className="pointer-events-none hidden md:block lg:hidden absolute top-6 -right-14 w-56 h-56 text-gold"
        strokeOpacity={0.18}
      />

      <div className="relative max-w-2xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24">
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
        <BookingWidget initialTreatment={searchParams.treatment} />
      </div>
    </section>
  );
}
