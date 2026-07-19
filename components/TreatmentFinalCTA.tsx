import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";

export default function TreatmentFinalCTA({
  treatmentName,
  treatmentId,
}: {
  treatmentName: string;
  treatmentId: string;
}) {
  return (
    <section className="bg-gold text-ink">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl max-w-2xl mx-auto leading-tight">
          Ready to talk about{" "}
          <span className="italic">{treatmentName.toLowerCase()}</span>?
        </h2>
        <p className="mt-4 text-ink/70 max-w-md mx-auto">
          Book a consultation, or call the clinic directly — Kadarenahalli,
          Bengaluru · {clinic.phone}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/booking?treatment=${treatmentId}`}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-ink/85 transition-colors"
          >
            <Icon name="calendar" className="w-4 h-4" />
            Book appointment
          </Link>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/25 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
          >
            <Icon name="phone" className="w-4 h-4" />
            Call the clinic
          </a>
        </div>
      </div>
    </section>
  );
}
