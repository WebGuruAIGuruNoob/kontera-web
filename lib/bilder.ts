import manifestData from "@/data/bilde-manifest.json";

/**
 * Oppslag i den kuraterte bildebanken (BILDEPLAN §5).
 * `data/bilde-manifest.json` er sannhetskilden — bygget av scripts/fetch-curated.mjs.
 */

export type BildeOppforing = {
  fil: string;
  pexelsId: number;
  plassering: string;
  alt: string;
  caption: string | null;
  fotograf: string;
  fotografUrl: string;
  pexelsUrl: string;
  stedsbevis: string | null;
};

const manifest = manifestData as { generert: string; bilder: BildeOppforing[] };

const byPlassering = new Map(manifest.bilder.map((b) => [b.plassering, b]));

export function bilde(plassering: string): { src: string; alt: string; caption: string | null } | null {
  const b = byPlassering.get(plassering);
  if (!b) return null;
  return { src: `/${b.fil}`, alt: b.alt, caption: b.caption };
}

export const tjenesteBilde = (slug: string) => bilde(`tjeneste:${slug}`);
export const tjeneste2Bilde = (slug: string) => bilde(`tjeneste2:${slug}`);
export const collageBilder = () =>
  ["collage:naert", "collage:halvnaert", "collage:miljo"]
    .map((p) => bilde(p))
    .filter((b): b is NonNullable<typeof b> => !!b);

/** Fallback-motiver fra den beholdte banken for fagblokker uten eget manifest-slot */
const fagblokkFallback: Record<string, { src: string; alt: string }> = {
  bygg: { src: "/images/pexels/bygg-1.jpg", alt: "Silhuett av råbygg under oppføring" },
  bil: { src: "/images/pexels/verksted-1.jpg", alt: "Mekaniker konsentrert i arbeid i bilverksted" },
  fiskeri: { src: "/images/pexels/norge-kyst-2.jpg", alt: "Fiskebåter i nordnorsk havn i lavt sollys" },
  eiendom: { src: "/images/pexels/borettslag-2.jpg", alt: "Bygårdskvartal sett oppover i kjølige blåtoner" },
  konsulent: { src: "/images/pexels/konsulent-2.jpg", alt: "Frilanser ved lys pult, sett bakfra" },
  as: { src: "/images/pexels/collage-2.jpg", alt: "Bunke med bilag og binders blas gjennom på et bord" },
};

/** Fagblokk-bilde valgt av samme datamotor som teksten (LØFTEPLAN spor 1) */
export function fagblokkBilde(blokkId: string): { src: string; alt: string } | null {
  const fraManifest = bilde(`fagblokk:${blokkId}`);
  if (fraManifest) return { src: fraManifest.src, alt: fraManifest.alt };
  return fagblokkFallback[blokkId] ?? null;
}
export const bloggBilde = (slug: string) => bilde(`blogg:${slug}`);
export const fylkeBilde = (slug: string) => bilde(`fylke:${slug}`);
export const omossBilder = () =>
  manifest.bilder
    .filter((b) => b.plassering.startsWith("omoss:"))
    .map((b) => ({ src: `/${b.fil}`, alt: b.alt, caption: b.caption }));
