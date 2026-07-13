// ============================================================================
// DentalNisaa Oral Care — Site Content
// ----------------------------------------------------------------------------
// Items marked ⟦PLACEHOLDER⟧ still need confirmation from the client.
// Search for "PLACEHOLDER" to find every field that needs a real value
// before launch.
// ============================================================================

export const clinic = {
  name: "DentalNisaa Oral Care",
  tagline: "Bengaluru's family dental clinic, trusted since 1995",
  brandLine: "Discover Back The Joy Of Smiling", // verbatim from client logo
  phone: "+91 97312 14949", // confirmed from Google Business listing
  whatsapp: "919731214949",
  email: "hello@dentalnisaa.com", // ⟦PLACEHOLDER⟧ confirm real inbox
  address: {
    line1: "⟦PLACEHOLDER — new relocated address⟧",
    line2: "Kumaraswamy Layout, Bengaluru, Karnataka",
    mapsUrl: "", // ⟦PLACEHOLDER⟧ Google Maps pin for new location
  },
  rating: 4.8,
  reviewCount: 195,
  foundedYear: 1995, // confirmed from logo ("SINCE 1995")
  yearsActive: new Date().getFullYear() - 1995,
  hours: [
    { day: "Monday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Tuesday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Wednesday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Thursday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Friday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Saturday", slots: "10 am–2 pm, 4–8 pm" },
    { day: "Sunday", slots: "Closed" },
  ],
};

export const doctors = [
  {
    name: "⟦PLACEHOLDER — Doctor's full name⟧",
    title: "⟦PLACEHOLDER — e.g. BDS, MDS (Prosthodontics)⟧",
    experience: "⟦PLACEHOLDER — years of experience⟧",
    bio: "A warm, detail-first approach to dentistry built over years of caring for families across generations in Kumaraswamy Layout. ⟦PLACEHOLDER — replace with the doctor's own words once shared⟧",
    photo: null, // ⟦PLACEHOLDER⟧ headshot image path once received
  },
];

export const treatments = [
  {
    id: "general",
    name: "General Dentistry",
    short: "Check-ups, cleanings, fillings — the everyday care that keeps small problems small.",
    icon: "tooth",
  },
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    short: "Smile makeovers, whitening, and bonding for the smile you actually want to show.",
    icon: "sparkle",
  },
  {
    id: "orthodontics",
    name: "Orthodontics",
    short: "Braces and aligners for a straighter bite, at any age.",
    icon: "align",
  },
  {
    id: "implants",
    name: "Dental Implants",
    short: "Permanent, natural-feeling replacements for missing teeth.",
    icon: "implant",
  },
  {
    id: "full-mouth",
    name: "Full Mouth Rehabilitation",
    short: "Complete restoration for complex cases — one plan, start to finish.",
    icon: "mouth",
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    short: "Painless, precise care to save a tooth that's under threat.",
    icon: "root",
  },
  {
    id: "dentures",
    name: "Dentures & Bridges",
    short: "Comfortable, custom-fit solutions for missing teeth.",
    icon: "bridge",
  },
  {
    id: "pediatric",
    name: "Family & Child Dentistry",
    short: "Gentle care for the youngest smiles in the family.",
    icon: "family",
  },
];
// ⟦PLACEHOLDER⟧ confirm final treatment list matches what's offered at the new location

export const testimonials = [
  {
    quote:
      "Been coming here since childhood — the doctor feels like our family dentist, not just a clinic we visit.",
    context: "Long-time patient",
  },
  {
    quote:
      "Painless treatment and a very clear explanation of what was being done at every step.",
    context: "Root canal patient",
  },
  {
    quote:
      "Very friendly staff and doctor, my daughter felt comfortable through the whole visit.",
    context: "Parent of a young patient",
  },
];
// ⟦PLACEHOLDER⟧ swap in exact-quote testimonials once the client shares ones she's
// comfortable publishing (these are paraphrased composites, not verbatim reviews)

export const trustPoints = [
  {
    label: `${new Date().getFullYear() - 1995}+ years`,
    detail: "Serving families in Kumaraswamy Layout",
  },
  {
    label: "4.8★ rated",
    detail: "From 195+ Google reviews",
  },
  {
    label: "Painless care",
    detail: "Modern, gentle techniques patients consistently mention",
  },
  {
    label: "Multi-generational",
    detail: "Patients who've been coming since childhood",
  },
];
