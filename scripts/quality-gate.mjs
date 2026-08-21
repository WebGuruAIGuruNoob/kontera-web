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

/** Ord innenfor data-unique-regioner (sideunikt innhold — DESIGNPLAN §7b.3). */
function uniqueWordCount(html) {
  let sum = 0;
  // Matcher element med data-unique frem til lukketagg av SAMME type.
  // (data-unique-elementene nøster aldri samme taggtype i seg selv.)
  const re = /<(div|p|span|figcaption)\b[^>]*\bdata-unique\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) sum += wordCount(m[2]);
  return sum;
}

const KRAV_ORD = 1500;
const KRAV_UNIKE = 350;
const KRAV_CTA = 4;
const KRAV_LOKAL_TJENESTE = 3;
const resultater = [];
for (const file of htmlFiles(geoDir)) {
  const html = readFileSync(file, "utf8");
  const rel = file.slice(geoDir.length + 1).replace(/\\/g, "/").replace(".html", "");
  const erKommune = rel.split("/").length === 2;
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? [])[1] ?? "";
  resultater.push({
    side: rel || "(hub)",
    erKommune,
    ord: wordCount(html),
    unike: uniqueWordCount(html),
    cta: (html.match(/data-cta="/g) ?? []).length,
    lokalTjeneste: (html.match(/data-local-service/g) ?? []).length,
    harLeadCard: html.includes("data-lead-card"),
    h1Keyword: h1.replace(/<[^>]+>/g, "").includes("Regnskapsfører i"),
    harStatKort: html.includes("Registrerte virksomheter"),
    harFaq: html.includes("Spørsmål og svar"),
    harKilde: html.includes("Brønnøysundregistrene"),
  });
}

const kommuner = resultater.filter((r) => r.erKommune);
const brudd = kommuner.filter(
  (r) =>
    r.ord < KRAV_ORD ||
    r.unike < KRAV_UNIKE ||
    r.cta < KRAV_CTA ||
    r.lokalTjeneste < KRAV_LOKAL_TJENESTE ||
    !r.harLeadCard ||
    !r.h1Keyword ||
    !r.harStatKort ||
    !r.harFaq ||
    !r.harKilde
);

const ordListe = kommuner.map((r) => r.ord).sort((a, b) => a - b);
const unikListe = kommuner.map((r) => r.unike).sort((a, b) => a - b);
const ctaListe = kommuner.map((r) => r.cta).sort((a, b) => a - b);
const snitt = Math.round(ordListe.reduce((s, o) => s + o, 0) / ordListe.length);
console.log(`Kommunesider analysert: ${kommuner.length}`);
console.log(`Ord per side: min ${ordListe[0]}, median ${ordListe[Math.floor(ordListe.length / 2)]}, snitt ${snitt}, maks ${ordListe[ordListe.length - 1]}`);
console.log(`Unike ord (data-unique): min ${unikListe[0]}, median ${unikListe[Math.floor(unikListe.length / 2)]}`);
console.log(`CTA-punkter: min ${ctaListe[0]}, median ${ctaListe[Math.floor(ctaListe.length / 2)]}`);
console.log(`Fylkessider/hub analysert: ${resultater.length - kommuner.length}`);

if (brudd.length > 0) {
  console.error(`\n❌ ${brudd.length} sider bryter kvalitetsporten:`);
  for (const b of brudd.slice(0, 20)) {
    const feil = [
      b.ord < KRAV_ORD ? `${b.ord} ord` : null,
      b.unike < KRAV_UNIKE ? `${b.unike} unike ord` : null,
      b.cta < KRAV_CTA ? `${b.cta} CTA` : null,
      b.lokalTjeneste < KRAV_LOKAL_TJENESTE ? `${b.lokalTjeneste} lokale tjenestesetninger` : null,
      !b.harLeadCard ? "mangler lead-kort" : null,
      !b.h1Keyword ? "H1 mangler søkeord" : null,
      !b.harStatKort ? "mangler statkort" : null,
      !b.harFaq ? "mangler FAQ" : null,
      !b.harKilde ? "mangler kildehenvisning" : null,
    ].filter(Boolean);
    console.error(`  ${b.side}: ${feil.join(", ")}`);
  }
  process.exit(1);
}
console.log(
  `\n✓ Alle ${kommuner.length} kommunesider består kvalitetsporten (≥${KRAV_ORD} ord, ≥${KRAV_UNIKE} unike, ≥${KRAV_CTA} CTA, ≥${KRAV_LOKAL_TJENESTE} lokale tjenestesetninger, lead-kort, H1-søkeord, data, FAQ, kilder)`
);
