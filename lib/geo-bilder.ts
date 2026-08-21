/** Kuratert, roterende bildesett for geo-sider (MASTERPLAN §10). */

const fylkeBilder: Record<string, string[]> = {
  oslo: ["norge-by-1", "norge-by-2", "norge-by-3"],
  akershus: ["norge-by-2", "norge-by-3", "kontor-3"],
  ostfold: ["norge-kyst-1", "norge-by-3", "norge-fjord-1"],
  buskerud: ["norge-fjord-1", "norge-fjord-2", "norge-by-1"],
  innlandet: ["norge-fjord-2", "norge-fjord-3", "norge-fjord-4"],
  vestfold: ["norge-kyst-2", "norge-kyst-1", "norge-by-2"],
  telemark: ["norge-fjord-3", "norge-kyst-2", "norge-fjord-1"],
  agder: ["norge-kyst-3", "norge-kyst-1", "norge-fjord-2"],
  rogaland: ["norge-fjord-4", "norge-kyst-3", "norge-fjord-1"],
  vestland: ["norge-fjord-1", "norge-fjord-4", "norge-kyst-2"],
  "more-og-romsdal": ["norge-fjord-2", "norge-kyst-3", "norge-fjord-4"],
  trondelag: ["norge-by-3", "norge-fjord-3", "norge-kyst-1"],
  nordland: ["norge-nord-1", "norge-kyst-2", "norge-nord-3"],
  troms: ["norge-nord-2", "norge-nord-1", "norge-nord-3"],
  finnmark: ["norge-nord-3", "norge-nord-2", "norge-kyst-3"],
};

function seededIndex(seed: string, length: number): number {
  let hash = 7;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) % 100003;
  return hash % length;
}

export function fylkeBilde(fylkeSlug: string): string {
  const set = fylkeBilder[fylkeSlug] ?? ["norge-fjord-1"];
  return `/images/pexels/${set[0]}.jpg`;
}

export function kommuneBilde(fylkeSlug: string, kommuneNr: string): string {
  const set = fylkeBilder[fylkeSlug] ?? ["norge-fjord-1"];
  return `/images/pexels/${set[seededIndex(kommuneNr, set.length)]}.jpg`;
}
