# DentalNisaa website audit

**Scope:** SEO, trust and credibility, clarity, booking flow, premium positioning
**Method:** full read of the source on branch `claude/website-seo-trust-audit-xv0bjt` —
every page, component, `lib/site-data.ts`, the schema/SEO layer, and the booking pipeline.
**Not covered:** the live site at dentalnisaa.com could not be reached from the audit
environment (network egress blocked), so nothing here is based on a crawl of production —
no Lighthouse scores, no indexation check, no live Core Web Vitals. Everything below traces
to a specific file in this repo.

Every finding is written as problem → file → fix so it can be picked up directly.

---

## Changelog — what's been fixed since this audit was written

**9 August 2026 — first real assets received from the clinic.** Three photographs of the actual
premises, a headshot and credentials for the second doctor, and confirmation that Dr. Madhu no
longer practises there. Acted on:

| Finding | Status |
|---|---|
| §1.3 Second doctor published blank | **Fixed.** Dr. Madhu removed (confirmed no longer at the clinic). Dr. Shyama Pramod added — BDS, MDS, FPOS, orthodontist — with qualifications and awards displayed. |
| §1.5 No clinical credentials anywhere | **Partly fixed.** A `credentials` field now renders discrete, checkable qualifications on the doctor card. Dr. Shyama's are published; Dr. Neha's are still outstanding. |
| §1.2 Real photos labelled "Representative photo" | **Fixed.** The badge is gated on `isStockImage()`, so it appears only on stock imagery. The clinic's own photographs — including the four treatment photos already in the repo — no longer disown themselves. |
| §1.2 Hero was stock, undisclosed, with misleading alt text | **Fixed.** The hero is now a real photograph of the clinic's waiting lounge, with alt text describing what's actually in frame. |
| §4.1 Hero missing address and open-now status | **Fixed.** The hero panel now carries the live "Open now / closes 8 PM" status (reusing `ClinicOpenStatus`) and a Kadarenahalli directions link. |
| §1.6 Homepage led with 195 Google reviews | **Fixed.** The hero now leads with 1,100+ reviews across all three platforms. |
| §1.4 "17 years" vs "since 1995" | **Partly fixed.** The hero states both facts explicitly: "Caring for families in Kadarenahalli since 1995 — led by Dr. Neha Kulsum for the last 17 years." The About H1 and the TrustStats headline still need the same treatment. |
| Gallery was 2 stock + 4 empty | **Improved** to 3 real + 1 stock + 2 empty. The About page's stock interior was replaced with a real one. |

Everything else below still stands. §6 has been trimmed to what is genuinely still outstanding.

---

## 0. The verdict

**The design reads premium. The content state does not.** That gap is the whole story.

Typography, palette, motion, section rhythm, the editorial doctor spread, the frosted hero
panel — the craft level here is genuinely above what most Bengaluru dental clinics have. A
visitor's first impression of the *design* is "this is a serious clinic."

Then they scroll, and the site starts telling them, in its own words, that it isn't
finished. A "Photo coming soon" card sits where the second doctor should be — on the
homepage, the About page, and all 25 treatment pages. Roughly 25 photos carry a
"Representative photo" badge. The gallery has four "Photo coming soon" tiles. And on the
booking page — the one page where a decision actually happens — appointment slots are
greyed out by a hash function, under a line of copy that says the clinic's live booking
backend isn't connected yet.

That last one is the single most damaging thing on the site. A patient who has decided to
book reads it and concludes the site is a demo. Everything upstream — the design, the 1,131
real reviews, the 30-year story — is spent at that moment.

**What's actually missing, in one sentence:** proof that this specific clinic, with these
specific people, does excellent work — real photographs of the real rooms, the doctors'
actual qualifications, and consented before/after cases. The site currently asks visitors to
trust a beautiful frame around stock imagery and an incomplete team.

**Three things, in order, that would move this the most:**

1. Make the booking page honest and finished (remove the fake availability and the
   "backend not connected" line).
