/**
 * R12 (RYDDEPLAN): maskinell håndhevelse av ryddighetssystemet.
 * Modus 1: kilde-regex mot app/ + components/ (forbudte mønstre = 0 treff).
 * Modus 2: DOM-tellinger mot bygget HTML (flate- og elementbudsjett).
 * Kjøres etter `npm run build`. Bryter (exit 1) ved brudd.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let brudd = 0;
const feil = (msg) => {
  console.error(`  ❌ ${msg}`);
  brudd += 1;
};

/* ---------- Modus 1: kilde-regler ---------- */
const KILDE_REGLER = [
  { navn: "R2: py-14 (bruk luftskalaen section-y*)", re: /\bpy-14\b/ },
  { navn: "R4: max-w-5xl (kun 6xl/3xl/2xl)", re: /max-w-5xl/ },
  { navn: "R7: ad-hoc småstørrelser text-[0.6/0.7…] (tokenhjemmet er globals.css)", re: /text-\[0\.(6|7)/ },
  { navn: "R10: backdrop-forskyvning (before:translate)", re: /before:translate-[xy]-3/ },
  { navn: "R10: collage-stagger (translate-y-2/4 på FramedImage)", re: /className="translate-y-[24]"/ },
  { navn: "R-B: døde komponenter importeres", re: /sections\/(ProofStrip|PromiseSplit|GarantiBand|Arshjul|CtaBanner)/ },
];

function* tsxFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* tsxFiles(full);
    else if (/\.(tsx|ts|css)$/.test(entry)) yield full;
  }
}

console.log("Design-lint — modus 1: kilderegler");
for (const dir of ["app", "components"]) {
  for (const file of tsxFiles(join(root, dir))) {
    if (file.endsWith("globals.css")) continue; // tokenhjemmet (R7)
    const src = readFileSync(file, "utf8");
    for (const regel of KILDE_REGLER) {
      if (regel.re.test(src)) {
        feil(`${regel.navn} — ${file.slice(root.length + 1)}`);
      }
    }
  }
}

/* ---------- Modus 2: DOM-budsjetter på bygget HTML ---------- */
const SIDER = [
  ["forside", join(root, ".next", "server", "app", "index.html")],
  ["kommune (bærum)", join(root, ".next", "server", "app", "regnskapsforer", "akershus", "baerum.html")],
  ["fylke (vestland)", join(root, ".next", "server", "app", "regnskapsforer", "vestland.html")],
  ["tjeneste (lonn)", join(root, ".next", "server", "app", "tjenester", "lonn.html")],
  ["bransje (handverkere)", join(root, ".next", "server", "app", "bransjer", "handverkere.html")],
];

console.log("Design-lint — modus 2: DOM-budsjetter");
for (const [navn, fil] of SIDER) {
  if (!existsSync(fil)) {
    feil(`bygget HTML mangler for ${navn} — kjør npm run build først`);
    continue;
  }
  const html = readFileSync(fil, "utf8");

  // R3: maks 2 navy-flater før finalen (FinalCta/#kontakt er unntatt som sitefinale)
  const navySections = (html.match(/<section[^>]*class="[^"]*bg-navy[^"]*"/g) ?? []).length;
  const navyPaneler = (html.match(/class="[^"]*rounded-3xl bg-navy[^"]*"/g) ?? []).length;
  const navyEksFinale = navySections + navyPaneler - (html.includes('id="kontakt"') ? 1 : 0);
  if (navyEksFinale > 2) feil(`R3: ${navn} har ${navyEksFinale} navy-flater før finalen (maks 2)`);

  // R3: maks 3 mist-bånd (fullbredde section med bg-mist)
  const mist = (html.match(/<section[^>]*class="[^"]*bg-mist[^"]*"/g) ?? []).length;
  if (mist > 3) feil(`R3: ${navn} har ${mist} mist-bånd (maks 3)`);

  // R6: fotobudsjett per side. Forsiden har utvidet budsjett (Henriks 2030-ordre
  // 2026-08-24: «mer fargerik og flere bilder» — VisualBento); øvrige maler 4.
  const fotoBudsjett = navn === "forside" ? 7 : 4;
  const fotoAntall = (html.match(/images%2Fpexels|images\/pexels/g) ?? []).length;
  // next/image kan referere samme kilde i srcset — tell unike filnavn
  const unikeFoto = new Set(
    (html.match(/pexels(?:%2F|\/)([a-z0-9-]+\.jpg)/g) ?? []).map((m) => m.split(/%2F|\//).pop())
  ).size;
  if (unikeFoto > fotoBudsjett)
    feil(`R6: ${navn} har ${unikeFoto} unike foto (maks ${fotoBudsjett})`);

  // R9: CTA-stigen finnes (leadcard + minst én av pris/final)
  if (!html.includes("data-lead-card")) feil(`R9: ${navn} mangler lead-kort`);
  if (!/data-cta="(pris|final)-/.test(html)) feil(`R9: ${navn} mangler pris-/final-CTA`);
}

if (brudd > 0) {
  console.error(`\n❌ Design-lint: ${brudd} brudd`);
  process.exit(1);
}
console.log("\n✓ Design-lint: alle regler overholdt");
