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
  phone: "+91 97312 14949", // confirmed via onboarding form
  whatsapp: "919731214949",
  email: "info.dentalnisaa@gmail.com", // confirmed via onboarding form
  instagram: "https://www.instagram.com/dentalnisaa", // confirmed via onboarding form
  // Verified directly, not estimated -- Google is the clinic's own reported
  // figure; Practo fetched live from practo.com/.../reviews on 2026-07-23;
  // Justdial confirmed via the client's own screenshot of their claimed,
  // verified listing on the same date. Do not add a platform here without
  // a real, checkable number -- Lybrate/1mg/etc. were deliberately left out
  // because no confirmed review count could be found for them.
  reviewPlatforms: [
    {
      name: "Google",
      rating: 4.8,
      count: 195,
      url: "https://maps.app.goo.gl/jKjAwve7WWSpyM8X8?g_st=aw",
    },
    {
      name: "Practo",
      rating: 5.0,
      count: 357,
      url: "https://www.practo.com/bangalore/clinic/dentalnisaa-kumaraswamy-layout/reviews",
    },
    {
      name: "Justdial",
      rating: 4.9,
      count: 579,
      url: "https://www.justdial.com/Bangalore/Dentalnisaa-Near-Dayanand-Sagar-College-Kumaraswamy-Layout/080PXX80-XX80-100712164554-F1D7_BZDET",
    },
  ],
  address: {
    line1: "No. 47, 2nd Main Road, J.H.B.C.S Layout, Subhash Chandra Bose Road, Kadarenahalli, Bendre Nagar",
    line2: "Bengaluru, Karnataka 560070",
    mapsUrl: "https://maps.app.goo.gl/jKjAwve7WWSpyM8X8?g_st=aw", // confirmed via onboarding form
  },
  rating: 4.8,
  reviewCount: 195,
  foundedYear: 1995, // confirmed via onboarding form
  yearsActive: new Date().getFullYear() - 1995,
  hours: [
    { day: "Monday", slots: "10:30 am–2 pm, 4:30–8 pm" },
    { day: "Tuesday", slots: "10:30 am–2 pm, 4:30–8 pm" },
    { day: "Wednesday", slots: "10:30 am–2 pm, 4:30–8 pm" },
    { day: "Thursday", slots: "10:30 am–2 pm, 4:30–8 pm" },
    { day: "Friday", slots: "10:30 am–2 pm, 4:30–8 pm" },
    { day: "Saturday", slots: "10:30 am–2 pm, 4:30–8 pm" },
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
  {
    name: "Dr. Madhu",
    title: "", // ⟦PLACEHOLDER⟧ e.g. BDS, MDS (specialization)
    experience: "", // ⟦PLACEHOLDER⟧ years of experience
    bio: "", // ⟦PLACEHOLDER⟧ in the doctor's own words
    photo: null, // ⟦PLACEHOLDER⟧ headshot image path once received
  },
  // ⟦PLACEHOLDER⟧ — add once confirmed as currently active (reviews also
  // mention Dr. Shyama and Dr. Tasneem, but this needs the client's
  // confirmation before publishing):
  // {
  //   name: "Dr. Full Name",
  //   title: "BDS, MDS (Prosthodontics)",
  //   experience: "XX years",
  //   bio: "In the doctor's own words.",
  //   photo: "/doctor.jpg",
  // },
];

// Support staff — confirmed via onboarding form.
export const staff = [
  { name: "Ms. Aira Fathima", role: "Front Desk & Hygienist / Assistant" },
];

export type Treatment = {
  id: string;
  name: string;
  short: string;
  icon: string;
  category: string;
  // `null` until the clinic provides real treatment-room photography —
  // rendered as an icon-forward glass panel instead, same honesty pattern
  // used for `doctors[].photo` and `gallerySpaces[].image` above.
  image: string | null;
  tagline: string;
  overview: string;
  forWhom: string[];
  symptoms: string[];
  benefits: string[];
  process: { title: string; detail: string }[];
  technology: string[];
  duration: string;
  recovery: string;
  faqs: { q: string; a: string }[];
  relatedIds: string[];
};

// Fixed category taxonomy — drives the /treatments filter bar and each
// treatment's breadcrumb/category label. Keep this list in sync with the
// `category` value used on every entry in `treatments` below.
export const treatmentCategories = [
  "Preventive Care",
  "Cosmetic Dentistry",
  "Orthodontics",
  "Restorative & Implants",
  "Oral Surgery",
  "Family & Pediatric",
  "Emergency Care",
  "Advanced Technology",
] as const;

export type TreatmentCategory = (typeof treatmentCategories)[number];

// Maps each category to one of the existing Icon.tsx glyphs — keeps icon
// choice as data, not a hardcoded switch statement inside a component.
export const treatmentCategoryIcons: Record<TreatmentCategory, string> = {
  "Preventive Care": "tooth",
  "Cosmetic Dentistry": "sparkle",
  "Orthodontics": "align",
  "Restorative & Implants": "implant",
  "Oral Surgery": "root",
  "Family & Pediatric": "family",
  "Emergency Care": "shield",
  "Advanced Technology": "scan",
};

