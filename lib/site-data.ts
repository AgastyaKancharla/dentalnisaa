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
    line1: "47, 2nd Main Road, Subhash Chandra Bose Rd, Kadarenahalli, JHBCS Layout, Bendre Nagar",
    line2: "Bengaluru, Karnataka 560078",
    mapsUrl: "", // ⟦PLACEHOLDER⟧ paste the exact Google Maps share link once you have it — falls back to a name+address search embed until then
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
// title/experience/bio/photo are empty, instead of publishing placeholder
// text to real visitors.
export type Doctor = {
  name: string;
  title: string;
  experience: string;
  bio: string;
  photo: string | null;
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Neha",
    title: "", // ⟦PLACEHOLDER⟧ e.g. BDS, MDS (specialization)
    experience: "", // ⟦PLACEHOLDER⟧ years of experience
    bio: "", // ⟦PLACEHOLDER⟧ in the doctor's own words
    photo: null, // ⟦PLACEHOLDER⟧ headshot image path once received
  },
  // ⟦PLACEHOLDER⟧ — add once confirmed as currently active (reviews mention
  // Dr. Shyama, Dr. Madhu, and Dr. Tasneem, but this needs the client's
  // confirmation before publishing):
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
    id: "general-dentistry",
    name: "General Dentistry",
    short: "Check-ups and fillings — the everyday care that keeps small problems small.",
    icon: "tooth",
  },
  {
    id: "scaling-polishing",
    name: "Scaling & Polishing",
    short: "Professional cleaning to clear plaque and tartar your toothbrush can't reach.",
    icon: "sparkle",
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Painless, precise care to save a tooth that's under threat.",
    icon: "root",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    short: "Permanent, natural-feeling replacements for missing teeth.",
    icon: "implant",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Safe, professional whitening for a noticeably brighter smile.",
    icon: "sparkle",
  },
  {
    id: "braces-clear-aligners",
    name: "Braces & Clear Aligners",
    short: "Straighter teeth at any age, with options that fit your lifestyle.",
    icon: "align",
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    short: "Durable, custom-matched restorations for damaged or missing teeth.",
    icon: "bridge",
  },
  {
    id: "dentures",
    name: "Dentures",
    short: "Comfortable, natural-looking full and partial dentures.",
    icon: "mouth",
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    short: "Gentle, safe removals — including wisdom teeth — when a tooth can't be saved.",
    icon: "root",
  },
  {
    id: "cosmetic-smile-makeover",
    name: "Cosmetic Dentistry & Smile Makeover",
    short: "Veneers, bonding, and whitening combined for the smile you actually want.",
    icon: "sparkle",
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    short: "Gentle, patient care that keeps kids comfortable — many families have trusted us since childhood.",
    icon: "family",
  },
  {
    id: "gum-disease-treatment",
    name: "Gum Disease Treatment",
    short: "Diagnosis and care for gum disease, from early gingivitis to advanced periodontal issues.",
    icon: "tooth",
  },
];
// ⟦PLACEHOLDER⟧ confirm final treatment list matches what's offered at the new location

// Sourced verbatim from the clinic's public Google Business reviews (shared
// by the client), lightly trimmed for length where marked "…". Attribution
// uses first name + last initial. Add more any time — just keep them
// verbatim and sourced from real, public reviews, never invented.
export const testimonials: { quote: string; context: string; author: string }[] = [
  {
    quote:
      "I am extremely glad to have had all my dental treatments done at Dental Nisaa. I had a tooth extraction, root canal procedure and finally the fixing of the crowns.",
    context: "Extraction, root canal & crowns",
    author: "Mary T.",
  },
  {
    quote:
      "Great Service for sure! Dr. Madhu and Ms. Ira both were very friendly and are great at what they do! The whole procedure was very smooth.",
    context: "General treatment",
    author: "Manasa H.",
  },
  {
    quote:
      "They took such good care of my mom throughout her treatment. Everything went smoothly, and the service was excellent from start to finish. The treatment was affordable without compromising on quality.",
    context: "Family care",
    author: "Farheen B.",
  },
  {
    quote:
      "If you live anywhere near Kadarenahalli, I would highly recommend you to visit this clinic for all your dental needs. I had recently gone here for an RCT and the treatment offered by Dr. Shyama was superb.",
    context: "Root canal treatment",
    author: "Shirisha J.",
  },
  {
    quote:
      "I had a wonderful experience in getting my braces treatment done here. The doctors were too good and made me aware of all the procedures to be done. I am happy with my teeth and can smile more confidently.",
    context: "Braces treatment",
    author: "J. V.",
  },
  {
    quote:
      "Highly recommend. Thank you Dr. Tasneem and Dr. Neha for the instructions, the smooth treatment process and answering all the queries regarding treatment.",
    context: "Ongoing treatment & follow-up",
    author: "Jayachandra B.",
  },
  {
    quote:
      "We have made 12 teeth's RC for my daughter. Clinic was really very good, well maintained. Regarding doctor, Dr. Shyama mam was excellent the way she handles the child.",
    context: "Pediatric root canal",
    author: "Muzamil P.",
  },
  {
    quote:
      "I had two wisdom teeth extracted. I was afraid of the pain but there was minimal pain, they are experienced dentists. I would definitely go there again.",
    context: "Wisdom tooth extraction",
    author: "Zahir K.",
  },
  {
    quote:
      "This has been my first visit to a dentist clinic after some long time. It was indeed a good experience — I was in safe hands for the filling of 6 cavities without any pain.",
    context: "Cavity filling",
    author: "Chitrakar D.",
  },
];

export const trustPoints = [
  {
    label: `${new Date().getFullYear() - 1995}+ years`,
    detail: "Serving families in Kadarenahalli",
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
