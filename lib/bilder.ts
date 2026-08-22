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
export const bloggBilde = (slug: string) => bilde(`blogg:${slug}`);
export const fylkeBilde = (slug: string) => bilde(`fylke:${slug}`);
export const omossBilder = () =>
  manifest.bilder
    .filter((b) => b.plassering.startsWith("omoss:"))
    .map((b) => ({ src: `/${b.fil}`, alt: b.alt, caption: b.caption }));
