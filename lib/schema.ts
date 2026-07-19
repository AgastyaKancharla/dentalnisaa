// Schema.org JSON-LD builders for the treatments module.
//
// The site already emits a sitewide `Dentist` node (a MedicalBusiness /
// LocalBusiness subtype — see app/layout.tsx `DentistSchema`) with the
// clinic's full NAP (name, address, phone) and aggregate rating. Rather
// than duplicating that entire LocalBusiness block on all 25+ treatment
// pages — which reads as keyword-stuffed duplicate structured data to
// search engines — each treatment page's `MedicalProcedure.provider`
// references the same Dentist entity with its full address and phone,
// giving crawlers the MedicalBusiness context without repeating a
// redundant top-level LocalBusiness node on every URL.

import type { Treatment } from "./site-data";
import { clinic } from "./site-data";

function providerRef() {
  return {
    "@type": "Dentist",
    name: clinic.name,
    telephone: clinic.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.line1,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560070",
      addressCountry: "IN",
    },
  };
}

export function buildMedicalProcedureSchema(treatment: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.overview,
    procedureType: treatment.category,
    howPerformed: treatment.process.map((step) => step.title).join(" → "),
    preparation: treatment.forWhom.join("; "),
    followup: treatment.recovery,
    provider: providerRef(),
  };
}

export function buildFaqSchema(treatment: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: treatment.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildBreadcrumbSchema(treatment: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: clinic.website },
      { "@type": "ListItem", position: 2, name: "Treatments", item: `${clinic.website}/treatments` },
      {
        "@type": "ListItem",
        position: 3,
        name: treatment.name,
        item: `${clinic.website}/treatments/${treatment.id}`,
      },
    ],
  };
}

// Emitted once on /treatments itself so the whole catalog is legible as a
// single indexable collection, distinct from each item's own schema.
export function buildTreatmentsCollectionSchema(treatments: Treatment[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dental Treatments",
    about: {
      "@type": "MedicalBusiness",
      name: clinic.name,
      telephone: clinic.phone,
    },
    hasPart: treatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t.name,
      url: `${clinic.website}/treatments/${t.id}`,
    })),
  };
}