2. Get real photography and credentials from the clinic — the asset list is in §6.
3. Publish consented before/after cases. For a clinic selling whitening, veneers, bonding
   and smile design, this is the proof point the site is missing entirely.

Nothing in this audit is a design problem. That's good news — the expensive part is done.

---

## 1. Trust and premium perception

### 1.1 The booking page shows fabricated availability — P0

`components/BookingWidget.tsx:58` defines `isMockBooked()`, which hashes the date and slot
string and greys out roughly one slot in five, struck through, as "already booked". None of
those bookings exist. Below the grid, line 195 tells the visitor:

> "Greyed-out slots are already booked. Once we connect the clinic's live booking backend,
> this will reflect real-time availability."

Two separate problems. First, the site invents information about the clinic's schedule.
Second, it then admits in writing that the booking system isn't real — on the page where
someone has already decided to become a patient. That sentence is visible to every visitor
who reaches the booking page.

**Fix:** delete `isMockBooked` and the explanatory line; present every slot in clinic hours
as selectable. The flow is a *request*, not a confirmed booking, so say that plainly and
commit to a response window: *"Pick your preferred time — we'll confirm by call or WhatsApp
within 2 hours during clinic hours."* That framing is honest, sets expectations, and reads
more premium than fake scarcity ever would.

### 1.2 Stock photography, disclosed about 25 times

21 of the 25 treatments in `lib/site-data.ts` use Unsplash URLs. Only four have real photos
(`public/treatments/`: laser-dentistry, teeth-whitening, teeth-reshaping, tooth-jewellery).
`components/TreatmentMedia.tsx:47` stamps a "Representative photo" badge on the image. The
About hero (`app/about/page.tsx:57`) and the gallery (`app/gallery/page.tsx:48`) do the same.

The instinct behind this is right — labelling stock imagery honestly is far better than
passing it off as the clinic. But at this volume the cumulative message a visitor receives
is *"we haven't photographed our own clinic yet."* On a site whose entire pitch is a
30-year-old neighbourhood practice, that undercuts the core claim.

Per your direction the photos stay for now. Two bugs inside this are worth knowing about:

- **The badge is unconditional.** `TreatmentMedia` applies it to any image, so the four
  *real* clinic photos are also labelled "Representative photo" — the site is actively
  disowning its own genuine photography.
- **The hero has the opposite problem.** `components/Hero.tsx:26` is an Unsplash image with
  no badge, and line 27 gives it the alt text *"Calm, modern dental treatment room at
  DentalNisaa Oral Care"* — asserting it is the clinic's own room. The largest, most
  prominent image on the site is the one place the disclosure pattern is missing.

**Fix (when photos arrive):** swap the images and drop the badges. Until then, gate the
badge on whether the image path is remote, and correct the hero's alt text.

### 1.3 A doctor is published with no details — P0

`lib/site-data.ts` lists `Dr. Madhu` with empty `title`, empty `experience`, empty `bio`,
and `photo: null`. `DoctorSpotlight` renders on the homepage, About, *and* every one of the
25 treatment pages — so a blank monogram tile reading "Photo coming soon" beside a bare name
appears across essentially the whole site.

This is more costly than it looks. Dr. Madhu is praised by name in a real Google review the
site displays ("Dr. Madhu and Ms. Ira both were very friendly"). A visitor reads the review,
looks for the doctor, and finds an empty card.

**Fix:** either collect the details (§6) or remove the entry until they arrive. `DoctorSpotlight`
already handles a single-doctor layout cleanly.

### 1.4 "17 years" and "30 years" appear side by side with no explanation

Both numbers are true — the clinic has run since 1995, and Dr. Neha has led it for 17+ years.
The site never says that, so the numbers read as a contradiction:

| Where | What it says |
|---|---|
| `app/about/page.tsx:36` | H1: "**17** years of family trust" |
| Same page, next section | "DentalNisaa's legacy started in **1995**" |
| `components/TrustStats.tsx:28` | H2: "Numbers that took **30 years** to earn" — above a **17+** stat |
| `components/FinalCTA.tsx:10` | "the start of **30 more years** of trusted care" |
| `app/layout.tsx:37` | Meta description: "Family dental clinic … **since 1995**" |
| `app/opengraph-image.tsx` | "Since **1995**" |
| `components/Hero.tsx` | "**17+** years caring for families" |

