// An original line-art illustration, not a photograph — so it carries no
// "Representative photo" disclosure (that badge exists in lib/site-data.ts
// specifically to distinguish real clinic photography from stock photos of
// other people's equipment; this is neither, and drawing it as an editorial
// line mark rather than a photorealistic render makes that self-evident).
//
// Composition: a reclined premium exam chair with an overhead operating
// light, in the site's own sage/sand/ink palette. Cushions read as fabric
// (sage), the column/base/light arm read as brushed metal (sand/gold), and
// a soft warm glow sits behind the lamp head — doubling as the light the
// fixture would actually cast, and as the contrast wash the hero headline
// sits on when this is layered behind it.
export default function DentalChairIllustration({
  className = "w-full h-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 560"
      className={className}
      role="img"
      aria-label="Illustration of a premium dental examination chair with an overhead operating light"
    >
      <defs>
        <radialGradient id="chair-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A66B" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#C9A66B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C9A66B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glow behind the lamp */}
      <circle cx="330" cy="210" r="230" fill="url(#chair-glow)" />

      {/* ground shadow */}
      <ellipse cx="320" cy="530" rx="160" ry="16" fill="#211E1A" opacity="0.06" />

      {/* light pole + arm */}
      <path
        d="M140,518 C136,410 150,310 165,240 C190,200 240,175 300,180"
        fill="none"
        stroke="#93753F"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <ellipse cx="140" cy="520" rx="22" ry="8" fill="#DCC495" stroke="#93753F" strokeWidth="1.5" />
      <circle cx="300" cy="180" r="7" fill="#93753F" />

      {/* lamp head */}
      <ellipse cx="322" cy="174" rx="50" ry="23" fill="#FAF6EE" stroke="#93753F" strokeWidth="2.5" />
      <ellipse
        cx="322"
        cy="174"
        rx="35"
        ry="12"
        fill="none"
        stroke="#93753F"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <g stroke="#C9A66B" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M300,194 L280,240" />
        <path d="M322,198 L322,248" />
        <path d="M344,194 L364,240" />
      </g>

      {/* base */}
      <ellipse cx="320" cy="524" rx="98" ry="11" fill="#211E1A" opacity="0.04" />
      <path
        d="M250,518 C250,531 390,531 390,518 C390,505 250,505 250,518 Z"
        fill="#DCC495"
        stroke="#211E1A"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />

      {/* column */}
      <rect x="302" y="350" width="36" height="165" rx="11" fill="#EDE4D2" stroke="#211E1A" strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="280" y="337" width="80" height="20" rx="10" fill="#DCC495" stroke="#211E1A" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* seat pan */}
      <rect
        x="320"
        y="322"
        width="172"
        height="36"
        rx="18"
        fill="#DCE3D8"
        stroke="#5C6B5A"
        strokeOpacity="0.6"
        strokeWidth="1.75"
        transform="rotate(8 320 340)"
      />

      {/* backrest */}
      <rect
        x="148"
        y="321"
        width="176"
        height="38"
        rx="19"
        fill="#DCE3D8"
        stroke="#5C6B5A"
        strokeOpacity="0.6"
        strokeWidth="1.75"
        transform="rotate(55 320 340)"
      />

      {/* headrest */}
      <rect
        x="85"
        y="326"
        width="75"
        height="30"
        rx="15"
        fill="#DCE3D8"
        stroke="#5C6B5A"
        strokeOpacity="0.6"
        strokeWidth="1.75"
        transform="rotate(55 320 340)"
      />
      <circle cx="155" cy="340" r="5" fill="#93753F" transform="rotate(55 320 340)" />

      {/* upholstery seam stitching */}
      <path
        d="M330,340 L478,340"
        stroke="#5C6B5A"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        strokeDasharray="1 7"
        strokeLinecap="round"
        transform="rotate(8 320 340)"
      />
      <path
        d="M163,340 L308,340"
        stroke="#5C6B5A"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        strokeDasharray="1 7"
        strokeLinecap="round"
        transform="rotate(55 320 340)"
      />

      {/* armrest */}
      <rect
        x="330"
        y="362"
        width="78"
        height="14"
        rx="7"
        fill="#DCC495"
        stroke="#211E1A"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        transform="rotate(8 320 340)"
      />

      {/* side instrument tray */}
      <path
        d="M360,432 C398,434 426,422 440,408"
        fill="none"
        stroke="#93753F"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <rect x="428" y="396" width="32" height="19" rx="7" fill="#FAF6EE" stroke="#93753F" strokeWidth="1.75" />
      <circle cx="437" cy="405.5" r="2.6" fill="#93753F" />
      <circle cx="449" cy="405.5" r="2.6" fill="#93753F" />
    </svg>
  );
}
