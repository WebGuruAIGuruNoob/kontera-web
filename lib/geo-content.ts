import type { Fylke, Kommune } from "@/lib/geo";
import { getStats, national, tall, type KommuneStats } from "@/lib/geo-stats";
import {
  industriBlokker,
  enkBlokk,
  asBlokk,
  oppstartBlokk,
  etablertBlokk,
  type FagBlokk,
} from "@/content/geo-blokker";
import type { FaqItem } from "@/lib/content-types";

/** Deterministisk variasjon: samme kommune gir alltid samme formulering. */
function seededIndex(seed: string, length: number): number {
  let hash = 7;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) % 100003;
  return hash % length;
}
function pick<T>(seed: string, options: T[]): T {
  return options[seededIndex(seed, options.length)];
}

const næringLabel: Partial<Record<keyof KommuneStats, string>> = {
  bygg: "bygg og anlegg",
  handel: "handel",
  eiendom: "eiendom",
  konsulent: "IT og rådgivning",
  reiseliv: "overnatting og servering",
  landbruk: "landbruk",
  fiskeri: "fiske og havbruk",
  transport: "transport",
  bil: "bilbransjen",
};

function sizeClass(pop: number | null): "storby" | "by" | "mellomstor" | "mindre" | "liten" {
  if (!pop) return "mindre";
  if (pop >= 50000) return "storby";
  if (pop >= 15000) return "by";
  if (pop >= 5000) return "mellomstor";
  if (pop >= 2000) return "mindre";
  return "liten";
}

/** Er kommunen i Konteras fysiske nærområde? */
function nærområde(fylkeSlug: string): boolean {
  return fylkeSlug === "oslo" || fylkeSlug === "akershus";
}

export type KommuneInnhold = {
  intro: string[];
  blokker: FagBlokk[];
  faq: FaqItem[];
  statCards: { label: string; value: string }[];
  topNæringer: { label: string; antall: number }[];
  stats: KommuneStats;
  /** H1 — inneholder ALLTID «Regnskapsfører i {navn}» (DESIGNPLAN §7b.2) */
  h1: string;
  /** Variert meta description med lokale datapunkter (§7b.11) */
  metaDescription: string;
  /** Lokalisert setning per tjeneste-slug (data-parameterisert, sideunik) */
  tjenesteSetninger: Record<string, string>;
  /** Bransjebetinget tjenesterekkefølge til bentoen */
  tjenesteRekkefolge: string[];
};

