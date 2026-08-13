// Renders a rating like 4.8 as five stars with the last one partially
// filled — a visual read of the real number, never a rounded-up graphic.
// Extracted from TrustBar so the Hero and it share one implementation.
export default function Stars({
  rating,
  className = "w-4 h-4",
  filled = "text-sage",
  empty = "text-ink/15",
}: {
  rating: number;
  /** Size of a single star. */
  className?: string;
  filled?: string;
  empty?: string;
}) {
  return (
    <span className={`inline-flex gap-0.5 ${filled}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={`relative inline-block ${className}`}>
            <span className={`absolute inset-0 ${empty}`}>★</span>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
