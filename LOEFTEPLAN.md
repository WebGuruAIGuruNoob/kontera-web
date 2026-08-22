# LØFTEPLAN — fra 5/10 til 10/10

> Tre spor utført samlet (2026-08-22), på Henriks ordre om å forbedre hele siten på én
> gang: FLERE BILDER på alle landingssider (inkl. kommunesidene — overstyrer BILDEPLANs
> fotofrie valg), MER SELGENDE H1/H2 overalt, og BEDRE LAYOUT. Grunnlag: visuell
> bildekuratering (21 nye picks), full copy-revisjon (43 omskrivninger) og
> layoutkritikk (15 funn) — alt i [data/loeft-kuratering.json](data/loeft-kuratering.json).

## Spor 1 — Bilder på alle landingssider

| Flate | Grep |
|---|---|
| **Kommunesider (357)** | (a) **Fagblokk-bilder valgt av datamotoren** — samme logikk som teksten: byggkommune får byggeplass, landbrukskommune får låve, reiselivskommune får servering osv. (nye motiver: landbruk, reiseliv, transport, handel, oppstart, etablert, ENK + gjenbruk av bygg/bil/fiskeri/eiendom/konsulent fra banken); (b) **fylkeslandemerket** i dekningsblokken med ærlig bildetekst «{landemerke}» |
| **Fylkessider (15)** | Landemerke (har) + fagblokk-bilder i fagseksjonen |
| **Forside** | Hero-collage: tre kuraterte arbeidsbilder (nært/halvnært/miljø — navy-strikk, bilagsbunke, vindusarbeidsplass) + team-1 (har) |
| **Tjenestesider (6)** | Sekundærbilde per tjeneste (skjerm m/regneark, bankkort, signering, betalingsterminal, graf-whiteboard, keramikkatelier) i fagseksjonene |
| **Bransjesider (6)** | Har bilde + får GarantiBand og fagseksjons-layout |

16 nye bilder hentes per ID via `scripts/fetch-curated.mjs` (utvidet), alle visuelt
godkjent mot BILDEPLAN §1 (nordisk, anonymt, tint-tålende, ingen lesbar utenlandsk tekst).

## Spor 2 — Selgende overskrifter (43 omskrivninger)

Prinsipper: utfall + ÉN sann differensiator per overskrift (fast fører / backup / 0 kr
/ fristansvar); bare etterprøvbare tall; søkeord urørt der SEO krever (geo-H1 beholder
«Regnskapsfører i {sted}», tjeneste-/bransje-H1 åpner med navnet); maks 9 ord; varierte
formler (spørsmål, kontrastpar, kolon-løfte). Nøkkelendringer: forside-H1 →
«Regnskapet i orden. Spørsmål koster aldri ekstra.», ProblemSolution → «Tør du ringe
regnskapsføreren din?», StatBand → «Lite nok til å kjenne deg. Stort nok til alt.»,
6 nye geo-H1-varianter i poolen. Full liste i loeft-kuratering.json.

## Spor 3 — Layout (15 funn: 5 HØY, 7 MIDDELS, 3 LAV — alle utføres)

1. **Forankring:** LeadCard får mist-backdrop-forskyvning (overlapp-grepet §2.3 som manglet)
2. **Hero-skala:** compact-heroer får egen mindre display-clamp (geo-H1 brakk over 3 linjer)
3. **Fagblokker:** redaksjonell 4/8-split med serif-tittelkolonne + fagblokk-BILDE — bryter tekstsøylen
4. **Mørkehierarki:** StatBand → innfelt navy-panel med -mt-overlapp og featurevektet førstetall; FinalCta ett hakk lysere enn footer; footer får synlig hvit hairline
5. **Sticky-bar:** skjules når #kontakt-seksjonen er synlig (lå over send-knappen)
6. **GarantiBand (ny):** egne løfter som serif-pull-quote — det typografiske bruddet midtsiden manglet
7. **CtaBanner:** surface-variant (mist-på-mist-problemet) + py-8
8. **Dekningsblokk:** 5/7-split med fylkeslandemerke + nabokort MED virksomhetstall, flyttet før FAQ
9. **Kommunevelger (fylke):** to nivåer — topp-6-kort med tall + kompakt kolonneliste
10. **ComparisonTable:** max-w-5xl + mist-bånd
11. **Bento-celler:** ikonchip kun i featurecelle; småceller får inline-ikon + pil i tittelrad (fjerner 2014/AI-tellen); mobil degraderer småceller til hairline-rader (~40 % kortere geo-mobil)
12. **ProofStrip:** venstrestilt (doktrin §2.2), svakeste chips skjult på mobil

**Porter:** build grønn · kvalitetsport 357/357 (uendrede krav) · null tomme alt ·
mørke bånd ≤2 per side · leveres commit → GitHub → Vercel.
