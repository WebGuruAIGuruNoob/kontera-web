import type { TjenesteContent } from "@/lib/content-types";
import { regnskapsforing } from "./regnskapsforing";
import { lonn } from "./lonn";
import { arsoppgjor } from "./arsoppgjor";
import { mva } from "./mva";
import { radgivning } from "./radgivning";
import { starteSelskap } from "./starte-selskap";

export const tjenester: TjenesteContent[] = [
  regnskapsforing,
  lonn,
  arsoppgjor,
  mva,
  radgivning,
  starteSelskap,
];

export function getTjeneste(slug: string): TjenesteContent | undefined {
  return tjenester.find((t) => t.slug === slug);
}
