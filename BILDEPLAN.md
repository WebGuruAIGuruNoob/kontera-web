# BILDEPLAN — Kontera.no

> Plan for profesjonell bruk av Pexels-bilder innenfor 2026-designspråket:
> bilder som SIER noe, rammet og navy-tintet — aldri dekorativt fyll, aldri
> 2014-stock. Basert på visuell revisjon av alle 53 eksisterende bilder og
> håndplukket kuratering av 45 nye (hvert eneste bilde er SETT og vurdert av
> bilderedaktør-agenter før det kom med her, 2026-08-22).
>
> Underordnet [DESIGNPLAN.md](DESIGNPLAN.md) §2.4 og MASTERPLAN-reglene
> (ekthetsregel, aldri falsk lokal tilstedeværelse).

---

## 0. Sammendrag

| | |
|---|---|
| **Revisjon** | 19 av 53 eksisterende bilder består; 34 strykes (ansikter som leses som «teamet», kyrilliske/amerikanske dokumenter, tropisk takarbeid, klisjeer). Kritisk funn: `handverker-1.jpg` er I BRUK men stryker — byttes til `handverker-4.jpg` |
| **Ny kuratering** | 45 håndplukkede bilder: 11 tjeneste-/om-oss-arbeidsdetaljer, 8+8 bloggmotiver (finalist+reserve), **15 stedsverifiserte fylkesbilder** (URL-slug/alt-tekst-bevis per bilde) |
| **Plassering** | Tjenestesider, bransjesider (oppgradert), fagartikler og fylkessider får ett rammet bilde hver; forsiden og om-oss får arbeidsdetaljer; **kommunesidene forblir fotofrie** (datavisualiseringen er deres visuelle element — 15 delte foto på 357 sider ville lest templatet) |
| **Behandling** | Én gjenbrukbar `FramedImage`: `rounded-3xl` + hairline + navy-tint (`bg-navy/20 mix-blend-multiply`) + valgfri maske-fade. Aldri fullbredde, aldri overlay-tekst |
| **Regler** | Ekthetsregelen presisert for foto: stockmennesker kan illustrere en BRANSJE, aldri presenteres som Konteras ansatte eller kunder. Alt-tekst på norsk, kreditering i manifest, ytelse <200 kB visning |

---

## 1. Prinsipper (håndheves i hver plassering)

1. **Bildet må si noe** om akkurat den seksjonen — ellers ut. Datagrafikk > dekorativt foto.
2. **Rammet, aldri fullbredde:** `rounded-3xl`, hairline-border, navy-tint — foto-hero med overlay kommer aldri tilbake.
3. **Ekthetsregel for foto:** en snekker kan illustrere håndverksbransjen; ingen stockansikter der de kan leses som «teamet vårt» eller «kundene våre». Om-oss bruker derfor arbeidsdetaljer (hender, dokumenter, lokaler) til Henrik leverer ekte teamfoto — som erstatter dem.
4. **Stedsærlighet:** regionale bilder brukes kun der stedet er verifisert (Pexels-slug/alt-tekst) eller motivet er umiskjennelig. Ingen «generisk fjord» merket som et bestemt fylke.
5. **Nordisk tone:** naturlig lys, rolige farger, ingen poserte smil mot kamera, ingen amerikanske kontor-klisjeer, ingen AI-preg. Alle bilder må tåle navy-tint.
6. **Én kilde til sannhet:** `data/bilde-manifest.json` (id → fil → plassering → alt → fotograf) erstatter dagens rene krediteringsliste; `scripts/fetch-pexels.mjs` får ID-basert henting (`/v1/photos/{id}`).

---

## 2. Revisjonen av dagens 53 bilder

**Består (19)** — de seks bransjebildene i bruk (minus håndverker), pluss gjenbrukbare
detaljer og fem norske landskap som nå får verifisert fylkesbruk:

| Beholdes | Ny rolle |
|---|---|
| bilforhandler-1, eiendom-1, netthandel-1, borettslag-1, konsulent-1 | Bransjesider (som i dag, oppgradert ramme) |
| **handverker-4** | Bransje: håndverkere — **erstatter handverker-1 i koden** |
| bygg-1, verksted-1, borettslag-2, netthandel-4, konsulent-2 | Reserver (bransjevarianter, blogg) |
| samarbeid-2 (hender+kontrakt), tall-2 (kalkulator+bilag) | Tjeneste-/om-oss-detaljer |
| norge-by-3 (Bjørvika), norge-fjord-1 (Lofoten), norge-fjord-3 (Geiranger), norge-nord-3 (Tromsø), norge-kyst-2 (fiskebåter), norge-kyst-3 (Haugesund) | Suppleres av de nye stedsverifiserte fylkesbildene; kyst-2 → fiskeri-motiv |

**Strykes (34)** — hovedfunn: møte-/kontorseriene med synlige ansikter (leses som
«teamet» → ekthetsregelbrudd), tall-serien med lesbare kyrilliske og amerikanske
dokumenter (feil land for et norsk regnskapsbyrå), handverker-1/2/3 (tropisk/feil
geografi og HMS), radgivning-serien (Starbucks-klisjeer, «Application Form»).
Filene slettes fra `public/images/pexels/` og krediteringen ryddes.

---

## 3. Ny kuratert bildebank (45 bilder, alle visuelt godkjent)

### 3.1 Tjenestesider + om-oss (14)

| Plass | Pexels-ID | Motiv |
|---|---|---|
| regnskapsforing | **8296974** (res. 7658352) | Flatlay: kalkulator og penn over åpen bilagsperm |
| lonn | **11773871** | Hånd ringer inn den 30. på bordkalender — lønningsdag |
| arsoppgjor | **6694481** (res. 17065813) | Hender sorterer rapportflate / permstabel med indeksfliker |
| mva | **7680681** (res. 5239814) | Kvitteringer og fakturautskrifter på ryddig pult / betalingsterminal |
| radgivning | **7433832** (res. 8424479) | Møtebord: kun hender og utskrevne grafer — ingen ansikter |
| starte-selskap | **3643926** (res. 6205504) | «OPEN»-skilt i glassdør — første åpningsdag |
| om-oss-detaljer | **5951549, 7255295, 8436906** | Kaffe+notatbok i vinduslys · hender på laptop · minimalistisk kontorhjørne |

### 3.2 Fagartikler (8 finalister + 8 reserver)

hva-koster → **33175673** (kalkulator på finansrapport) · bytte → **8371705** (dokumenteske
skifter hender) · enkeltpersonforetak → **13005858** (snekkerhender i verksted) · føre-selv-eller
→ **20061882** (dronefoto: vei som deler seg, nordisk vinterlandskap) · mva-frister → **9810172**
(kalender med markerte datoer) · starte-as → **3643926** (OPEN-skilt; res. 101808 nøkkel i lås) ·
statsautorisert → **6358840** (hånd med stempel) · bilforhandler-avansemoms → **97079**
(bilnøkkel overleveres; res. 29566899 forhandlertomt). Reserver i manifestet.

### 3.3 Fylkessider (15 — alle stedsverifisert via Pexels-slug/alt)

| Fylke | ID | Landemerke |
|---|---|---|
| Oslo | 18170373 | Operahuset fra sjøsiden |
| Akershus | 14033714 | Nes kirkeruiner ved Glomma/Vorma |
| Østfold | 32446688 | Eik i kornåker, Sarpsborg |
| Buskerud | 29584872 | Ypsilon-brua, Drammenselva |
| Innlandet | 28208825 | Lillehammer med Mjøsa |
| Vestfold | 16829228 | Bryggen i Tønsberg + Slottsfjelltårnet |
| Telemark | 34804243 | Heddal stavkirke |
| Agder | 12745512 | Lindesnes fyr |
| Rogaland | 25036885 | Vågen i Stavanger |
| Vestland | 33583891 | Bryggen i Bergen |
| Møre og Romsdal | 16481701 | Ålesund fra Aksla |
| Trøndelag | 36364328 | Bryggerekka, Nidelva |
| Nordland | 38658942 | Reine, Lofoten |
| Troms | 31113255 | Tromsøbrua |
| Finnmark | 37968340 | Nordkapp-globusen |

*Merk Østfold: Pexels mangler verifiserbare bybilder fra Fredrikstad/Gamlebyen —
Sarpsborg-jordbrukslandskapet er ærlig verifisert og tonemessig riktig.*

---

## 4. Plasseringskart

