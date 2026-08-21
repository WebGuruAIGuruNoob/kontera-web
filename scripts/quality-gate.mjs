/**
 * Kvalitetsport for geo-sidene (MASTERPLAN §7.5).
 * Kjøres ETTER `npm run build`: analyserer prerendret HTML i .next og sjekker
 *  - ordantall per kommuneside (krav: ≥1500)
 *  - at lokale data faktisk er til stede (stat-kort)
 *  - at hver side har fagblokker og FAQ
 * Feiler (exit 1) hvis en side bryter kravene.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const geoDir = join(root, ".next", "server", "app", "regnskapsforer");

if (!existsSync(geoDir)) {
  console.error("Fant ikke .next-output. Kjør `npm run build` først.");
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* htmlFiles(full);
    else if (entry.endsWith(".html")) yield full;
  }
}

function wordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(" ").filter(Boolean).length;
}

const KRAV_ORD = 1500;
const resultater = [];
for (const file of htmlFiles(geoDir)) {
  const html = readFileSync(file, "utf8");
  const rel = file.slice(geoDir.length + 1).replace(/\\/g, "/").replace(".html", "");
  const erKommune = rel.split("/").length === 2;
  resultater.push({
    side: rel || "(hub)",
    erKommune,
    ord: wordCount(html),
    harStatKort: html.includes("Registrerte virksomheter"),
    harFaq: html.includes("Spørsmål og svar"),
    harKilde: html.includes("Brønnøysundregistrene"),
  });
}

const kommuner = resultater.filter((r) => r.erKommune);
const brudd = kommuner.filter(
  (r) => r.ord < KRAV_ORD || !r.harStatKort || !r.harFaq || !r.harKilde
);

const ordListe = kommuner.map((r) => r.ord).sort((a, b) => a - b);
const snitt = Math.round(ordListe.reduce((s, o) => s + o, 0) / ordListe.length);
console.log(`Kommunesider analysert: ${kommuner.length}`);
console.log(`Ord per side: min ${ordListe[0]}, median ${ordListe[Math.floor(ordListe.length / 2)]}, snitt ${snitt}, maks ${ordListe[ordListe.length - 1]}`);
console.log(`Fylkessider/hub analysert: ${resultater.length - kommuner.length}`);

if (brudd.length > 0) {
  console.error(`\n❌ ${brudd.length} sider bryter kvalitetsporten:`);
  for (const b of brudd.slice(0, 20)) {
    console.error(
      `  ${b.side}: ${b.ord} ord${b.harStatKort ? "" : ", mangler statkort"}${b.harFaq ? "" : ", mangler FAQ"}${b.harKilde ? "" : ", mangler kildehenvisning"}`
    );
  }
  process.exit(1);
}
console.log(`\n✓ Alle ${kommuner.length} kommunesider består kvalitetsporten (≥${KRAV_ORD} ord + data + FAQ + kilder)`);
