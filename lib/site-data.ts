// ============================================================================
// DentalNisaa Oral Care — Site Content
// ----------------------------------------------------------------------------
// Items marked ⟦PLACEHOLDER⟧ still need confirmation from the client.
// Search for "PLACEHOLDER" to find every field that needs a real value
// before launch.
// ============================================================================

export const clinic = {
  name: "DentalNisaa Oral Care",
  website: "https://dentalnisaa.com", // ⟦PLACEHOLDER⟧ confirm live domain before launch
  tagline: "Bengaluru's family dental clinic, trusted since 1995",
  brandLine: "Discover Back The Joy Of Smiling", // verbatim from client logo
  phone: "+91 97312 14949", // confirmed from Google Business listing
  whatsapp: "919731214949",
  email: "hello@dentalnisaa.com", // ⟦PLACEHOLDER⟧ confirm real inbox
  address: {
    line1: "", // ⟦PLACEHOLDER⟧ new relocated address — leave "" until confirmed, pages fall back gracefully
    line2: "Kumaraswamy Layout, Bengaluru, Karnataka",
    mapsUrl: "", // ⟦PLACEHOLDER⟧ Google Maps pin (share link) for new location, once confirmed
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

// Set to a real object once the client shares the doctor's details — the
// DoctorSpotlight component renders a graceful "coming soon" state while
// this is empty, instead of publishing placeholder text to real visitors.
export type Doctor = {
  name: string;
  title: string;
  experience: string;
  bio: string;
  photo: string | null;
};

export const doctors: Doctor[] = [
  // ⟦PLACEHOLDER⟧ — uncomment and fill in once confirmed by the client:
  // {
  //   name: "Dr. Full Name",
  //   title: "BDS, MDS (Prosthodontics)",
  //   experience: "XX years",
  //   bio: "In the doctor's own words.",
  //   photo: "/doctor.jpg",
  // },
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

// ⟦PLACEHOLDER⟧ empty until the client shares real, verbatim reviews she's
// comfortable publishing (with permission). Do not fill this with invented
// or paraphrased quotes attributed to "patients" — the Testimonials
// component shows a Google-reviews link instead while this stays empty.
export const testimonials: { quote: string; context: string }[] = [];

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
