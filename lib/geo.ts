import geoData from "@/data/norge-geo.json";

export type Kommune = {
  nr: string;
  navn: string;
  slug: string;
  visningsnavn: string;
};

export type Fylke = {
  nr: string;
  navn: string;
  slug: string;
  visningsnavn: string;
  kommuner: Kommune[];
};

const data = geoData as { fylker: Fylke[] };

export const fylker: Fylke[] = data.fylker;

export function getFylke(slug: string): Fylke | undefined {
  return fylker.find((f) => f.slug === slug);
}

export function getKommune(
  fylkeSlug: string,
  kommuneSlug: string
): { fylke: Fylke; kommune: Kommune } | undefined {
  const fylke = getFylke(fylkeSlug);
  if (!fylke) return undefined;
  const kommune = fylke.kommuner.find((k) => k.slug === kommuneSlug);
  if (!kommune) return undefined;
  return { fylke, kommune };
}

/** Nabokommuner i samme fylke (alfabetisk vindu rundt kommunen) for intern lenking. */
export function naboKommuner(fylke: Fylke, kommune: Kommune, antall = 5): Kommune[] {
  const sorted = [...fylke.kommuner].sort((a, b) =>
    a.visningsnavn.localeCompare(b.visningsnavn, "nb")
  );
  const idx = sorted.findIndex((k) => k.nr === kommune.nr);
  const result: Kommune[] = [];
  for (let offset = 1; result.length < antall && offset < sorted.length; offset++) {
    const before = sorted[idx - offset];
    const after = sorted[idx + offset];
    if (after) result.push(after);
    if (before && result.length < antall) result.push(before);
  }
  return result;
}

export const alleKommuner: { fylke: Fylke; kommune: Kommune }[] = fylker.flatMap(
  (fylke) => fylke.kommuner.map((kommune) => ({ fylke, kommune }))
);
