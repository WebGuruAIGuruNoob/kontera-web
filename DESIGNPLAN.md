# DESIGNPLAN 2026 — Kontera.no

> Plan for å løfte designet fra «2014» til 2026, og gjøre alle 372 geo-landingssider
> (/regnskapsforer/[fylke]/[kommune]) til fullverdige, selgende landingssider på nivå
> med forsiden — som både rangerer og konverterer.
>
> Basert på research 2026-08-21: 2026-designspråk for B2B-tjenester, live teardowns av
> Randi/Fiken/Tripletex/Systima/Luca/Done/Mercury/Pennylane/Stripe/Digits/Linear/Bench,
> og CRO-evidens for lokale landingssider (2000-siders A/B-korpus 2025–26, skjema- og
> speed-to-lead-benchmarks). Supplerer [MASTERPLAN.md](MASTERPLAN.md) — alle harde regler
> derfra (ekthetsregel, lead-sikkerhet, aldri falsk lokal tilstedeværelse) gjelder uendret.

---

## 0. Sammendrag

| | |
|---|---|
| **Diagnose** | Dagens side er strukturelt riktig, men visuelt datert: foto-hero med gradient-overlay, uniforme 3-kolonners kortgrids med skygger, identisk seksjonsrytme overalt, 16px brødtekst — hver av disse er en dokumentert «2014-tell» |
| **Designretning** | Redaksjonell fintech-tillit (Mercury/Ramp-aksen, norsk oversatt à la Randi/Fiken): typografiledet, hairline-rammer i stedet for skygger, navy-veksling, ÉN bento, stor og tett display-typografi, rolig og dyr — aldri Stripe-klone eller AI-slop |
| **Typografi** | Ny paring: **Source Serif 4** (display) + **Schibsted Grotesk** (sans) — serif-display er premium-signaturen i norsk regnskap (Randi: GT Super, Fiken: william-bold). Fallback-alternativ: beholde Montserrat med 2× skala og tight tracking |
| **Farger** | Brandfargene BEHOLDES med ny disiplin: navy = mørke bånd/ink, blå = eneste knappfarge, azur = kun utheving, teal = duse flater. Ny grunn: papir-hvit `#FAFAF8`, navy-ink `#182530` |
| **Geo-sidene** | Split-hero med innebygd lead-kort (3 felt), proof-strip, komprimert lokalblokk som rådgivning, bransjesortert tjenestebento med lokalisert mikrocopy, CTA-rytme med 4–6 punkter mot ETT mål, sammenligningstabell, FAQ-accordion — full landingsside-paritet med forsiden |
| **Måltall** | Organisk trafikk konverterer median ~2,7 %; mål for geo-sidene: 2,5–4 % blended lead-rate (skjema + tel-klikk), toppkvartil 8 %+ krever hele stacken |
| **Omfang** | 6 faser (D0–D5), alt SSG som før, kvalitetsporten utvides med CTA- og lead-kort-krav. Leveres som vanlig: commit → GitHub → Vercel |

---

## 1. Ærlig diagnose: hva som daterer dagens design

Verifisert mot 2026-forskningens «era tells» — hvert punkt under finnes i dagens kodebase:

| # | 2014-tell i dagens kode | Hvor | 2026-dom |
|---|---|---|---|
| 1 | Fullbredde stockfoto-hero + mørk gradient + hvit H1 + CTA over bildet | `Hero.tsx` (alle sider) | «Det høyeste 2014-signalet som finnes.» Skal bort |
| 2 | Uniforme 3-kol. kortgrids, identiske avrundede rammer, små linjeikoner i fargede firkanter | `ServiceCards`, `IndustryCards`, `PromiseGrid`, `hvaInngar`-grids | Både 2014-Bootstrap OG #1 AI-slop-tell 2026. Skal bort i alle seksjoner |
| 3 | Eyebrow + H2 + grid gjentatt identisk per seksjon, samme bredde og luft | Alle sider | «Meta-klisjeen som gjør alt annet templatet» |
| 4 | `shadow-card`/`shadow-lift` som dybdemekanisme | `globals.css` + alle kort | 2026-konsensus: skygger = legacy; Linear/Vercel/Stripe har null skyggetokens. Erstattes med hairline-borders |
| 5 | 16px brødtekst, H1 ~36–48px | `globals.css`, `Hero.tsx` | 2026: 17–18px brødtekst, display 44→88px clamp med −0.03em tracking |
| 6 | Generiske Pexels-kontorfoto som bærende heroelement | Alle heroer | −11 % konvertering målt for stockfoto-hero; erstattes med typografi + data/grafiske elementer; foto beholdes kun rammet og tintet der de sier noe |
| 7 | Ingen bevegelse i det hele tatt | Hele siten | 2026 = stille motion: scroll-reveals, tellere, mikrofeedback (alltid `motion-safe:`) |
| 8 | Geo-sidene: CTA kun i hero-knapper + bunnskjema; midtsiden er ren lesing | Geo-malen | 50 %+ av scrollere ser aldri en CTA igjen; lead-kort i hero + inline-bannere mangler |

