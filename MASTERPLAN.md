# MASTERPLAN — Kontera.no

> Verdens beste nettside for et lite, personlig regnskapsbyrå: bygget for å konvertere besøkende til kunder (CRO), rangere #1 lokalt i hele Norge (SEO/GEO), og være teknisk perfekt (teknisk SEO, UI, UX, ytelse, tilgjengelighet).
>
> Basert på research utført 2026-08-21: fullstendig innholdsinventar av dagens kontera.no, verifisert geodata fra SSB, søkeords- og konkurrentanalyse av det norske regnskapsmarkedet, Googles gjeldende retningslinjer for programmatisk SEO (2024–2026), og CRO-beste praksis for norske tjenestebedrifter.

---

## 0. Sammendrag

| | |
|---|---|
| **Hva** | Komplett ny nettside for Kontera Regnskap AS: salgsoptimalisert hovedside, 6 tjenestesider, 6+ bransjesider, **15 fylkessider + 357 kommunesider** (alle ≥1500 ord, unike), kunnskapssenter/blogg (MDX), kontakt/om oss/priser/personvern |
| **Stack** | Next.js — siste stabile versjon (App Router, TypeScript, RSC, SSG) + Tailwind CSS v4 + MDX for blogg og agent-vennlig innholdsflyt |
| **Hosting** | GitHub → Vercel (Vercel-domene som staging/prod nå; DNS-bytte til kontera.no helt til slutt — Henrik ordner DNS) |
| **Hoved-CTA** | Ring 960 00 400 for en uforpliktende prat. Sekundær: kort skjema (firmanavn, e-post, telefon, kort melding) |
| **Differensiatorer** | Fast regnskapsfører + fast backup («alltid to som kjenner deg»), ingen faktura for korte spørsmål, statsautoriserte regnskapsførere, spisskompetanse bruktbil/bilbransjen (nesten ledig SEO-nisje!), håndverkere, eiendom, netthandel |
| **Arbeidsregel** | «Push og commit» = alltid GitHub først, deretter går endringene live til Vercel |

---

## 1. Mål og KPI-er

**Forretningsmål:** Flere kvalifiserte henvendelser (telefon + skjema) fra SMB-er, borettslag og sameier i hele Norge, med spesiell styrke i bilbransjen og nærområdene (Bærum/Asker/Oslo vest + Gjerdrum/Romerike).

**KPI-er (mål 6–12 mnd etter lansering):**
1. Konvertering: ≥3 % av besøk til tel-klikk eller skjemainnsending på landingssider
2. SEO: Topp 3 på «regnskapsfører + [kommuner nær kontorene]»; topp 10 på 100+ kommunesøk; #1 på «regnskap bilforhandler»-clusteret
3. Teknisk: Lighthouse ≥95 på alle kategorier, Core Web Vitals grønt (LCP <2,5 s, CLS <0,1, INP <200 ms)
4. Indeksering: ≥90 % av publiserte geo-sider indeksert i Google Search Console (overvåkes per fylkes-sitemap)

*Merk om ambisjonen «#1 i hvert område»: KPI-ene over er den realistiske trappa dit. SERP-ene for «regnskapsfører + by» er i dag 40–60 % kataloger/lead-gen + kjeder; #1 overalt er et flerårsmål som nås via denne strukturen + Google Business Profile + anmeldelser, ikke en garanti ved lansering. KPI-kalibreringen bør godkjennes av Henrik (§14).*

---

## 2. Nåsituasjon: funn fra dagens kontera.no

### 2.1 Fakta som skal videreføres (verifisert)

| Felt | Verdi |
|---|---|
| Firmanavn | Kontera Regnskap AS |
| Org.nr (fra Brønnøysundregistrene) | **915 554 245** (står IKKE på dagens side — skal i footer) |
| Telefon | **960 00 400** (dagens side har ingen `tel:`-lenker — skal fikses overalt) |
| E-post | post@kontera.no |
| Avdeling Jar (Bærum) | Bjerkelundsveien 5, 1358 Jar (Brreg-bekreftet; «Vollsveien 5»-varianten på dagens side er feil) |
| Avdeling Gjerdrum | Askheim 1F, 2022 Gjerdrum |
| Logo | `https://kontera.no/wp-content/uploads/2020/12/konteralogo-e1607685331288.png` (2000×1005 raster-PNG — lastes ned, optimaliseres til WebP/PNG-varianter i riktige størrelser; ekte SVG krever vektor-original fra Henrik, se §14) |
| Favicon | `https://kontera.no/wp-content/uploads/2020/12/cropped-konteralogo-e1607685331288-32x32.png` (+ 180/192/270-varianter — lastes ned og gjenbrukes) |
| Team (fra brief) | 6 ansatte, hvorav 2 statsautoriserte regnskapsførere |

### 2.2 Merkevarefarger og typografi (fra dagens side — videreføres og raffineres)

| Token | Hex | Bruk |
|---|---|---|
| `brand-navy` | `#084666` | Mørk marineblå — hero-bakgrunner, footer |
| `brand-azure` | `#07A0E4` | Lys asurblå — gradienter, aksenter |
| `brand-blue` | `#0C71C3` | CTA-knapper, ikoner, lenker |
| `brand-teal` | `#7EBEC5` | Dus teal — sekundære aksenter (logo-nær) |
| `ink` | `#353740` | Overskrifter |
| Fonter | | **Montserrat** (700, overskrifter) + **Open Sans** (brødtekst) via `next/font` — beholdes for merkevarekontinuitet |

