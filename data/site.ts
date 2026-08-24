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
      text: "Du får én fast kontaktperson som fører hele regnskapet ditt, og som kjenner bedriften og historikken i tallene.",
    },
    {
      title: "Alltid to som kjenner deg",
      text: "En fast stedfortreder kjenner også bedriften din, slik at du ikke står uten hjelp ved ferie eller sykdom.",
    },
    {
      title: "Korte spørsmål er inkludert",
      text: "Korte spørsmål og småavklaringer er inkludert i honoraret. Du kan ta kontakt om en kort avklaring uten at det utløser en faktura.",
    },
    {
      title: "Statsautoriserte regnskapsførere",
      text: "Autorisert regnskapsforetak under tilsyn av Finanstilsynet. Autorisasjonen kan verifiseres i Finanstilsynets virksomhetsregister.",
    },
  ],
} as const;

export type Office = (typeof site.offices)[number];
