/**
 * B1 (BILDEPLAN §6): Bygger den kuraterte bildebanken.
 * - Henter finalistbildene per Pexels-ID (/v1/photos/{id}, large2x)
 * - Sletter de 34 strøkne filene fra revisjonen
 * - Skriver data/bilde-manifest.json (sannhetskilden) og regenererer
 *   data/image-credits.json (beholdte + nye)
 * Kjør: node scripts/fetch-curated.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnv();
const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error("PEXELS_API_KEY mangler i .env.local");
  process.exit(1);
}

const kuratering = JSON.parse(
  readFileSync(join(root, "data", "bilde-kuratering.json"), "utf8")
);
const allePicks = [
  ...kuratering.arbeid.picks,
  ...kuratering.blogg.picks,
  ...kuratering.fylker.picks,
];
const pickById = new Map(allePicks.map((p) => [p.pexelsId, p]));

/**
 * Slot → finalist-ID + filnavn (fra BILDEPLAN §3).
 * Avvik fra shortlisten: blogg:starte-as bruker reserven 101808 (nøkkel i lås)
 * fordi finalisten 3643926 allerede bærer tjeneste:starte-selskap.
 */
const SLOTS = [
  { slot: "tjeneste:regnskapsforing", id: 8296974, fil: "tjeneste-regnskapsforing.jpg" },
  { slot: "tjeneste:lonn", id: 11773871, fil: "tjeneste-lonn.jpg" },
  { slot: "tjeneste:arsoppgjor", id: 6694481, fil: "tjeneste-arsoppgjor.jpg" },
  { slot: "tjeneste:mva", id: 7680681, fil: "tjeneste-mva.jpg" },
  { slot: "tjeneste:radgivning", id: 7433832, fil: "tjeneste-radgivning.jpg" },
  { slot: "tjeneste:starte-selskap", id: 3643926, fil: "tjeneste-starte-selskap.jpg" },
  { slot: "omoss:kaffe-og-notater", id: 5951549, fil: "omoss-1.jpg" },
  { slot: "omoss:hender-i-arbeid", id: 7255295, fil: "omoss-2.jpg" },
  { slot: "omoss:kontorlokale", id: 8436906, fil: "omoss-3.jpg" },
  { slot: "blogg:hva-koster-regnskapsforer", id: 33175673, fil: "blogg-hva-koster-regnskapsforer.jpg" },
  { slot: "blogg:bytte-regnskapsforer", id: 8371705, fil: "blogg-bytte-regnskapsforer.jpg" },
  { slot: "blogg:regnskapsforer-enkeltpersonforetak", id: 13005858, fil: "blogg-regnskapsforer-enkeltpersonforetak.jpg" },
  { slot: "blogg:fore-regnskap-selv-eller-regnskapsforer", id: 20061882, fil: "blogg-fore-regnskap-selv-eller-regnskapsforer.jpg" },
  { slot: "blogg:mva-frister", id: 9810172, fil: "blogg-mva-frister.jpg" },
  { slot: "blogg:starte-as-steg-for-steg", id: 101808, fil: "blogg-starte-as-steg-for-steg.jpg" },
  { slot: "blogg:hva-er-statsautorisert-regnskapsforer", id: 6358840, fil: "blogg-hva-er-statsautorisert-regnskapsforer.jpg" },
  { slot: "blogg:regnskap-bilforhandler-avansemoms", id: 97079, fil: "blogg-regnskap-bilforhandler-avansemoms.jpg" },
  { slot: "fylke:oslo", id: 18170373, fil: "fylke-oslo.jpg", caption: "Operahuset, Oslo" },
  { slot: "fylke:akershus", id: 14033714, fil: "fylke-akershus.jpg", caption: "Nes kirkeruiner ved Glomma, Akershus" },
  { slot: "fylke:ostfold", id: 32446688, fil: "fylke-ostfold.jpg", caption: "Kulturlandskap i Sarpsborg, Østfold" },
  { slot: "fylke:buskerud", id: 29584872, fil: "fylke-buskerud.jpg", caption: "Ypsilon-brua over Drammenselva, Buskerud" },
  { slot: "fylke:innlandet", id: 28208825, fil: "fylke-innlandet.jpg", caption: "Lillehammer ved Mjøsa, Innlandet" },
  { slot: "fylke:vestfold", id: 16829228, fil: "fylke-vestfold.jpg", caption: "Bryggen i Tønsberg, Vestfold" },
  { slot: "fylke:telemark", id: 34804243, fil: "fylke-telemark.jpg", caption: "Heddal stavkirke, Telemark" },
  { slot: "fylke:agder", id: 12745512, fil: "fylke-agder.jpg", caption: "Lindesnes fyr, Agder" },
  { slot: "fylke:rogaland", id: 25036885, fil: "fylke-rogaland.jpg", caption: "Vågen i Stavanger, Rogaland" },
  { slot: "fylke:vestland", id: 33583891, fil: "fylke-vestland.jpg", caption: "Bryggen i Bergen, Vestland" },
  { slot: "fylke:more-og-romsdal", id: 16481701, fil: "fylke-more-og-romsdal.jpg", caption: "Ålesund sett fra Aksla, Møre og Romsdal" },
  { slot: "fylke:trondelag", id: 36364328, fil: "fylke-trondelag.jpg", caption: "Bryggerekka langs Nidelva i Trondheim, Trøndelag" },
  { slot: "fylke:nordland", id: 38658942, fil: "fylke-nordland.jpg", caption: "Reine i Lofoten, Nordland" },
  { slot: "fylke:troms", id: 31113255, fil: "fylke-troms.jpg", caption: "Tromsøbrua, Troms" },
  { slot: "fylke:finnmark", id: 37968340, fil: "fylke-finnmark.jpg", caption: "Nordkapp-globusen, Finnmark" },
];

