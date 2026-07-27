import type { Metadata } from "next";
import { clinic } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${clinic.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "July 28, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl md:text-2xl text-ink mb-3">{title}</h2>
      <div className="space-y-4 text-ink/75 leading-relaxed">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-porcelain">
      <div className="max-w-2xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <Reveal>
          <p className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl leading-tight text-ink">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-ink/50">Last updated {LAST_UPDATED}</p>

          <p className="mt-8 text-ink/75 leading-relaxed">
            This page explains what information {clinic.name} collects when
            you use this website or book an appointment with us, why we
            collect it, and how it's handled. We've tried to write it in
            plain language rather than dense legal text — if anything is
            unclear, contact us directly at{" "}
            <a href={`mailto:${clinic.email}`} className="text-gold-dark hover:underline">
              {clinic.email}
            </a>{" "}
            and we'll explain it.
          </p>

          <Section title="What we collect">
            <p>When you book an appointment through this site, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your name and phone number (required, so we can confirm your appointment)</li>
              <li>Your email address (optional, if you provide one)</li>
              <li>The treatment you're interested in, and your preferred day and time</li>
              <li>Any notes you choose to add for the clinic, which may include health-related information you volunteer (for example, an allergy or a medication)</li>
            </ul>
            <p>
              If you message us on WhatsApp or call the clinic directly,
              that conversation is subject to WhatsApp's or your phone
              carrier's own privacy practices, not this website's — we
              only control what happens with information submitted through
              the booking form on this site.
            </p>
            <p>
              We also use standard website analytics to understand how the
              site is used in aggregate — for example, which pages are
              visited and roughly how many people visit each month. This
              doesn't identify you personally. See "Cookies & analytics"
              below.
            </p>
          </Section>

          <Section title="How we use it">
            <p>We use the information you submit to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Schedule, confirm, and if needed reschedule your appointment</li>
              <li>Contact you about your visit by phone, SMS, or WhatsApp</li>
              <li>Prepare for your visit if you've shared relevant health notes in advance</li>
            </ul>
            <p>
              We do not sell your information to anyone, and we do not use
              it for advertising or marketing to third parties.
            </p>
          </Section>

          <Section title="Where it's stored">
            <p>
              Booking submissions are stored in a private Google Sheet
              accessible only to clinic staff — there is no public-facing
              database, and this information is not stored on the website
              itself beyond the moment your form is submitted.
            </p>
          </Section>

          <Section title="Cookies & analytics">
            <p>
              This site uses Google Analytics to understand overall traffic
              and page usage. Google Analytics uses cookies and collects
              information such as your approximate location (city-level),
              device type, and which pages you visit. This data is
              aggregated and is not used to identify you personally. You
              can opt out of Google Analytics tracking using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              , or by using your browser's private/incognito mode.
            </p>
          </Section>

          <Section title="Who we share information with">
            <p>
              We don't share your booking information with any third party
              except the services that make the site itself work: Google
              (for the private Sheet bookings are stored in, and for
              analytics), and Vercel, our website hosting provider, which
              processes standard technical logs (like IP addresses) as
              part of serving the site. Neither of these companies is
              authorized to use your data for their own purposes.
            </p>
          </Section>

          <Section title="Children's information">
            <p>
              We're a family dental clinic and see patients of all ages.
              When a booking is made for a child, we assume it's being
              submitted by a parent or guardian on the child's behalf.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us to tell you what information we hold about
              you, correct it, or delete it, at any time — just email{" "}
              <a href={`mailto:${clinic.email}`} className="text-gold-dark hover:underline">
                {clinic.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="text-gold-dark hover:underline">
                {clinic.phone}
              </a>
              . We'll respond within a reasonable time.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change how we handle information, we'll update this
              page and change the "last updated" date above. We'd
              encourage checking back occasionally, particularly if you're
              a returning patient.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              {clinic.name}, {clinic.address.line1}, {clinic.address.line2}
              <br />
              {clinic.email} · {clinic.phone}
            </p>
          </Section>

          <p className="mt-10 text-sm text-ink/40 italic">
            This policy describes our current practices in plain language
            and isn't a substitute for formal legal advice — if you have
            specific compliance requirements (for example, under India's
            Digital Personal Data Protection Act), we'd recommend having
            it reviewed by a lawyer familiar with healthcare data.
          </p>
        </Reveal>
      </div>
    </article>
  );
}
