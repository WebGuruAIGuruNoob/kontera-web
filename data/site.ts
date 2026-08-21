/**
 * ÉN SANNHETSKILDE for all firmainfo.
 * Alle sider, schema.org-data og footer henter herfra — aldri hardkod NAP-data i komponenter.
 * Verdier verifisert mot Brønnøysundregistrene 2026-08-21.
 */

export const site = {
  name: "Kontera Regnskap",
  legalName: "Kontera Regnskap AS",
  orgNr: "915 554 245",
  orgNrPlain: "915554245",
  founded: 2015,

  phoneDisplay: "960 00 400",
  phoneHref: "tel:+4796000400",
  email: "post@kontera.no",
  emailHref: "mailto:post@kontera.no",

  /** Settes til https://kontera.no i Vercel-env ved DNS-cutover */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kontera-web-marketin.vercel.app",

  employees: 6,
  statsautoriserte: 2,

  offices: [
    {
      id: "jar",
      label: "Jar (Bærum)",
      street: "Bjerkelundsveien 5",
      postalCode: "1358",
      city: "Jar",
      kommune: "Bærum",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bjerkelundsveien+5%2C+1358+Jar",
    },
    {
      id: "gjerdrum",
      label: "Ask (Gjerdrum)",
      street: "Askheim 1F",
      postalCode: "2022",
      city: "Gjerdrum",
      kommune: "Gjerdrum",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Askheim+1F%2C+2022+Gjerdrum",
    },
  ],

  linkedin: "https://www.linkedin.com/company/kontera-regnskap-as/",
  proff: "https://www.proff.no/selskap/kontera-regnskap-as/-/-/915554245",

  /** Kjerneløfter — brukes i trust-seksjoner over hele siden */
  promises: [
    {
      title: "Fast regnskapsfører",
      text: "Du får én fast kontaktperson som gjør hele regnskapet ditt — og som faktisk kjenner bedriften din.",
    },
    {
      title: "Alltid to som kjenner deg",
      text: "En fast backup blir også kjent med bedriften din, så du aldri står uten hjelp ved sykdom eller ferie.",
    },
    {
      title: "Ingen faktura for korte spørsmål",
      text: "Ring oss når du lurer på noe. Korte spørsmål og små avklaringer koster ingenting ekstra.",
    },
    {
      title: "Statsautoriserte regnskapsførere",
      text: "Autorisert regnskapsselskap under Finanstilsynet — du kan slå oss opp i virksomhetsregisteret.",
    },
  ],
} as const;

export type Office = (typeof site.offices)[number];
