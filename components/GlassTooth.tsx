// A glass/crystal rendition of the site's own tooth silhouette — the same
// path used at icon scale in Icon.tsx, rendered here at hero scale so the
// mark used sitewide and the hero's centerpiece are visibly the same shape,
// just built up with gradients instead of a flat stroke.
//
// The iridescent sheen uses only brand-approved hues (sage, sand, porcelain)
// swept at two different angles plus a blended overlay — never the literal
// blue/purple of a generic "holographic" reference — so the effect reads as
// premium glass without breaking from the clinic's established palette.
const TOOTH_PATH =
  "M12 3c-2 0-3 1.2-4 1.2S6.3 3 4.8 3C3 3 2 4.6 2 6.8c0 2.6 1 4 1.4 6.4.4 2.3.7 5.8 2.2 5.8 1.3 0 1.2-3.4 2-5 .4-.8.8-1.2 1.4-1.2s1 .4 1.4 1.2c.8 1.6.7 5 2 5 1.5 0 1.8-3.5 2.2-5.8.4-2.4 1.4-3.8 1.4-6.4C21 4.6 20 3 18.2 3c-1.5 0-2.2 1.2-3.2 1.2S14 3 12 3z";

export default function GlassTooth({ className = "w-56 h-56" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        {/* Base iridescent sweep — sage / sand / porcelain / sage-deep at an angle */}
        <linearGradient id="glassToothBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCE3D8" stopOpacity="0.96" />
          <stop offset="25%" stopColor="#8CA68A" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#DCC495" stopOpacity="0.88" />
          <stop offset="75%" stopColor="#F1EEE1" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#546B57" stopOpacity="0.9" />
        </linearGradient>
        {/* Second sweep, opposite angle, blended over the base — this cross
            of two gradients is what reads as "shifting" iridescence rather
            than a single flat tint. */}
        <linearGradient id="glassToothSheen" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A66B" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#8CA68A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5C6B5A" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="glassToothShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#100E0C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#100E0C" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="glassToothGlint" cx="30%" cy="20%" r="46%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glassToothGlintSmall" cx="72%" cy="66%" r="22%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="glassToothSoften" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
      </defs>

      {/* Depth pass — same silhouette, offset and blurred, reads as mass
          showing through translucent glass rather than a flat cutout. */}
      <path
        d={TOOTH_PATH}
        fill="url(#glassToothShade)"
        transform="translate(0.3,0.5) scale(0.96)"
        filter="url(#glassToothSoften)"
      />

      {/* Glass body — base iridescent sweep */}
      <path
        d={TOOTH_PATH}
        fill="url(#glassToothBody)"
        stroke="#FFFFFF"
        strokeOpacity={0.55}
        strokeWidth={0.15}
      />

      {/* Holographic sheen overlay — cross-angled second gradient, blended */}
      <path d={TOOTH_PATH} fill="url(#glassToothSheen)" style={{ mixBlendMode: "overlay" }} />

      {/* Specular glints */}
      <path d={TOOTH_PATH} fill="url(#glassToothGlint)" />
      <path d={TOOTH_PATH} fill="url(#glassToothGlintSmall)" />

      {/* Droplet/sparkle accents */}
      <circle cx="5" cy="8" r="0.7" fill="url(#glassToothGlint)" />
      <circle cx="18.4" cy="13.2" r="0.5" fill="url(#glassToothGlint)" />
      <circle cx="10.2" cy="2.2" r="0.4" fill="url(#glassToothGlint)" />
    </svg>
  );
}
