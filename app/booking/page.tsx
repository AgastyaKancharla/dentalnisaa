import BookingWidget from "@/components/BookingWidget";

export default function BookingPage() {
  return (
    <section className="bg-porcelain min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24">
        <p className="text-sm font-semibold text-crimson-dark uppercase tracking-wide mb-3">
          Book an appointment
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
          Pick a time that{" "}
          <span className="italic text-crimson-dark">works for you.</span>
        </h1>
        <p className="text-ink/60 mb-10 max-w-lg">
          Choose a day and time below. The clinic will confirm your slot by
          phone or WhatsApp shortly after.
        </p>
        <BookingWidget />
      </div>
    </section>
  );
}