export function buildKommuneInnhold(
  fylke: Fylke,
  kommune: Kommune
): KommuneInnhold | null {
  const stats = getStats(kommune.nr);
  if (!stats) return null;
  const navn = kommune.visningsnavn;
  const seed = kommune.nr;

  /* --- Topp-næringer (til intro og stat-seksjon) --- */
  const næringer = (Object.keys(næringLabel) as (keyof KommuneStats)[])
    .filter((k) => k !== "handel" || stats.handel > 0)
    .map((key) => ({ key, label: næringLabel[key]!, antall: stats[key] as number }))
    .sort((a, b) => b.antall - a.antall);
  const topp3 = næringer.slice(0, 3).filter((n) => n.antall > 0);

  /* --- Betingede fagblokker: data velger innhold (MASTERPLAN §7.2) --- */
  const kandidater = Object.entries(industriBlokker)
    .map(([id, def]) => {
      const antall = stats[def.statKey] as number;
      const lokalAndel = stats.total > 0 ? antall / stats.total : 0;
      const nasjonalAndel = national.total > 0 ? (national[def.statKey] as number) / national.total : 0;
      const ratio = nasjonalAndel > 0 ? lokalAndel / nasjonalAndel : 0;
      return { id, def, antall, ratio };
    })
    .filter((k) => {
      if (k.antall < k.def.minAntall) return false;
      // Bil er Konteras spiss: kvalifiserer ved normal tilstedeværelse.
      if (k.id === "bil") return k.ratio >= 0.85;
      return k.ratio >= 1.15;
    })
    .sort((a, b) => {
      const boost = (x: typeof a) => (x.id === "bil" ? x.ratio * 1.3 : x.ratio);
      return boost(b) - boost(a);
    })
    .slice(0, 3);

  const blokker: FagBlokk[] = kandidater.map((k) => k.def.bygg({ navn, stats }));

  // Selskapsform-blokk: velges av ENK/AS-fordelingen mot landsgjennomsnittet
  const enkRatioLokal = stats.as > 0 ? stats.enk / stats.as : 99;
  const enkRatioNasjonal = national.as > 0 ? national.enk / national.as : 1;
  blokker.push(
    enkRatioLokal >= enkRatioNasjonal ? enkBlokk({ navn, stats }) : asBlokk({ navn, stats })
  );

  // Dynamikk-blokk: etableringstakt mot landsgjennomsnittet
  const nyregAndelLokal = stats.total > 0 ? stats.nyreg / stats.total : 0;
  const nyregAndelNasjonal = national.total > 0 ? national.nyreg / national.total : 0;
  blokker.push(
    nyregAndelLokal >= nyregAndelNasjonal
      ? oppstartBlokk({ navn, stats })
      : etablertBlokk({ navn, stats })
  );

  /* --- Unik intro: bygges av kommunens faktiske tall + varierte formuleringer --- */
  const klasse = sizeClass(stats.pop);
  const toppListe = topp3.map((n) => `${n.label} (${tall(n.antall)})`);
  const næringstekst =
    toppListe.length >= 2
      ? `De største næringene målt i antall virksomheter er ${toppListe.slice(0, -1).join(", ")} og ${toppListe[toppListe.length - 1]}.`
      : "";

  const åpning: Record<typeof klasse, string[]> = {
    storby: [
      `${navn} er en av Norges største kommuner, med ${tall(stats.pop)} innbyggere og et næringsliv på ${tall(stats.total)} registrerte virksomheter — fra enkeltpersonforetak til konsern.`,
      `Med ${tall(stats.total)} registrerte virksomheter og ${tall(stats.pop)} innbyggere er ${navn} et av landets største næringsområder, med stor bredde i bransjer og selskapsformer.`,
    ],
    by: [
      `${navn} har ${tall(stats.pop)} innbyggere og et aktivt næringsliv: ${tall(stats.total)} virksomheter er registrert i kommunen.`,
      `Med ${tall(stats.total)} registrerte virksomheter fordelt på ${tall(stats.pop)} innbyggere har ${navn} et næringsliv med bredde i både bransjer og selskapsformer.`,
    ],
    mellomstor: [
      `${navn} har ${tall(stats.pop)} innbyggere og ${tall(stats.total)} registrerte virksomheter, fordelt på alt fra enkeltpersonforetak til aksjeselskaper med ansatte.`,
      `I ${navn} bor det ${tall(stats.pop)} mennesker, og ${tall(stats.total)} virksomheter er registrert i kommunen — typisk små og mellomstore bedrifter med korte beslutningsveier.`,
    ],
    mindre: [
      `${navn} er en mindre kommune med ${tall(stats.pop)} innbyggere og ${tall(stats.total)} registrerte virksomheter, hvorav ${tall(stats.nyreg)} er registrert de siste tolv månedene.`,
      `Med ${tall(stats.pop)} innbyggere og ${tall(stats.total)} registrerte virksomheter er ${navn} et lokalsamfunn der små og mellomstore bedrifter står for mye av sysselsettingen.`,
    ],
    liten: [
      `${navn} er blant landets minste kommuner med sine ${tall(stats.pop)} innbyggere, og ${tall(stats.total)} virksomheter er registrert i kommunen. Bokførings- og rapporteringspliktene er de samme uansett kommunestørrelse.`,
      `Med ${tall(stats.pop)} innbyggere har ${navn} ${tall(stats.total)} registrerte virksomheter, og de skal levere de samme oppgavene til Skatteetaten og Brønnøysundregistrene som virksomheter i større kommuner.`,
    ],
  };

  const formTekst =
    enkRatioLokal >= enkRatioNasjonal
      ? pick(seed + "f", [
          `Enkeltpersonforetakene dominerer: ${tall(stats.enk)} ENK mot ${tall(stats.as)} aksjeselskaper. Det preger hva bedriftene i ${navn} trenger — ofte ryddig bokføring, skattemelding med næringsspesifikasjon og en regnskapsfører som er lett å få tak i når spørsmålene dukker opp.`,
          `Med ${tall(stats.enk)} enkeltpersonforetak og ${tall(stats.as)} aksjeselskaper er ENK den vanligste driftsformen i ${navn} — og behovet er ofte praktisk: orden i bokføringen, riktig skattemelding og lav terskel for å spørre om råd.`,
        ])
      : pick(seed + "f", [
          `Aksjeselskapene er i flertall: ${tall(stats.as)} AS mot ${tall(stats.enk)} enkeltpersonforetak. Det betyr flere formelle krav — årsregnskap til Regnskapsregisteret, aksjonærregisteroppgave og frister som må holdes gjennom hele året.`,
          `Næringslivet i ${navn} er AS-tungt, med ${tall(stats.as)} aksjeselskaper mot ${tall(stats.enk)} enkeltpersonforetak — selskaper med rapporteringsplikter som krever en regnskapsfører som ligger i forkant av fristene.`,
        ]);

  const kontera = nærområde(fylke.slug)
    ? kommune.slug === "baerum"
      ? `Kontera holder til her: Kontoret vårt på Jar ligger i Bærum, og mange av samarbeidspartnerne våre driver nettopp i denne kommunen. Du er velkommen innom Bjerkelundsveien 5, eller vi tar møtene digitalt. Bilag leverer du i appen, og du ringer regnskapsføreren din direkte når du trenger en avklaring — du får en fast regnskapsfører og en fast stedfortreder som kjenner bedriften like godt.`
      : kommune.slug === "gjerdrum"
        ? `Kontera holder til her: Kontoret vårt på Ask ligger midt i Gjerdrum, i Askheim 1F. Vi er en del av det lokale næringslivet selv, og du er velkommen innom kontoret når det passer deg. Mange av bedriftene vi fører regnskap for holder til i kommunen eller i nabokommunene, og vi kombinerer møter på kontoret med heldigital oppfølging i det daglige — med en fast regnskapsfører og en fast stedfortreder på hvert oppdrag.`
        : `Fra kontorene våre på Jar i Bærum og Ask i Gjerdrum er det kort vei til ${navn} — og enda kortere digitalt. Du velger selv: fysiske møter når det trengs, digital hverdag når det er mest effektivt. Uansett får du en fast regnskapsfører som kjenner bedriften din, og en fast stedfortreder som kjenner den like godt.`
    : pick(seed + "k", [
        `Kontera jobber digitalt med bedrifter over hele landet, også i ${navn}. Bilagene leverer du i appen, møtene tar vi på video, og du ringer regnskapsføreren din direkte — en fast person som kjenner bedriften din, med en fast stedfortreder som kjenner den like godt. Da står du fritt til å velge regnskapsfører ut fra kompetanse og oppfølging.`,
        `Stadig flere bedrifter i ${navn} velger regnskapsfører ut fra kompetanse og oppfølging framfor gateadresse. Kontera jobber heldigitalt med kunder i hele Norge: bilag i appen, møter på video og en fast regnskapsfører du ringer direkte, med en fast stedfortreder som trer inn ved ferie og sykdom.`,
      ]);

  const intro = [
    `${pick(seed + "a", åpning[klasse])} ${næringstekst}`,
    formTekst,
    kontera,
  ];

  /* --- Stat-kort --- */
  const statCards = [
    { label: "Registrerte virksomheter", value: tall(stats.total) },
    { label: "Aksjeselskaper", value: tall(stats.as) },
    { label: "Enkeltpersonforetak", value: tall(stats.enk) },
    { label: "Nye virksomheter siste 12 mnd", value: tall(stats.nyreg) },
    { label: "Innbyggere", value: tall(stats.pop) },
    { label: "Regnskapsvirksomheter i kommunen", value: tall(stats.regnskap) },
  ];

  /* --- Lokal FAQ: generelle spørsmål + datastyrte varianter --- */
  const blokkIds = new Set(blokker.map((b) => b.id));
  const faq: FaqItem[] = [
    {
      q: `Har Kontera kontor i ${navn}?`,
      unique: true,
      a:
        kommune.slug === "baerum"
          ? "Ja. Kontoret vårt på Jar ligger i Bærum kommune (Bjerkelundsveien 5, 1358 Jar). Du er velkommen innom, eller vi tar møtene digitalt."
          : kommune.slug === "gjerdrum"
            ? "Ja. Kontoret vårt på Ask ligger i Gjerdrum kommune (Askheim 1F, 2022 Gjerdrum). Ta gjerne kontakt på forhånd, så avtaler vi et tidspunkt."
            : `Vi har kontorer på Jar i Bærum og Ask i Gjerdrum, og jobber digitalt med bedrifter i ${navn} og resten av Norge. Bilag leveres i appen, møter tas på video, og du ringer regnskapsføreren din direkte.`,
    },
    {
      q: `Hva koster regnskapsfører i ${navn}?`,
      unique: true,
      a: `Prisen avhenger av bilagsmengde, antall ansatte og hvor mye du gjør selv — ikke av hvor i landet du holder til. Vi ligger i midtsjiktet på pris: vi konkurrerer ikke på laveste timepris, men på at du får en erfaren, fast regnskapsfører i et autorisert regnskapsforetak med statsautoriserte regnskapsførere. Korte spørsmål og småavklaringer er inkludert i honoraret. Ring oss, så får du et konkret estimat for din bedrift i ${navn}.`,
    },
    {
      q: `Hvilke tjenester leverer dere til bedrifter i ${navn}?`,
      a: `Alt en liten eller mellomstor bedrift trenger: løpende regnskapsføring, lønnskjøring, mva-melding, årsoppgjør og skattemelding, økonomisk rådgivning og hjelp til å starte selskap. Du får én fast regnskapsfører som tar helheten.`,
    },
    {
      q: `Hvordan bytter jeg regnskapsfører i ${navn}?`,
      a: `Selve overgangen krever lite av deg: du sier opp avtalen hos dagens byrå, så håndterer vi resten — saldobalanse, historikk, tilganger og systemoppsett. Beste tidspunkt er ved årsskiftet eller etter en mva-termin, men et bytte lar seg gjennomføre når som helst på året.`,
    },
    {
      q: `Hvor mange bedrifter finnes det i ${navn}?`,
      unique: true,
      a: `Per ${new Date().getFullYear()} er det ${tall(stats.total)} virksomheter registrert i ${navn} i Enhetsregisteret, fordelt på ${tall(stats.as)} aksjeselskaper, ${tall(stats.enk)} enkeltpersonforetak og andre organisasjonsformer. ${tall(stats.nyreg)} nye virksomheter er registrert de siste tolv månedene. (Kilde: Brønnøysundregistrene.)`,
    },
    ...(topp3.length >= 3
      ? [
          {
            q: `Hvilke bransjer dominerer næringslivet i ${navn}?`,
            unique: true,
            a: `Målt i antall registrerte virksomheter er de største næringene i ${navn} ${topp3[0].label} (${tall(topp3[0].antall)}), ${topp3[1].label} (${tall(topp3[1].antall)}) og ${topp3[2].label} (${tall(topp3[2].antall)}). Vi fører regnskap for bedrifter i alle tre næringene, og tilpasser kontoplan og rapportering til driften i den enkelte bedrift. (Kilde: Enhetsregisteret.)`,
          },
        ]
      : []),
    {
      q: "Passer dere for små bedrifter og enkeltpersonforetak?",
      a: `Ja — de fleste kundene våre er små og mellomstore bedrifter. Du betaler for det omfanget du trenger: noen vil bare ha årsoppgjøret, andre vil at vi tar hele regnskapet. Vi setter opp arbeidsdelingen som passer bedriften din.`,
    },
  ];

  if (blokkIds.has("bil")) {
    faq.push({
      q: `Kan dere avansemoms og bruktbilregnskap for forhandlere i ${navn}?`,
      a: "Ja. Bilbransjen er et av fagområdene vi kan best. Vi håndterer avansemetoden med alle spesifikasjonskrav, innbytte, lagerbiler og demobiler, og dokumenterer hver enkelt bil slik regelverket krever ved et bokettersyn. Se bransjesiden vår for bilforhandlere.",
    });
  }
  if (blokkIds.has("bygg")) {
    faq.push({
      q: `Kan dere prosjektregnskap for byggebedrifter i ${navn}?`,
      a: "Ja. Vi setter opp prosjektregnskap med etterkalkyle per jobb, håndterer timelister, innleie og igangværende arbeid — og kjenner mva-skillene i byggenæringen. Se bransjesiden vår for håndverkere.",
    });
  }
  if (blokkIds.has("landbruk")) {
    faq.push({
      q: "Fører dere landbruksregnskap?",
      a: "Ja, vi fører regnskap for gårdsbruk og landbruksforetak med næringens særregler — jordbruksfradrag, tilskudd og driftsbygninger — enten driften er hovednæring eller kombineres med annen virksomhet.",
    });
  }
  if (blokkIds.has("fiskeri")) {
    faq.push({
      q: "Kan dere regnskap for fiskeri og havbruk?",
      a: "Ja. Vi håndterer oppgjørssedler, særskilte fradrag for fiskere og sesongsvingningene næringen lever med — og leverer skattemelding med riktige næringsspesifikasjoner.",
    });
  }
  if (blokkIds.has("eiendom")) {
    faq.push({
      q: `Hjelper dere eiendomsselskaper i ${navn} med frivillig mva-registrering?`,
      a: "Ja. Frivillig registrering i Merverdiavgiftsregisteret ved utleie til avgiftspliktige leietakere, justeringsreglene og skillet mellom vedlikehold og påkostning er faste problemstillinger vi jobber med. Se bransjesiden vår for eiendom.",
    });
  }
  faq.push({
    q: "Jeg fører regnskapet selv — kan dere ta bare årsoppgjøret?",
    a: "Ja. Mange fører selv gjennom året og lar oss kvalitetssikre og levere årsoppgjør, skattemelding og aksjonærregisteroppgave. Det gir en ekstra kontroll før innlevering, samtidig som du beholder den løpende føringen selv.",
  });
  faq.push({
    q: "Hvilke regnskapssystemer jobber dere i?",
    a: "Mest Tripletex og Uni Micro, men vi har god kjennskap til de fleste regnskapsprogram og ERP-systemer. Bruker bedriften din et system som fungerer, fortsetter vi som regel i det — du slipper å bytte.",
  });
  faq.push({
    q: `Tar dere lønnskjøring for arbeidsgivere i ${navn}?`,
    a: "Ja — komplett lønnskjøring med lønnsslipper, a-melding hver måned, feriepenger, sykepengerefusjon og innberetning ved årsslutt. Samme faste regnskapsfører tar både regnskapet og lønnen, så alt henger sammen.",
  });

  /* --- H1: alltid «Regnskapsfører i {navn}» + varierende løfte (§7b.2) --- */
  const h1Varianter = [
    `Regnskapsfører i ${navn} — én fast kontaktperson, korte spørsmål inkludert`,
    `Regnskapsfører i ${navn} — vi holder oversikt over fristene dine`,
    `Regnskapsfører i ${navn} fra et autorisert regnskapsforetak`,
    `Regnskapsfører i ${navn} — én fast regnskapsfører og en fast stedfortreder`,
    `Regnskapsfører i ${navn} du kan ringe direkte`,
    `Regnskapsfører i ${navn} — heldigital hverdag, fysiske møter ved behov`,
    `Regnskapsfører i ${navn} som tar mva, lønn og årsoppgjør`,
    `Regnskapsfører i ${navn} — samme regnskapsfører hver gang du ringer`,
    `Regnskapsfører i ${navn}: løpende avklaringer inngår i avtalen`,
  ];
  if (blokkIds.has("bil")) h1Varianter.push(`Regnskapsfører i ${navn} med erfaring fra bilbransjen`);
  if (blokkIds.has("bygg")) h1Varianter.push(`Regnskapsfører i ${navn} med erfaring fra byggebransjen`);
  if (blokkIds.has("fiskeri")) h1Varianter.push(`Regnskapsfører i ${navn} med erfaring fra sjømatnæringen`);
  const h1 = pick(seed + "h1", h1Varianter);

  const metaDescription = pick(seed + "md", [
    `Regnskap, lønn og årsoppgjør for bedrifter i ${navn} — ${tall(stats.total)} virksomheter i kommunen. Fast regnskapsfører. Ring 960 00 400.`,
    `Regnskapsfører for bedrifter i ${navn}: ${tall(stats.as)} aksjeselskaper og ${tall(stats.enk)} enkeltpersonforetak. Korte spørsmål inkludert. Ring 960 00 400.`,
    `Regnskap, lønn og mva for bedrifter i ${navn} — flest innen ${topp3[0]?.label ?? "tjenesteyting"}. Fast kontaktperson. Ring 960 00 400.`,
    `Regnskapsfører i ${navn} — ${tall(stats.nyreg)} nye virksomheter siste år. Fast kontaktperson, korte spørsmål inkludert. Ring 960 00 400.`,
  ]);

  /* --- Lokaliserte tjenestesetninger (data-parameterisert, sideunik) --- */
  const asTung = enkRatioLokal < enkRatioNasjonal;
  const nyregHøy = nyregAndelLokal >= nyregAndelNasjonal;
  const tjenesteSetninger: Record<string, string> = {
    regnskapsforing: pick(seed + "t1", [
      `${tall(stats.total)} virksomheter er registrert i ${navn} — fra ENK til konsern. Vi tilpasser føringen til din.`,
      `Bedriftene i ${navn} spenner over ${tall(stats.total)} virksomheter — vi fører regnskap for alle selskapsformer.`,
    ]),
    lonn: asTung
      ? `Med ${tall(stats.as)} aksjeselskaper i ${navn} er lønn og a-melding en fast del av driften — vi kjører begge deler for deg.`
      : `Også små arbeidsgivere i ${navn} skal levere a-melding hver måned — vi kjører lønn, a-melding og innberetning.`,
    arsoppgjor: `${tall(stats.as)} aksjeselskaper i ${navn} skal levere årsregnskap og skattemelding — vi tar hele leveransen, klar i god tid før fristen.`,
    mva: blokkIds.has("reiseliv")
      ? `Reiseliv og servering i ${navn} har delte mva-satser — et regelverk vi kjenner godt.`
      : `Terminer, satser og fradrag for bedrifter i ${navn} — mva-meldingen levert til hver eneste frist.`,
    radgivning: nyregHøy
      ? `${tall(stats.nyreg)} nye virksomheter i ${navn} på tolv måneder — rådgivning tidlig i løpet sparer opprydding senere.`
      : `Etablerte bedrifter i ${navn} bruker oss som rådgiver på tall, drift og veivalg.`,
    "starte-selskap": `${tall(stats.nyreg)} nye virksomheter ble registrert i ${navn} siste år — vi hjelper deg gjennom stiftelse, registreringer og regnskapsoppsett.`,
  };

  /* --- Bransjebetinget tjenesterekkefølge (regnskapsforing er alltid featurecellen) --- */
  const rekkefolge = ["regnskapsforing", "lonn", "arsoppgjor", "mva", "radgivning", "starte-selskap"];
  const løft = (slug: string, pos: number) => {
    const i = rekkefolge.indexOf(slug);
    if (i > pos) {
      rekkefolge.splice(i, 1);
      rekkefolge.splice(pos, 0, slug);
    }
  };
  if (blokkIds.has("reiseliv") || blokkIds.has("bil")) løft("mva", 1);
  if (nyregHøy) løft("starte-selskap", 2);
  if (asTung) løft("lonn", 1);

  return {
    intro,
    blokker,
    faq,
    statCards,
    topNæringer: topp3,
    stats,
    h1,
    metaDescription,
    tjenesteSetninger,
    tjenesteRekkefolge: rekkefolge,
  };
}

