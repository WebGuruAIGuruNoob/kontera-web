import { site } from "@/data/site";

/**
 * JSON-LD-byggere. Regler (fra MASTERPLAN §8):
 * - ÉN sannferdig org-node (AccountingService) for de ekte kontorene, referert med @id.
 * - Service + areaServed per geo-side. ALDRI LocalBusiness med fiktiv lokal adresse.
 * - Ingen aggregateRating/review i egen markup (Googles self-serving-regel).
 */

export const ORG_ID = `${site.url}/#organisasjon`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": ORG_ID,
    name: site.legalName,
    url: site.url,
    telephone: "+4796000400",
    email: site.email,
    vatID: `NO${site.orgNrPlain}MVA`,
    taxID: site.orgNrPlain,
    foundingDate: `${site.founded}`,
    numberOfEmployees: { "@type": "QuantitativeValue", value: site.employees },
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postalCode,
      addressLocality: o.city,
      addressCountry: "NO",
    })),
    areaServed: { "@type": "Country", name: "Norge" },
    knowsAbout: [
      "Regnskapsføring",
      "Lønnskjøring",
      "Årsoppgjør",
      "Skattemelding",
      "MVA-melding",
      "Selskapsetablering",
      "Regnskap for bilforhandlere",
    ],
    sameAs: [site.linkedin, site.proff],
    slogan: "Fast regnskapsfører som kjenner deg",
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed
      ? { "@type": "AdministrativeArea", name: opts.areaServed }
      : { "@type": "Country", name: "Norge" },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "nb-NO",
    author: {
      "@type": "Person",
      name: opts.authorName,
      ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
    },
    publisher: { "@id": ORG_ID },
  };
}
