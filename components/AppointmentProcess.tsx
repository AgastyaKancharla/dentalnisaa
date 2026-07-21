"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export const appointmentSteps = [
  { title: "Book", detail: "Online, by call, or WhatsApp — pick a time that works for you.", icon: "calendar" },
  { title: "Consultation", detail: "An honest conversation about what's bothering you and why.", icon: "chat" },
  { title: "Diagnosis", detail: "A visual and, where needed, digital X-ray review to see the full picture.", icon: "mouth" },
  { title: "Treatment", detail: "Your plan, explained in plain language before it starts.", icon: "tooth" },
  { title: "Follow-up", detail: "We check in to make sure recovery is on track.", icon: "shield" },
];

// This section's animation signature is unique on the site: the timeline
// rail draws itself left-to-right (scaleX 0->1), and each icon pops in
// with a 3D flip-and-bounce timed to when the line reaches it -- rather
// than the fade-up-on-scroll used almost everywhere else. Deliberately
// bespoke rather than a shared Reveal variant, so it can't get reused
// elsewhere and stop being distinct.
export default function AppointmentProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stepCount = appointmentSteps.length;

  return (
    <section className="bg-porcelain-dim/40 relative overflow-hidden">
      {/* Ambient background depth: soft rings drifting slowly in 3D space
          (pure CSS keyframes + perspective -- no WebGL). Echoes the
          'scan'/technology motif without literally depicting equipment. */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: "900px" }} aria-hidden>
        <div
          className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-gold/20 animate-[driftA_22s_ease-in-out_infinite]"
          style={{ transformStyle: "preserve-3d" }}
        />
        <div
          className="absolute top-1/2 -left-20 w-56 h-56 rounded-full border border-teal/20 animate-[driftB_26s_ease-in-out_infinite]"
          style={{ transformStyle: "preserve-3d" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full border border-ink/10 animate-[driftA_18s_ease-in-out_infinite_reverse]"
          style={{ transformStyle: "preserve-3d" }}
        />
      </div>

      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 relative">
        <div className="max-w-xl mb-16">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            What to expect
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            From first call to <span className="text-gold-dark italic">follow-up.</span>
          </h2>
        </div>

        <div ref={sectionRef} className="relative">
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px bg-ink/10 origin-left transition-transform duration-[1400ms] ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
            aria-hidden
          />
          <div className="grid gap-10 md:grid-cols-5 md:gap-6">
            {appointmentSteps.map((step, i) => {
              const iconDelay = 300 + i * 220;
              const textDelay = iconDelay + 200;
              return (
                <div key={step.title} className="relative flex md:flex-col gap-5 md:gap-0">
                  <div className="relative shrink-0 md:mb-6">
                    <div
                      className="w-12 h-12 rounded-full bg-ink text-porcelain flex items-center justify-center relative z-10 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        transitionDuration: "650ms",
                        transitionDelay: `${iconDelay}ms`,
                        opacity: inView ? 1 : 0,
                        transform: inView
                          ? "scale(1) rotateY(0deg)"
                          : "scale(0.4) rotateY(-90deg)",
                      }}
                    >
                      <Icon name={step.icon} className="w-5 h-5" />
                    </div>
                    {i !== stepCount - 1 && (
                      <div className="md:hidden absolute top-12 left-1/2 -translate-x-1/2 w-px h-full bg-ink/10" aria-hidden />
                    )}
                  </div>
                  <div
                    className="transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: `${textDelay}ms`,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    <span className="font-display text-sm text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-ink mt-1">{step.title}</h3>
                    <p className="mt-2 text-sm text-ink/55 leading-relaxed max-w-[220px]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes driftA {
          0%, 100% { transform: translate3d(0, 0, 0) rotateX(8deg) rotateY(-6deg); }
          50% { transform: translate3d(-14px, 18px, 40px) rotateX(-6deg) rotateY(10deg); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate3d(0, 0, 0) rotateX(-8deg) rotateY(8deg); }
          50% { transform: translate3d(16px, -14px, 30px) rotateX(6deg) rotateY(-10deg); }
        }
      `}</style>
    </section>
  );
}