const outDir = join(root, "public", "images", "pexels");
mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPhoto(id) {
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: { Authorization: KEY },
  });
  if (!res.ok) throw new Error(`Pexels /photos/${id}: HTTP ${res.status}`);
  return res.json();
}

const manifest = [];
let hentet = 0;
for (const slot of SLOTS) {
  const pick = pickById.get(slot.id);
  const photo = await fetchPhoto(slot.id);
  const dest = join(outDir, slot.fil);
  const url = photo.src.large2x ?? photo.src.large;
  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Nedlasting ${slot.id}: HTTP ${imgRes.status}`);
  writeFileSync(dest, Buffer.from(await imgRes.arrayBuffer()));
  manifest.push({
    fil: `images/pexels/${slot.fil}`,
    pexelsId: slot.id,
    plassering: slot.slot,
    alt: pick?.altForslag ?? photo.alt ?? "",
    caption: slot.caption ?? null,
    fotograf: photo.photographer,
    fotografUrl: photo.photographer_url,
    pexelsUrl: photo.url,
    stedsbevis: pick?.stedVerifisert ?? null,
  });
  hentet += 1;
  console.log(`✓ ${slot.fil} (id ${slot.id}) — ${photo.photographer}`);
  await sleep(300);
}

/* Slett de strøkne filene fra revisjonen */
let slettet = 0;
for (const drop of kuratering.audit.drop) {
  const fil = join(outDir, basename(drop.file));
  if (existsSync(fil)) {
    unlinkSync(fil);
    slettet += 1;
  }
}

/* Regenerer kreditering: beholdte (fra gammel credits-fil) + nye */
const gammelCredits = JSON.parse(
  readFileSync(join(root, "data", "image-credits.json"), "utf8")
);
const keepFiler = new Set(kuratering.audit.keep.map((k) => basename(k.file)));
const beholdte = gammelCredits.filter((c) => keepFiler.has(basename(c.file)));
const nyeCredits = manifest.map((m) => ({
  file: m.fil,
  pexelsId: m.pexelsId,
  photographer: m.fotograf,
  photographerUrl: m.fotografUrl,
  pexelsUrl: m.pexelsUrl,
  alt: m.alt,
  query: `kuratert:${m.plassering}`,
}));
writeFileSync(
  join(root, "data", "image-credits.json"),
  JSON.stringify([...beholdte, ...nyeCredits], null, 2)
);

writeFileSync(
  join(root, "data", "bilde-manifest.json"),
  JSON.stringify({ generert: "2026-08-22", bilder: manifest }, null, 1)
);

console.log(`\nFerdig: ${hentet} nye bilder hentet, ${slettet} strøkne slettet.`);
console.log(`Manifest: data/bilde-manifest.json (${manifest.length} oppføringer)`);
console.log(`Kreditering: ${beholdte.length} beholdte + ${nyeCredits.length} nye`);
