import statsData from "@/data/kommune-stats.json";

export type KommuneStats = {
  pop: number | null;
  total: number;
  as: number;
  enk: number;
  nyreg: number;
  bygg: number;
  bil: number;
  handel: number;
  eiendom: number;
  fiskeri: number;
  landbruk: number;
  reiseliv: number;
  konsulent: number;
  transport: number;
  regnskap: number;
};

type StatsFile = {
  generatedAt: string;
  populationYear: string;
  national: KommuneStats & { pop: number };
  kommuner: Record<string, KommuneStats | null>;
};

const data = statsData as unknown as StatsFile;

export const national = data.national;
export const generatedAt = data.generatedAt;
export const populationYear = data.populationYear;

export function getStats(kommuneNr: string): KommuneStats | null {
  return data.kommuner[kommuneNr] ?? null;
}

/** Norsk tusenskilletegn (hardt mellomrom) */
export function tall(n: number | null | undefined): string {
  if (n === null || n === undefined) return "–";
  return n.toLocaleString("nb-NO").replace(/\s/g, " ");
}

export function prosent(andel: number): string {
  return `${(andel * 100).toLocaleString("nb-NO", { maximumFractionDigits: 1 })} %`;
}