**Det som allerede er riktig og beholdes:** informasjonsarkitekturen, datamotoren (SSB/Brreg-unikhet), hub-and-spoke-lenkingen, schema-oppsettet, sticky ringelinje mobil, FAQ med details/summary (server-rendret = SEO-trygt), kvalitetsporten, alle harde regler.

---

## 2. Designsystem 2.0

### 2.1 Farger — samme merkevare, ny disiplin

Brandfargene beholdes (logo-kontinuitet), men får strenge roller («Randi-gul-prinsippet»: én aksent, resten ro):

```css
@theme {
  /* Grunn og tekst */
  --color-paper: #FAFAF8;        /* varm papir-hvit — erstatter ren #FFF */
  --color-surface: #FFFFFF;      /* kort på papir */
  --color-mist: #EEF4F8;         /* teal/blå-tintet sekundærflate (beholdes) */
  --color-ink: #182530;          /* nesten-svart med navy-bias — erstatter #26313A */
  --color-slate: #4E6373;        /* sekundærtekst, mørknet for 17px-kontrast */

  /* Brand — beholdt, rolledisiplinert */
  --color-navy: #084666;         /* mørke bånd, footer, display-tekst på lys grunn */
  --color-navy-deep: #062F45;    /* footer/mørkeste bånd */
  --color-blue: #0C71C3;         /* ENESTE knappfarge */
  --color-azure: #07A0E4;        /* KUN utheving: nøkkelord, lenke-hover, ikondetalj */
  --color-teal: #7EBEC5;         /* KUN duse tinter (10–15 %) og suksess-aksenter */

  /* Hairlines — erstatter alle skygger */
  --color-hairline: rgb(8 70 102 / 0.10);       /* på lys grunn */
  --color-hairline-dark: rgb(255 255 255 / 0.14); /* på navy bånd */
}
```

**Harde regler:** Aldri alle fire brandfarger i samme seksjon. Ingen lilla/indigo, ingen blå→lilla gradienter (2026s høyeste AI-tell). Maks ÉN subtil radial navy-tint (4–8 % opacity) bak forside-heroen — aldri animert. `backdrop-blur` kun på sticky header. Skygger fjernes helt (unntak: én myk ambient på åpen mobilmeny/dropdown).

### 2.2 Typografi — det største synlige løftet

**Anbefaling (primær): ny paring.** Serif-display + karakterfull grotesk er den dokumenterte premium-signaturen i norsk regnskap (Randi: GT Super + ABC Diatype; Fiken: serif-display + Basis Grotesque) og «trust-formelen» i 2026-fintech (Mercury):

- **Display: Source Serif 4** (Google Fonts) — saklig, redaksjonell, utmerket i store størrelser. Vekter 600/700.
- **Sans: Schibsted Grotesk** (Google Fonts) — karakterfull, moderne, bokstavelig talt nordisk. Vekter 400/500/700.
- Montserrat/Open Sans fases ut. (Fallback-alternativ hvis Henrik vil beholde dem: samme skala/tracking-oppskrift på Montserrat 800 — men Montserrat er i seg selv et 2015-signal.)

