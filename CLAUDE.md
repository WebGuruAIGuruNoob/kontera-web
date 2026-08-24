# Kontera.no — utvikler-/agentkonvensjoner

Nettsiden til Kontera Regnskap AS. Next.js (App Router, SSG) + Tailwind v4 + MDX.
**Les [MASTERPLAN.md](MASTERPLAN.md) først** — den er kanonisk for strategi, struktur og regler.

## Designsystem 3.0 — «Inkludert» (Henriks valg 2026-08-24, gjelder HELE siten)

Vinnerdesignet fra /forslag-runden (stil-DNA: Randi/Fiken/Testen/Drivly) er rullet ut globalt:

- **Palett:** skoggrønn `navy` #1C4F2D (mørk rolle), elgul `gul` #FFD505 (KUN signatur-CTA),
  grønntonede nøytraler (`paper` #F5F8F5, `ink` #1E2A20, `slate` #3C5243), pastellbånd
  `mist` #E4F2E4 / `cream` #FBF7EC / `varm` #FFFBEB. Token-NAVNENE fra 2.0 består
  (navy/blue/azure/teal) med nye verdier — IKKE innfør nye fargenavn eller rå hexer i maler.
- **Typografi:** Fraunces (display, `font-display`, semibold — ikke bold) + Hanken Grotesk
  (`font-sans`). Overskrifter i `text-navy`, deadpan-tosetningsstil («Alt du trenger.
  Ingenting du ikke trenger.»).
- **CTA:** `className="pille"` (elgul glød-pille, definert i globals.css) er ENESTE
  primærknapp; `pille-sm` i header. Sekundær = tekstlenke `font-semibold text-navy
  underline-offset-4 hover:underline`. Ring er primærhandling til Resend er verifisert.
- **Seksjonsrytme:** pastellbånd veksler mot papir (aldri to bånd rygg mot rygg), kort er
  `rounded-3xl` med myk grønn skygge + løft-hover, FAQ ligger på `varm`-bånd, og sidens
  ENESTE mørke flate er finalen (`FinalCta`, `.finale-mork` med gul glød) — pluss ev.
  StatBand-panelet på geo-sider.
- **Vakter:** `npm run qa:design` er omkalibrert (R3b: maks 5 pastellbånd/side; R6: maks
  4 foto/side). /forslag-sandkassen er SLETTET — unntaket i design-lint er fjernet.

## Arbeidsflyt (Henriks regel)

**«Push og commit» = commit → push til GitHub `main` → Vercel auto-deployer.**
Kjør alltid `npm run build` (og `npm run qa:geo` hvis geo-innhold er endret) før push.
Redirects fra gamle WordPress-stier ligger klare i `next.config.ts`.
DNS for kontera.no settes av Henrik helt til slutt; til da er Vercel-domenet staging/prod,
og `next.config.ts` + `app/robots.ts` holder *.vercel.app ute av Googles indeks automatisk
(styrt av `NEXT_PUBLIC_SITE_URL` — settes til `https://kontera.no` i Vercel ved cutover).

## Harde regler (fra MASTERPLAN §9/§13 — brytes ALDRI)

1. **Ekthetsregelen:** Aldri dikt opp kundesitater, cases, anmeldelser, ratings eller priser
   i kroner. Sitat-seksjoner er utelatt til Henrik leverer ekte, samtykkede sitater.
   Gjelder også *fingerte* replikker: smertepunkter skrives som beskrivelser i du-form,
   aldri i anførselstegn eller kursiv som kan leses som ekte kundesitat.
2. **Lead-sikkerhet:** Skjemaet viser aldri suksess uten fungerende e-postlevering.
   `ContactForm` får `enabled={!!process.env.RESEND_API_KEY}` — uten nøkkel rendres
   ring-oss-fallback. Når `RESEND_API_KEY` legges inn i Vercel: send TESTINNSENDING
   og bekreft mottak på post@kontera.no før løftet «vi svarer innen én arbeidsdag» står.
3. **Aldri LocalBusiness-schema** for kommuner uten kontor. Geo-sider bruker `Service`
   + `areaServed` (se `lib/schema.ts`).
4. **NAP-data hardkodes aldri** — alt hentes fra `data/site.ts`.
5. **Tonen: «Inkludert»-stemmen har forrang** (Henriks designvalg 2026-08-24 — han så og
   valgte D-prototypen med denne stemmen). Deadpan-tosetninger, folkelig ro, ærlighet som
   virkemiddel («Ærlig svar: det spørs», «Fristene? Glem dem.») ER vedtatt stil — også der
   [TONEPLAN.md](TONEPLAN.md) tidligere forbød retoriske spørsmål/forsterkere. TONEPLANs
   øvrige vedtak GJELDER FORTSATT: ingen omtale av konkurrenter, ingen absolutte løfter
   («aldri igjen», «vi ordner alt», «sømløs», «gratis», «alltid»), «stedfortreder» (ikke
   «backup»), «regnskapsfører» skrevet helt ut (aldri «fører»), «inkludert i honoraret»,
   og «autorisert regnskapsforetak» der autorisasjonen omtales — `regnskapsselskap` er
   terminologi fra opphevet lov.

## Vanlige oppgaver

- **Nytt blogginnlegg:** Ny fil `content/blogg/<slug>.mdx` med frontmatter
  (title, description, date, updated, author, tags). Ren markdown, ingen JSX.
  Eksterne lenker kun til skatteetaten.no/altinn.no/lovdata.no/finanstilsynet.no/brreg.no.
- **Ny tjeneste/bransje:** Ny fil i `content/tjenester/` eller `content/bransjer/`
  etter typene i `lib/content-types.ts` + registrer i mappens `index.ts`.
- **Geo-innhold:** Maler i `app/(marketing)/regnskapsforer/`, innholdsmotor i
  `lib/geo-content.ts`, godkjent blokk-katalog i `content/geo-blokker.ts`.
  Alt delt geo-innhold SKAL ligge i blokk-katalogen; alt annet skal være datadrevet unikt.
- **Oppdatere geodata:** `npm run geo:stats` (Brreg + SSB → `data/kommune-stats.json`).
  NB: Enhetsregisteret bruker SN2025-næringskoder (bil = 46.7x/47.8x/95.31, regnskap = 69.202).
- **Bilder:** Kuratert bank styrt av `data/bilde-manifest.json` (sannhetskilden) —
  bygget av `node scripts/fetch-curated.mjs` (henter per Pexels-ID). Oppslag i kode
  via `lib/bilder.ts`; ALT foto rendres gjennom `components/FramedImage.tsx`
  (ramme + navy-tint). Regler: BILDEPLAN.md — bilder må si noe, aldri fullbredde,
  kommunesidene er BEVISST fotofrie, og stockmennesker presenteres ALDRI som
  ansatte/kunder (Henriks beslutning 2026-08-22: ingen ekte teamfoto — anonym
  Pexels-varme brukes i stedet). `scripts/fetch-pexels.mjs` er kun for rå-søk.
- **Kvalitetsport:** `npm run qa:geo` etter build — feiler hvis en kommuneside har
  <1500 ord eller mangler statkort/FAQ/kildehenvisning.
- **Bransjesider:** bruk ALLTID `b.omtale` (flertall, løpende tekst: «eiendomsselskaper») og
  `b.virksomhetsord` («eiendomsselskapet ditt») i maler. Bøy aldri `b.navn` med
  strengmanipulasjon — det ga tidligere «din eiendombedrift» på fem av seks sider.

## Struktur (kort)

- `data/site.ts` — én sannhetskilde for firmainfo (Brreg-verifisert)
- `data/norge-geo.json` — 15 fylker/357 kommuner med slugs og `visningsnavn`
  (bruk ALLTID `visningsnavn` i H1/titles — offisielle navn kan være flerspråklige)
- `components/sections/` — gjenbrukbart seksjonsbibliotek (Hero, TrustBar, FinalCta …)
- `lib/schema.ts` — alle JSON-LD-byggere
- `data/legacy/` — HTML-arkiv av gamle kontera.no (redirect-grunnlag ved DNS-cutover)

## Åpne punkter som venter på Henrik

Se MASTERPLAN §14: Resend-nøkkel, teamnavn/-bilder, godkjente priser, kundesitater,
besøksadresse-bekreftelse, vektor-logo, LinkedIn-navnebytte, Google Business Profile.
