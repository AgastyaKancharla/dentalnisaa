import Reveal from "./Reveal";

// A short editorial statement in the site's existing voice — distinct from
// the Transparency section (which covers clear-diagnosis/care-philosophy)
// so the two don't repeat the same idea back to back.
export default function PatientPhilosophy() {
  return (
    <section className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl md:text-4xl leading-snug text-ink">
            "The best treatment plan is the one that's actually needed —{" "}
            <span className="italic text-gold-dark">
              we'd rather earn your next visit than pad this one.
            </span>
            "
          </p>
          <p className="mt-6 text-sm uppercase tracking-wide text-ink/40">
            How every consultation at DentalNisaa starts
          </p>
        </Reveal>
      </div>
    </section>
  );
}
