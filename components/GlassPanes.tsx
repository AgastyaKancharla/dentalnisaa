// The site's one recurring signature device: three overlapping glass panes,
// a nod to the clinic's actual glass-walled treatment rooms. Used as a
// background flourish, a section-seam accent, and a corner mark — instead
// of generic circle-icon or blob-divider patterns.
export default function GlassPanes({
  className = "w-16 h-16",
  strokeOpacity = 0.35,
}: {
  className?: string;
  strokeOpacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="14" width="34" height="42" rx="1" stroke="currentColor" strokeOpacity={strokeOpacity} strokeWidth="1.25" />
      <rect x="18" y="6" width="34" height="42" rx="1" stroke="currentColor" strokeOpacity={strokeOpacity + 0.15} strokeWidth="1.25" />
      <rect x="30" y="20" width="28" height="36" rx="1" stroke="currentColor" strokeOpacity={strokeOpacity + 0.3} strokeWidth="1.25" />
    </svg>
  );
}