Hero-signatur fra dagens side som moderniseres: `linear-gradient(170deg, rgba(7,160,228,.61), rgba(8,70,102,.8))` over foto.

### 2.3 Kritiske feil på dagens side som ny side MÅ rette

1. Gammelt firmanavn «Unnli Regnskap» står igjen i tjenestetekst; LinkedIn-lenke peker på `unnli-regnskap-as`
2. Tre ulike Jar-adresser i omløp + «2013 Skjetten» i mobilvisning → én normalisert sannhet overalt
3. Org.nummer mangler helt; ingen `tel:`/`mailto:`-lenker; ingen meta descriptions, OG-tags eller strukturert data
4. Ingen mennesker: null navn, bilder eller team — dødelig i en tillitsbransje
5. Tomme/tynne sider («Jobbe i Kontera» = bare tittel; «Moderne Regnskap» = én setning uten punktum)
6. Ingen priser, cases, FAQ, prosess eller blogg; mange skrivefeil; 5 H1-er på forsiden
7. Personvernerklæring er uredigert WordPress-boilerplate med tomme seksjoner — GDPR-risiko med kontaktskjema
8. «IT-støtte»-tjenesten fra gamle siden **tones ned** (nevnes ev. som tilleggshjelp) — brief-en definerer tjenestene som: regnskap, lønnskjøring, rådgivning, årsoppgjør/skattemelding, mva-melding, selskapsetablering

Råfiler av alle dagens sider er arkivert i repoet: [`data/legacy/`](data/legacy/) (`home.html`, `om-oss.html`, `tjenester.html`, `moderne-regnskap.html`, `jobbe-i-kontera.html`, `onsker-kontakt.html`, `personvern.html`) — brukes som referanse og som grunnlag for redirect-kartet ved DNS-bytte (§11).

---

## 3. Merkevare og posisjonering

**Posisjonering:** Det lille byrået som er en samarbeidspartner, ikke en leverandør. Middels pris, høy kvalitet, ekstremt personlig oppfølging.

**Kjerneløfter (brukes gjennomgående i copy, hero-er og trust-seksjoner):**
1. **Fast regnskapsfører som kjenner deg** — én kontaktperson som gjør hele regnskapet ditt
2. **Alltid to som kjenner bedriften din** — fast backup ved sykdom/ferie (unik, konkret garanti — nesten ingen konkurrenter lover dette eksplisitt)
3. **Ingen faktura for korte spørsmål** — ring oss uten taksameter
4. **Statsautoriserte regnskapsførere** — regulert kvalitet, verifiserbart i Finanstilsynets virksomhetsregister
5. **Spisskompetanse der det teller** — bruktbil/bilbransje, håndverkere, eiendom, netthandel — og bred kompetanse for de fleste bransjer

**Tone of voice — «saklig fagperson»** (revidert 2026-08-24 etter Henriks beslutning; erstatter den tidligere «jordnær og muntlig»-linja): Norsk bokmål, du-form og varme beholdes, men registeret er en erfaren rådgiver — ikke en selger. Rolig autoritet, presis i fakta og titler (regulert bransje). Ingen «helhetlige løsninger innen økonomiforvaltning»-språk, men heller ingen gimmick, slang, retoriske overskrifter, fingerte sitater eller sidespark mot andre byråer. Bransjenevnelser skal favne bredt: bruktbil m.fl. nevnes som spisskompetanse, men alle sider gjør det tydelig at Kontera passer de fleste bransjer.

**Fullt tone-charter: [TONEPLAN.md](TONEPLAN.md)** — GJØR/IKKE GJØR og 20 kanoniske omskrivinger.
Det er kanonisk for all copy og skal leses før tekst skrives eller endres.

**Terminologi-regel (SEO + korrekthet):** «Statsautorisert regnskapsfører» er korrekt lovtittel (regnskapsførerloven 2023). Søkevolumet ligger fortsatt på «autorisert regnskapsfører» — bruk «autorisert» i titles/H1 der det er naturlig, «statsautorisert» i fagcopy og strukturert data.

---

## 4. Teknisk arkitektur

```
kontera/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                        # Forside (salgsoptimalisert hovedlanding)
│   │   ├── tjenester/[tjeneste]/page.tsx   # 6 tjenestesider
│   │   ├── bransjer/[bransje]/page.tsx     # 6+ bransjesider
│   │   ├── regnskapsforer/page.tsx         # Geo-hub («Områder vi dekker»)
│   │   ├── regnskapsforer/[fylke]/page.tsx           # 15 fylkeshuber
│   │   ├── regnskapsforer/[fylke]/[kommune]/page.tsx # 357 kommunesider
│   │   ├── blogg/page.tsx + blogg/[slug]/page.tsx    # MDX-kunnskapssenter
│   │   ├── priser/ · om-oss/ · kontakt/ · personvern/ · jobb/
│   ├── api/kontakt/route.ts                # Skjemainnsending → e-postvarsel
│   ├── sitemap.ts (+ generateSitemaps: per fylke) · robots.ts
│   ├── layout.tsx · opengraph-image.tsx
├── components/                             # Seksjonsbibliotek (Hero, TrustBar, ServiceCards, PriceTable, FAQ, ContactForm, StickyCallBar, ...)
├── content/
│   ├── blogg/*.mdx                         # Agent-vennlig: nytt innlegg = ny fil med frontmatter
│   ├── tjenester/*.mdx · bransjer/*.mdx
├── data/
│   ├── norge-geo.json                      # ✅ FERDIG: 15 fylker, 357 kommuner, slugs, SSB-koder
│   ├── kommune-stats.json                  # Genereres: SSB + Brreg-data per kommune
│   ├── site.ts                             # NAP, org.nr, telefon, priser — ÉN sannhetskilde
├── lib/                                    # geo-helpers, schema-builders (JSON-LD), mdx-loader
├── scripts/
│   ├── fetch-geo-stats.mjs                 # SSB Statistikkbanken + Brreg Enhetsregisteret → kommune-stats.json
│   ├── fetch-pexels.mjs                    # Pexels-nedlasting + attribusjons-manifest
├── public/images/                          # Nedlastede, optimaliserte bilder
└── CLAUDE.md                               # Konvensjoner for agent-arbeidsflyt
```

