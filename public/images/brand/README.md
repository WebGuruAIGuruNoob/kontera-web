# Kontera-logo

`kontera-logo.svg` er den oppdaterte logoen. Den viderefører KR-monogrammet og
ordlyden «Kontera Regnskap as» fra `konteralogo-e1607685331288.png`.

- Ekte vektor, med gjennomsiktig bakgrunn og transparent mellomrom mellom K og R.
- Samme sideforhold som originalen: `2000 × 1005`.
- Farger fra nettsidens designsystem: skoggrønn `#1c4f2d` og grønn `#3e7d50`.
- Hanken Grotesk Semibold med justert bokstavavstand, konvertert til vektorbaner.
  SVG-en krever ingen skrifttyper, eksterne ressurser eller innebygde rasterbilder.

Den gamle PNG-en beholdes som originalreferanse. Logoen kan hentes direkte fra
`/images/brand/kontera-logo.svg`.

Favicon- og Apple-ikonene i `app/` bruker bare KR-monogrammet. Regenerer dem
fra logoen med `node scripts/generate-favicons.mjs`. SVG-faviconet tilpasser
fargene til lyse og mørke nettleserfaner.

Skrifttypekilde: [Hanken Grotesk fra Google Fonts](https://github.com/google/fonts/tree/main/ofl/hankengrotesk),
utgitt under SIL Open Font License 1.1. Lisensen følger i `hanken-grotesk-OFL.txt`.
