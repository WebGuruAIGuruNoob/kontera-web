/**
 * Innholdskontrakter for tjeneste- og bransjesider.
 * Én fil per tjeneste/bransje i content/tjenester/ og content/bransjer/,
 * samlet i hver mappes index.ts. Malen i app/(marketing)/tjenester/[slug]
 * og /bransjer/[slug] rendrer disse feltene i fast CRO-rekkefølge.
 */

export type FaqItem = {
  q: string;
  a: string;
  /** Markerer svar med side-unikt (datadrevet) innhold — telles av kvalitetsporten */
  unique?: boolean;
};

export type TjenesteContent = {
  slug: string;
  /** Kort navn til menyer, footer og kort-grids */
  navn: string;
  /** H1 på siden — utfallsorientert, under 10 ord */
  tittel: string;
  metaTitle: string;
  metaDescription: string;
  /** Subheadline under H1: 1–2 setninger, konkretiserer + risikoreduserer */
  heroUndertekst: string;
  /** 1 setning til kort-grids på forsiden */
  kortBeskrivelse: string;
  ikon: IkonNavn;
  /** «Passer for deg som …» — 3–5 punkter */
  passerFor: string[];
  /** Hva som inngår — 4–7 konkrete leveranser */
  hvaInngar: { tittel: string; tekst: string }[];
  /** Dype innholdsseksjoner (SEO): 3–5 seksjoner à 2–4 avsnitt */
  seksjoner: { tittel: string; avsnitt: string[] }[];
  faq: FaqItem[];
  /** Slugs til relaterte tjenester */
  relaterte: string[];
};

export type BransjeContent = {
  slug: string;
  navn: string;
  tittel: string;
  metaTitle: string;
  metaDescription: string;
  heroUndertekst: string;
  kortBeskrivelse: string;
  ikon: IkonNavn;
  /**
   * Bransjegruppen omtalt i løpende tekst, liten forbokstav og flertall
   * («bilforhandlere», «borettslag og sameier»). Malen bøyer ALDRI `navn`
   * selv — det ga ugrammatiske overskrifter som «din eiendombedrift».
   */
  omtale: string;
  /** Virksomheten i entall med eiendomsord: «bedriften din», «borettslaget ditt» */
  virksomhetsord: string;
  /** Bransjens typiske regnskapsutfordringer — 3–5 punkter i du-form, uten sitatform */
  smerter: string[];
  /** Bransjespesifikke regler/fallgruver — kjernen av sidens fagverdi */
  seksjoner: { tittel: string; avsnitt: string[] }[];
  /** Hva Kontera konkret gjør for bransjen — 4–6 leveranser */
  slikHjelperVi: { tittel: string; tekst: string }[];
  faq: FaqItem[];
  /** Slugs til mest relevante tjenester */
  relaterteTjenester: string[];
};

export type IkonNavn =
  | "bok"
  | "lonn"
  | "kalender"
  | "prosent"
  | "kompass"
  | "rakett"
  | "bil"
  | "hammer"
  | "bygg"
  | "handlekurv"
  | "blokk"
  | "koffert";