**Valg og begrunnelse:**
- **Next.js (siste stabile), App Router, ren SSG** for alt innhold (`generateStaticParams` + `dynamicParams = false` — ukjente geo-slugs gir 404, ikke søppelsider). 372 geo-sider er trivielt i buildtid.
- **Tailwind CSS v4** med design-tokens fra §2.2 i `@theme`.
- **MDX** via `next-mdx-remote` (RSC) + gray-matter: innhold er filer, ikke database — en agent (eller Henrik) legger til blogginnlegg ved å skrive én `.mdx`-fil med frontmatter (title, description, date, author, tags). Egendefinerte MDX-komponenter (CTA-boks, FAQ, pristabell, infoboks) tilgjengelig i alt innhold.
- **Geo-sider er datadrevne komponenter, ikke MDX**: mal + `norge-geo.json` + `kommune-stats.json` + betingede innholdsblokker (§7). All tekst-logikk i kode → konsistent kvalitet på 372 sider.
- **Skjema:** React Hook Form + zod-validering → `app/api/kontakt/route.ts` → e-postvarsel til post@kontera.no via **Resend** (krever API-nøkkel — åpent punkt §14). **Lead-sikkerhetsregel:** før e-postlevering er satt opp OG verifisert med testinnsending, skal skjemaet enten (a) lagre leads varig (f.eks. Vercel KV/blob eller commit-bar JSON via cron) eller (b) være deaktivert med «ring oss»-fallback — aldri vise «takk, vi tar kontakt» mens henvendelsen forsvinner i flyktige serverlogger. «Verifisert lead-levering» er en hard lanseringsport i fase 1 og 7 (§12). Honeypot + rate-limiting mot spam. Speed-to-lead: varsel-e-post umiddelbart (intern begrunnelse: svar <5 min gir dramatisk høyere kvalifisering — tallet publiseres ikke i copy).
- **Analyse:** Vercel Analytics + Speed Insights (cookiefritt → ingen samtykkebanner nødvendig) + Google Search Console. GA4 kun hvis ønsket senere, bak samtykke (ekomloven 2025). Tel-klikk og skjemainnsending spores som events.
- **Kart:** statisk/lenket (Google Maps-lenke per kontor) — ingen tunge embeds.

---

## 5. Informasjonsarkitektur og URL-struktur

```
/                                     Forside — salgsoptimalisert hovedlanding
/tjenester                            Oversikt
/tjenester/regnskapsforing            Løpende regnskap og bokføring
/tjenester/lonn                       Lønnskjøring
/tjenester/arsoppgjor                 Årsoppgjør og skattemelding
/tjenester/mva                        MVA-melding
/tjenester/radgivning                 Økonomisk rådgivning
/tjenester/starte-selskap             Oppretting av selskap (AS, ENK …)
/bransjer                             Oversikt («passer de fleste bransjer»)
/bransjer/bilforhandlere              Bruktbil/bilbransjen ⭐ (nesten ledig SEO-nisje)
/bransjer/handverkere                 Bygg, anlegg, håndverk
/bransjer/eiendom                     Eiendomsselskap og -forvaltning
/bransjer/netthandel                  Nettbutikk og e-handel
/bransjer/borettslag-sameier          Borettslag og sameier (skjema-målgruppe fra brief)
/bransjer/tjenesteytende              Konsulenter og tjenestebedrifter
/regnskapsforer                       Geo-hub: «Regnskapsfører i hele Norge» + fylkeskart/-liste
/regnskapsforer/[fylke]               15 fylkeshuber (akershus, oslo, innlandet …)
/regnskapsforer/[fylke]/[kommune]     357 kommunesider (≥1500 ord hver)
/priser                               Transparent prisside (fra-priser/pakker)
/om-oss                               Historie, team, autorisasjoner, kontorer
/kontakt                              Skjema + tel/mail + kontorer m/kart-lenker
/blogg + /blogg/[slug]                Kunnskapssenter (MDX)
/jobb                                 «Jobbe i Kontera» — reelt innhold
/personvern                           Skreddersydd personvernerklæring (GDPR art. 13)
```

**URL-regler:** Tjeneste først, geografi etter (`/regnskapsforer/[fylke]/[kommune]`) — løser også duplikatnavn (Herøy ×2, Våler ×2 — verifisert i geodata). Slugs: æ→ae, ø→o, å→a, små bokstaver, bindestrek. Self-canonical på alle sider. Synlig breadcrumb + `BreadcrumbList`-schema: Hjem → Regnskapsfører → Akershus → Bærum. Redirects fra gamle WordPress-URL-er (`/om-oss/`, `/tjenester/`, `/onsker-kontakt/` …) settes opp ved DNS-bytte.