**Skala (tokens):**
```css
--text-display: clamp(2.75rem, 1.5rem + 4.5vw, 5.5rem);  /* H1: 44→88px, lh 1.02, ls -0.03em */
--text-h2: clamp(2rem, 1.25rem + 2.5vw, 3.25rem);         /* lh 1.08, ls -0.02em */
--text-h3: 1.375rem;
--text-body: 1.0625rem;                                     /* 17px, lh 1.65 */
```
- `tabular-nums` på ALLE tall (stat-bånd, pristabeller, kommune-data) — on-brand håndverk for et regnskapsbyrå.
- Kickers/eyebrows beholdes, men restylet: 11–12px uppercase, `tracking-[0.14em]`, **venstrestilt** med seksjonen — aldri sentrert over sentrert H2 overalt.
- Typografisk særpreg: uthev ett nøkkelord i display-headlines med azur eller serif-kursiv (Pennylane/Digits-grepet): «Regnskapet i orden. *Alltid.*»

### 2.3 Flater, radier, dybde

- **Hairline-borders i stedet for skygger** overalt: `border border-navy/10`. Kort-hover: border mørkner (`hover:border-navy/25`) + bakgrunn tinter ett steg + maks 2px translate. Aldri bounce, aldri glow.
- Radier: `rounded-xl` (12px) standard kort, `rounded-2xl`/`rounded-3xl` (16–24px) hero-rammer og bento-featureceller.
- **Mørke bånd:** 1–2 navy fullbredde-seksjoner per side (stat-bånd + final CTA/footer) som rytmebrudd — via wrapper-klasse, ikke global dark mode.
- Ett–to overlapp-grep per side (stat-kort som bryter grensen mellom mørkt bånd og lys seksjon) — ikke per seksjon.

### 2.4 Bilder

- **Foto-heroen dør.** Ingen fullbredde-foto med overlay noe sted.
- Foto beholdes kun der de sier noe (bransjesider, om-oss): rammet i `rounded-3xl`, konsistent navy-duotone/tint-behandling, ev. `mask-b-from-60%`-fade inn i seksjonsgrunnen (Tailwind v4.1). Hero-bilder <200 kB.
- Der foto ikke sier noe: **grafiske/data-elementer i stedet** — stilisert rapport-ramme med hairline-border, mini-graf som tegner seg ved scroll, tabular-nums stat-fliser. For et regnskapsbyrå er «vis tallene» det sterkeste bildespråket som finnes.
- Ekte teamfoto (når Henrik leverer) er investering #1 — navngitte mennesker med titler slår alt annet på tillit. Aldri AI-genererte mennesker, aldri stock som later som lokalt.

### 2.5 Bevegelse (stille, forklarende)

- **Scroll-reveals:** opacity 0→1 + translateY 14px→0, 450ms ease-out, én gang, stagger 60–80ms på søsken. Kun overskrifter/kort/stats — aldri brødtekst.
- **Tellere** på stat-båndene (~1,2s, `tabular-nums`, IntersectionObserver).
- **Graf-tegning** ved scroll der en graf finnes — «motion as explanation», det mest on-brand grepet vi har.
- Implementasjon: én ~15-linjers IntersectionObserver (dekker reveals + tellere, kryssbrowser) + CSS view-timeline som progressiv forbedring bak `supports-[animation-timeline:view()]`. **Alt bak `motion-safe:`** — basistilstand er alltid fullt synlig (aldri `opacity:0` i base — SEO/AI-crawler-hazard). Kun transform/opacity animeres.
- Budsjett: maks én animert ting i første viewport; du skal slutte å legge merke til bevegelsen på andre besøk.

### 2.6 Header og footer

- **Header:** slank (64–72px), glass (`bg-paper/80 backdrop-blur-md border-b border-navy/10`), logo venstre, 4–5 flate lenker, synlig telefonnummer + persistent primærknapp «Få tilbud». Mobilmeny: fullhøyde-skuff med stor typografi, CTA festet nederst (`starting:`-transition, CSS-only).
- **Footer:** mørk navy mega-footer med fire jobber (navigasjon/sitemap-kolonner, trygghet: autorisasjon + org.nr + systemer, compliance, kontakt) — og 2026-signaturen: **overdimensjonert KONTERA-wordmark over full bredde** nederst. Footeren skal aldri dø ut i lenker: navy CTA-seksjon med garanti-reprise ligger rett over.

---

## 3. Komponentbibliotek 2.0 (gammel → ny)

