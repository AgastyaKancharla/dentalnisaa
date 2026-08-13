// A glass/crystal rendition of the site's own tooth silhouette — the same
// path used at icon scale in Icon.tsx, rendered here at hero scale so the
// mark used sitewide and the hero's centerpiece are visibly the same shape,
// just built up with gradients instead of a flat stroke. Three passes over
// one path (shadow, glass body, specular glint) fake dimensional glass
// without needing a rendered 3D asset — the fill always stays within the
// silhouette, so there's no risk of a gradient bleeding past the shape.
const TOOTH_PATH =
  "M12 3c-2 0-3 1.2-4 1.2S6.3 3 4.8 3C3 3 2 4.6 2 6.8c0 2.6 1 4 1.4 6.4.4 2.3.7 5.8 2.2 5.8 1.3 0 1.2-3.4 2-5 .4-.8.8-1.2 1.4-1.2s1 .4 1.4 1.2c.8 1.6.7 5 2 5 1.5 0 1.8-3.5 2.2-5.8.4-2.4 1.4-3.8 1.4-6.4C21 4.6 20 3 18.2 3c-1.5 0-2.2 1.2-3.2 1.2S14 3 12 3z";

export default function GlassTooth({ className = "w-56 h-56" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="glassToothBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#F1EEE1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8CA68A" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="glassToothShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C6B5A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#5C6B5A" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="glassToothGlint" cx="32%" cy="22%" r="48%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.18" />
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

      {/* Glass body */}
      <path
        d={TOOTH_PATH}
        fill="url(#glassToothBody)"
        stroke="#FFFFFF"
        strokeOpacity={0.5}
        strokeWidth={0.15}
      />

      {/* Specular glint, upper-left, clipped to the same silhouette */}
      <path d={TOOTH_PATH} fill="url(#glassToothGlint)" />

      {/* Droplet accents — small wet highlights near the tooth's edges */}
      <circle cx="5" cy="8" r="0.7" fill="url(#glassToothGlint)" />
      <circle cx="18.4" cy="13.2" r="0.5" fill="url(#glassToothGlint)" />
      <circle cx="10.2" cy="2.2" r="0.4" fill="url(#glassToothGlint)" />
    </svg>
  );
}