**Intern lenking (hub-and-spoke):** Forside → tjenester + bransjer + geo-hub. Fylkeshub → alle sine kommuner (beskrivende ankertekst: «Regnskapsfører i Bærum»). Kommuneside → fylkeshub (breadcrumb), 3–5 nabokommuner, relevante tjeneste-/bransjesider. Footer: tjenester, bransjer, fylker, kontakt, org.nr. Ingen foreldreløse sider.

---

## 6. Side-blueprints

Alle sider følger CRO-grunnmønsteret: **konverterende hero med CTA → social proof rett under → innhold → gjentatt CTA-rytme → final CTA med skjema.** Sticky elementer: desktop-header med synlig telefonnummer + CTA-knapp; mobil får sticky «Ring oss»-linje (`tel:`, vises etter scroll, skjules ved skjemafokus).

### 6.1 Forside (hovedlanding, lang og salgsoptimalisert)

1. **Hero:** Utfallsorientert H1 <8 ord (retning: «Regnskapet i orden. Alltid.» / «Full kontroll på tallene — uten stresset»), subheadline med målgruppe + risikoreduserer, primær CTA «Ring oss — en uforpliktende prat» (nummer i klartekst), sekundær «Få et tilbud» (anker til skjema), mikro-social-proof. Brand-gradient over profesjonelt Pexels-foto.
2. **Trust-linje:** Statsautoriserte regnskapsførere · 6 dedikerte ansatte · fast kontaktperson + backup · org.nr · (Google-rating når tilgjengelig)
3. **Problem → løsning:** taksameter-frykt, byrå som ikke svarer, frister og purringer → slik løser Kontera det
4. **Tjenester:** 6 kort med lenker og mini-CTA
5. **Samarbeidsmodellen:** «Ikke kunde. Samarbeidspartner.» — fast fører, backup-person, ingen faktura for småspørsmål
6. **Bransjer:** kort-grid (bruktbil fremhevet, «+ de fleste andre bransjer»)
7. **Prosess:** 3 steg — Ring/skjema → uforpliktende prat (er vi en god match?) → vi ordner alt, inkl. bytte fra dagens byrå
8. **Priser-teaser** → /priser
9. **Team-teaser:** ekte ansikter og navn → /om-oss
10. **Kundeord/case-snutter** (attribuert: navn, rolle, firma — se ekthetsregelen i §9.3)
11. **FAQ** (8–10 spørsmål)
12. **Final CTA:** stort nummer + skjema + responstidsløfte

### 6.2 Tjenesteside (mal, 1000–2000 ord)

Hero med tjeneste-spesifikt utfall + CTA → hvem passer det for → hva som inngår (detaljert) → slik jobber vi → priser-teaser → relaterte bransjer/tjenester → FAQ → final CTA. JSON-LD: `Service` + `BreadcrumbList`. Lenker til relevante bloggguider (topical authority).

### 6.3 Bransjeside (mal, 1200–2000 ord)

Som tjenesteside, men med bransjesmerte i hero, bransjespesifikke regler/fallgruver (f.eks. bruktbil: avansemoms/bruktmoms, lagerbil-håndtering, dagsoppgjør — dyp innsikt som maksimerer verdien), case-snutt fra bransjen, bransje-FAQ. Bilforhandler-siden er flaggskipet: «regnskap bilforhandler»-clusteret er tilnærmet ledig i SERP.

### 6.4 Geo-sider — se §7 (eget kapittel, dette er hovedsatsingen)

### 6.5 Blogg/kunnskapssenter (MDX)

Prioriterte førsteartikler (fra søkeordsanalysen — kjøpsnære longtails der små aktører beviselig rangerer):
1. «Hva koster regnskapsfører i 2026? Priser og modeller» (med ekte tall)
2. «Bytte regnskapsfører: komplett guide» (+ landingsvinkel «bytt til oss — vi ordner overgangen»)
3. «Regnskapsfører for enkeltpersonforetak — trenger du det?»
4. «Føre regnskapet selv eller bruke regnskapsfører?» (ærlig sammenligning — tillitsbygger)
5. «MVA-frister 2026/2027: alle terminer» (oppdaterbar årstall-artikkel)
6. «Starte AS i 2026: steg for steg» → /tjenester/starte-selskap
7. «Hva er en statsautorisert regnskapsfører?» (E-E-A-T-side, lenker Finanstilsynet/Lovdata)
8. «Regnskap for bilforhandlere: avansemoms og bruktbilsalg forklart» ⭐

Hver artikkel: forfatterbyline (statsautorisert regnskapsfører), «sist faglig oppdatert», kilder til Skatteetaten/Altinn/Lovdata, CTA-bokser. `Article`-schema + forfattersider med `Person`-schema.

---

## 7. Geo-strategi: 15 fylkessider + 357 kommunesider

**Kravet:** Unik landingsside for hvert fylke og hver kommune, ≥1500 ord, grafisk komplette og selgende seksjoner, som rangerer på alle short-/longtail-søk i kombinasjon med området.

**Ærlig premiss (fra research):** Googles «scaled content abuse»-policy (2024→) straffer malsider uten egenverdi, og vurderingen skjer på domenenivå. Kombinasjonen som holder 372 sider trygge OG konkurransedyktige: ekte lokale data + betinget innhold + lagdelt utrulling + overvåking. Alle 372 sider skal bygges — men publiseres i kontrollerte puljer med kvalitetsport, ikke alle på én dag.

