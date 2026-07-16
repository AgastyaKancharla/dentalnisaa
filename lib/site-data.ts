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

export type Treatment = {
  id: string;
  name: string;
  short: string;
  icon: string;
  tagline: string;
  overview: string;
  forWhom: string[];
  process: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  relatedIds: string[];
};

export const treatments: Treatment[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    short: "Check-ups and fillings — the everyday care that keeps small problems small.",
    icon: "tooth",
    tagline: "The foundation of every healthy smile",
    overview:
      "Regular check-ups catch problems while they're still small and simple to treat. General dentistry covers everything from routine exams and X-rays to fillings for cavities — the ongoing care that keeps a minor issue from becoming a bigger, more expensive one.",
    forWhom: [
      "Anyone due for a routine check-up (recommended every 6 months)",
      "Patients with tooth sensitivity, mild pain, or a suspected cavity",
      "Families wanting one clinic for every generation's dental needs",
    ],
    process: [
      { title: "Exam & X-rays", detail: "A full visual and digital check to spot decay, wear, or gum issues early." },
      { title: "Diagnosis & plan", detail: "Your dentist walks you through exactly what's needed, and why — no surprises." },
      { title: "Treatment", detail: "Fillings or other care completed the same visit wherever possible." },
      { title: "Prevention plan", detail: "Simple, specific guidance for keeping the next check-up uneventful." },
    ],
    faqs: [
      { q: "How often should I get a dental check-up?", a: "Every six months is the standard recommendation for most people, though your dentist may suggest more frequent visits if you have ongoing issues." },
      { q: "Does a filling hurt?", a: "The area is numbed beforehand, so the procedure itself is typically painless. Some mild sensitivity afterward is normal and settles within a day or two." },
      { q: "What if I haven't seen a dentist in years?", a: "That's a very common situation, not a reason to feel embarrassed — a first check-up simply starts with an honest assessment of where things stand." },
    ],
    relatedIds: ["scaling-polishing", "root-canal-treatment", "gum-disease-treatment"],
  },
  {
    id: "scaling-polishing",
    name: "Scaling & Polishing",
    short: "Professional cleaning to clear plaque and tartar your toothbrush can't reach.",
    icon: "sparkle",
    tagline: "The deep clean brushing alone can't do",
    overview:
      "Even careful brushing leaves behind plaque that hardens into tartar over time — especially along the gumline. Scaling and polishing removes it professionally, leaving teeth smoother, brighter, and less prone to gum irritation.",
    forWhom: [
      "Anyone due for their routine 6-monthly clean",
      "Patients noticing stained teeth or mild gum bleeding when brushing",
      "Smokers or tea/coffee drinkers wanting to manage surface staining",
    ],
    process: [
      { title: "Assessment", detail: "A quick check of gum health and tartar build-up before starting." },
      { title: "Scaling", detail: "Careful removal of plaque and tartar from the tooth surface and gumline." },
      { title: "Polishing", detail: "A smooth, polished finish that resists new plaque build-up for longer." },
      { title: "Aftercare tips", detail: "Practical brushing/flossing pointers specific to what was seen at your clean." },
    ],
    faqs: [
      { q: "Is scaling bad for teeth or gums?", a: "No — this is a common myth. Professional scaling removes hardened plaque that's already harming gum health; it doesn't damage healthy enamel." },
      { q: "Will my gums bleed during the cleaning?", a: "Mild bleeding can happen if gums are already inflamed from tartar build-up — it typically settles down within a few days as gum health improves." },
      { q: "How often do I need this done?", a: "Every 6 months is standard for most patients; your dentist may suggest more often if you're prone to tartar build-up." },
    ],
    relatedIds: ["general-dentistry", "gum-disease-treatment", "teeth-whitening"],
  },
  {
    id: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Painless, precise care to save a tooth that's under threat.",
    icon: "root",
    tagline: "Saving the tooth, not just treating the pain",
    overview:
      "When decay or infection reaches the inner pulp of a tooth, a root canal removes the damaged tissue and seals the tooth from the inside — relieving pain and saving a tooth that would otherwise need extraction. Modern technique makes this a far more comfortable procedure than its reputation suggests.",
    forWhom: [
      "Patients with persistent tooth pain, especially with hot or cold",
      "Anyone with a deeply decayed or cracked tooth",
      "Patients wanting to save a tooth rather than extract it",
    ],
    process: [
      { title: "Diagnosis", detail: "X-rays confirm the extent of infection and whether a root canal is the right call." },
      { title: "Numbing", detail: "The area is fully numbed before any work begins — this is the step that removes the pain, not causes it." },
      { title: "Cleaning the canal", detail: "The infected inner tissue is carefully removed and the canal cleaned and shaped." },
      { title: "Sealing & crown", detail: "The tooth is sealed, then typically capped with a crown for long-term strength." },
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "The procedure itself is done under local anaesthesia, so patients typically describe it as no more uncomfortable than a filling. The pain people fear is usually from the infection beforehand, which the treatment relieves." },
      { q: "How many visits does it take?", a: "Often completed in one to two visits depending on the tooth and extent of infection." },
      { q: "Do I need a crown afterward?", a: "Usually yes, especially for back teeth — a crown protects the treated tooth from cracking under normal biting force." },
    ],
    relatedIds: ["crowns-bridges", "general-dentistry", "tooth-extraction"],
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    short: "Permanent, natural-feeling replacements for missing teeth.",
    icon: "implant",
    tagline: "The closest thing to your natural tooth",
    overview:
      "A dental implant replaces both the root and the crown of a missing tooth — a titanium post is placed in the jawbone and topped with a custom crown. Unlike removable dentures, implants stay fixed in place, look natural, and don't affect neighbouring teeth.",
    forWhom: [
      "Anyone missing one or more teeth wanting a permanent solution",
      "Patients who find removable dentures uncomfortable or inconvenient",
      "People with adequate jawbone health (assessed during consultation)",
    ],
    process: [
      { title: "Consultation & scan", detail: "Assessment of jawbone health and planning the exact implant position." },
      { title: "Implant placement", detail: "The titanium post is placed under local anaesthesia." },
      { title: "Healing period", detail: "A few months for the implant to fully bond with the jawbone (osseointegration)." },
      { title: "Crown fitting", detail: "A custom-matched crown is fitted on top, completing the natural look." },
    ],
    faqs: [
      { q: "How long do dental implants last?", a: "With good oral hygiene, implants can last decades — many patients keep them for life." },
      { q: "Is the procedure painful?", a: "It's done under local anaesthesia, similar to an extraction. Mild soreness during healing is normal and manageable." },
      { q: "How long is the whole process?", a: "Total treatment time is usually a few months, mostly for the bone-healing phase between placement and crown fitting." },
    ],
    relatedIds: ["crowns-bridges", "tooth-extraction", "dentures"],
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Safe, professional whitening for a noticeably brighter smile.",
    icon: "sparkle",
    tagline: "A brighter smile, done safely",
    overview:
      "Professional whitening lifts years of staining from coffee, tea, and everyday life far more effectively — and more safely — than over-the-counter kits, under a dentist's supervision to protect enamel and gums throughout.",
    forWhom: [
      "Patients with yellowing or stained teeth from food, drink, or age",
      "Anyone preparing for a wedding, event, or fresh start",
      "Patients who've tried store-bought kits with limited results",
    ],
    process: [
      { title: "Shade check & cleaning", detail: "A quick clean first, so whitening works on the tooth surface itself." },
      { title: "Protective prep", detail: "Gums are shielded before the whitening gel is applied." },
      { title: "Whitening application", detail: "Professional-strength gel, applied and monitored in-clinic." },
      { title: "Aftercare guidance", detail: "Simple tips to make the brighter shade last as long as possible." },
    ],
    faqs: [
      { q: "Is professional whitening safe for enamel?", a: "Yes, when done under dental supervision — this is exactly why it's safer than unsupervised home kits, which can overuse whitening agents." },
      { q: "How long does the result last?", a: "Typically several months to a couple of years, depending on diet and habits like smoking or frequent coffee/tea." },
      { q: "Will it work on all teeth?", a: "Natural teeth generally whiten well; existing crowns or fillings won't change shade, which your dentist will factor into planning." },
    ],
    relatedIds: ["scaling-polishing", "cosmetic-smile-makeover", "general-dentistry"],
  },
  {
    id: "braces-clear-aligners",
    name: "Braces & Clear Aligners",
    short: "Straighter teeth at any age, with options that fit your lifestyle.",
    icon: "align",
    tagline: "A straighter smile, on your terms",
    overview:
      "Whether it's traditional braces or clear, removable aligners, orthodontic treatment corrects crowding, gaps, and bite issues — for teens and adults alike. Today's options are far more discreet and comfortable than what most people remember.",
    forWhom: [
      "Teens and adults with crowded, gapped, or misaligned teeth",
      "Patients with bite issues affecting chewing or jaw comfort",
      "Anyone wanting a straighter smile without traditional metal braces (clear aligners)",
    ],
    process: [
      { title: "Assessment & scan", detail: "A full look at tooth position and bite to plan the right approach." },
      { title: "Treatment plan", detail: "Braces or clear aligners recommended based on your case and preference." },
      { title: "Active treatment", detail: "Regular adjustments (braces) or new aligner sets (clear aligners) over several months." },
      { title: "Retention", detail: "A retainer afterward keeps teeth from drifting back." },
    ],
    faqs: [
      { q: "Am I too old for braces?", a: "Not at all — a growing number of orthodontic patients are adults. Tooth movement works the same way at any age." },
      { q: "How long does treatment take?", a: "It varies by case, typically anywhere from several months to around two years." },
      { q: "Are clear aligners as effective as braces?", a: "For many mild-to-moderate cases, yes. Your dentist will advise if your specific case is better suited to traditional braces." },
    ],
    relatedIds: ["cosmetic-smile-makeover", "general-dentistry", "crowns-bridges"],
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    short: "Durable, custom-matched restorations for damaged or missing teeth.",
    icon: "bridge",
    tagline: "Restoring strength, matching the smile",
    overview:
      "A crown caps a damaged tooth to restore its strength and shape; a bridge replaces one or more missing teeth using the neighbouring teeth as anchors. Both are custom-matched to blend naturally with the rest of your smile.",
    forWhom: [
      "Patients with a cracked, heavily filled, or root-canal-treated tooth",
      "Anyone with one or more missing teeth wanting a fixed (non-removable) solution",
      "Patients wanting a natural-looking, long-term restoration",
    ],
    process: [
      { title: "Preparation", detail: "The tooth is gently shaped to make room for the crown or bridge." },
      { title: "Impression / scan", detail: "A precise digital or physical impression is taken for a custom fit." },
      { title: "Temporary fitting", detail: "A temporary piece protects the tooth while the permanent one is made." },
      { title: "Final fitting", detail: "The custom crown or bridge is fitted and adjusted for a comfortable bite." },
    ],
    faqs: [
      { q: "How long do crowns and bridges last?", a: "With good care, typically 10-15 years or longer." },
      { q: "Will it match my other teeth?", a: "Yes — shade and shape are custom-matched to blend in naturally." },
      { q: "Is the procedure painful?", a: "The tooth is numbed during preparation, so discomfort is minimal; some sensitivity with the temporary piece is normal." },
    ],
    relatedIds: ["root-canal-treatment", "dental-implants", "dentures"],
  },
  {
    id: "dentures",
    name: "Dentures",
    short: "Comfortable, natural-looking full and partial dentures.",
    icon: "mouth",
    tagline: "A confident, complete smile",
    overview:
      "Full or partial dentures replace missing teeth with a removable, custom-fitted appliance — restoring the ability to eat and speak comfortably, and giving a natural, complete smile back.",
    forWhom: [
      "Patients missing most or all teeth in an arch",
      "Anyone wanting a removable (non-surgical) tooth replacement option",
      "Patients replacing older, ill-fitting dentures",
    ],
    process: [
      { title: "Assessment", detail: "A check of gum and jaw condition to plan the right type of denture." },
      { title: "Impressions", detail: "Precise molds taken for a comfortable, custom fit." },
      { title: "Try-in", detail: "A trial fitting to check look, bite, and comfort before finalizing." },
      { title: "Final fitting & adjustments", detail: "Small adjustments over the first few visits for all-day comfort." },
    ],
    faqs: [
      { q: "Will dentures look natural?", a: "Yes — shade, shape, and gum-line are custom matched for a natural appearance." },
      { q: "How long is the adjustment period?", a: "A few weeks is typical for speech and eating to feel fully natural again." },
      { q: "Do dentures need special care?", a: "Yes — daily cleaning and a regular check-up schedule keep them fitting well and lasting longer." },
    ],
    relatedIds: ["dental-implants", "crowns-bridges", "tooth-extraction"],
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    short: "Gentle, safe removals — including wisdom teeth — when a tooth can't be saved.",
    icon: "root",
    tagline: "When removal is the healthiest option",
    overview:
      "Extractions are recommended when a tooth is too damaged, decayed, or impacted to save — including wisdom teeth that don't have room to grow in properly. Done under local anaesthesia, most patients describe far less pain than they expected.",
    forWhom: [
      "Patients with a severely decayed or damaged tooth beyond repair",
      "Anyone with impacted or problematic wisdom teeth",
      "Patients needing extractions as part of orthodontic or denture planning",
    ],
    process: [
      { title: "Assessment & X-ray", detail: "Confirms the tooth's position and the safest approach for removal." },
      { title: "Numbing", detail: "Full local anaesthesia before any work begins." },
      { title: "Extraction", detail: "Careful removal, with extra care taken around nerves and neighbouring teeth." },
      { title: "Aftercare guidance", detail: "Clear instructions for a smooth, fast recovery at home." },
    ],
    faqs: [
      { q: "Is tooth extraction painful?", a: "The area is fully numbed beforehand — most patients feel pressure, not pain, during the procedure itself." },
      { q: "How long does healing take?", a: "Initial healing is usually a few days to a week; complete healing of the gum takes a bit longer." },
      { q: "Do I need a replacement afterward?", a: "For visible or functional teeth, your dentist will discuss options like an implant or bridge to fill the gap." },
    ],
    relatedIds: ["dental-implants", "dentures", "root-canal-treatment"],
  },
  {
    id: "cosmetic-smile-makeover",
    name: "Cosmetic Dentistry & Smile Makeover",
    short: "Veneers, bonding, and whitening combined for the smile you actually want.",
    icon: "sparkle",
    tagline: "Designed around the smile you want",
    overview:
      "A smile makeover combines whichever cosmetic treatments suit your goals — veneers, bonding, whitening, or reshaping — planned together for a natural, cohesive result rather than one-off fixes.",
    forWhom: [
      "Patients unhappy with chips, gaps, staining, or tooth shape",
      "Anyone wanting a complete, planned smile transformation",
      "Patients preparing for a wedding or major life event",
    ],
    process: [
      { title: "Smile consultation", detail: "A conversation about what you'd like to change, and what's realistic." },
      { title: "Treatment planning", detail: "The right mix of veneers, bonding, or whitening mapped out together." },
      { title: "Treatment", detail: "Procedures completed in planned stages for a cohesive result." },
      { title: "Final reveal & polish", detail: "Final adjustments so everything looks and feels natural." },
    ],
    faqs: [
      { q: "How long do veneers last?", a: "Typically 10-15 years or more with good care." },
      { q: "Is a smile makeover just for cosmetic reasons?", a: "Mostly, yes — though many makeovers also fix minor bite or wear issues along the way." },
      { q: "How many visits does it take?", a: "Depends on what's included; your dentist will map out an exact timeline during consultation." },
    ],
    relatedIds: ["teeth-whitening", "crowns-bridges", "braces-clear-aligners"],
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    short: "Gentle, patient care that keeps kids comfortable — many families have trusted us since childhood.",
    icon: "family",
    tagline: "Building comfort with the dentist early",
    overview:
      "Children's dental care is about more than just small teeth — it's building a lifetime of comfort with the dentist. Gentle, patient handling and clear, kid-friendly explanations turn what could be a scary visit into a routine one.",
    forWhom: [
      "Children due for their first dental visit",
      "Kids with cavities, teething discomfort, or growth concerns",
      "Anxious or first-time young patients",
    ],
    process: [
      { title: "Gentle introduction", detail: "A relaxed, friendly first look — no rushing, no pressure." },
      { title: "Check-up", detail: "A thorough but kid-paced exam of teeth and jaw development." },
      { title: "Simple explanations", detail: "Any needed treatment explained in terms a child (and parent) can follow." },
      { title: "Positive reinforcement", detail: "Ending each visit on a good note, so the next one is easier too." },
    ],
    faqs: [
      { q: "When should my child's first dental visit be?", a: "Generally recommended by their first birthday, or within 6 months of the first tooth appearing." },
      { q: "My child is scared of the dentist — can you help?", a: "Yes — this is one of the most common concerns families bring, and gentle, patient handling is built into every pediatric visit." },
      { q: "How often should kids have check-ups?", a: "Every 6 months, same as adults, to catch anything early while it's simple to treat." },
    ],
    relatedIds: ["general-dentistry", "tooth-extraction", "scaling-polishing"],
  },
  {
    id: "gum-disease-treatment",
    name: "Gum Disease Treatment",
    short: "Diagnosis and care for gum disease, from early gingivitis to advanced periodontal issues.",
    icon: "tooth",
    tagline: "Protecting the foundation, not just the teeth",
    overview:
      "Gum disease starts quietly — bleeding gums, mild swelling — and gets harder to treat the longer it's left. Early gingivitis is very treatable; more advanced periodontal issues need a more involved approach to protect the teeth it supports.",
    forWhom: [
      "Anyone with bleeding, swollen, or receding gums",
      "Patients noticing persistent bad breath",
      "Patients with a family history of gum disease",
    ],
    process: [
      { title: "Assessment", detail: "Gum health, pocket depth, and bone support are checked thoroughly." },
      { title: "Deep cleaning", detail: "Scaling below the gumline to remove the source of infection." },
      { title: "Treatment plan", detail: "Further care planned if the disease is more advanced." },
      { title: "Maintenance", detail: "A schedule to keep gum health stable long-term." },
    ],
    faqs: [
      { q: "How do I know if I have gum disease?", a: "Bleeding when brushing, swollen or receding gums, and persistent bad breath are common early signs worth getting checked." },
      { q: "Is gum disease reversible?", a: "Early gingivitis is very reversible with proper cleaning and home care. More advanced periodontal disease can be managed and stabilized, though some damage may be permanent." },
      { q: "Is treatment painful?", a: "Deep cleaning is usually done with local anaesthesia for comfort if pockets are deep; most patients tolerate it well." },
    ],
    relatedIds: ["scaling-polishing", "general-dentistry", "crowns-bridges"],
  },
];
// ⟦PLACEHOLDER⟧ confirm final treatment list matches what's offered at the new location, and
// have the clinic's dentists review the process/FAQ copy above for clinical accuracy before launch

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
    q: "Why are your treatment rooms visible through glass?",
    a: "It's a deliberate design choice for transparency and comfort — you can see the care happening from our waiting lounge, rather than wondering what's going on behind a closed door. Rooms are still fully private for anything you'd rather keep confidential.",
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
// here overstates what a photo would actually show.
//
// Two entries below use temporary stock photos (free Unsplash license, no
// attribution required) as honest stand-ins for spaces they genuinely
// resemble — general dental treatment rooms. The rest are left as
// "coming soon" rather than mismatched to a stock photo that doesn't
// actually depict that specific space (e.g. no photo of children was used
// for the Kids' Corner, since a stock photo can't honestly represent a
// specific real child at this clinic).
export const gallerySpaces: GallerySpace[] = [
  {
    name: "Waiting Lounge",
    description:
      "A calm space to sit before your appointment — designed with the same light, glass-forward feel as the rest of the clinic.",
    image: null,
  },
  {
    name: "Glass Treatment Rooms",
    description:
      "Fully visible from the waiting lounge through floor-to-ceiling glass — see the care happening, not just wait for it.",
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