| Dagens | Blir | Beskrivelse |
|---|---|---|
| `Hero.tsx` (foto+overlay) | **`HeroSplit`** | Typografiledet split-hero på papir-grunn: venstre 7/12 — kicker, serif-display-H1 med azur-uthevet nøkkelord, subhead, trust-chips; høyre 5/12 — **`LeadCard`**. Ingen foto. Én subtil navy-radial-tint |
| — (ny) | **`LeadCard`** | Innrammet kort (`rounded-2xl`, hairline): overskrift med sted/utfall, **3 felt** (Firmanavn/borettslag · Telefon · E-post), knapp «Få uforpliktende tilbud», beroligelseslinje («Uforpliktende · Svar innen én arbeidsdag · Ingen bindingstid»), tel-lenke under. **Lead-sikkerhetsregelen består:** uten verifisert Resend rendres ring-oss-modus (stort nummer + e-post) i samme kort |
| `TrustBar` | **`ProofStrip`** | Stille linje rett under hero: kun SANNE tall og chips — «6 dedikerte ansatte · 2 statsautoriserte · Etablert 2015 · Autorisert regnskapsselskap». Google-rating legges til når GBP finnes (aldri før) |
| `ServiceCards` (3-kol.) | **`ServicesBento`** | 12-kol. bento med VARIERTE spans: én 2×2-featurecelle (på geo: mini-datavisualisering av kommunens næringsprofil; på forsiden: rapport-ramme), resten blanding 1×1/2×1. Hairlines, container queries (`@container`) så cellene styles etter cellebredde. Aldri seks like celler |
| `PromiseGrid` | **`PromiseSplit`** | Asymmetrisk 5/7-redaksjonell seksjon: løftene som nummerert liste med serif-titler — ikke fire like kort |
| Stat-kort (geo) | **`StatBand`** | Navy fullbredde-bånd: 4–6 store tabular-nums-tellere + kildelinje. Ett stat-kort overlapper båndkanten (overlapp-grepet) |
| `PricingTeaser` | **`PricingSection`** | Randi-modellen når priser er godkjent: «fastpris fra X kr/mnd» per segment (ENK / lite AS / AS med ansatte) + sjekkliste «alt dette er inkludert» + «det er ingenting annet som koster noe»-linje. Inntil godkjenning: prisdrivere + garantiene + CTA «Få din pris» (aldri oppdiktede tall) |
| — (ny) | **`CtaBanner`** | Inline énlinjes banner + knapp, anker-scroll til skjemaseksjonen. Brukes 2× midt på lange sider |
| — (ny) | **`ComparisonTable`** | «Kontera vs. mange byråer» (Randis smarteste grep, konverterer byttere): rader for korte spørsmål (inkludert vs. ofte fakturert), kontaktperson (fast + backup vs. varierende), svartid, binding. Formulert ærlig («mange»/«ofte» — aldri påstander om navngitte konkurrenter) |
| `ProcessSteps` | **`NumberedJourney`** | Nummerert reise 1→2→3 med `→`-motiv (Linear/Conta-grepet), byttehjelpen eksplisitt |
| `Faq` | Beholdes | details/summary er allerede riktig (server-rendret, SEO-trygt); restyles med hairlines. FAQPage-schema beholdes for AI-flater |
| `Arshjul` | Beholdes, restylet | Tidslinjefølelse i stedet for seks like kort |
| `StickyCallBar` | Justeres | To soner: «Ring» + **«Få tilbud» (visuelt primær)** — skjema er primærspor for en vurderingskjøpsbransje, mens tel alltid er ett trykk unna. 48–60px, aldri chat-widget |
| `Footer` | **`MegaFooter`** | Som §2.6 |

`→`-pilen innføres som gjennomgående retningsmotiv i alle lenker/CTA-er.

---

## 4. Geo-landingsside 2.0 — malen for alle 372 sider

Prinsipp fra evidensen: **konverteringsstien bor i skjerm 1–3; rangeringsdybden bor mellom CTA-punktene i skannbare moduler.** Regnskap er et vurderingskjøp (kunden sammenligner 2–3 byråer og ringer sjelden først) → lead-kort i hero er primær, telefon alltid synlig sekundær. ~500–700 ord synlig narrativ + resten som server-rendret progressive disclosure = fortsatt ≥1500 ord og doorway-trygt.

**Seksjonsrekkefølge (kommuneside):**

