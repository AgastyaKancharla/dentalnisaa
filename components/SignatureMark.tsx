// A quiet editorial mark used as a seam accent and small visual signature.
// It avoids generic dental blobs while staying simple enough to support the
// clinic's calm, premium identity.
export default function SignatureMark({
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
      <path
        d="M10 46c12-23 32-23 44 0"
        stroke="currentColor"
        strokeOpacity={strokeOpacity}
        strokeWidth="1.4"
      />
      <path
        d="M16 36c9-15 23-15 32 0"
        stroke="currentColor"
        strokeOpacity={strokeOpacity + 0.18}
        strokeWidth="1.4"
      />
      <path
        d="M24 27c5-7 11-7 16 0"
        stroke="currentColor"
        strokeOpacity={strokeOpacity + 0.32}
        strokeWidth="1.4"
      />
    </svg>
  );
}
