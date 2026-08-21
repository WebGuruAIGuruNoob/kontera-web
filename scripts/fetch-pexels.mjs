/**
 * Laster ned kuraterte Pexels-bilder til public/images/pexels/
 * og skriver fotograf-kreditering til data/image-credits.json.
 * Nøkkel: PEXELS_API_KEY i .env.local. Kjør: npm run images:fetch
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
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

/**
 * Kuratert manifest (MASTERPLAN §10): motivkategorier med spesifikke søk.
 * Relevanskrav: nordisk/europeisk kontortone, ingen klisjé-spam.
 */
const MANIFEST = [
  { prefix: "kontor", query: "modern scandinavian office meeting daylight", count: 4 },
  { prefix: "samarbeid", query: "two people reviewing documents laptop office", count: 4 },
  { prefix: "radgivning", query: "business advisor meeting discussion table", count: 3 },
  { prefix: "tall", query: "accounting documents calculator desk", count: 4 },
  { prefix: "handverker", query: "carpenter working construction site", count: 4 },
  { prefix: "bygg", query: "construction workers building scandinavia", count: 2 },
  { prefix: "bilforhandler", query: "car dealership showroom cars", count: 4 },
  { prefix: "verksted", query: "car mechanic workshop", count: 2 },
  { prefix: "netthandel", query: "small business owner packing orders boxes", count: 4 },
  { prefix: "eiendom", query: "apartment buildings facade nordic", count: 4 },
  { prefix: "borettslag", query: "residential housing block courtyard scandinavia", count: 2 },
  { prefix: "konsulent", query: "freelancer working laptop bright office", count: 3 },
  { prefix: "norge-by", query: "oslo norway city", count: 3 },
  { prefix: "norge-fjord", query: "norway fjord village", count: 4 },
  { prefix: "norge-nord", query: "northern norway town winter", count: 3 },
  { prefix: "norge-kyst", query: "norwegian coast harbor boats", count: 3 },
];

const outDir = join(root, "public", "images", "pexels");
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const credits = [];

async function search(query, perPage) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&size=large`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status} for "${query}"`);
  return res.json();
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Nedlasting feilet ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return buf.length;
}

let total = 0;
for (const item of MANIFEST) {
  const data = await search(item.query, item.count + 2);
  let n = 0;
  for (const photo of data.photos) {
    if (n >= item.count) break;
    n += 1;
    const name = `${item.prefix}-${n}.jpg`;
    const dest = join(outDir, name);
    // large2x = ~1880px bred — god kvalitet, håndterbar størrelse
    const bytes = await download(photo.src.large2x ?? photo.src.large, dest);
    credits.push({
      file: `images/pexels/${name}`,
      pexelsId: photo.id,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      pexelsUrl: photo.url,
      alt: photo.alt || "",
      query: item.query,
    });
    total += 1;
    console.log(`✓ ${name} (${Math.round(bytes / 1024)} kB) — ${photo.photographer}`);
    await sleep(250);
  }
  await sleep(400);
}

writeFileSync(
  join(root, "data", "image-credits.json"),
  JSON.stringify(credits, null, 2)
);
console.log(`\nFerdig: ${total} bilder + data/image-credits.json`);