1. **HeroSplit m/ LeadCard.** H1-formel: tjeneste + sted + konkret løfte som varierer per side (aldri bare stedstoken): «Regnskapsfører i {kommune} — fast kontaktperson, ingen faktura for korte spørsmål» / bransjebetinget variant der data tilsier det («Regnskapsfører for {dominant bransje} i {kommune}») / statistisk variant («{antall} bedrifter i {kommune} — vi kjenner næringslivet ditt»). Subhead bærer ærlig SAB-posisjonering: «Heldigital regnskapsføring — like nær deg i {kommune} som et lokalt kontor.» Trust-chips: Autorisert regnskapsselskap · Fast kontaktperson + backup · Svar innen én arbeidsdag*. LeadCard-overskrift: «Få pristilbud for din bedrift i {kommune}»
2. **ProofStrip:** sanne tall (6 ansatte, 2 statsautoriserte, etablert 2015; «kunder i hele Norge» — fylkes-/kundetall og rating legges til når de finnes og er sanne)
3. **Lokal innsiktsblokk (komprimert):** dagens unike intro beholdes, men reframes fra statistikk-referat til rådgivning: «Av {antall} bedrifter i {kommune} er flest innen {bransje} — det betyr {konkret regnskapsimplikasjon}.» 2–4 datapunkter synlig; dette er både SEO-payload og relevansbevis
4. **StatBand (navy):** kommunens tall som tellere + kilde/dato — beholder dagens data, ny form
5. **ServicesBento med lokalisering:** bransjebetinget REKKEFØLGE (fiskerikommune → lønn/sesong først; byggkommune → prosjektregnskap først — datamotoren styrer) + én lokalisert setning per celle generert fra ekte variabler («{antall} byggebedrifter i {kommune} — vi kan prosjektregnskap og byggekort»). Featurecellen 2×2 = mini-visualisering av næringsprofilen. → **CtaBanner #1:** «Usikker på hva din bedrift i {kommune} trenger? Få en gratis gjennomgang →»
6. **Betingede fagblokker** (beholdes fra dagens motor — de er sidens fagverdi), restylet redaksjonelt (asymmetrisk, serif-titler)
7. **PricingSection** m/ lokaliserte eksempler når priser er godkjent → **CTA #2 (høyest intent):** «Få nøyaktig pris for din bedrift i {kommune} →»
8. **NumberedJourney:** digital onboarding → uforpliktende prat → vi ordner byttet. Gjør «ikke kontor her» om til produktet
9. **ComparisonTable** («Kontera vs. mange byråer»)
10. **Dekningsblokk:** «Vi hjelper bedrifter i hele {fylke}» + nabokommune-lenker + fylkeshub (ærlighet + intern lenking — tekstbasert, ALDRI kart-pin uten kontor)
11. **FAQ-accordion:** 8–12 spørsmål, 2–3 lokaliserte; longtail-dybden bor her (server-rendret i DOM — aldri lazy-loaded)
12. **Final konverteringsseksjon (navy):** fullt skjema (3 felt + valgfri melding), stort nummer, responstidsløfte — ankermålet for alle inline-CTA-er
13. **Mobil: StickyCallBar** («Få tilbud» primær + «Ring»)

*Responstidsløftet publiseres FØRST når Resend-varsling er verifisert og SLA-en kan holdes (speed-to-lead: svar <5 min = 21× kvalifisering; 78 % velger første som svarer — løftet og driften bygges sammen).

**Fylkessiden** får samme mal med fylkesaggregerte tall, kommunevelgeren som egen seksjon (beholdes — hub-funksjonen), og regionale fagblokker.

**CTA-doktrine:** ETT mål (få tilbud/kontakt) gjentatt 4–6 ganger i stedet for konkurrerende mål (+20–30 % målt); inline-bannere anker-scroller til bunnskjemaet; kun to fulle skjema-instanser (hero-kort + bunn). Ingen flytende chat-bobler (−3 %).

**Kvalitetsporten utvides** (`scripts/quality-gate.mjs`): dagens krav (≥1500 ord, data, FAQ, kilder) + nye sjekker: LeadCard til stede i hero · ≥4 CTA-punkter (`data-cta`-tellinger) · lokalisert tjenestesetning ≥3 celler · H1-løftevariasjon (ikke identisk promise-streng på alle 357).

---

## 5. Forside og øvrige sider

