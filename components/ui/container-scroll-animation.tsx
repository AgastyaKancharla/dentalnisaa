"use client";

import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
  MotionValue,
} from "framer-motion";

// Scroll-linked "step through the door" panel: the card starts tilted back
// in 3D and rotates flat as it enters the viewport, while the title above
// drifts up past it.
//
// Restyled from the original dark device-mockup treatment (#222222 body,
// #6C6C6C bezel, 30px radius) to the site's own materials — that skin reads
// as a laptop screenshot, which is the wrong object for a clinic. Heights
// are also much shorter here: the source component is built to sit far down
// a long marketing page, whereas this runs as the hero, so the panel has to
// resolve within roughly one screen of scrolling and can't push the booking
// actions below the fold.

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Explicit offset rather than the source component's default
  // ["start start", "end end"]. That default makes the scroll distance
  // (container height − viewport height), which collapses to almost nothing
  // on a tall phone viewport — the panel would snap flat in ~50px. Mapping
  // to the container's midpoint instead gives a range of half the container
  // height, so the gesture reads at the same pace on every screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.94, 1] : [1.04, 1]);

  // The whole effect is scroll-linked rather than a CSS animation, so the
  // site's reduced-motion rules can't switch it off — it has to be disabled
  // here or someone who opted out still gets a rotating, scaling panel.
  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [22, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : scaleDimensions()
  );
  const translate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -90]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-start justify-center ${className}`}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto w-full">
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        // Warm shadow built from the ink token rather than pure black, so
        // the panel sits on the porcelain ground instead of punching a
        // cold grey hole in it.
        boxShadow:
          "0 6px 16px rgba(33,30,26,0.06), 0 22px 44px rgba(33,30,26,0.09), 0 60px 90px rgba(33,30,26,0.10)",
      }}
      className="mx-auto w-full max-w-5xl rounded-2xl border border-ink/10 bg-porcelain p-1.5 md:p-2.5"
    >
      <div className="h-full w-full overflow-hidden rounded-xl bg-mist-soft">
        {children}
      </div>
    </motion.div>
  );
};
