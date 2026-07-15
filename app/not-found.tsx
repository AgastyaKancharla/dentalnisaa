import Link from "next/link";
import { clinic } from "@/lib/site-data";

export default function NotFound() {
  return (
    <section className="bg-porcelain min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-24 text-center">
        <p className="text-sm font-semibold text-crimson-dark uppercase tracking-wide mb-3">
          404
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
          This page wandered off.
        </h1>
        <p className="text-ink/60 mb-8">
          The page you're looking for doesn't exist. Here's how to find what
          you need instead.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-sage-dark transition-colors"
          >
            Back to homepage
          </Link>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
          >
            Call the clinic
          </a>
        </div>
      </div>
    </section>
  );
}