Forsiden bygges om med samme bibliotek (den er malen geo-sidene skal speile):

1. HeroSplit m/ LeadCard (H1-retning: «Regnskapet i orden. *Alltid.*» — serif, azur-uthevet) 2. ProofStrip 3. ProblemSolution (beholdes, restylet redaksjonelt) 4. ServicesBento 5. StatBand (sanne firmatall + «alle frister, i tide») 6. PromiseSplit (samarbeidsmodellen) 7. Bransjer (bento-variant, bilforhandlere som featurecelle) 8. NumberedJourney 9. PricingSection 10. ComparisonTable 11. Team-teaser (ekte folk når foto finnes) 12. FAQ 13. Final CTA (navy) + MegaFooter.

Tjeneste- og bransjesider: samme komponentutskifting (HeroSplit uten foto ELLER med rammet/tintet bransjefoto, bento for «hva inngår», CtaBanner-rytme, ComparisonTable på tjenestesidene). Blogg: restyling av artikkeltypografi til serif-display-overskrifter; CTA-boksene får LeadCard-lite.

---

## 6. Implementeringsfaser

| Fase | Innhold | Port |
|---|---|---|
| **D0 Tokens** | Nye fonter via `next/font`, fargetokens, typoskala, hairline/radius-tokens, motion-primitives (IO-hook + `motion-safe`-utilities), fjern skyggetokens | Build grønn; visuell røyk-test |
| **D1 Bibliotek** | HeroSplit, LeadCard, ProofStrip, ServicesBento, StatBand, PricingSection, CtaBanner, ComparisonTable, NumberedJourney, PromiseSplit, MegaFooter, StickyCallBar-justering, Header-glass | Komponentene rendrer i alle brukstilfeller |
| **D2 Kjerne** | Forside + tjenester + bransjer + priser/om-oss/kontakt/jobb/blogg på nytt bibliotek | Tekstlig + strukturell verifisering per side |
| **D3 Geo-mal 2.0** | Kommune- og fylkesmalen etter §4, lokalisert tjenestemikrocopy i datamotoren, H1-variasjonslogikk, utvidet kvalitetsport | `npm run qa:geo` grønn på alle 372 (≥1500 ord + nye CTA/LeadCard-krav) |
| **D4 Polish** | A11y-revisjon (fokus, kontrast på ny palett, reduced-motion), CWV (hero <200 kB, LCP <2,5 s), OG-bilder i ny identitet, korrektur | Lighthouse ≥95; ingen skygge-/Montserrat-rester |
| **D5 Leveranse** | Full build + qa → commit → push → GitHub → Vercel (staging er fortsatt noindexet — trygt å iterere live) | Alle deploys Ready |

Ingen innholdsmotor-omskriving nødvendig: datagrunnlaget (SSB/Brreg), fagblokkene, FAQ-byggeren og geo-dataene gjenbrukes — dette er en presentasjons- og konverteringsreform, ikke en innholdsreform.

---

## 7. Regler og risiko

| Risiko/regel | Håndtering |
|---|---|
| **Ekthetsregelen (absolutt, uendret)** | ProofStrip/StatBand bruker KUN sanne tall (6 ansatte, 2 statsautoriserte, 2015, Brreg/SSB-data). Google-rating, kundetall per fylke og sitater legges til først når de eksisterer. ComparisonTable formuleres om «mange byråer», aldri om navngitte konkurrenter |
| **Lead-sikkerhet (uendret)** | LeadCard har ring-modus til Resend er verifisert; responstidsløfter publiseres først når SLA kan holdes |
| **Ingen falsk lokal tilstedeværelse (uendret)** | Ingen kart-pins, ingen «vårt kontor i {by}»; SAB-ærlighet er selve salgsargumentet (NumberedJourney) |
| Doorway-vern | Synlig unik tekst består (~500–700 ord synlig + accordion-dybde server-rendret i DOM); kvalitetsporten skjerpes, ikke svekkes |
| AI-slop/klisjé-vern | Hard AVOID-liste håndheves: ingen lilla/gradient-hero, ingen glass overalt, ingen emoji-ikoner, ingen bounce, ingen seks like bento-celler, ingen karuseller |
| Ytelse | Kun transform/opacity-animasjon, ingen tunge libs (ingen Framer Motion — IO + CSS holder), bilder <200 kB, `motion-safe` overalt |
| Merkevarerisiko ved fontbytte | Logoen (ordbildet) beholdes uendret i header/footer — fontbyttet gjelder sidetypografi. Fallback-alternativ (beholde Montserrat med ny skala) er definert hvis Henrik foretrekker det |