**Bevisst strukturvalg — én geo-side dekker alle tjenestene:** Hver kommuneside targeter hele søkefeltet «regnskapsfører/regnskapsbyrå/lønn/årsoppgjør/mva + {kommune}» på ÉN URL, med tjenestene som egne seksjoner (H2) på siden. Alternativet — egne sider per tjeneste×kommune (6 × 357 = 2142 sider) — er nøyaktig doorway-mønsteret Google straffer, og fragmenterer lenkekraften. Longtail «{tjeneste} {kommune}»-søk fanges av seksjonene + FAQ på kommunesiden.

**Navneregel (viktig for H1/titles):** 29 kommuner og 5 fylker har offisielle flerspråklige navn der norsk del kan stå sist («Aarborte - Hattfjelldal», «Troms - Romsa - Tromssa»). `norge-geo.json` har derfor feltet `visningsnavn` = det norske navnet alene (✅ lagt til og verifisert 2026-08-21, 0 avvik mot slug-logikken). H1, title, breadcrumb og løpende tekst bruker ALLTID `visningsnavn` («Regnskapsfører i Hattfjelldal»); fullt offisielt navn (`navn`) kan nevnes én gang i lokal intro der det er naturlig.

### 7.1 Datagrunnlag (Konteras urettferdige fordel)

`scripts/fetch-geo-stats.mjs` bygger `kommune-stats.json` fra åpne kilder (gratis, uten nøkkel):
- **SSB Statistikkbanken (PxWeb API):** folkemengde (tabell 07459 er standardtabellen — verifiser tabell-ID-er mot API-et i fase 3), antall virksomheter etter næring og størrelse, sysselsetting, nyetableringer per kommune
- **Brønnøysundregistrene (Enhetsregisteret API):** `https://data.brreg.no/enhetsregisteret/api/enheter?kommunenummer={nr}` (+ `naeringskode`-filter) — live-tall per kommune: antall AS vs. ENK, næringsmiks (NACE), nyregistreringer — til og med antall lokale regnskapsbyråer (NACE 69.201)
- Datakilde + «sist oppdatert» vises på siden (transparens = tillitssignal)

### 7.2 Unikhet: data STYRER innholdet (ikke pynter det)

Rå tall i mal («{kommune} har {X} innbyggere») er verdiløst. I stedet velger næringsmiksen **betingede fagblokker** per kommune:
- Mye bygg/anlegg → prosjektregnskap, byggekort, mva i byggenæringen
- Kystkommune m/fiskeri-havbruk → særregler, fiskerfradrag
- Landbrukskommune → primærnæringsregnskap, landbruksfradrag
- Reiselivskommune → sesongdrift, mva-satser overnatting
- Høy ENK-andel → bokføringsplikt/ENK-innhold; høy AS-andel → revisjonsplikt-grenser, aksjonærregisteroppgave
- Mange nyetableringer → oppstartsvinkel; få → etablert-SMB/generasjonsskifte
- Bilbransje til stede → bruktbil-blokken (Konteras spiss)

Pluss per side: unik intro skrevet mot kommunens faktiske næringsprofil, lokal FAQ-variant, nabokommune-lenker, unik title/description med lokalt datapunkt.

### 7.3 Kommuneside-blueprint (≥1500 ord)

1. Hero: «Regnskapsfører i {Kommune}» + utfallsløfte + ring-CTA + skjema-anker + mikro-proof
2. Trust-linje (statsautorisert, fast kontaktperson + backup, ingen faktura for småspørsmål)
3. Unik lokal intro: næringslivet i {kommune} med ekte tall (SSB/Brreg) og hva det betyr for regnskapet
4. «Slik hjelper vi bedrifter i {kommune}» — 6 tjenester vinklet lokalt
5. 2–4 betingede bransje-fagblokker (§7.2)
6. Nøkkeltall for næringslivet i {kommune} (grafisk tabell/stat-kort: virksomheter, AS/ENK, nyetableringer)
7. Samarbeidsmodellen (fast + backup, digital hverdag: «vi jobber digitalt med kunder i hele Norge — med kontorer på Jar i Bærum og Ask i Gjerdrum» — ærlig service-area-framing, ingen falske lokalkontorer)
8. Prisseksjon med fra-priser + CTA «Få din pris»
9. Prosess: 3 steg inkl. «vi ordner byttet fra dagens regnskapsfører»
10. Kundeord (regionalt der mulig)
11. FAQ: 8–12 spørsmål, blanding av generelle + lokalt vinklede
12. Nabokommuner + lenke opp til fylkeshub + tjenestesider
13. Final CTA: nummer + skjema

JSON-LD per kommuneside: `Service` (`serviceType: Regnskapsføring`, `provider: @id` → org-noden, `areaServed: {kommune}`) + `BreadcrumbList` + FAQ-markup (ufarlig; nyttig for AI-flater). **ALDRI** `LocalBusiness` med fiktiv lokal adresse — én sannferdig `AccountingService`-node for de to ekte kontorene med `areaServed`, referert med `@id` fra alle sider.

### 7.4 Fylkeshub-blueprint (≥1500 ord)

Regional næringsprofil (SSB-data), hvilke kommuner som dekkes (lenkeliste med beskrivende ankertekst — hub-funksjonen), regionale bransjeblokker, samme CRO-seksjoner (priser, prosess, FAQ, final CTA).

