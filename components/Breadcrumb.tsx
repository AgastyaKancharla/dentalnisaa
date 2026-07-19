import Link from "next/link";

type Crumb = { label: string; href?: string };

// Generic, reusable across any inner page (About, Treatments, Gallery, etc.)
// — not About-specific, so it earns its place as a shared component.
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="focus-ring hover:underline underline-offset-2">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