/* ---------- Fylkesnivå ---------- */

export type FylkeInnhold = {
  intro: string[];
  aggregert: KommuneStats;
  statCards: { label: string; value: string }[];
  toppKommuner: { kommune: Kommune; total: number }[];
  blokker: FagBlokk[];
  faq: FaqItem[];
};

export function buildFylkeInnhold(fylke: Fylke): FylkeInnhold {
  const agg: KommuneStats = {
    pop: 0, total: 0, as: 0, enk: 0, nyreg: 0, bygg: 0, bil: 0, handel: 0,
    eiendom: 0, fiskeri: 0, landbruk: 0, reiseliv: 0, konsulent: 0, transport: 0, regnskap: 0,
  };
  const perKommune: { kommune: Kommune; total: number }[] = [];
  for (const kommune of fylke.kommuner) {
    const stats = getStats(kommune.nr);
    if (!stats) continue;
    perKommune.push({ kommune, total: stats.total });
    for (const key of Object.keys(agg) as (keyof KommuneStats)[]) {
      const value = stats[key];
      if (typeof value === "number") (agg[key] as number) = ((agg[key] as number) ?? 0) + value;
    }
  }
  const toppKommuner = [...perKommune].sort((a, b) => b.total - a.total).slice(0, 6);
  const navn = fylke.visningsnavn;

  const næringer = (Object.keys(næringLabel) as (keyof KommuneStats)[])
    .map((key) => ({ key, label: næringLabel[key]!, antall: agg[key] as number }))
    .sort((a, b) => b.antall - a.antall);
  const topp3 = næringer.slice(0, 3);

  const intro = [
    `${navn} har ${tall(agg.pop)} innbyggere fordelt på ${fylke.kommuner.length === 1 ? "én kommune" : `${fylke.kommuner.length} kommuner`}, og et næringsliv på ${tall(agg.total)} registrerte virksomheter. De største næringene er ${topp3.slice(0, -1).map((n) => `${n.label} (${tall(n.antall)})`).join(", ")} og ${topp3[topp3.length - 1].label} (${tall(topp3[topp3.length - 1].antall)}).`,
    `${tall(agg.as)} aksjeselskaper og ${tall(agg.enk)} enkeltpersonforetak driver i fylket, og bare de siste tolv månedene er ${tall(agg.nyreg)} nye virksomheter registrert. Bak hvert av disse tallene står en virksomhet med bokførings- og rapporteringsplikt, og frister som må holdes gjennom året. Det er den jobben vi tar.`,
    nærområde(fylke.slug)
      ? `Kontera holder til i regionen, med kontorer på Jar i Bærum og Ask i Gjerdrum. Vi møter deg gjerne fysisk, eller digitalt, som mange av kundene våre foretrekker i hverdagen.`
      : `Kontera jobber digitalt med bedrifter i hele ${navn}: bilag i appen, møter på video, og en fast regnskapsfører du ringer direkte — med en fast stedfortreder som trer inn ved ferie og sykdom. Velg kommunen din nedenfor for lokale tall og detaljer.`,
  ];

  const statCards = [
    { label: "Registrerte virksomheter", value: tall(agg.total) },
    { label: "Aksjeselskaper", value: tall(agg.as) },
    { label: "Enkeltpersonforetak", value: tall(agg.enk) },
    { label: "Nye virksomheter siste 12 mnd", value: tall(agg.nyreg) },
    { label: "Innbyggere", value: tall(agg.pop) },
    { label: "Kommuner", value: `${fylke.kommuner.length}` },
  ];

  const kandidater = Object.entries(industriBlokker)
    .map(([id, def]) => ({ id, def, antall: agg[def.statKey] as number }))
    .filter((k) => k.antall >= k.def.minAntall)
    .sort((a, b) => b.antall - a.antall)
    .slice(0, 2);
  const blokker = kandidater.map((k) => k.def.bygg({ navn, stats: agg }));

  const faq: FaqItem[] = [
    {
      q: `Leverer Kontera regnskapstjenester i hele ${navn}?`,
      a: `Ja — vi jobber digitalt med bedrifter i alle kommunene i ${navn}. Du får en fast regnskapsfører som kjenner bedriften din, uansett hvor i fylket du driver.`,
    },
    {
      q: `Hva koster regnskapsfører i ${navn}?`,
      a: "Prisen settes av bilagsmengde, ansatte og arbeidsdeling — ikke av geografi. Vi ligger i midtsjiktet på pris, i et autorisert regnskapsforetak med statsautoriserte regnskapsførere. Ring oss, så får du et konkret estimat for bedriften din.",
    },
    {
      q: `Hvor mange bedrifter finnes det i ${navn}?`,
      a: `${tall(agg.total)} virksomheter er registrert i ${navn} per i dag, fordelt på ${tall(agg.as)} aksjeselskaper og ${tall(agg.enk)} enkeltpersonforetak, pluss øvrige organisasjonsformer. (Kilde: Brønnøysundregistrene.)`,
    },
    {
      q: "Kan dere hjelpe meg å bytte fra dagens regnskapsfører?",
      a: "Ja. Vi håndterer overgangen fra dagens byrå: saldobalanse, historikk, tilganger og systemoppsett. Du sier opp avtalen, så tar vi den praktiske jobben.",
    },
  ];

  return { intro, aggregert: agg, statCards, toppKommuner, blokker, faq };
}