---

## 7b. Vedtatte presiseringer etter adversariell kritikk (gjelder foran §1–§7 ved motstrid)

1. **CTA-modus følger lead-sikkerheten:** Så lenge skjemalevering ikke er verifisert (`RESEND_API_KEY` mangler), er RING primærhandling i ALLE CTA-flater (LeadCard i ring-modus, CtaBanner/sticky/final med tel: primært). Når levering er verifisert, snus hierarkiet til skjema-primær («Få tilbud») — dette er en vedtatt justering av MASTERPLAN §9.1, begrunnet i at regnskap er et vurderingskjøp.
2. **H1-varianter inneholder alltid «Regnskapsfører i {sted}»** — den statistiske varianten flyttes til subhead.
3. **Ordgulvet sikres med unikt innhold, ikke fellesmoduler:** Arshjul og samarbeidsmodellen (PromiseSplit) BEHOLDES på geo-sidene; intro beholder tre avsnitt; lokaliserte tjenestesetninger (data-parameterisert per kommune) legges TIL. Kvalitetsporten måler i tillegg ord innenfor `data-unique`-regioner (krav ≥350) og `data-cta` ≥4 og `data-local-service` ≥3 og «Regnskapsfører i» i H1.
4. **Responstidsløfter** («Svar innen én arbeidsdag») rendres KUN i skjema-modus (samme port som CTA-modus) — gjelder chips, LeadCard-mikrocopy og ComparisonTable-raden.
5. **Skjemafelt-kontrast unntas hairline-regelen** (inputs ≥3:1, WCAG 1.4.11); skygge-unntaket for mobilmeny/dropdown består i D4-porten.
6. **Fontbeslutning:** Source Serif 4 + Schibsted Grotesk utføres nå (Henrik ba om full utførelse); logo-PNG-en beholdes uendret. Footer-wordmark settes som dekorativt lavopasitets-element (8–10 %) så det ikke konkurrerer med logoen.
7. **Ett tilbud i alle CTA-er:** «uforpliktende tilbud/prat»-familien — «gratis gjennomgang» og «nøyaktig pris» utgår.
8. **LeadCard = 3 felt uten meldingsfelt** (bevisst avvik fra briefen i hero-kortet; meldingsfeltet består i bunnskjemaet). Begge skjemainstanser deler API og får unike felt-id-er.
9. **Pexels-disposisjon:** geo-hero-rotasjonen (`lib/geo-bilder.ts`) utgår; foto beholdes rammet/tintet på bransje-/tjeneste-/om-oss-flater; script + kreditering beholdes.
10. **ComparisonTable** hedges («mange byråer», «varierer», «ofte») og inneholder aldri påstander om navngitte konkurrenter; «Autorisert regnskapsselskap»-chipen verifiseres mot Finanstilsynets virksomhetsregister før publisering på kontera.no (åpent punkt).
11. **Metadata:** description varieres per kommune med toppnærings-datapunkt; title-malen «Regnskapsfører i {sted} | Kontera Regnskap» består (lokasjonsvariasjon er tilstrekkelig i title).

## 8. Trenger fra Henrik (blokkerer ikke D0–D3)

1. **Font-retning:** OK å bytte til Source Serif 4 + Schibsted Grotesk? (Anbefalt — logoen påvirkes ikke. Alternativ: beholde Montserrat med ny skala)
2. **Priser:** fastpris-ankre per segment (ENK / lite AS / AS med ansatte) låser opp PricingSection og de lokaliserte priseksemplene — målbart konverteringsgrep (aktører uten pris er beviselig svakest i markedet)
3. **Google Business Profile + omtaler:** rating i hero er +6 % og 85 % av norske kunder sjekker omtaler — GBP for begge kontorer bør opprettes nå
4. **Teamfoto + navn/titler:** investering #1 for tillit på alle sider
5. **Responstids-SLA:** bekreft at «svar innen én arbeidsdag» (og ev. «vi ringer deg innen 2 timer i arbeidstiden») kan holdes når skjemaet aktiveres