// Rebuilt to match the client's onboarding form treatment list exactly.
export const treatments: Treatment[] = [
  {
    id: "general-checkup",
    name: "General Checkup",
    short: "Routine exams that catch problems while they're still small.",
    icon: "tooth",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?auto=format&fit=crop&w=1200&q=80",
    tagline: "The foundation of every healthy smile",
    overview: "Regular check-ups catch problems while they're still small and simple to treat — a full visual and digital review of your teeth, gums, and bite, plus honest guidance on anything that needs attention.",
    forWhom: ["Anyone due for a routine check-up (recommended every 6 months)", "Patients with mild sensitivity or a suspected cavity", "Families wanting one clinic for every generation's dental needs"],
    process: [
      { title: "Exam & X-rays", detail: "A full visual and digital check to spot decay, wear, or gum issues early." },
      { title: "Diagnosis & plan", detail: "Your dentist walks you through exactly what's needed, and why." },
      { title: "Treatment", detail: "Any needed care completed the same visit wherever possible." },
      { title: "Prevention plan", detail: "Simple, specific guidance for keeping the next check-up uneventful." },
    ],
    faqs: [
      { q: "How often should I get a check-up?", a: "Every six months is standard for most people, though your dentist may suggest more frequent visits if you have ongoing issues." },
      { q: "What if I haven't seen a dentist in years?", a: "Very common, and no reason to feel embarrassed — a first check-up simply starts with an honest assessment of where things stand." },
      { q: "Will I need X-rays every visit?", a: "Not necessarily — your dentist will advise based on your history and what they see." },
    ],
    symptoms: ["No pain at all — this is about catching problems before symptoms start", "Mild sensitivity to hot, cold, or sweet foods", "A visit overdue by more than 6–8 months"],
    benefits: ["Catches decay and gum issues while they're still small and simple to treat", "Keeps small problems from becoming expensive, complex ones", "Gives you an honest, current picture of your oral health"],
    technology: ["Digital intraoral camera for a closer visual check", "Digital X-ray where needed, at low radiation"],
    duration: "30–45 minutes",
    recovery: "None needed — you can eat, drink, and go about your day immediately after.",
    relatedIds: ["scaling-polishing", "fillings-sealants", "digital-xray"],
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Safe, professional whitening for a noticeably brighter smile.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?auto=format&fit=crop&w=1200&q=80",
    tagline: "A brighter smile, done safely",
    overview: "Professional whitening lifts years of staining from coffee, tea, and everyday life more effectively — and more safely — than over-the-counter kits, under a dentist's supervision throughout.",
    forWhom: ["Patients with yellowing or stained teeth", "Anyone preparing for a wedding or event", "Patients who've tried store-bought kits with limited results"],
    process: [
      { title: "Shade check & cleaning", detail: "A quick clean first, so whitening works on the tooth surface itself." },
      { title: "Protective prep", detail: "Gums are shielded before the whitening gel is applied." },
      { title: "Whitening application", detail: "Professional-strength gel, applied and monitored in-clinic." },
      { title: "Aftercare guidance", detail: "Tips to make the brighter shade last as long as possible." },
    ],
    faqs: [
      { q: "Is professional whitening safe for enamel?", a: "Yes, when done under dental supervision — safer than unsupervised home kits, which can overuse whitening agents." },
      { q: "How long does the result last?", a: "Typically several months to a couple of years, depending on diet and habits like smoking or coffee/tea." },
      { q: "Will it work on crowns or fillings?", a: "No — whitening only affects natural enamel, which your dentist will factor into planning." },
    ],
    symptoms: ["Yellowing or dullness built up from coffee, tea, or age", "Uneven staining across the front teeth", "A smile that looks duller in photos than you'd like"],
    benefits: ["Noticeably brighter shade in a single sitting", "Safer, more even results than store-bought kits", "Boosts confidence for photos, events, or everyday smiling"],
    technology: ["Professional-strength whitening gel", "Protective gum barrier applied during treatment"],
    duration: "45–60 minutes",
    recovery: "Some mild, temporary sensitivity is normal for a day or two — no downtime otherwise.",
    relatedIds: ["scaling-polishing", "veneers-crowns", "dental-bonding"],
  },
  {
    id: "dental-bonding",
    name: "Dental Bonding",
    short: "A quick, affordable fix for chips, gaps, and minor imperfections.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=1200&q=80",
    tagline: "A small fix, a big difference",
    overview: "A tooth-colored resin is shaped and hardened directly onto the tooth to repair chips, gaps, or discoloration — usually completed in a single visit with no lab work needed.",
    forWhom: ["Patients with a chipped or slightly uneven tooth", "Anyone with small gaps they'd like closed", "Patients wanting a quick, affordable cosmetic fix"],
    process: [
      { title: "Shade matching", detail: "Resin color matched precisely to your natural teeth." },
      { title: "Surface prep", detail: "The tooth surface is gently prepared for the bonding material to adhere." },
      { title: "Shaping", detail: "Resin applied and sculpted directly onto the tooth." },
      { title: "Curing & polish", detail: "Hardened with a curing light, then polished to a natural finish." },
    ],
    faqs: [
      { q: "How long does bonding last?", a: "Typically 4-8 years depending on habits, with touch-ups possible as needed." },
      { q: "Is it as strong as a veneer?", a: "It's more affordable but less durable long-term — your dentist can advise which suits your case." },
      { q: "Does it require anaesthesia?", a: "Usually not — bonding rarely reaches the sensitive inner tooth." },
    ],
    symptoms: ["A visibly chipped or fractured front tooth", "A small gap you'd like closed", "Minor discoloration that whitening alone won't fix"],
    benefits: ["Fixes chips and gaps in a single visit", "No lab work or waiting required", "Affordable compared to veneers or crowns"],
    technology: ["Tooth-colored composite resin", "Curing light for a hardened, durable finish"],
    duration: "30–60 minutes per tooth",
    recovery: "None — you can bite and chew normally right after the appointment.",
    relatedIds: ["veneers-crowns", "teeth-reshaping", "gummy-smile-correction"],
  },
  {
    id: "tooth-jewellery",
    name: "Tooth Jewellery",
    short: "A subtle, removable sparkle for your smile.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=1200&q=80",
    tagline: "A little extra sparkle, safely applied",
    overview: "A small decorative crystal is safely bonded to the surface of a tooth — a fully reversible cosmetic touch that doesn't affect the tooth structure underneath.",
    forWhom: ["Patients wanting a subtle, playful cosmetic detail", "Anyone curious about a fully reversible option", "Patients preparing for a special occasion"],
    process: [
      { title: "Consultation", detail: "Choosing placement and style that suits your smile." },
      { title: "Surface prep", detail: "The tooth surface is gently cleaned and prepped." },
      { title: "Bonding", detail: "The crystal is safely bonded using dental-grade adhesive." },
      { title: "Finishing check", detail: "A final check for comfort and secure placement." },
    ],
    faqs: [
      { q: "Does it damage the tooth?", a: "No — it's bonded to the enamel surface only and can be removed without lasting effect." },
      { q: "How long does it stay on?", a: "Often several months to a year, depending on care and habits." },
      { q: "Can it be removed early?", a: "Yes, anytime, without harming the tooth." },
    ],
    symptoms: ["No dental symptoms — this is a purely cosmetic, elective choice", "A desire for a subtle, reversible detail on your smile"],
    benefits: ["Fully reversible with no effect on tooth structure", "Quick, painless application", "A playful, low-commitment way to personalize your smile"],
    technology: ["Dental-grade adhesive bonding"],
    duration: "15–20 minutes",
    recovery: "None — no adjustment period at all.",
    relatedIds: ["dental-bonding", "teeth-whitening", "gummy-smile-correction"],
  },
  {
    id: "teeth-reshaping",
    name: "Teeth Reshaping",
    short: "Small contouring adjustments for a more balanced smile.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1654373535457-383a0a4d00f9?auto=format&fit=crop&w=1200&q=80",
    tagline: "Subtle changes, a more even smile",
    overview: "Minor contouring removes small amounts of enamel to even out length, shape, or minor overlaps — a quick, painless way to refine the look of a smile without major treatment.",
    forWhom: ["Patients with slightly uneven or pointed teeth", "Anyone wanting subtle refinement, not a full makeover", "Patients often combining this with bonding or whitening"],
    process: [
      { title: "Assessment", detail: "Checking which teeth would benefit from subtle contouring." },
      { title: "Marking the plan", detail: "Mapping out the exact adjustments before starting." },
      { title: "Reshaping", detail: "Gentle removal of small amounts of enamel to refine shape." },
      { title: "Polish", detail: "Smoothing and polishing for a natural finish." },
    ],
    faqs: [
      { q: "Is reshaping painful?", a: "No — it only affects the outer enamel, so anaesthesia usually isn't needed." },
      { q: "Is it permanent?", a: "Yes, since enamel doesn't grow back — your dentist keeps changes conservative." },
      { q: "Can it fix crooked teeth?", a: "Only very minor irregularities — larger alignment issues need orthodontics instead." },
    ],
    symptoms: ["Slightly uneven, pointed, or overlapping tooth edges", "Minor asymmetry that catches your eye in the mirror"],
    benefits: ["Subtle, natural-looking refinement in one visit", "Often paired with bonding or whitening for a fuller result", "No anaesthesia or recovery time needed"],
    technology: ["Fine diamond polishing instruments for precise contouring"],
    duration: "20–30 minutes",
    recovery: "None — enamel doesn't regenerate so changes are kept conservative, but no downtime follows.",
    relatedIds: ["dental-bonding", "braces-aligners", "midline-diastema-closure"],
  },
  {
    id: "gummy-smile-correction",
    name: "Gummy Smile Correction",
    short: "Rebalancing the ratio of gum to tooth for a more even smile.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1758205307876-334bb810a63a?auto=format&fit=crop&w=1200&q=80",
    tagline: "A more balanced smile line",
    overview: "When a smile shows more gum tissue than tooth, a gum-contouring procedure reshapes the gumline to reveal more of the natural tooth — a quick change with a noticeable effect.",
    forWhom: ["Patients who feel they show too much gum when smiling", "Anyone considering it alongside a cosmetic smile makeover", "Patients wanting a quick, precise procedure"],
    process: [
      { title: "Smile assessment", detail: "Mapping the ideal gum-to-tooth ratio for your smile." },
      { title: "Numbing", detail: "The area is fully numbed before any reshaping begins." },
      { title: "Gum contouring", detail: "Precise reshaping of the gumline." },
      { title: "Healing guidance", detail: "Simple aftercare for a smooth, fast recovery." },
    ],
    faqs: [
      { q: "Is this painful?", a: "The area is numbed beforehand, so discomfort during the procedure is minimal." },
      { q: "How long is recovery?", a: "Typically just a few days for initial healing." },
      { q: "Is the result permanent?", a: "Yes, in most cases, once the gum tissue has healed." },
    ],
    symptoms: ["Gums that show more prominently than teeth when smiling", "Feeling self-conscious about a \"gummy\" smile in photos"],
    benefits: ["A more balanced gum-to-tooth ratio", "Noticeable result from a single, precise procedure", "Often permanent once healed"],
    technology: ["Precision gum contouring instruments", "Local anaesthesia for comfort"],
    duration: "30–45 minutes",
    recovery: "A few days of mild tenderness while the gumline heals.",
    relatedIds: ["teeth-reshaping", "dental-bonding", "veneers-crowns"],
  },
  {
    id: "midline-diastema-closure",
    name: "Midline Diastema Closure",
    short: "Closing the gap between the front two teeth.",
    icon: "sparkle",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?auto=format&fit=crop&w=1200&q=80",
    tagline: "Closing the gap, naturally",
    overview: "A gap between the upper front teeth (diastema) can be closed with bonding, veneers, or orthodontics depending on the size of the gap and your preference.",
    forWhom: ["Patients with a noticeable gap between front teeth", "Anyone wanting options beyond just braces", "Patients wanting a quick cosmetic option (bonding) or a permanent one (veneers/orthodontics)"],
    process: [
      { title: "Assessment", detail: "Measuring the gap and discussing which approach fits best." },
      { title: "Option selection", detail: "Choosing between bonding, veneers, or aligners." },
      { title: "Treatment", detail: "Completed same-day (bonding) or over weeks (orthodontic options)." },
      { title: "Final check", detail: "Confirming a natural, comfortable result." },
    ],
    faqs: [
      { q: "What's the fastest way to close a gap?", a: "Bonding is usually fastest — often done in a single visit." },
      { q: "Will the gap come back?", a: "Bonding and veneers hold permanently; if aligners are used without a retainer, gaps can gradually reopen." },
      { q: "Does insurance typically cover this?", a: "It's usually considered cosmetic, so check your specific coverage." },
    ],
    symptoms: ["A visible gap between the upper front two teeth", "A gap that's grown more noticeable over time"],
    benefits: ["Closes the gap with an option that fits your case and budget", "Can be done same-day (bonding) or as a lasting fix (veneers/orthodontics)", "A more even, confident smile"],
    technology: ["Composite bonding or custom veneers", "Clear aligners for cases needing orthodontic movement"],
    duration: "Same-day (bonding) to several months (orthodontic options)",
    recovery: "None for bonding or veneers; aligner-based closure needs a retainer afterward to keep the gap from reopening.",
    relatedIds: ["dental-bonding", "braces-aligners", "veneers-crowns"],
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    short: "Permanent, natural-feeling replacements for missing teeth.",
    icon: "implant",
    category: "Restorative & Implants",
    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=1200&q=80",
    tagline: "The closest thing to your natural tooth",
    overview: "A dental implant replaces both the root and crown of a missing tooth — a titanium post placed in the jawbone, topped with a custom crown. Unlike dentures, implants stay fixed in place.",
    forWhom: ["Anyone missing one or more teeth wanting a permanent solution", "Patients who find removable dentures inconvenient", "People with adequate jawbone health (assessed at consultation)"],
    process: [
      { title: "Consultation & scan", detail: "Assessing jawbone health and planning the exact implant position." },
      { title: "Implant placement", detail: "The titanium post is placed under local anaesthesia." },
      { title: "Healing period", detail: "A few months for the implant to bond with the jawbone." },
      { title: "Crown fitting", detail: "A custom-matched crown completes the natural look." },
    ],
    faqs: [
      { q: "How long do implants last?", a: "With good oral hygiene, often decades — many patients keep them for life." },
      { q: "Is the procedure painful?", a: "Done under local anaesthesia, similar to an extraction; mild soreness during healing is normal." },
      { q: "How long is the whole process?", a: "Usually a few months, mostly for the bone-healing phase." },
    ],
    symptoms: ["A missing tooth affecting how you chew, speak, or smile", "Frustration with a loose or removable denture", "Bone or gum changes from a long-missing tooth"],
    benefits: ["Feels and functions like a natural tooth", "Doesn't rely on neighbouring teeth for support, unlike a bridge", "Can last decades with good oral hygiene"],
    technology: ["Titanium implant post", "3D imaging for precise placement planning", "Custom-matched ceramic crown"],
    duration: "Several months total, mostly for bone healing",
    recovery: "Mild soreness for a few days after placement; the healing (osseointegration) phase takes 2–4 months before the crown is fitted.",
    relatedIds: ["veneers-crowns", "extractions", "dentures-bridges"],
  },
  {
    id: "emergency-care",
    name: "Emergency Care",
    short: "Urgent dental care when pain or injury can't wait.",
    icon: "shield",
    category: "Emergency Care",
    image: "https://images.unsplash.com/photo-1758206524132-72a2aa6639e2?auto=format&fit=crop&w=1200&q=80",
    tagline: "When you need to be seen now",
    overview: "Severe toothache, a knocked-out tooth, or a dental injury needs prompt attention — call or WhatsApp us directly and we'll advise on immediate steps and fit you in as quickly as possible.",
    forWhom: ["Anyone with sudden, severe tooth or jaw pain", "Patients with a knocked-out or badly broken tooth", "Anyone with dental injury from an accident or sports"],
    process: [
      { title: "Call or WhatsApp", detail: "Describe what happened so we can advise immediate steps." },
      { title: "Priority slot", detail: "We fit emergencies in as quickly as the day allows." },
      { title: "Assessment & relief", detail: "Immediate focus on pain relief and stabilizing the issue." },
      { title: "Follow-up plan", detail: "A clear plan for any further treatment needed." },
    ],
    faqs: [
      { q: "What counts as a dental emergency?", a: "Severe pain, a knocked-out tooth, uncontrolled bleeding, or facial swelling all warrant an urgent call." },
      { q: "Can you see me the same day?", a: "We prioritize genuine emergencies and do our best to fit you in quickly." },
      { q: "What should I do with a knocked-out tooth?", a: "Keep it moist (in milk or saliva) and get to a dentist as soon as possible — timing matters." },
    ],
    symptoms: ["Sudden, severe tooth or jaw pain", "A knocked-out or badly broken tooth", "Uncontrolled bleeding or facial swelling after an injury"],
    benefits: ["Fast attention when waiting isn't an option", "Immediate guidance over call or WhatsApp before you even arrive", "Priority scheduling to relieve pain quickly"],
    technology: ["Digital X-ray for rapid diagnosis", "On-the-spot pain relief and stabilization"],
    duration: "Varies by the emergency — assessed the same day",
    recovery: "Depends on the underlying issue; your dentist will walk you through what's next.",
    relatedIds: ["extractions", "root-canal-treatment", "oral-surgery"],
  },
  {
    id: "extractions",
    name: "Extractions",
    short: "Gentle, safe removal when a tooth can't be saved.",
    icon: "root",
    category: "Oral Surgery",
    image: "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=1200&q=80",
    tagline: "When removal is the healthiest option",
    overview: "Extractions are recommended when a tooth is too damaged or decayed to save. Done under local anaesthesia, most patients describe far less discomfort than they expected.",
    forWhom: ["Patients with a severely decayed or damaged tooth", "Anyone needing extractions as part of orthodontic or denture planning", "Patients with a tooth beyond repair"],
    process: [
      { title: "Assessment & X-ray", detail: "Confirms the tooth's position and the safest removal approach." },
      { title: "Numbing", detail: "Full local anaesthesia before any work begins." },
      { title: "Extraction", detail: "Careful removal with care taken around nerves and neighbouring teeth." },
      { title: "Aftercare guidance", detail: "Clear instructions for a smooth recovery at home." },
    ],
    faqs: [
      { q: "Is extraction painful?", a: "The area is fully numbed beforehand — most patients feel pressure, not pain." },
      { q: "How long does healing take?", a: "Initial healing is usually a few days to a week." },
      { q: "Do I need a replacement afterward?", a: "For visible or functional teeth, your dentist will discuss options like an implant or bridge." },
    ],
    symptoms: ["A tooth too decayed, cracked, or infected to save", "Persistent pain from a badly damaged tooth", "A tooth flagged for removal ahead of dentures or braces"],
    benefits: ["Removes a source of pain or infection", "Often far less uncomfortable than patients expect", "Clears the way for a replacement like an implant or bridge"],
    technology: ["Digital X-ray to confirm root position", "Local anaesthesia throughout"],
    duration: "20–40 minutes per tooth",
    recovery: "Initial healing in a few days to a week; full socket healing over several weeks.",
    relatedIds: ["dental-implants", "dentures-bridges", "impactions"],
  },
  {
    id: "fillings-sealants",
    name: "Fillings & Sealants",
    short: "Treating cavities and protecting teeth before they start.",
    icon: "tooth",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1739902526173-06750b78cfb7?auto=format&fit=crop&w=1200&q=80",
    tagline: "Stopping decay in its tracks",
    overview: "Fillings restore teeth already affected by decay; sealants protect the back teeth's grooves from ever developing cavities in the first place — both quick, routine, and effective.",
    forWhom: ["Patients with a diagnosed cavity", "Children and adults wanting preventive sealants on molars", "Anyone prone to cavities in deep tooth grooves"],
    process: [
      { title: "Diagnosis", detail: "X-rays and exam confirm the extent of any decay." },
      { title: "Numbing (if needed)", detail: "For fillings, the area is numbed first." },
      { title: "Cleaning/application", detail: "Decay removed and filled, or sealant painted onto grooves." },
      { title: "Bite check", detail: "Making sure the result feels natural when biting." },
    ],
    faqs: [
      { q: "Do fillings hurt?", a: "The area is numbed beforehand, so the procedure itself is typically painless." },
      { q: "How long do sealants last?", a: "Several years with normal wear, and can be reapplied if needed." },
      { q: "Are sealants only for kids?", a: "No — adults without decay in their molar grooves can benefit too." },
    ],
    symptoms: ["A diagnosed cavity or visible dark spot on a tooth", "Sensitivity when eating something sweet or cold", "Deep grooves on molars prone to trapping plaque"],
    benefits: ["Stops decay before it reaches the tooth's nerve", "Sealants prevent cavities before they ever start", "Quick, routine, and typically painless"],
    technology: ["Tooth-colored composite filling material", "Preventive sealant coating for molar grooves"],
    duration: "20–40 minutes per tooth",
    recovery: "None — normal eating and brushing can resume the same day.",
    relatedIds: ["general-checkup", "root-canal-treatment", "pediatric-dentistry"],
  },
  {
    id: "laser-dentistry",
    name: "Laser Dentistry",
    short: "Precise, minimally invasive treatment using dental lasers.",
    icon: "sparkle",
    category: "Advanced Technology",
    image: "https://images.unsplash.com/photo-1643660527090-bea721ad71f8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Precision with less discomfort",
    overview: "Laser dentistry allows precise treatment of gum and soft-tissue procedures with less bleeding and discomfort than traditional methods, often speeding up healing too.",
    forWhom: ["Patients needing gum reshaping or soft-tissue treatment", "Anyone wanting a minimally invasive option where available", "Patients with anxiety about traditional instruments"],
    process: [
      { title: "Assessment", detail: "Confirming the procedure is suited to laser treatment." },
      { title: "Numbing (if needed)", detail: "Local anaesthesia applied where necessary." },
      { title: "Laser treatment", detail: "Precise, targeted treatment with minimal bleeding." },
      { title: "Recovery guidance", detail: "Typically faster healing than traditional methods." },
    ],
    faqs: [
      { q: "Is laser treatment painful?", a: "Generally less uncomfortable than traditional methods, often needing less anaesthesia." },
      { q: "What procedures use lasers here?", a: "Mainly soft-tissue and gum procedures — your dentist will confirm if it applies to your case." },
      { q: "Is recovery faster?", a: "Yes, typically, with less swelling and bleeding than traditional instruments." },
    ],
    symptoms: ["Gum overgrowth or soft-tissue concerns needing precise treatment", "Anxiety about traditional dental instruments"],
    benefits: ["Less bleeding and discomfort than traditional methods", "Often faster healing afterward", "More precise, minimally invasive treatment"],
    technology: ["Soft-tissue dental laser"],
    duration: "Varies by procedure, typically 20–40 minutes",
    recovery: "Usually faster and more comfortable than traditional instruments, with less swelling.",
    relatedIds: ["gummy-smile-correction", "mouth-guards", "oral-surgery"],
  },
  {
    id: "mouth-guards",
    name: "Mouth Guards",
    short: "Custom protection for sports, or for teeth grinding at night.",
    icon: "shield",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1684607633217-462056580c3c?auto=format&fit=crop&w=1200&q=80",
    tagline: "Custom protection, comfortable fit",
    overview: "A custom-fitted mouth guard protects teeth during sports, or protects against nightly grinding (bruxism) — far more comfortable and effective than generic store-bought versions.",
    forWhom: ["Athletes wanting reliable mouth protection", "Patients who grind or clench their teeth at night", "Anyone who's found store-bought guards uncomfortable"],
    process: [
      { title: "Assessment", detail: "Discussing whether it's for sport, grinding, or both." },
      { title: "Impressions", detail: "A precise mold taken of your teeth." },
      { title: "Custom fabrication", detail: "The guard is made to your exact fit." },
      { title: "Fitting", detail: "Final adjustments for all-day or all-night comfort." },
    ],
    faqs: [
      { q: "How is this different from store-bought guards?", a: "A custom fit stays in place properly and is far more comfortable for regular use." },
      { q: "How long do they last?", a: "Typically 1-2 years with proper care, longer for sports guards used occasionally." },
      { q: "Can it help with jaw pain from grinding?", a: "Often yes — reducing the impact of grinding can ease associated jaw discomfort." },
    ],
    symptoms: ["Waking up with jaw soreness or headaches (possible grinding)", "Playing contact sports without reliable mouth protection", "Discomfort from an ill-fitting store-bought guard"],
    benefits: ["Custom fit stays in place comfortably", "Protects teeth during sport or nightly grinding", "Can ease grinding-related jaw discomfort"],
    technology: ["Precise dental impressions", "Custom fabrication to your exact bite"],
    duration: "Two visits: impressions, then fitting",
    recovery: "None — a short adjustment period of a few nights is normal for comfort.",
    relatedIds: ["general-checkup", "braces-aligners", "pediatric-dentistry"],
  },
  {
    id: "oral-surgery",
    name: "Oral Surgery",
    short: "Surgical care for more complex dental and jaw issues.",
    icon: "root",
    category: "Oral Surgery",
    image: "https://images.unsplash.com/photo-1663182094304-557746ee056e?auto=format&fit=crop&w=1200&q=80",
    tagline: "Skilled care for complex cases",
    overview: "From impacted teeth to more involved surgical procedures, oral surgery addresses issues beyond routine extractions — planned carefully and performed with your comfort as the priority.",
    forWhom: ["Patients with impacted or complex tooth issues", "Anyone referred for surgical extraction", "Patients needing pre-implant surgical preparation"],
    process: [
      { title: "Assessment & imaging", detail: "Detailed imaging to plan the safest surgical approach." },
      { title: "Numbing/sedation", detail: "Appropriate anaesthesia discussed based on the procedure." },
      { title: "Surgical procedure", detail: "Performed carefully, with attention to comfort and safety." },
      { title: "Recovery plan", detail: "Clear aftercare instructions for smooth healing." },
    ],
    faqs: [
      { q: "Is oral surgery painful?", a: "Appropriate anaesthesia is used throughout; some soreness during recovery is normal and manageable." },
      { q: "How long is recovery?", a: "Varies by procedure — your dentist will give a specific timeline for your case." },
      { q: "Will I need someone to drive me home?", a: "If sedation is used, yes — this will be discussed beforehand." },
    ],
    symptoms: ["Complex tooth issues beyond a routine extraction", "Referral for impacted teeth or jaw-related surgery"],
    benefits: ["Addresses complex cases routine dentistry can't", "Careful planning keeps focus on comfort and safety", "Resolves issues that could otherwise worsen"],
    technology: ["Detailed imaging for surgical planning", "Sedation options where appropriate"],
    duration: "Varies by procedure",
    recovery: "Typically several days to a week, with clear aftercare guidance provided.",
    relatedIds: ["impactions", "extractions", "dental-implants"],
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    short: "Gentle, patient care that keeps kids comfortable.",
    icon: "family",
    category: "Family & Pediatric",
    image: "https://images.unsplash.com/photo-1733817336090-04082ff6ab4f?auto=format&fit=crop&w=1200&q=80",
    tagline: "Building comfort with the dentist early",
    overview: "Children's dental care is about more than small teeth — it's building a lifetime of comfort with the dentist. Gentle handling and clear, kid-friendly explanations turn a scary visit into a routine one.",
    forWhom: ["Children due for their first dental visit", "Kids with cavities, teething discomfort, or growth concerns", "Anxious or first-time young patients"],
    process: [
      { title: "Gentle introduction", detail: "A relaxed, friendly first look — no rushing, no pressure." },
      { title: "Check-up", detail: "A thorough but kid-paced exam of teeth and jaw development." },
      { title: "Simple explanations", detail: "Any needed treatment explained in terms a child can follow." },
      { title: "Positive reinforcement", detail: "Ending each visit on a good note, so the next one is easier." },
    ],
    faqs: [
      { q: "When should my child's first visit be?", a: "Generally by their first birthday, or within 6 months of the first tooth appearing." },
      { q: "My child is scared of the dentist — can you help?", a: "Yes — gentle, patient handling is built into every pediatric visit." },
      { q: "How often should kids have check-ups?", a: "Every 6 months, same as adults." },
    ],
    symptoms: ["A first dental visit that's overdue", "Teething discomfort or early cavities", "Nervousness or fear about visiting the dentist"],
    benefits: ["Builds comfort with the dentist from an early age", "Gentle, kid-paced approach reduces fear", "Catches growth or development concerns early"],
    technology: ["Child-friendly digital imaging, used only when needed"],
    duration: "20–30 minutes",
    recovery: "None — most visits involve no treatment requiring recovery.",
    relatedIds: ["fillings-sealants", "mouth-guards", "general-checkup"],
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Painless, precise care to save a tooth that's under threat.",
    icon: "root",
    category: "Restorative & Implants",
    image: "https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?auto=format&fit=crop&w=1200&q=80",
    tagline: "Saving the tooth, not just treating the pain",
    overview: "When decay or infection reaches the inner pulp of a tooth, a root canal removes the damaged tissue and seals the tooth — relieving pain and saving a tooth that would otherwise need extraction.",
    forWhom: ["Patients with persistent tooth pain, especially with hot or cold", "Anyone with a deeply decayed or cracked tooth", "Patients wanting to save a tooth rather than extract it"],
    process: [
      { title: "Diagnosis", detail: "X-rays confirm the extent of infection." },
      { title: "Numbing", detail: "The area is fully numbed before any work begins." },
      { title: "Cleaning the canal", detail: "Infected tissue removed and the canal cleaned and shaped." },
      { title: "Sealing & crown", detail: "The tooth is sealed, then typically capped with a crown." },
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "Done under local anaesthesia — typically no more uncomfortable than a filling." },
      { q: "How many visits does it take?", a: "Often one to two visits depending on the tooth and infection." },
      { q: "Do I need a crown afterward?", a: "Usually yes, especially for back teeth, to protect against cracking." },
    ],
    symptoms: ["Persistent tooth pain, especially with hot or cold", "A deeply decayed or cracked tooth", "Lingering pain after a filling"],
    benefits: ["Saves a tooth that would otherwise need extraction", "Relieves the pain caused by the underlying infection", "Typically no more uncomfortable than getting a filling"],
    technology: ["Digital X-ray for diagnosis", "Precision canal-cleaning instruments", "Custom crown for long-term protection"],
    duration: "One to two visits, roughly 60–90 minutes each",
    recovery: "Mild soreness for a few days is normal and settles quickly with basic care.",
    relatedIds: ["veneers-crowns", "general-checkup", "extractions"],
  },
  {
    id: "scaling-polishing",
    name: "Teeth Scaling & Polishing",
    short: "Professional cleaning to clear plaque and tartar your toothbrush can't reach.",
    icon: "sparkle",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
    tagline: "The deep clean brushing alone can't do",
    overview: "Even careful brushing leaves plaque that hardens into tartar over time. Scaling and polishing removes it professionally, leaving teeth smoother and less prone to gum irritation.",
    forWhom: ["Anyone due for their routine 6-monthly clean", "Patients noticing stained teeth or mild gum bleeding", "Smokers or tea/coffee drinkers managing surface staining"],
    process: [
      { title: "Assessment", detail: "A quick check of gum health and tartar build-up." },
      { title: "Scaling", detail: "Careful removal of plaque and tartar from the tooth surface and gumline." },
      { title: "Polishing", detail: "A smooth, polished finish that resists new plaque build-up." },
      { title: "Aftercare tips", detail: "Brushing/flossing pointers specific to what was seen." },
    ],
    faqs: [
      { q: "Is scaling bad for teeth or gums?", a: "No — it removes hardened plaque already harming gum health; it doesn't damage healthy enamel." },
      { q: "Will my gums bleed during cleaning?", a: "Mild bleeding can happen with inflamed gums, settling within a few days as gum health improves." },
      { q: "How often do I need this?", a: "Every 6 months is standard for most patients." },
    ],
    symptoms: ["Visible tartar build-up along the gumline", "Mild gum bleeding when brushing or flossing", "Surface staining from tea, coffee, or smoking"],
    benefits: ["Removes plaque and tartar brushing alone can't reach", "Leaves teeth smoother and less prone to irritation", "Supports healthier gums long-term"],
    technology: ["Ultrasonic scaling instruments", "Polishing paste for a smooth, clean finish"],
    duration: "30–45 minutes",
    recovery: "None — mild, temporary gum sensitivity is possible if gums were inflamed beforehand.",
    relatedIds: ["general-checkup", "teeth-whitening", "veneers-crowns"],
  },
  {
    id: "veneers-crowns",
    name: "Veneers & Crowns",
    short: "Durable, custom-matched restorations for damaged or imperfect teeth.",
    icon: "bridge",
    category: "Cosmetic Dentistry",
    image: "https://images.unsplash.com/photo-1670250492416-570b5b7343b1?auto=format&fit=crop&w=1200&q=80",
    tagline: "Restoring strength, matching the smile",
    overview: "A crown caps a damaged tooth to restore strength; a veneer covers the front surface to improve appearance. Both are custom-matched to blend naturally with the rest of your smile.",
    forWhom: ["Patients with a cracked or heavily filled tooth (crown)", "Anyone wanting to improve the look of front teeth (veneers)", "Patients wanting a natural-looking, long-term restoration"],
    process: [
      { title: "Preparation", detail: "The tooth is gently shaped to make room for the crown or veneer." },
      { title: "Impression / scan", detail: "A precise digital or physical impression taken for a custom fit." },
      { title: "Temporary fitting", detail: "A temporary piece protects the tooth while the permanent one is made." },
      { title: "Final fitting", detail: "The custom piece is fitted and adjusted for a comfortable, natural look." },
    ],
    faqs: [
      { q: "How long do crowns and veneers last?", a: "Typically 10-15 years or longer with good care." },
      { q: "Will it match my other teeth?", a: "Yes — shade and shape are custom-matched to blend in naturally." },
      { q: "Is the procedure painful?", a: "The tooth is numbed during preparation, so discomfort is minimal." },
    ],
    symptoms: ["A cracked, heavily filled, or structurally weak tooth", "Front teeth you'd like to look more even or bright", "A tooth that's changed shape after previous treatment"],
    benefits: ["Restores strength to a damaged tooth (crown)", "Improves the look of front teeth (veneer)", "Custom-matched to blend naturally with your smile"],
    technology: ["Digital or physical impressions", "Custom ceramic fabrication"],
    duration: "Two visits, roughly 2–3 weeks apart",
    recovery: "Minimal — some sensitivity around the prepared tooth for a few days is normal.",
    relatedIds: ["root-canal-treatment", "dental-implants", "teeth-whitening"],
  },
  {
    id: "digital-xray",
    name: "Digital X-Ray",
    short: "Low-radiation digital imaging for accurate diagnosis.",
    icon: "scan",
    category: "Advanced Technology",
    image: "https://images.unsplash.com/photo-1522849696084-818b29dfe210?auto=format&fit=crop&w=1200&q=80",
    tagline: "Seeing what a visual exam can't",
    overview: "Digital X-rays reveal decay, bone loss, and issues below the gumline that aren't visible to the eye — using significantly less radiation than traditional film X-rays, with instant results.",
    forWhom: ["Patients getting a first comprehensive exam", "Anyone with symptoms not explained by a visual check", "Patients due for routine diagnostic imaging"],
    process: [
      { title: "Positioning", detail: "Comfortable, quick positioning for the imaging needed." },
      { title: "Capture", detail: "Digital sensors capture images with minimal radiation exposure." },
      { title: "Instant review", detail: "Images appear immediately for review with your dentist." },
      { title: "Diagnosis", detail: "Findings explained clearly, with a plan if treatment is needed." },
    ],
    faqs: [
      { q: "Is digital X-ray safe?", a: "Yes — it uses significantly less radiation than traditional film X-rays and is considered very safe." },
      { q: "How often do I need X-rays?", a: "Depends on your dental history — your dentist will advise what's appropriate." },
      { q: "Are results immediate?", a: "Yes, digital imaging displays instantly for review." },
    ],
    symptoms: ["No visible symptoms — this reveals what a visual exam alone can't", "Suspected decay or bone loss below the gumline"],
    benefits: ["Significantly less radiation than traditional film X-rays", "Instant results reviewed together with your dentist", "Catches issues invisible to the naked eye"],
    technology: ["Digital sensor imaging"],
    duration: "5–10 minutes",
    recovery: "None.",
    relatedIds: ["general-checkup", "root-canal-treatment", "oral-surgery"],
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    short: "Straighter teeth at any age, with options that fit your lifestyle.",
    icon: "align",
    category: "Orthodontics",
    image: "https://images.unsplash.com/photo-1598256989809-394fa4f6cd26?auto=format&fit=crop&w=1200&q=80",
    tagline: "A straighter smile, on your terms",
    overview: "Whether traditional braces or clear, removable aligners, orthodontic treatment corrects crowding, gaps, and bite issues for teens and adults alike — more discreet and comfortable than most people remember.",
    forWhom: ["Teens and adults with crowded, gapped, or misaligned teeth", "Patients with bite issues affecting chewing or jaw comfort", "Anyone wanting a straighter smile without visible metal braces"],
    process: [
      { title: "Assessment & scan", detail: "A full look at tooth position and bite to plan the right approach." },
      { title: "Treatment plan", detail: "Braces or clear aligners recommended based on your case." },
      { title: "Active treatment", detail: "Regular adjustments or new aligner sets over several months." },
      { title: "Retention", detail: "A retainer afterward keeps teeth from drifting back." },
    ],
    faqs: [
      { q: "Am I too old for braces?", a: "Not at all — many orthodontic patients are adults; tooth movement works the same at any age." },
      { q: "How long does treatment take?", a: "Varies by case, typically several months to around two years." },
      { q: "Are clear aligners as effective as braces?", a: "For many mild-to-moderate cases, yes — your dentist will advise for your specific case." },
    ],
    symptoms: ["Crowded, gapped, or misaligned teeth", "A bite that makes chewing or jaw comfort difficult", "Wanting straighter teeth without visible metal braces"],
    benefits: ["Corrects crowding, gaps, and bite issues", "Aligners offer a discreet, removable option", "Works for teens and adults alike"],
    technology: ["Traditional braces or clear aligner systems", "Digital scan for treatment planning"],
    duration: "Several months to around two years, depending on your case",
    recovery: "A short adjustment period after each new aligner set or braces tightening; a retainer maintains results afterward.",
    relatedIds: ["teeth-reshaping", "midline-diastema-closure", "veneers-crowns"],
  },
  {
    id: "impactions",
    name: "Impacted Tooth Treatment",
    short: "Careful treatment for teeth — often wisdom teeth — that haven't erupted properly.",
    icon: "root",
    category: "Oral Surgery",
    image: "https://images.unsplash.com/photo-1652149590102-6480bd4208ad?auto=format&fit=crop&w=1200&q=80",
    tagline: "Resolving teeth that haven't come in properly",
    overview: "When a tooth (often a wisdom tooth) is blocked from erupting normally, it can cause pain, crowding, or infection. Treatment ranges from monitoring to surgical removal depending on the case.",
    forWhom: ["Patients with pain or swelling near an unerupted tooth", "Anyone flagged for impacted wisdom teeth on X-ray", "Patients experiencing crowding from an impacted tooth"],
    process: [
      { title: "Imaging", detail: "X-rays or scans to see the exact position of the impacted tooth." },
      { title: "Assessment", detail: "Deciding between monitoring or removal based on risk." },
      { title: "Treatment", detail: "Surgical removal performed under appropriate anaesthesia, if needed." },
      { title: "Recovery guidance", detail: "Clear aftercare instructions for healing." },
    ],
    faqs: [
      { q: "Do all impacted teeth need removal?", a: "No — some can simply be monitored if they aren't causing problems." },
      { q: "Is removal painful?", a: "Performed under anaesthesia; some soreness during recovery is normal and manageable." },
      { q: "How long is recovery?", a: "Typically a few days to a week for initial healing." },
    ],
    symptoms: ["Pain or swelling near a tooth (often wisdom teeth) that hasn't erupted properly", "Crowding caused by a tooth pushing against its neighbours"],
    benefits: ["Resolves pain and crowding caused by the impacted tooth", "Prevents future infection risk", "Some cases only need monitoring, not removal"],
    technology: ["X-ray or scan imaging to map tooth position", "Appropriate anaesthesia for surgical cases"],
    duration: "30–60 minutes if removal is needed",
    recovery: "A few days to a week for initial healing, with aftercare guidance provided.",
    relatedIds: ["oral-surgery", "extractions", "emergency-care"],
  },
  {
    id: "full-mouth-rehabilitation",
    name: "Full Mouth Rehabilitation",
    short: "Complete restoration for complex cases — one plan, start to finish.",
    icon: "mouth",
    category: "Restorative & Implants",
    image: "https://images.unsplash.com/photo-1729541479462-d2a438f4c124?auto=format&fit=crop&w=1200&q=80",
    tagline: "A complete plan, not piecemeal fixes",
    overview: "For patients needing extensive work across most or all of their teeth, full mouth rehabilitation combines whichever treatments are needed — crowns, implants, gum care — into a single coordinated plan.",
    forWhom: ["Patients with extensive wear, decay, or missing teeth", "Anyone needing multiple treatments coordinated together", "Patients wanting one plan rather than piecemeal fixes"],
    process: [
      { title: "Comprehensive assessment", detail: "A full evaluation of teeth, gums, bite, and jaw." },
      { title: "Coordinated plan", detail: "All needed treatments mapped out together, in sequence." },
      { title: "Staged treatment", detail: "Work completed in planned phases for the best outcome." },
      { title: "Final review", detail: "Confirming function, comfort, and appearance together." },
    ],
    faqs: [
      { q: "How long does full mouth rehab take?", a: "Varies widely by case — from a few months to longer for complex plans." },
      { q: "Is it done in one sitting?", a: "No — it's staged over multiple visits for safety and precision." },
      { q: "Will it be expensive?", a: "Cost depends entirely on what's needed; your dentist will walk you through options and a clear plan." },
    ],
    symptoms: ["Extensive wear, decay, or multiple missing teeth", "Needing several different treatments at once", "Ongoing bite or jaw discomfort from years of untreated issues"],
    benefits: ["One coordinated plan instead of piecemeal fixes", "Addresses function, comfort, and appearance together", "Staged approach keeps treatment safe and manageable"],
    technology: ["Comprehensive imaging and bite analysis", "Combination of crowns, implants, and gum treatment as needed"],
    duration: "Several months, staged across multiple visits",
    recovery: "Varies by the specific treatments involved — your dentist maps this out during planning.",
    relatedIds: ["dental-implants", "veneers-crowns", "dentures-bridges"],
  },
  {
    id: "dentures-bridges",
    name: "Dentures & Bridges",
    short: "Comfortable, natural-looking solutions for missing teeth.",
    icon: "bridge",
    category: "Restorative & Implants",
    image: "https://images.unsplash.com/photo-1562330743-fbc6ef07ca78?auto=format&fit=crop&w=1200&q=80",
    tagline: "A confident, complete smile",
    overview: "A bridge replaces one or more missing teeth using neighbouring teeth as anchors; dentures replace multiple or all teeth with a removable appliance — both restoring the ability to eat and speak comfortably.",
    forWhom: ["Patients missing one or more teeth wanting a fixed option (bridge)", "Patients missing most or all teeth in an arch (dentures)", "Anyone replacing older, ill-fitting dentures"],
    process: [
      { title: "Assessment", detail: "Checking gum and jaw condition to plan the right option." },
      { title: "Impressions", detail: "Precise molds taken for a comfortable, custom fit." },
      { title: "Try-in", detail: "A trial fitting to check look, bite, and comfort." },
      { title: "Final fitting", detail: "Small adjustments over the first visits for all-day comfort." },
    ],
    faqs: [
      { q: "Will dentures look natural?", a: "Yes — shade, shape, and gum-line are custom matched for a natural appearance." },
      { q: "How long is the adjustment period?", a: "A few weeks is typical for speech and eating to feel fully natural." },
      { q: "Do bridges feel like natural teeth?", a: "Yes, once fitted — most patients adjust within days." },
    ],
    symptoms: ["One or more missing teeth affecting chewing or speech", "An older, ill-fitting denture that needs replacing", "Missing most or all teeth in an arch"],
    benefits: ["Restores the ability to eat and speak comfortably", "Custom-matched for a natural look", "Bridges use neighbouring teeth for a fixed, stable result"],
    technology: ["Precise impressions", "Custom fabrication and try-in fitting"],
    duration: "Several visits over 2–4 weeks",
    recovery: "A few weeks of adjustment for speech and eating to feel fully natural.",
    relatedIds: ["dental-implants", "veneers-crowns", "extractions"],
  },
  {
    id: "fluoride-application",
    name: "Fluoride Application",
    short: "A simple treatment that strengthens enamel against decay.",
    icon: "shield",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&w=1200&q=80",
    tagline: "Extra strength for your enamel",
    overview: "A quick, painless fluoride treatment strengthens tooth enamel and helps prevent cavities — especially valuable for children and anyone prone to decay.",
    forWhom: ["Children as part of routine preventive care", "Patients prone to cavities", "Anyone with early signs of enamel weakening"],
    process: [
      { title: "Cleaning", detail: "Teeth cleaned before application for best absorption." },
      { title: "Application", detail: "Fluoride gel or varnish applied directly to the teeth." },
      { title: "Brief wait", detail: "A short pause to let the treatment absorb." },
      { title: "Aftercare tips", detail: "Simple guidance on eating/drinking right after." },
    ],
    faqs: [
      { q: "Is fluoride treatment safe?", a: "Yes, it's a standard, well-studied preventive treatment used widely in dentistry." },
      { q: "Is it only for kids?", a: "No — adults prone to decay benefit too." },
      { q: "How often is it needed?", a: "Often every 6 months alongside a routine check-up, depending on risk." },
    ],
    symptoms: ["Early signs of enamel weakening", "A history of frequent cavities"],
    benefits: ["Strengthens enamel against future decay", "Quick and completely painless", "Especially valuable for children's developing teeth"],
    technology: ["Professional fluoride gel or varnish"],
    duration: "10–15 minutes",
    recovery: "None — just a short wait before eating or drinking afterward.",
    relatedIds: ["general-checkup", "pediatric-dentistry", "scaling-polishing"],
  },
  {
    id: "oral-cancer-screening",
    name: "Oral Cancer Screening",
    short: "A quick, painless check for early warning signs.",
    icon: "shield",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1664529845836-433c172142ca?auto=format&fit=crop&w=1200&q=80",
    tagline: "Early detection, real peace of mind",
    overview: "A simple visual and physical exam of the mouth, tongue, and throat checks for early signs of oral cancer — quick, painless, and often included as part of a routine check-up.",
    forWhom: ["Anyone due for a routine check-up", "Patients with tobacco or alcohol use history", "Anyone noticing unusual sores or patches that don't heal"],
    process: [
      { title: "Visual exam", detail: "A careful look at the lips, gums, tongue, and throat." },
      { title: "Physical check", detail: "Gentle feeling for any unusual lumps or texture changes." },
      { title: "Discussion", detail: "Any findings explained clearly, with next steps if needed." },
      { title: "Follow-up plan", detail: "Referral for further testing if anything needs a closer look." },
    ],
    faqs: [
      { q: "Does this hurt?", a: "No — it's a simple visual and physical exam, completely painless." },
      { q: "How often should I get screened?", a: "Typically as part of your routine 6-monthly check-up." },
      { q: "What are warning signs to watch for?", a: "Sores that don't heal, unusual patches, or persistent lumps are worth mentioning to your dentist." },
    ],
    symptoms: ["Sores that haven't healed after two weeks", "Unusual patches or lumps in the mouth or throat", "A history of tobacco or alcohol use"],
    benefits: ["Early detection significantly improves outcomes", "Quick, painless, and often included in routine visits", "Real peace of mind from a simple check"],
    technology: ["Visual and physical oral examination"],
    duration: "5–10 minutes",
    recovery: "None.",
    relatedIds: ["general-checkup", "scaling-polishing", "digital-xray"],
  },
];
// ⟦PLACEHOLDER⟧ have the clinic's dentists review this content for clinical accuracy before launch


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