### 7.5 Utrullingsplan (kvalitet + sikkerhet)

| Pulje | Innhold | Publiseres |
|---|---|---|
| 1 | Geo-hub + 15 fylkeshuber + 25 prioriterte kommuner — håndpolert kvalitet. Prioritetslisten: **Bærum, Gjerdrum, Oslo, Asker, Lillestrøm, Ullensaker, Nannestad, Nittedal, Lørenskog** (hjemmemarked) + **Bergen, Trondheim, Stavanger, Sandnes, Kristiansand, Drammen, Fredrikstad, Sarpsborg, Tromsø, Ålesund, Sandefjord, Tønsberg, Skien, Porsgrunn, Bodø, Hamar** (storbyer) | I **fase 3** (§12) |
| 2–6 | Resterende ~330 kommuner i fylkesvise puljer (~60–80 sider per pulje) | **Fase 4**; 1–2 ukers mellomrom; neste pulje når forrige viser normal indeksering i GSC |

Kvalitetsport per side før publisering (automatisert sjekk i buildscript): SSB+Brreg-data til stede · ≥1500 ord · ≥2 betingede fagblokker · unik intro · unik title/description · interne lenker (hub + naboer + tjenester) · ingen dupliserte tekstblokker på tvers av sider utover fellesblokker fra **den godkjente blokk-katalogen** (`content/geo-blokker/` — hver gjenbrukbar blokk er en navngitt, versjonert komponent; alt annet på siden må være sideunikt, og porten måler **andel sideunikt innhold (mål ≥30 %)**, ikke bare ordtelling — ren ordtelling inviterer til fyllstoff, som er nettopp feilmodusen §7 advarer mot).

Overvåking: `generateSitemaps()` → én sitemap per fylke → GSC viser indekseringsdekning per pulje. Vokser «Crawled – currently not indexed», pauses utrullingen og kvaliteten heves.

---

## 8. SEO-strategi (utover geo)

**Søkeord → side-mapping (fra analysen):**

| Cluster | Eksempler | Side |
|---|---|---|
| Head + geo | regnskapsfører/regnskapsbyrå + sted | Geo-sider + forside |
| Tjenester | lønnskjøring, årsoppgjør pris, mva-melding frister, starte AS | Tjenestesider + guider |
| Kjøpsnære longtails 💰 | hva koster regnskapsfører, bytte regnskapsfører, regnskapsfører ENK | Blogg-guider + /priser |
| Bransje | regnskap bilforhandler ⭐ (nesten ledig), håndverker, netthandel, eiendom, borettslag | Bransjesider |
| E-E-A-T | hva er statsautorisert regnskapsfører | Guide + om-oss |

**Teknisk SEO-sjekkliste (bygges inn fra dag én):**
- Metadata API: unik title/description per side; `metadataBase`; OG-image-generering (`opengraph-image.tsx` — brand-gradient + sidetittel)
- `lang="nb"` i root layout; ingen hreflang (kun norsk)
- JSON-LD-bibliotek i `lib/schema.ts`: `AccountingService` (org-node m/ ekte NAP begge kontorer, org.nr, `areaServed: Norge`, `sameAs`: LinkedIn/Proff/Brreg) · `Service` · `BreadcrumbList` · `Article` · `Person` (forfattere) · FAQ. **Ingen** `aggregateRating` i egen markup (self-serving review-regelen — stjerner hentes via Google Business Profile i stedet)
- Semantisk HTML: én H1 per side, logisk H2/H3-hierarki, `next/image` med alt-tekst overalt, skip-links, WCAG AA-kontraster
- Ytelse: SSG, `next/font` (ingen layout shift), AVIF/WebP, prioritert LCP-bilde, null unødvendig klient-JS (RSC først)
- E-E-A-T: forfattersider for de statsautoriserte, byline + «faglig kvalitetssikret av», lenker til Finanstilsynets virksomhetsregister, kilder til Skatteetaten/Altinn/Lovdata, «sist oppdatert»-datoer
- Utenfor nettsiden (anbefales Henrik, gratis synlighet som allerede rangerer): Google Business Profile for begge kontorer (kategori Regnskapsfører — kilden til SERP-stjerner), Regnskap Norges «Finn en regnskapsfører», Tripletex/systemleverandør-kataloger, Proff/1881, oppdatere LinkedIn-navnet fra unnli-regnskap-as

---

## 9. CRO-strategi (destillert, gjelder alle sider)

