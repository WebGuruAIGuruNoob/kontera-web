import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Reuse the vector monogram, excluding the wordmark below it.
const source = await readFile(new URL('../public/images/brand/kontera-logo.svg', import.meta.url), 'utf8');
const defs = source.match(/<defs>[\s\S]*?<\/defs>/)?.[0];
const paths = [...(source.split('</defs>')[1] ?? '').matchAll(/<path\b[^>]*\/>/g)].map(match => match[0]);
if (!defs || paths.length !== 3) throw new Error('Expected a KR monogram and one outlined wordmark in kontera-logo.svg');
const monogram = paths.slice(0, 2).map((path, index) => path.replace('<path ', `<path class="kr-${index === 0 ? 'r' : 'k'}" `)).join('\n  ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="472 -190 1196 1196" role="img" aria-labelledby="kr-title">
  <title id="kr-title">KR</title>
  <style>@media (prefers-color-scheme: dark) { .kr-k { fill: #f5f8f5; } .kr-r { fill: #8fbf9f; } }</style>
  ${defs}
  ${monogram}
</svg>
`;
const app = new URL('../app/', import.meta.url);
// Next 15 discovers one format per basename; numbering exposes SVG beside icon.png.
await writeFile(new URL('icon1.svg', app), svg);
await sharp(Buffer.from(svg)).resize(192, 192).png().toFile(fileURLToPath(new URL('icon.png', app)));
await sharp(Buffer.from(svg)).resize(180, 180).flatten({ background: '#f5f8f5' }).png().toFile(fileURLToPath(new URL('apple-icon.png', app)));

// ICO directory with PNG entries for the browser's native 16/32/48 px sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
for (const [index, png] of images.entries()) {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
}
await writeFile(new URL('favicon.ico', app), Buffer.concat([header, ...images]));
console.log('Generated KR-only SVG, ICO (16/32/48), PNG (192) and Apple icon (180).');