// `value` (a plain number) drives the animated count-up in TrustBar; leave
// it undefined for points that aren't a number (e.g. "Painless care").
// Every number here is sourced directly from `clinic` above — nothing
// invented for the redesign.
export const trustPoints: {
  value?: number;
  suffix?: string;
  label: string;
  detail: string;
}[] = [
  {
    value: clinic.yearsActive,
    suffix: "+ years",
    label: `${clinic.yearsActive}+ years`,
    detail: "Serving families in Kadarenahalli",
  },
  {
    value: clinic.rating,
    suffix: "★ rated",
    label: `${clinic.rating}★ rated`,
    detail: `From ${clinic.reviewCount}+ Google reviews`,
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

// General, site-wide FAQs — separate from the per-treatment FAQs above.
// Covers booking, payment, and first-visit logistics.
export const siteFaqs: { q: string; a: string }[] = [
  {
    q: "Do I need to book an appointment, or can I walk in?",
    a: "Booking ahead (online, by call, or WhatsApp) is recommended so we can hold a slot for you, but we do our best to accommodate walk-ins and dental emergencies.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Any previous dental records or X-rays you have, a list of current medications, and your ID. If nothing else, just come as you are — we'll take it from there.",
  },
  {
    q: "What are your clinic hours?",
    a: "We're open Monday to Saturday, 10am–2pm and 4pm–8pm, and closed on Sundays. See the Contact page for full details.",
  },
  {
    q: "Do you treat dental emergencies?",
    a: "Yes — call or WhatsApp us directly and describe what's happening. We'll advise on next steps and fit you in as quickly as possible.",
  },
  {
    q: "What payment options do you accept?",
    a: "We accept cash, card, and UPI payments. Speak with our front desk about any specific payment questions before your treatment begins.",
  },
  {
    q: "Is the clinic suitable for young children?",
    a: "Yes — we regularly treat children and many of our patients have been coming since childhood. See our Pediatric Dentistry page for more.",
  },
  {
    q: "How do you make dental visits feel less stressful?",
    a: "We focus on clear explanations, gentle techniques, practical aftercare, and appointment pacing that gives patients time to understand their options before treatment begins.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO format
  readTime: string;
  category: string;
  content: string[]; // paragraphs
};

// Original, general dental-health content for ongoing SEO — not clinic
// claims or medical directives. Keep new posts in this same factual,
// general-advice tone, and always point specific concerns back to a
// real consultation rather than self-diagnosis.
export const blogPosts: BlogPost[] = [
  {
    slug: "when-should-my-child-first-visit-the-dentist",
    title: "When Should My Child First Visit the Dentist?",
    excerpt:
      "The general guideline is earlier than most parents expect — here's why, and what actually happens at that first visit.",
    date: "2026-06-02",
    readTime: "4 min read",
    category: "Family Dentistry",
    content: [
      "Most parents assume a first dental visit can wait until all the baby teeth are in, or until a problem shows up. The general recommendation from dental associations is actually much earlier — by a child's first birthday, or within six months of their first tooth appearing.",
      "The reason isn't that infant teeth need complex treatment. It's about starting a habit early: getting a child comfortable in a dental chair before there's ever a reason to be nervous about one. A first visit at this age is short and simple — a quick look at how teeth and jaw are developing, and a chance for parents to ask questions about brushing, teething, or feeding habits that affect dental health.",
      "Waiting until a problem appears means a child's first experience of a dentist is tied to a toothache — exactly the association most parents want to avoid. An early, low-pressure visit does the opposite: it makes the dentist a familiar, unremarkable part of life.",
      "If your child hasn't had a first visit yet and is already past this age, there's no need to worry — it's never too late to start, and a gentle, patient approach works at any age.",
    ],
  },
  {
    slug: "is-root-canal-treatment-actually-painful",
    title: "Is Root Canal Treatment Actually Painful? Separating Fact from Reputation",
    excerpt:
      "Root canals have a scary reputation that doesn't match modern practice. Here's what the procedure actually involves.",
    date: "2026-05-18",
    readTime: "5 min read",
    category: "Root Canal Treatment",
    content: [
      "\"Root canal\" might be the most feared phrase in dentistry — often used as shorthand for the worst possible experience. The reality of modern root canal treatment doesn't match that reputation, and understanding why can make a real difference if you're facing one.",
      "The pain people associate with root canals almost always comes from the infection that makes the treatment necessary — not from the treatment itself. By the time a tooth needs a root canal, the inner pulp is usually already inflamed or infected, which is what causes the throbbing, sensitivity, or constant ache patients describe beforehand.",
      "The procedure itself is done under local anaesthesia, the same as a filling. Once the area is numb, most patients describe the experience as no different from any other dental procedure — some pressure, some sound, but not pain. Removing the infected tissue is, in fact, what relieves the pain that brought the patient in.",
      "Some mild soreness in the days after treatment is normal, similar to recovering from any dental work, and typically settles quickly. If you're dreading a root canal because of what you've heard, it's worth talking to your dentist honestly about that fear — a clear explanation of what will actually happen usually helps more than people expect.",
    ],
  },
  {
    slug: "gum-bleeding-when-brushing-what-it-means",
    title: "Gums Bleeding When You Brush? Here's What That Usually Means",
    excerpt:
      "Bleeding gums are common, but they're not something to just ignore — here's what's usually behind it and when to get it checked.",
    date: "2026-04-27",
    readTime: "4 min read",
    category: "Gum Health",
    content: [
      "A little blood when you brush or floss is common enough that many people assume it's normal — a sign of brushing too hard, or just how their gums are. In most cases, it's actually an early sign of gum inflammation, known as gingivitis, and it's worth paying attention to rather than brushing off.",
      "Gingivitis develops when plaque builds up along the gumline and isn't cleaned away thoroughly enough by brushing alone. The gums respond by becoming inflamed, which is what causes the bleeding, redness, or mild swelling. The encouraging part: at this early stage, it's very reversible with a proper professional clean and better daily habits.",
      "Left unaddressed over a longer period, gum inflammation can progress to more advanced gum disease, which affects the bone and tissue supporting the teeth — a much harder problem to fully reverse. This is why bleeding gums are worth mentioning at your next check-up rather than waiting for them to become a bigger issue.",
      "If you're noticing bleeding regularly, it's a good idea to get it looked at rather than simply switching to a softer toothbrush and hoping it resolves on its own.",
    ],
  },
  {
    slug: "teeth-whitening-safety-what-to-know",
    title: "Teeth Whitening: What's Actually Safe, and What to Watch For",
    excerpt:
      "Whitening kits are everywhere, but not all of them are equal. Here's what matters for doing it safely.",
    date: "2026-03-14",
    readTime: "4 min read",
    category: "Cosmetic Dentistry",
    content: [
      "Teeth whitening is one of the most requested cosmetic dental treatments, and also one of the most misunderstood when it comes to safety. The short version: whitening itself is safe and effective when done correctly — the risk comes from how it's done, not whether it's done at all.",
      "Over-the-counter kits vary enormously in strength and quality, and without professional supervision, it's easy to overuse them or apply them unevenly — leading to gum irritation or uneven results. Professional whitening, done under a dentist's supervision, uses controlled concentrations and protects the gums throughout, which is exactly why it tends to give both safer and more consistent results.",
      "It's also worth knowing that whitening only works on natural tooth enamel — existing crowns, veneers, or fillings won't change shade along with the rest of your teeth. This is something worth discussing before treatment if you have any existing dental work, so the final result looks even rather than patchy.",
      "Results aren't permanent — diet and habits like smoking or frequent coffee/tea will gradually affect the shade again over months. A touch-up now and then, rather than one-time whitening, is the realistic way most people maintain the result long-term.",
    ],
  },
];

export type GallerySpace = {
  name: string;
  description: string;
  image: string | null;
};

// Descriptions of real clinic spaces — swap `image` from null to a real
// photo path once available. Kept factual and non-superlative so nothing
// here overstates what a photo would actually show. Temporary stock photos
// are labeled as representative and should be replaced with real clinic
// photography before launch.
export const gallerySpaces: GallerySpace[] = [
  {
    name: "Waiting Lounge",
    description:
      "A calm space to sit before your appointment, ask questions, and settle in before treatment begins.",
    image: null,
  },
  {
    name: "Treatment Rooms",
    description:
      "Modern treatment spaces set up for routine dentistry, root canal treatment, cosmetic care, pediatric visits, and follow-up appointments.",
    image:
      "https://images.unsplash.com/photo-1722586663955-2f96a4c1f255?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Consultation Room",
    description:
      "Where every treatment plan starts — a private space for an honest conversation about what you need and why.",
    image:
      "https://images.unsplash.com/photo-1704455306251-b4634215d98f?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Sterilization & Safety",
    description:
      "Instrument sterilization and hygiene protocols followed for every single patient, every single time.",
    image: null,
  },
  {
    name: "Reception",
    description:
      "The first stop for check-in, questions, and scheduling your next visit.",
    image: null,
  },
  {
    name: "Kids' Corner",
    description:
      "A friendlier corner of the clinic for younger patients, built to make first visits feel a little less clinical.",
    image: null,
  },
];
