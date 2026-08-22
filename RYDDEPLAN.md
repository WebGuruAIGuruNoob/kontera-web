# RYDDEPLAN — mindre rot, mer ro på alle sider

> Plan for å gjøre designet ryddigere (Henriks feedback 2026-08-22: «litt mindre
> rotete, mer ryddig på alle sider»). Grunnlag: rot-revisjon av alle fem maler +
> ryddighetssystem med 12 håndhevbare regler — full audit i
> [data/rydde-audit.json](data/rydde-audit.json). Gjelder foran LØFTEPLAN ved motstrid.

---

## 0. Diagnosen: tre systemfeil — ikke enkeltseksjoner

1. **Løfte-inflasjon.** De fire kjerneløftene gjenfortelles av SEKS komponenter
   (ProblemSolution, PromiseSplit, GarantiBand, ComparisonTable, PricingSection,
   ProofStrip) pluss hero-undertekster. Målt: «2 statsautoriserte» sies 5 ganger på
   forsiden; «0 kr for korte spørsmål» 9 ganger. **Kanonisk hjem etter opprydding:**
   ProblemSolution (forside), ComparisonTable (kommune), PricingSection-inkludert (overalt).
2. **Duplikat-devices.** Hero-chips og ProofStrip sier ordrett det samme, 200 px fra
   hverandre — og tjeneste/bransje mangler chips mens geo har begge. **Én tillitsstripe
   på hele siten: hero-chips.** ProofStrip-komponenten dør.
3. **Hale-inflasjon.** Kommunesidens nedre halvdel er 6 generiske seksjoner på rad
   (~594 identiske boilerplate-ord × 357 sider) — det er både det visuelle rotet og
   en unødvendig senket unik-andel.

---

## 1. Kuttelisten per mal

| Mal | Nå → etter | Kuttes / slås sammen |
|---|---|---|
| **Forside** | 15 → 10 | ProofStrip (chips-duplikat) · hero-collagen (team-teaser har foto) · PromiseSplit (løftene bor i ProblemSolution) · StatBand-forsidevarianten (slagord i statistikk-kostyme — geo beholder den ekte) · GarantiBand · CtaBanner |
| **Kommune (357)** | 16 → 11 | ProofStrip · PromiseSplit · Arshjul (identisk på 357 sider; kan gjenoppstå som blokk på /tjenester/arsoppgjor) · GarantiBand · CtaBanner. **FLYTT:** NaeringsProfil ut av bento-featurecellen (sidens tetteste kort) og inn i den tomme høyrekolonnen i «Lokal innsikt» |
| **Fylke (15)** | 15 → 10 | ProofStrip · GarantiBand · PromiseSplit · ComparisonTable (venter på brukeren på neste klikk) · CtaBanner |
| **Tjeneste (6)** | 11 → 8 | CtaBanner · ComparisonTable (feil intensjon — brukeren evaluerer tjenesten, ikke byråvalget) · «Relaterte tjenester»-seksjonen slås inn som lenkerad i fagseksjonen. **FÅR:** hero-chips (tillitsstripen) |
| **Bransje (6)** | 10 → 7 | GarantiBand (generisk løfte som bryter bransjespissingen) · CtaBanner. **FÅR:** hero-chips |

**Komponenter som dør helt:** ProofStrip, PromiseSplit, GarantiBand, Arshjul (fra maler).
**Ordregnskap (verner kvalitetsporten):** tynneste kommuneside 2038 − ~328 kuttord ≈ **1710 ≥ 1500** ✓.
**ADVARSEL fra revisjonen:** unik-marginen er trangeste tall (min 362 mot krav 350 — 12 ords slingring): **ikke ett ord røres i data-unique-innhold.**
**CTA-regnskap:** stigen LeadCard(2) + pris(1) + final(1) + header = ≥5 `data-cta` ≥ krav 4 ✓ (ring-primær-modusen består).

## 2. Ryddighetssystemet (R1–R12)

| # | Regel | Kjerne-implementasjon |
|---|---|---|
| R1 | **Ett seksjonshode** | Ny `SectionHeading` (eyebrow → H2 `mt-2` → intro `mt-4 max-w-2xl`, tone light/dark) erstatter alle håndbygde hoder |
| R2 | **Luftskala i tre trinn** | `.section-y-sm/.section-y/.section-y-lg`-utilities; dagens drift (py-14×18, py-16±lg-trinn, py-8, py-4) normaliseres |
| R3 | **Flatebudsjett** | Maks 2 navy-flater før footer, maks 3 mist-bånd, aldri to fullbredde-bånd rygg mot rygg (kommune har i dag 16 tonebytter) |
| R4 | **Breddehierarki** | Kun `max-w-6xl` (seksjon) / `max-w-3xl` (prosa) / `max-w-2xl` (hode-intro via R1); 5xl-avvikene fjernes |
| R5 | **Elementbudsjett** | Maks 6 repeterte enheter synlig per seksjon; featurecellen slankes (NaeringsProfil-flyttingen) |
| R6 | **Bildestandard** | FramedImage i nøyaktig 3 plasseringer: splitkolonne (col-span-5, toppjustert), editorial-kolonnebilde, artikkel-toppbilde. Collage- og offsetvarianter utgår |
| R7 | **Typosanering** | Alle ad-hoc `text-[…rem]`-verdier erstattes av tokens; ÉN kort-H3-stil |
| R8 | **Italic-budsjett** | Serif-kursiv maks 2 steder per side: ett H1-nøkkelord + sitat-guillemets. (Forsiden har i dag 4+ italic-flater) |
| R9 | **CTA-stige med fast rytme** | LeadCard(hero) → PricingSection → FinalCta. Maks én CtaBanner per side — og etter kuttene: null |
| R10 | **Dekor-strykeliste** | Collage-stagger (translate-y), LeadCard mist-backdrop-forskyvning og andre dekorative offsets strykes — grid og luft gir roen |
| R11 | **Hairline-disiplin** | `border-y` kun der begge naboflater er papir; aldri dobbel strek ved tonebytte |
| R12 | **Håndhevelse i kode** | Ny `scripts/design-lint.mjs` i samme steg som kvalitetsporten: kilde-regex (R2/R4/R7/R8/R10 = 0 treff) + DOM-tellinger mot bygget HTML (R3-flater, R5-enheter, R6-figurer, R9-stige) — bryter bygget ved brudd |

## 3. Vern (urørlig under oppryddingen)

Kvalitetsportens krav og markører · alt `data-unique`-innhold (12-ords margin!) ·
H1 med «Regnskapsfører i {sted}» · breadcrumbs, kommunevelger, nabolenker og all intern
lenking · LeadCard + ring-primær-modus · FAQ i DOM · ekthetsregelen · JSON-LD.

## 4. Faser

| Fase | Innhold | Port |
|---|---|---|
| **R-A System** | SectionHeading, luftskala-utilities, R6-bildestandard, R10-strykeliste, R7/R8-sanering | Build grønn |
| **R-B Kutt** | Kuttelisten per mal + NaeringsProfil-flytting + chips til tjeneste/bransje; døde komponenter slettes | Kvalitetsport 357/357 |
| **R-C Lint** | `design-lint.mjs` skrives og kjøres — R3/R5/R6/R9 verifiseres maskinelt på bygget HTML | Lint grønn |
| **R-D Leveranse** | Visuell verifisering → commit → GitHub → Vercel | Deploy Ready |

**Forventet resultat:** 27–36 % færre seksjoner per side, tonebytter ned mot
flatebudsjettet, ett tillits-device, én løftefortelling per side — samme SEO-styrke,
samme CTA-stige, vesentlig roligere sider.
