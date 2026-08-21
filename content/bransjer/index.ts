import type { BransjeContent } from "@/lib/content-types";
import { bilforhandlere } from "./bilforhandlere";
import { handverkere } from "./handverkere";
import { eiendom } from "./eiendom";
import { netthandel } from "./netthandel";
import { borettslagSameier } from "./borettslag-sameier";
import { tjenesteytende } from "./tjenesteytende";

export const bransjer: BransjeContent[] = [
  bilforhandlere,
  handverkere,
  eiendom,
  netthandel,
  borettslagSameier,
  tjenesteytende,
];

export function getBransje(slug: string): BransjeContent | undefined {
  return bransjer.find((b) => b.slug === slug);
}
