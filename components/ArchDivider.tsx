type ArchDividerProps = {
  flip?: boolean;
  from?: string;
  to?: string;
  className?: string;
};

// The recurring signature motif: a gentle upward arc echoing both a smile
// line and a dental arch. Used as a structural divider between sections
// instead of a hard straight edge.
export default function ArchDivider({
  flip = false,
  from = "#FBF8F3",
  to = "#16302E",
  className = "",
}: ArchDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-[0] ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="block w-full h-[48px] md:h-[72px]"
      >
        <path
          d="M0,0 L0,40 C 200,80 400,80 600,40 C 800,0 1000,0 1200,40 L1200,0 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
