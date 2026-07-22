import type { Metadata } from "next";
import Link from "next/link";
import { clinic, testimonials } from "@/lib/site-data";
import Breadcrumb from "@/components/Breadcrumb";
import MultiPlatformReviews from "@/components/MultiPlatformReviews";
import FinalCTA from "@/components/FinalCTA";
import { GoogleGIcon } from "@/components/Icon";

const totalReviews = clinic.reviewPlatforms.reduce((sum, p) => sum + p.count, 0);

export const metadata: Metadata = {
  title: "Patient Reviews — Real reviews across every platform",
  description: `${totalReviews}+ real patient reviews for ${clinic.name} across Google, Practo, and Justdial.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      {/* HERO + PLATFORM SUMMARY */}
      <section className="bg-ink text-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-8 pb-16 md:pt-10 md:pb-20">
          <div className="text-porcelain/50">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Patient Reviews" }]} />
          </div>
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mt-6 mb-3">
            Patient reviews
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight flex items-center gap-3 flex-wrap">
            <GoogleGIcon className="w-9 h-9 md:w-10 md:h-10" />
            {clinic.rating}★ from {clinic.reviewCount}+ patients — and that's just Google.
          </h1>
          <p className="mt-6 text-porcelain/60 max-w-xl leading-relaxed">
            We're listed (and reviewed) on more than one platform. Here's the
            real count from each one, not just the headline number.
          </p>

          <div className="mt-14">
            <MultiPlatformReviews />
          </div>
        </div>
      </section>

      {/* FULL TESTIMONIAL LIST */}
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            In their own words
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-14">
            What patients told us.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="border border-ink/10 bg-white/60 p-6 flex flex-col">
                <p className="text-gold-dark text-sm mb-3" aria-hidden>
                  ★★★★★
                </p>
                <blockquote className="text-ink/75 text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>
                <p className="mt-4 font-semibold text-ink text-sm">{t.author}</p>
                <p className="text-xs text-ink/45">{t.context}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink/50">
            Want to see more?{" "}
            <Link
              href={clinic.reviewPlatforms.find((p) => p.name === "Google")?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-semibold text-ink underline underline-offset-4 hover:text-gold-dark"
            >
              Read the rest on Google
            </Link>
            , or use the platform links above for Practo and Justdial.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
