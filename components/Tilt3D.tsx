"use client";

import { useRef } from "react";

// Real 3D depth via CSS perspective + rotateX/Y, tracked to the cursor --
// no WebGL, no new dependency. Tilts toward the mouse on desktop; on
// touch devices (no mousemove) it just sits at rest with its static
// shadow/highlight still giving it a raised, dimensional look.
export default function Tilt3D({
  children,
  maxDeg = 14,
  className = "",
}: {
  children: React.ReactNode;
  maxDeg?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * maxDeg).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * maxDeg).toFixed(2)}deg`);
    el.style.setProperty("--tz", "18px");
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tz", "0px");
  };

  return (
    <div style={{ perspective: "600px" }} className={className}>
      <div
        ref={ref}
        data-parallax
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(var(--tz, 0px))",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