| Mal | Bilde | Plassering |
|---|---|---|
| **Forside** | ÉN om-oss-detalj (8436906) | Rammet i team-teaser-seksjonens høyrekolonne, over faktalisten — varme uten falske ansikter |
| **Tjenestesider (6)** | Tjenestebildet | Asymmetrisk 7/5: rammet bilde ved «Passer for deg som…»-listen |
| **Bransjesider (6)** | Som i dag + handverker-4-bytte | Rammet ved smertelisten (som nå) + maske-fade-oppgradering |
| **Fagartikler (8)** | Artikkelens finalist | Rammet toppbilde mellom header og brødtekst, 16:9-beskåret |
| **Fylkessider (15)** | Stedsverifisert landemerke | Rammet i intro-seksjonens høyrekolonne (7/5-split med intro-teksten) + bildetekst med stedsnavn |
| **Om oss** | 2–3 arbeidsdetaljer | Redaksjonell stripe under historien. Byttes mot ekte teamfoto når de kommer |
| **Kommunesider (357)** | **Ingen foto** | Bevisst: næringsprofil-viz + stat-bånd er deres visuelle identitet; 15 delte foto på 357 sider = templatet + sier ingenting lokalt |
| **Geo-hub, priser, kontakt, jobb, personvern** | Ingen | Typografi + data bærer; foto ville vært fyll |

---

## 5. Behandlingsspesifikasjon

**Ny komponent `FramedImage`** (server): props `src, alt, caption?, priority?, fade?`
- Ramme: `rounded-3xl border border-navy/10 overflow-hidden`
- Tint: overlay `bg-navy/20 mix-blend-multiply` (samme som dagens bransjebilder)
- Valgfri `fade`: maskefade mot seksjonsgrunnen (`mask-image: linear-gradient`)
- `next/image` med korrekt `sizes`; kun bilder over folden får `priority`
- Bildetekst (fylkessider): `<figcaption>` med sted + diskret Pexels-kreditering

**Alt-tekst-regler:** norsk, beskriver motivet konkret («Hender med kalkulator over
bilagsperm»), stedsnavn kun der stedet er verifisert. Aldri tom alt.

**Ytelse:** kildefiler hentes i `large2x`, `next/image` serverer AVIF/WebP responsivt;
visningsvekt <200 kB per bilde, LCP-budsjettet fra DESIGNPLAN består. Ingen
autoplay/karuseller.

**Manifest:** `data/bilde-manifest.json` — id, fil, plassering(er), alt, fotograf,
pexelsUrl, stedsbevis. `data/image-credits.json` genereres fra manifestet.
`scripts/fetch-pexels.mjs` utvides med ID-modus (`/v1/photos/{id}`, large2x-nedlasting).

---

## 6. Faser

| Fase | Innhold | Port |
|---|---|---|
| **B1 Bank** | Manifest skrives, 45 nye bilder hentes per ID, 34 strøkne slettes, kreditering regenereres | Alle filer på plass, manifest validerer |
| **B2 Komponent** | `FramedImage` + maske-fade, alt-tekst i manifestet | Rendrer i alle brukstilfeller |
| **B3 Utplassering** | Tjenestesider, bransje-bytte (handverker-4), fagartikler, fylkessider, forside/om-oss | Hver plassering følger kartet i §4 |
| **B4 QA** | Visuell kontroll per mal, ytelse (visningsvekt, LCP), alt-tekst-dekning, kvalitetsporten fortsatt grønn (uendrede krav) | Lighthouse-nivå består; 0 tomme alt |
| **B5 Leveranse** | Build + `qa:geo` → commit → GitHub → Vercel | Deploy Ready |

**Risiko:** Pexels-bilder kan avpubliseres → manifestet + lokale filer i git er arkivet.
Fylkesbilder må aldri antyde kontor («Vi kjenner {fylke}» — ja; «vårt kontor i Bergen» — aldri).

**Endring 2026-08-22 (Henriks beslutning):** Ingen ekte teamfoto skal brukes. I stedet:
kuraterte Pexels-bilder med ANONYME mennesker (ovenfra/bakfra/over skulderen — ansikter
aldri lesbare) gir menneskelig varme på forside og om-oss: `team:samarbeid-1` (4345106)
og `team:samarbeid-2` (7731371). Grensen står fast: stockmennesker presenteres aldri
med navn eller som «teamet vårt» — de illustrerer arbeidsformen.