1. **Én dominant handling:** Ring. Nummeret i klartekst i header (desktop) + sticky ringelinje (mobil) + `tel:` på alle forekomster. Sekundær: skjema. *(Justert i [DESIGNPLAN.md](DESIGNPLAN.md) §7b.1: når skjemalevering er verifisert, snus hierarkiet til skjema-primær — regnskap er et vurderingskjøp; ring forblir primær så lenge skjemaet er i fallback-modus.)*
2. **CTA-copy:** «Ring oss — en uforpliktende prat» / «Få et uforpliktende tilbud». Aldri «Send»/«Kontakt oss».
3. **Social proof rett under hero på alle landingssider** + gjentatt nær hver CTA: attribuerte sitater (navn, rolle, firma), tallfakta (6 ansatte, 2 statsautoriserte, fast kontaktperson + backup), Google-rating når den finnes. **EKTHETSREGEL (absolutt):** Kundesitater, cases, anmeldelser og ratings skal ALDRI diktes opp — verken av utviklere eller agenter. Inntil ekte, samtykkede sitater leveres (§14), utelates sitat-seksjonene helt; tallfakta og garantier (som er sanne) bærer social proof alene. Fabrikkert kundeomtale bryter markedsføringsloven og raserer tilliten alt annet bygger.
4. **Skjema (3 obligatoriske felt + 1 valgfritt):** «Firmanavn / borettslag» · E-post · Telefon · «Hva ser du etter? (valgfritt)». Feltene følger briefen (firmanavn, e-post, telefon, kort beskjed); bevisst avvik: meldingsfeltet gjøres valgfritt fordi hvert obligatoriske felt koster konvertering (3 felt er dokumentert sweet spot), og labelen dekker både bedrifter og borettslag/sameier. Synlige labels, `type=email/tel`, autocomplete, honeypot. Knapp: «Få en uforpliktende prat». Under: «Uforpliktende. Vi deler aldri opplysningene dine.» + responstidsløfte. Ett steg (multi-step lønner seg først ved 5+ felt). Ingen samtykke-checkbox nødvendig for ren kontakthenvendelse (art. 6(1)(b)/(f)) — men personvernlenke ved skjemaet.
5. **Tillit:** org.nr + «Statsautoriserte regnskapsførere» i footer på alle sider; garantiene fra §3; prisåpenhet med fra-priser (skjult pris = friksjon); responstidsløfte som holdes (internvarsling ved innsending).
6. **Prosess-seksjonen adresserer byttebarrieren eksplisitt:** «Vi ordner overgangen fra dagens regnskapsfører.»

---

## 10. Bildestrategi (Pexels)

- `scripts/fetch-pexels.mjs` med nøkkelen fra `.env.local` (`PEXELS_API_KEY` — ✅ filen ligger i prosjektroten og nøkkelen er verifisert fungerende mot API-et 2026-08-21; `.gitignore` ekskluderer den — aldri i klientkode/git; må også legges inn som env-var i Vercel hvis scripts skal kjøre der)
- Kuratert manifest: søk per motivkategori (kontor/samarbeid, rådgivningsmøte, håndverker, bilforhandler/verksted, netthandel/pakking, eiendom/bygg, norske landskap/byer til geo-sider, nærbilder tall/dokumenter) → håndplukkede foto-ID-er → nedlasting i 2–3 størrelser → `public/images/` → optimaliseres via `next/image` (AVIF/WebP)
- **Relevanskrav:** hvert bilde må matche seksjonens innhold; nordisk/europeisk kontortone; ingen klisjé-spam (ingen håndtrykk-stock overalt). Geo-sider gjenbruker et kuratert sett av 30–50 bilder rotert per fylke/bransjeblokk — ikke 357 unike bilder for nedlastingens skyld
- Attribusjon: ikke påkrevd av Pexels-lisensen, men fotograf-krediteringsmanifest lagres (`data/image-credits.json`); rate limits respekteres (200 req/t)
- Ekte bilder av teamet (fra Henrik, §14) prioriteres over stock på om-oss/team-seksjoner — stock brukes aldri som «falske ansatte»

---

## 11. Arbeidsflyt: Git, GitHub, Vercel

- **Regel (fra Henrik):** «Push og commit» = commit → push til GitHub `main` → Vercel auto-deployer til produksjon. Feature-arbeid kan gå i branches med Vercel preview-URL-er, merges til main når godkjent.
- Repo: GitHub (navn f.eks. `kontera-web`). Vercel kobles til repoet; Vercel-domene (`kontera-web.vercel.app` e.l.) brukes som staging/prod til DNS-byttet.
- **DNS:** Henrik ordner peking av kontera.no til Vercel helt til slutt. Ved cutover: legg inn domenet i Vercel, sett opp 301-redirects fra gamle WordPress-stier, verifiser GSC-eiendom for domenet, send inn sitemaps.
- `CLAUDE.md` i repoet dokumenterer konvensjoner (hvordan legge til blogginnlegg/tjeneste/bransjeside, kjøre scripts, kvalitetsporter) → agent-vennlig arbeidsflyt i alle fremtidige økter.
- CI-sanity før push: `next build` (validerer alle 372+ sider), lint, kvalitetsport-script.

---

## 12. Faser og milepæler

| Fase | Innhold | Leveranse |
|---|---|---|
| **0. Fundament** | Next.js-scaffold, Tailwind-tokens, fonter, logo/favicon lastet ned og optimalisert, layout (header/footer/sticky-CTA), `data/site.ts`, GitHub-repo, Vercel-deploy | Tom, men deploybar side på Vercel-URL |
| **1. Kjerneside** | Forside (full 12-seksjons landing), 6 tjenestesider, /priser (kun med Henrik-godkjente priser — tydelig merket plassholder inntil da, aldri oppdiktede tall), /om-oss, /kontakt (+ API-route for skjema), /personvern (skreddersydd), /jobb, Pexels-pipeline + bilder. **Port: verifisert lead-levering (testinnsending mottatt på e-post) før siden regnes som klar** | Komplett kjernenettsted, klart til å erstatte dagens side |
| **2. Bransjer** | 6 bransjesider (bilforhandlere som flaggskip) | Bransje-cluster live |
| **3. Geo-motor** | `fetch-geo-stats.mjs` (SSB+Brreg), malkomponenter, betingede fagblokker, kvalitetsport-script, geo-hub + 15 fylkeshuber + ~25 prioriterte kommunesider | Pulje 1 live |
| **4. Geo-utrulling** | Resterende ~330 kommunesider i fylkesvise puljer m/GSC-overvåking | Alle 372 geo-sider live |
| **5. Kunnskapssenter** | MDX-blogg + 8 prioriterte artikler + forfattersider | Blogg live |
| **6. Finish** | Lighthouse/CWV-optimalisering, a11y-revisjon, OG-images, schema-validering, korrekturlesing, tverrlenke-revisjon | Lansering-klar |
| **7. Lansering** | DNS-cutover (Henrik), redirects, GSC-verifisering, sitemaps, GBP-oppdateringer. **Harde porter: verifisert lead-levering + Henrik-godkjente priser + ekthetsregelen (§9.3) oppfylt** | kontera.no live på ny plattform |

