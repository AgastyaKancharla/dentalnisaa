"use client";

import { useInView } from "@/lib/useInView";
import type { GallerySpace } from "@/lib/site-data";

// This section's animation signature: photos zoom in from a slight blur
// to sharp focus, like a camera settling -- fitting for a "clinic tour"
// gallery, and distinct from every other section's entrance treatment.
export default function GalleryTile({
  space,
  index,
  onOpen,
}: {
  space: GallerySpace;
  index: number;
  onOpen: () => void;
}) {
  const { ref, inView } = useInView<HTMLButtonElement>(0.2);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className="focus-ring group block w-full text-left border border-ink/10 overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(1.08)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out",
        transitionDelay: `${index * 130}ms`,
      }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-glass/50 via-porcelain-dim to-glass/20">
        {space.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={space.image}
            alt={space.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{
              filter: inView ? "blur(0px)" : "blur(14px)",
              transition: "filter 900ms ease-out",
              transitionDelay: `${index * 130}ms`,
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/30 text-xs">
            Photo coming soon
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-ink">{space.name}</h3>
        <p className="mt-1.5 text-sm text-ink/55 leading-relaxed line-clamp-2">
          {space.description}
        </p>
      </div>
    </button>
  );
}
