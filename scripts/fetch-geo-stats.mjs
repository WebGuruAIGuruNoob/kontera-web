/**
 * Bygger data/kommune-stats.json: befolkning (SSB 07459) + live næringsdata
 * per kommune fra Brønnøysundregistrene (Enhetsregisteret, åpent API).
 * Datagrunnlaget for geo-sidenes unike, betingede innhold (MASTERPLAN §7).
 * Kjør: npm run geo:stats  (tar noen minutter — ~4300 API-kall mot Brreg)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const geo = JSON.parse(readFileSync(join(root, "data", "norge-geo.json"), "utf8"));

const alleKommuner = geo.fylker.flatMap((f) =>
  f.kommuner.map((k) => ({ nr: k.nr, navn: k.visningsnavn, fylke: f.slug }))
);
console.log(`Henter data for ${alleKommuner.length} kommuner …`);

/**
 * NACE-grupper etter SN2025 (ny standard i Enhetsregisteret fra 2025).
 * Verifisert mot Brreg 2026-08-21: bilbransjen ligger nå under 46.7x/47.8x/95.31
 * (gamle 45.x er utgått), regnskapsføring er 69.202.
 */
const NACE = {
  bygg: "41,42,43",
  bil: "46.71,46.72,47.81,47.82,95.31",
  handel: "46,47",
  eiendom: "68",
  fiskeri: "03",
  landbruk: "01",
  reiseliv: "55,56",
  konsulent: "62,70,71",
  transport: "49",
  regnskap: "69.202",
};

const BRREG = "https://data.brreg.no/enhetsregisteret/api/enheter";

async function fetchJsonRetry(url, opts = {}, attempts = 4) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, opts);
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
}

async function brregCount(params) {
  const url = `${BRREG}?${params}&size=1`;
  const data = await fetchJsonRetry(url, { headers: { Accept: "application/json" } });
  return data.page?.totalElements ?? 0;
}

/** Befolkning for alle kommuner i én SSB-spørring (json-stat2). */
async function fetchPopulation() {
  const values = alleKommuner.map((k) => k.nr);
  const body = {
    query: [
      { code: "Region", selection: { filter: "item", values } },
      { code: "Tid", selection: { filter: "top", values: ["1"] } },
    ],
    response: { format: "json-stat2" },
  };
  const data = await fetchJsonRetry("https://data.ssb.no/api/v0/no/table/07459/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const regionDim = data.dimension.Region;
  const index = regionDim.category.index;
  const pop = {};
  for (const [code, i] of Object.entries(index)) {
    pop[code] = data.value[i] ?? null;
  }
  const year = Object.keys(data.dimension.Tid.category.index)[0];
  console.log(`SSB-befolkning hentet (år ${year}) for ${Object.keys(pop).length} kommuner`);
  return { pop, year };
}

async function fetchKommune(kommune, cutoffDate) {
  const base = `kommunenummer=${kommune.nr}`;
  const [total, as, enk, nyreg] = await Promise.all([
    brregCount(base),
    brregCount(`${base}&organisasjonsform=AS`),
    brregCount(`${base}&organisasjonsform=ENK`),
    brregCount(`${base}&fraRegistreringsdatoEnhetsregisteret=${cutoffDate}`),
  ]);
  const naceEntries = await Promise.all(
    Object.entries(NACE).map(async ([key, codes]) => [
      key,
      await brregCount(`${base}&naeringskode=${codes}`),
    ])
  );
  return { total, as, enk, nyreg, ...Object.fromEntries(naceEntries) };
}

const { pop, year } = await fetchPopulation();

// 12 mnd tilbake fra i dag
const cutoff = new Date();
cutoff.setFullYear(cutoff.getFullYear() - 1);
const cutoffDate = cutoff.toISOString().slice(0, 10);

const kommuner = {};
const CONCURRENCY = 6;
let done = 0;
const queue = [...alleKommuner];

async function worker() {
  while (queue.length > 0) {
    const kommune = queue.shift();
    try {
      const stats = await fetchKommune(kommune, cutoffDate);
      kommuner[kommune.nr] = { pop: pop[kommune.nr] ?? null, ...stats };
    } catch (err) {
      console.error(`FEIL ${kommune.nr} ${kommune.navn}: ${err.message}`);
      kommuner[kommune.nr] = null;
    }
    done += 1;
    if (done % 25 === 0) console.log(`… ${done}/${alleKommuner.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const failed = Object.entries(kommuner).filter(([, v]) => v === null);
if (failed.length > 0) {
  console.error(`ADVARSEL: ${failed.length} kommuner feilet: ${failed.map(([k]) => k).join(", ")}`);
}

// Nasjonale summer → brukes til å beregne om en næring er over-/underrepresentert lokalt
const national = { pop: 0, total: 0, as: 0, enk: 0, nyreg: 0 };
for (const key of Object.keys(NACE)) national[key] = 0;
for (const stats of Object.values(kommuner)) {
  if (!stats) continue;
  for (const [key, value] of Object.entries(stats)) {
    if (typeof value === "number") national[key] = (national[key] ?? 0) + value;
  }
}

writeFileSync(
  join(root, "data", "kommune-stats.json"),
  JSON.stringify(
    { generatedAt: new Date().toISOString().slice(0, 10), populationYear: year, national, kommuner },
    null,
    1
  )
);
console.log(`\nFerdig: data/kommune-stats.json (${Object.keys(kommuner).length} kommuner, ${failed.length} feilet)`);