A visitor doing the arithmetic (1995 → 2026 = 31) concludes someone is rounding in their own
favour. It's the kind of small inconsistency that makes people discount the *other* numbers
too — including the review counts, which are real.

**Fix — copy only, no data change.** State both facts as two facts wherever they appear
together:

> "Caring for families in Kadarenahalli since 1995 — led by Dr. Neha Kulsum for the last 17
> years."

That's a *stronger* claim than either number alone: a 30-year institution with continuous
current leadership. The `TrustStats` headline and the About H1 are the two places to fix
first.

### 1.5 No clinical credentials anywhere

Dr. Neha's title reads "Proprietor · Root Canal Specialist & Cosmetic Dentist" with "12+
years experience" — but there is no BDS/MDS, no Dental Council of India or Karnataka State
Dental Council registration number, no fellowships, no association memberships, anywhere on
the site.

For an Indian dental patient choosing between clinics, qualifications are a standard
expectation and their absence is conspicuous — particularly on a site this otherwise polished.
This is also the strongest available lever for E-E-A-T (Google's experience/expertise/
authoritativeness/trust signals), which apply with extra weight to health content.

(Note: Dr. Neha's card says "12+ years experience" while the site elsewhere says she has led
the clinic 17+ years. Worth reconciling — they may both be true, but they should be stated
in a way that doesn't look like a third number.)

**Fix:** add qualifications and registration number to the doctor data and display them
under the name. Requested in §6.

### 1.6 1,131 real reviews, mostly unused

`reviewPlatforms` carries three verified listings: Google 4.8★/195, Practo 5.0★/357,
Justdial 4.9★/579 — **1,131 reviews total**. This is a genuinely exceptional asset and the
site under-plays it:

- The homepage hero leads with Google's 195 only. "1,100+ patient reviews across Google,
  Practo and Justdial" is a substantially stronger opening line.
- `justdialTestimonials` is an empty array — the platform with the *most* reviews (579)
  contributes no quotes, and `/reviews` shows it an empty-state box.
- There is no `Review` structured data anywhere, so none of this text can appear in search
  results.
- The `/reviews` page itself is well built — the "full record, not the highlight reel"
  framing is exactly the right instinct.

### 1.7 "Smile Gallery" contains no smiles

The nav (`components/FullScreenMenu.tsx:13`) labels `/gallery` as "Smile Gallery". The page
shows clinic *spaces* — waiting lounge, treatment rooms, reception — four of six with no
photo at all. A visitor clicking "Smile Gallery" expects patient results.

For a clinic whose treatment list is heavy on cosmetic work (whitening, bonding, veneers,
reshaping, tooth jewellery, gummy smile correction, smile design), **consented before/after
cases are the single biggest missing premium proof point on this site.** Nothing else
converts a cosmetic enquiry as reliably.

**Fix:** either rename the nav item to "Clinic Gallery" (accurate today), or build the real
thing once consented photos exist. Recommend both, in that order.

---

## 2. Booking and conversion

The booking path itself is short and well built — from any page, a visitor is at most one
click from `/booking`, and mobile has a persistent 4-button bar (Call / WhatsApp /
Directions / Book). The problems are in what happens once they're there.

### 2.1 The better booking flow is switched off

There are two complete booking implementations in this repo:

- **`/booking`** — the live one. Single page, day strip, slot grid, name/phone/treatment form.
- **`/book`** — a finished 6-step wizard (treatment → doctor → date → time → details →
  review), with zod validation, autosave, a stepper, a confirmation page, a generated
  calendar file, and a WhatsApp handoff.

`next.config.js` permanently redirects `/book/:path*` → `/booking`. The comment explains why
(it was unlinked, and several sessions were committing in parallel), which was a sound call
at the time — but the net effect today is that the more capable flow is dark, and roughly a
dozen files are maintained for a route nobody can reach.

**Decision needed:** revive the wizard, or delete it. A 6-step wizard is not automatically
better — for a neighbourhood clinic, the one-page form may well convert higher. But leaving
a finished feature behind a 301 is the worst of both.

### 2.2 Bookings cannot be measured — P0

On success, `BookingWidget` flips a React state flag and swaps in a confirmation panel. There
is no URL change, no `/thank-you` route, and no analytics event fired.

Combined with GA4 being environment-gated (`components/GoogleAnalytics.tsx` renders nothing
unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set — and per `docs/ANALYTICS_SETUP.md` this looks
unconfigured), **there is currently no way to know whether this website has ever produced a
single booking.** Every other question in this audit — which treatments draw enquiries,
whether the hero works, whether the blog brings patients — is unanswerable until this is
fixed.

**Fix:** set the GA4 measurement ID, fire a `generate_lead` event on successful submit, and
add a real confirmation URL so it can be used as a conversion in both GA4 and Google Ads.

### 2.3 The treatment picker forces a wrong answer

The form's `<select>` lists all 25 treatments and defaults to "General Checkup", with no
"Not sure / just a consultation" option. Someone with an unexplained ache — a high-intent,
often high-value patient — has to either pick something they haven't been diagnosed with or
abandon the form.

**Fix:** add "Not sure — I'd like a consultation" as the default option.

### 2.4 No consent step, though the form invites health information

The form has a "Notes for the clinic (optional)" field, and the privacy policy explicitly
anticipates that visitors will enter health data there ("for example, an allergy or a
medication"). The submit step has neither a consent checkbox nor a link to the privacy policy
— just a small line of grey text. For health data this is thin.

**Fix:** add a checkbox with a link to `/privacy` before submit.

### 2.5 The booking endpoint is unprotected

`app/api/book/route.ts` validates field types, but has no honeypot field, no rate limiting,
and no CAPTCHA on a public POST endpoint that forwards straight into the clinic's Google
Sheet, email, and WhatsApp. One scripted spam run reaches the front desk directly, and the
practical consequence is that staff stop trusting the notifications.

**Fix:** a hidden honeypot field plus simple per-IP rate limiting covers the realistic threat.

The route's failure handling is otherwise good — a missing webhook logs loudly and the widget
shows a "call or WhatsApp us instead" fallback rather than silently losing the lead.

### 2.6 No emergency path

`Emergency Care` exists as one of 25 treatment pages. Nothing on the homepage, contact page,
or booking page addresses someone in pain right now — no "In pain today? Call us" module, no
same-day messaging, no urgent-care band.

Dental emergencies are the highest-intent traffic a clinic receives: the visitor is
searching on a phone, in discomfort, and will call the first clinic that clearly says it can
see them today. The site data even supports the claim — the emergency treatment's duration
field reads "assessed the same day" — it's simply never surfaced where someone would look.

### 2.7 No pricing information at all

A site-wide search finds one FAQ line about payment methods (cash/card/UPI), two treatment
FAQs that say cost "depends", and a blog post about implant value. There are no fee ranges,
no consultation fee, no EMI or insurance information.

"Cost of root canal in Bangalore" and equivalents are among the highest-volume local dental
searches. Publishing honest *from–to* ranges does three things at once: captures that search
traffic, pre-qualifies enquiries so the front desk spends less time on price calls, and reads
as confidence rather than concealment — which is precisely the premium positioning you're
aiming for. Clinics that hide pricing are read as expensive *and* evasive.

**Fix:** ranges for the top 8 treatments plus a stated consultation fee, with a clear "final
cost confirmed at consultation" caveat.

---

## 3. SEO and local search

The foundations here are better than average — clean metadata, canonicals on every page,
per-treatment `MedicalProcedure` + `FAQPage` + `BreadcrumbList` schema, a sitemap, robots,
OG images, and thoughtful title/description length helpers in `lib/seo.ts`. The gaps are
specific.

### 3.1 `/reviews` is missing from the sitemap — P0

`app/sitemap.ts:5` lists nine static routes. `/reviews` is not among them, despite being in
the main navigation, having its own metadata, and being one of the strongest trust pages on
the site. One-line fix.

### 3.2 The sitemap claims every page changed on every deploy

Every entry gets `lastModified: new Date()`. Redeploy the site and all ~40 URLs report as
freshly modified. Crawlers discount `lastmod` when it behaves like this, which costs you the
signal on the pages that *did* genuinely change.

**Fix:** use the blog post's own `date` for blog URLs and a fixed constant for static pages.

### 3.3 The `Dentist` schema is missing its most valuable properties

`app/layout.tsx:73` emits a solid `Dentist` node — name, address, phone, price range,
opening hours built from real data, aggregate rating. Missing:

- **`sameAs`** — links to the Instagram, Google Maps, Practo and Justdial listings. This is
  the highest-value omission on the page: it's how a search engine confirms that the website,
  the Google Business Profile, and the 1,131 reviews across three platforms are all *the same
  business*. All four URLs already exist in `lib/site-data.ts`.
- **`geo`** (latitude/longitude) and **`hasMap`** — direct location confirmation.
- **`areaServed`**, **`email`**, **`founder`**, **`medicalSpecialty`**, **`paymentAccepted`**,
  **`currenciesAccepted`**.

The file's own comment flags that address/geo need confirming once the client confirms the
relocated address — see §6.

### 3.4 Aggregate rating with no reviews attached

The `Dentist` node carries `aggregateRating` sitewide, but no `Review` nodes exist anywhere.
Google's structured-data guidance treats self-serving ratings on your own LocalBusiness
markup as ineligible for rich results, and the pattern can be flagged.

**Fix:** add real `Review` markup on `/reviews`, built from the verbatim, attributed quotes
already in `lib/site-data.ts`, and reconsider carrying `aggregateRating` on every page.

### 3.5 Missing entity schema

No `Organization` node, no `WebSite` node, and — most importantly — no `Physician` or
`Person` node for Dr. Neha Kulsum. Patients search for doctors by name; the doctor is a
search entity in her own right and the site gives search engines nothing to attach to her.

### 3.6 Location targeting is too narrow

Every page targets "Kadarenahalli". But the clinic's own listings in `lib/site-data.ts` tell
a broader story: the Practo URL is `dentalnisaa-kumaraswamy-layout`, and the Justdial listing
reads `Near-Dayanand-Sagar-College-Kumaraswamy-Layout`.

**"Kumaraswamy Layout" and "near Dayananda Sagar College" appear nowhere on the website** —
despite being how the clinic is listed everywhere else and, in the college's case, how a
large student population would search. Banashankari, Bendre Nagar, JP Nagar and 560070 are
also absent.

**Fix:** work these naturally into the About and Contact copy, and consider a short
"areas we serve" section. Also worth confirming NAP (name/address/phone) consistency across
Google, Practo and Justdial — the listings currently show different location names, which
splits local signal.

### 3.7 Internal linking is thin

- The footer links only Treatments, Gallery, Blog, FAQ — **no About, Reviews, Contact, or
  Booking.** Those are the trust pages, absent from the sitewide link block.
- **Desktop navigation is hamburger-only.** `components/Header.tsx` shows a logo, a "Book
  Appointment" button, and a hamburger — at every breakpoint. About, Treatments and Reviews
  are one click away on a desktop screen with room to spare. This is unusual for a clinic
  site and it suppresses exactly the pages that build confidence. (It's a defensible
  editorial choice aesthetically — but it costs conversions and internal-link prominence.)
- **Blog posts and treatment pages don't link to each other**, despite near-perfect pairs
  already in the data: the root canal post ↔ the root canal treatment page; whitening ↔
  whitening; implants ↔ implants; braces ↔ orthodontics; wisdom teeth ↔ oral surgery. Eight
  posts, 25 treatments, and no cross-linking between them — this is free topical authority
  going unused.

### 3.8 Images bypass Next.js optimisation

Only `Header` and `Hero` use `next/image`. Six raw `<img>` tags remain — in `app/gallery`,
`app/about`, `ClinicTourPreview`, `DoctorSpotlight`, and `TreatmentMedia`. Those get no
width/height attributes (layout shift), no responsive `srcset`, and no AVIF/WebP conversion.

The hero *is* optimised, but it's the LCP element and it's a remote Unsplash fetch — the
single biggest lever on perceived load speed. Real local photography would improve both this
and §1.2 at once.

### 3.9 Alt text is mostly restating names

`alt={treatment.name}`, `alt={space.name}`, `alt={doctor.name}`, `alt="Treatment room at
DentalNisaa"` — descriptive of the label, not the image. Plus the hero alt discussed in §1.2,
which asserts something untrue.

### 3.10 Every page shares one social preview image

`app/opengraph-image.tsx` generates a good branded card, and it cascades to every route. So a
WhatsApp share of the implants page, the reviews page and the blog all look identical.

In India, WhatsApp is the primary way a clinic recommendation actually travels between people.
Per-treatment OG images — treatment name, clinic, rating — would make every shared link work
harder. This is a bigger lever here than it would be in most markets.

### 3.11 Blog authorship weakens E-E-A-T

`app/blog/[slug]/page.tsx` sets both `author` and `publisher` to the Organization. For health
content, Google's quality guidance leans heavily on a named, credentialed human author.
Attributing posts to Dr. Neha Kulsum, BDS/MDS — with a byline and a link to her profile —
is a meaningful signal. Also missing: `dateModified`.

The posts themselves are genuinely good: original, honest, non-promotional, and pitched at
real patient questions. Content isn't the weak link — attribution is.

### 3.12 Launch blockers

- `clinic.website` is still marked `⟦PLACEHOLDER⟧ confirm live domain before launch`.
  **Every canonical URL, the entire sitemap, all OG metadata, and all structured data derive
  from this value.** If it's wrong at launch, the whole SEO layer points somewhere wrong.
- No Google Search Console verification is present anywhere in the repo. Without it there's
  no visibility into indexing, crawl errors, or search performance.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `BOOKING_WEBHOOK_URL` both need to be set in the
  hosting environment — the site runs without them, silently, which is exactly why they're
  easy to forget.

---

## 4. Clarity and ease of understanding

### 4.1 The hero answers "what" before "who, where, when"

The hero leads with "Implants, Cosmetic & Family Dentistry — All Under One Roof", a rating
badge, and "17+ years caring for families in Kadarenahalli". Missing above the fold: the
address, whether the clinic is open right now, and any sense of location beyond a
neighbourhood name.

A `ClinicOpenStatus` component already exists and works — it's used only in the footer. "Open
now, closes 8pm" beside the hero CTA answers the most urgent question a visitor has, using
code that's already written.

### 4.2 25 treatments presented flat

The treatments page opens with "25 treatments across 8 categories", which is impressive but
not navigable. There's no "most requested" grouping and no clear entry point for someone who
doesn't know the name of what they need. The category filter helps; a short "most patients
come to us for…" shortcut row would help more.

### 4.3 Mobile thumb zone is crowded

`components/AccessibilityWidget.tsx:39` floats at `bottom-32 right-5` on mobile, directly
above the 4-button sticky CTA bar. Two stacked floating layers over the content in the area
where the primary conversion action lives.

### 4.4 No "what a first visit is actually like"

The `AppointmentProcess` section covers the clinical sequence (Book → Consultation →
Diagnosis → Treatment → Follow-up), which is good. What's missing is the practical layer a
nervous first-timer wants: what it costs, how long they'll wait, whether parking exists, what
to bring. Some of this is in the FAQ; none of it is where a first-time visitor will look.

---

## 5. What's already working

Worth stating plainly, because these are real and shouldn't be lost in a later revision:

- **Honest-by-default content architecture.** Placeholders are marked, stock images are
  labelled, empty states are designed rather than faked, and `lib/site-data.ts` carries
  comments recording where each fact came from. This discipline is unusual and valuable.
- **Real, sourced, verbatim reviews** with attribution — not invented testimonials.
- **Solid per-treatment structured data** — `MedicalProcedure`, `FAQPage` and
  `BreadcrumbList` on all 25 pages, with a documented rationale for not duplicating the
  LocalBusiness node.
- **A working accessibility widget** (real font-size and reduced-motion controls, persisted),
  a skip link, `focus-ring` styling throughout, and ARIA on the interactive components.
- **Security headers** configured in `next.config.js`, and `poweredByHeader` disabled.
- **Genuinely useful blog content** — original, honest, and free of the AI-generated filler
  most clinic sites publish.
- **A booking API that fails gracefully** rather than silently dropping leads.
- **A privacy policy written in plain language** that accurately describes what the booking
  form actually does.

---

## 6. Asset list — to send Dr. Neha

Everything below is currently blocking a fix in this audit. Rough priority order.
**Received on 9 Aug 2026 and now live:** waiting lounge, reception and consultation room
photos; Dr. Shyama Pramod's headshot and credentials; confirmation on Dr. Madhu.

### Photography

- [ ] **Before/after cases — 6 to 10, with written patient consent.** Whitening, braces or
      aligners, veneers/crowns, smile design, implants. *Highest-value item on this list.*
- [ ] **Treatment rooms** — the one remaining stock image in the gallery. The photos received
      so far show the treatment room only through the glass partition.
- [ ] Sterilization area — this one does real work; patients care about it more than clinics
      expect, and the reception photo shows only the door
- [ ] Kids' corner
- [ ] Clinic exterior and signage — genuinely helps people find the door
- [ ] Team group photo
- [ ] Equipment: X-ray unit, laser, intraoral camera, autoclave — **with brand/model names**,
      which the Technology section can then name specifically instead of generically

### Doctors and team

- [ ] **Dr. Neha Kulsum:** full qualifications (BDS / MDS + specialty), Dental Council
      registration number, any fellowships or certifications (implantology, laser, aligners),
      and one additional photo. Also: please confirm whether "12+ years experience" or "17+
      years leading the clinic" is the figure to lead with — both currently appear.
- [ ] **Dr. Shyama Pramod:** years in practice, and **sign-off on her bio** — the two
      sentences currently on the site were drafted from her credential list alone, and are
      marked in the code as awaiting her approval. Her Dental Council registration number
      would also strengthen the card.
- [ ] **Dr. Tasneem and Dr. Asfia** — both are named in real patient reviews shown on the
      site. Please confirm whether either currently practises at the clinic.
- [ ] **Ms. Aira Fathima:** confirm her exact title, and whether a photo can be used.
- [ ] One review on the site names **Dr. Madhu**, who has now left. It's genuine and was true
      when written, so it stays for now — flag if you'd rather it came down.

### Commercial information

- [ ] **Price ranges (from–to) for the top 8 treatments**, plus the consultation fee
- [ ] EMI / instalment options, insurance or cashless arrangements, if any
- [ ] Whether same-day emergency slots are held, and how urgent cases should reach the clinic

### Confirmations

- [ ] **The live domain** — is `dentalnisaa.com` final? Every canonical URL and all structured
      data depend on it.
- [ ] **The exact current address** — the site data notes a possible relocation that was never
      confirmed. Also needed: latitude/longitude for the location schema.
- [ ] Confirm the clinic's listings should read consistently across Google, Practo and
      Justdial (they currently use different area names — Kadarenahalli vs Kumaraswamy Layout)

### Access

- [ ] Google Business Profile — admin or manager access
- [ ] Google Analytics 4 — property access, or approval to create one
- [ ] Google Search Console — verification access
- [ ] **Justdial review text** — 5 or 6 reviews, copy-pasted. Justdial blocks automated
      fetching, so this is the one platform whose quotes can't be collected without help. It's
      also the clinic's largest review base (579).

### Nice to have

- [ ] Awards, recognitions, dental camps, CSR work, media mentions
- [ ] Any professional association memberships (IDA etc.)

---

## 7. Prioritised actions

### P0 — before launch, or this week if already live

| # | Action | Where |
|---|---|---|
| 1 | Remove fabricated slot availability and the "backend not connected" line | `components/BookingWidget.tsx:58`, `:195` |
| 2 | Confirm the live domain — everything SEO depends on it | `lib/site-data.ts` `clinic.website` |
| 3 | ~~Fill in or remove the blank second doctor~~ — **done**, Dr. Madhu removed and Dr. Shyama Pramod added | `lib/site-data.ts` |
| 4 | Rewrite the 17 / 30 years phrasing so both facts are stated — **hero done**, About H1 and TrustStats still to do | `app/about/page.tsx:36`, `components/TrustStats.tsx:28`, `components/FinalCTA.tsx:10` |
| 5 | Add `/reviews` to the sitemap | `app/sitemap.ts:5` |
| 6 | Set the GA4 ID and verify Search Console | env + hosting |
| 7 | Add booking conversion tracking and a real confirmation URL | `components/BookingWidget.tsx` |

### P1 — next

| # | Action | Where |
|---|---|---|
| 8 | Add `sameAs`, `geo`, `hasMap`, `email`, `medicalSpecialty` to the Dentist schema | `app/layout.tsx:73` |
| 9 | Add `Review` markup on `/reviews`; reconsider sitewide `aggregateRating` | `app/reviews/`, `app/layout.tsx` |
| 10 | Expose primary nav links on desktop | `components/Header.tsx` |
| 11 | Add About / Reviews / Contact / Book to the footer | `components/Footer.tsx` |
| 12 | Add an emergency "in pain today?" module | homepage, `/contact`, `/booking` |
| 13 | Add a consent checkbox and privacy link to the booking form | `components/BookingWidget.tsx` |
| 14 | Add a honeypot and rate limiting to the booking endpoint | `app/api/book/route.ts` |
| 15 | Publish price ranges and a consultation fee | new section or `/treatments` |
| 16 | Add doctor credentials and a `Physician` schema node | `lib/site-data.ts`, `components/DoctorSpotlight.tsx` |
| 17 | Build the before/after gallery once consented photos arrive | `/gallery` |
| 18 | ~~Lead the homepage with 1,100+ reviews across three platforms, not 195~~ — **done** | `components/Hero.tsx` |

### P2 — then

| # | Action | Where |
|---|---|---|
| 19 | Migrate the six raw `<img>` tags to `next/image` | gallery, about, ClinicTourPreview, DoctorSpotlight, TreatmentMedia |
| 20 | Per-treatment OG images (WhatsApp sharing) | `app/treatments/[slug]/` |
| 21 | Add Kumaraswamy Layout / Dayananda Sagar College / 560070 to the copy | About, Contact, Treatments |
| 22 | Cross-link blog posts ↔ treatment pages | `app/blog/[slug]/`, `app/treatments/[slug]/` |
| 23 | Attribute blog posts to a named, credentialed author; add `dateModified` | `app/blog/[slug]/page.tsx` |
| 24 | Add "Not sure — I'd like a consultation" to the treatment picker | `components/BookingWidget.tsx` |
| 25 | Fix the sitemap's `lastModified` so it reflects real changes | `app/sitemap.ts` |
| 26 | Decide the `/book` wizard's fate — revive or delete | `next.config.js`, `app/book/`, `components/booking/` |
| 27 | ~~Surface `ClinicOpenStatus` in the hero~~ — **done**, via a `tone` prop so the footer is unchanged | `components/Hero.tsx` |
| 28 | Rename "Smile Gallery" to "Clinic Gallery" until real cases exist | `components/FullScreenMenu.tsx:13` |
| 29 | Move the accessibility widget clear of the mobile CTA bar | `components/AccessibilityWidget.tsx:39` |
| 30 | ~~Gate the "Representative photo" badge so real photos aren't labelled stock~~ — **done**, via `isStockImage()` | `components/TreatmentMedia.tsx`, `app/gallery/page.tsx` |

---

*Audited from source on branch `claude/website-seo-trust-audit-xv0bjt`. Production was not
reachable from the audit environment, so no live crawl, Lighthouse run, or indexation check
is included — those should be run against the live domain once it's confirmed.*
