// Small helpers to keep generated <title> and meta description tags within
// the lengths search engines actually display (title ~60 chars, description
// ~155 chars) instead of relying on naive truncation that can run long or
// cut off mid-sentence.

export function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

// Tries a full "base | location" title first, falls back to shorter
// location strings, then to just the base, all within the length budget.
export function buildTitle(
  base: string,
  locations: string[] = ["Kadarenahalli, Bengaluru", "Bengaluru"],
  max = 60
): string {
  for (const loc of locations) {
    const candidate = `${base} | ${loc}`;
    if (candidate.length <= max) return candidate;
  }
  return base.length <= max ? base : truncateAtWord(base, max);
}

export function buildDescription(
  lead: string,
  suffix: string,
  max = 155
): string {
  const budget = max - suffix.length - 1; // 1 for the joining space
  const truncatedLead = truncateAtWord(lead, Math.max(budget, 40));
  return `${truncatedLead} ${suffix}`.slice(0, max);
}