Hver fase avsluttes med commit + push til GitHub → Vercel, så Henrik kan se fremdriften løpende på Vercel-URL-en.

---

## 13. Risiko og kvalitetsporter

| Risiko | Mitigering |
|---|---|
| Google klassifiserer geo-sidene som doorway/scaled content | Ekte data per side, betingede fagblokker, ≥1500 ord ekte innhold, puljevis utrulling, per-fylke-sitemaps i GSC, stopp-regel ved indekseringsproblemer (§7.5) |
| Duplikat-innhold på tvers av 357 sider | Kvalitetsport-script blokkerer publisering ved dupliserte blokker/manglende data |
| Falske lokalsignaler | Aldri LocalBusiness/adresser i kommuner uten kontor; ærlig «digitalt + to kontorer»-framing |
| Skjema-leads forsvinner | Resend-varsling + logging; responstidsløfte kun når varsling er verifisert |
| Feil fakta (adresser/org.nr/titler) | `data/site.ts` som eneste sannhetskilde; Brreg-verifiserte verdier; «statsautorisert» brukt korrekt |
| Pexels-bilder virker spammy | Kuratert manifest, relevanskrav per seksjon, roterende gjenbruk |

---

## 14. Åpne punkter (trenger Henrik — blokkerer ikke oppstart)

1. **GitHub:** repo-tilgang (gh-innlogging el. eksisterende repo/organisasjon)
2. **Vercel:** konto koblet til repoet (kan gjøres når fase 0 er klar til deploy)
3. **Resend** (el.l.) API-nøkkel for skjema-e-post — inntil da bygges skjemaet ferdig med logging
4. **Telefonnummer:** bekreft at 960 00 400 er riktig hovednummer (og om dere vil vise direktenumre)
5. **Besøksadresser:** bekreft besøksadresse for BEGGE kontorer — dagens side har tre ulike Jar-varianter; Brreg sier Bjerkelundsveien 5 (forretningsadresse), men forretningsadresse ≠ alltid besøksadresse, og NAP-konsistens er kritisk for lokal SEO
6. **Team:** navn og titler på de ansatte (spesielt de 2 statsautoriserte — E-E-A-T-forfattere i tekst). *Henriks beslutning 2026-08-22: INGEN ekte teamfoto — anonym Pexels-varme brukes i stedet (BILDEPLAN), og ingen stockansikter presenteres noensinne som ansatte*
7. **Priser:** reelle fra-priser/pakker for /priser — **må godkjennes av Henrik før publisering**; inntil da vises tydelig merket plassholder, aldri oppdiktede tall (forslag utarbeides basert på «middels prisnivå»)
8. **Kundeord:** 3–6 sitater fra fornøyde kunder (navn + firma, med samtykke) + ev. Google-anmeldelser — inntil de finnes, utelates sitat-seksjonene (ekthetsregelen §9.3)
9. **Logo som vektor:** original AI/EPS/SVG-fil hvis den finnes (ellers brukes optimalisert PNG/WebP)
10. **LinkedIn:** endre firmanavn fra «unnli-regnskap-as» + ev. opprette Google Business Profile for begge kontorer
11. **KPI-kalibrering:** godkjenn de realistiske SEO-målene i §1 (trappa mot «#1 i hvert område»)

---

## Vedlegg A: Nøkkeldata

- **Geodata:** `data/norge-geo.json` ✅ (SSB Klass API; 15 fylker, 357 kommuner, offisielle navn inkl. samiske/kvenske, `visningsnavn` for H1/titles, URL-slugs, kommunenummer; duplikat-slugs Herøy/Våler håndtert av fylkesnesting)
- **Fylker (kommuner):** Oslo (1) · Rogaland (23) · Møre og Romsdal (27) · Nordland (41) · Østfold (12) · Akershus (21) · Buskerud (18) · Innlandet (46) · Vestfold (6) · Telemark (17) · Agder (25) · Vestland (43) · Trøndelag (38) · Troms (21) · Finnmark (18)
- **Arkiv av dagens side:** rå HTML i scratchpad (home, om-oss, tjenester, moderne-regnskap, jobbe-i-kontera, onsker-kontakt, personvern)
- **Research-grunnlag:** innholdsinventar, søkeords-/konkurrentanalyse (Azets, ECIT/Norian, Aspia, VIEW, Amesto, Regnskapsklinikken, Ageras, Tripletex-katalog m.fl.), Googles spam-policyer 2024–2026, CRO-kilder (norske: Randi, KLART, Fiken, Done) — dokumentert i workflow-transkript 2026-08-21
