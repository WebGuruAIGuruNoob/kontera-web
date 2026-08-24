import type { KommuneStats } from "@/lib/geo-stats";
import { tall } from "@/lib/geo-stats";

/**
 * DEN GODKJENTE BLOKK-KATALOGEN (MASTERPLAN §7.5).
 * Hver fagblokk er en navngitt, versjonert byggekloss som VELGES av kommunens
 * faktiske næringsdata (Brreg/SSB) og parameteriseres med lokale tall.
 * Alt annet innhold på geo-sidene skal være sideunikt.
 */

export type FagBlokk = {
  id: string;
  tittel: string;
  avsnitt: string[];
};

type Ctx = { navn: string; stats: KommuneStats };

export const industriBlokker: Record<
  string,
  { statKey: keyof KommuneStats; minAntall: number; bygg: (ctx: Ctx) => FagBlokk }
> = {
  bygg: {
    statKey: "bygg",
    minAntall: 8,
    bygg: ({ navn, stats }) => ({
      id: "bygg",
      tittel: `Bygg og håndverk står sterkt i ${navn} — og krever prosjektregnskap som stemmer`,
      avsnitt: [
        `Med ${tall(stats.bygg)} registrerte virksomheter innen bygg og anlegg er håndverksnæringen en betydelig del av næringslivet i ${navn}. For en byggmester eller håndverksbedrift er ikke regnskapet ferdig når bilagene er ført: Uten prosjektregnskap og etterkalkyle er det vanskelig å se hvilke jobber som gir margin, og hvilke som tærer på den.`,
        `Vi setter opp prosjektregnskap som viser lønnsomhet per jobb, håndterer timelister og lønn med varierende timer og overtid, og holder orden på det bransjespesifikke: HMS-kort, innleie og underentreprenører, igangværende arbeid ved årsskiftet og garantiarbeider. Vi kjenner også mva-skillene mellom arbeid på bolig og næringsbygg — et område der feil ofte fører til etterberegning av merverdiavgift.`,
        `Les mer om hvordan vi jobber med bransjen på siden vår om regnskap for håndverkere og byggebedrifter.`,
      ],
    }),
  },
  bil: {
    statKey: "bil",
    minAntall: 10,
    bygg: ({ navn, stats }) => ({
      id: "bil",
      tittel: `Bilbransjen i ${navn}: avansemetoden krever presis dokumentasjon`,
      avsnitt: [
        `${tall(stats.bil)} virksomheter i ${navn} driver med salg, deler eller verksted i bilbransjen — en næring der merverdiavgiftsreglene får direkte utslag på bunnlinjen. Selger du bruktbiler kjøpt fra privatpersoner eller tatt i innbytte, kan avansemetoden gi mva-beregning kun av avansen i stedet for av hele salgssummen. Metoden forutsetter at hvert kjøp og salg dokumenteres etter regelverkets krav; mangler i dokumentasjonen er en gjenganger ved bokettersyn.`,
        `Bruktbilregnskap er et av fagområdene vi kan best. Vi håndterer avansemetoden med de spesifikasjonskravene regelverket stiller, innbytte og lagerbiler, omregistrering, demobiler og garanti­avsetninger — og sørger for at hver enkelt bil er dokumentert slik Skatteetaten krever.`,
        `Driver du bilforhandler eller verksted i ${navn}, finner du mer på bransjesiden vår for bilforhandlere. Du kan også ringe oss direkte og få snakke med en regnskapsfører som kjenner næringen.`,
      ],
    }),
  },
  fiskeri: {
    statKey: "fiskeri",
    minAntall: 8,
    bygg: ({ navn, stats }) => ({
      id: "fiskeri",
      tittel: `Fiskeri og havbruk i ${navn}: særregler som må føres riktig`,
      avsnitt: [
        `Sjømatnæringen preger næringslivet i ${navn}, med ${tall(stats.fiskeri)} registrerte virksomheter innen fiske og akvakultur. Regnskap i denne næringen følger egne spor: særskilte fradragsordninger for fiskere, salgslag og oppgjørssedler, kvoteverdier, fartøy og avskrivninger — og sesongsvingninger som stiller krav til likviditetsstyringen gjennom året.`,
        `Vi hjelper fiskere og havbruksbedrifter med å holde orden på oppgjør og fradrag, planlegge for de tunge periodene og levere skattemelding med riktige næringsspesifikasjoner. Regnskapet settes opp slik at oppgjørssedler og særskilte fradrag lar seg dokumentere også i ettertid.`,
      ],
    }),
  },
  landbruk: {
    statKey: "landbruk",
    minAntall: 15,
    bygg: ({ navn, stats }) => ({
      id: "landbruk",
      tittel: `Landbruket i ${navn}: primærnæringsregnskap med egne regler`,
      avsnitt: [
        `Med ${tall(stats.landbruk)} registrerte virksomheter innen jordbruk og skogbruk er ${navn} en landbrukskommune — og landbruksregnskap er sitt eget fag. Jordbruksfradraget, gjennomsnittsligning for skogbruk, buskap og varelager, tilskuddsordninger og investeringer i driftsbygninger følger regler som krever en regnskapsfører med landbrukserfaring.`,
        `Vi fører regnskap for gårdsbruk og landbruksforetak med de særreglene næringen krever, og hjelper deg å utnytte fradragsmulighetene riktig — enten driften er hovednæring eller kombineres med annen virksomhet.`,
      ],
    }),
  },
  reiseliv: {
    statKey: "reiseliv",
    minAntall: 12,
    bygg: ({ navn, stats }) => ({
      id: "reiseliv",
      tittel: `Reiseliv og servering i ${navn}: sesongdrift krever styring`,
      avsnitt: [
        `${tall(stats.reiseliv)} virksomheter i ${navn} driver innen overnatting og servering. Bransjen har to regnskapsfaglige kjennetegn: delte mva-satser — overnatting med redusert sats, servering med full — og sesongsvingninger som gjør likviditetsplanlegging avgjørende gjennom lavsesongen.`,
        `Vi holder orden på satsene, kassaoppgjør og varelager, og setter opp rapporter som viser hvordan sesongen utvikler seg mens den pågår. Med oppdaterte tall kan du bemanne, kjøpe inn og investere på grunnlag av faktisk omsetning og margin.`,
      ],
    }),
  },
  eiendom: {
    statKey: "eiendom",
    minAntall: 15,
    bygg: ({ navn, stats }) => ({
      id: "eiendom",
      tittel: `Eiendomsselskapene i ${navn}: mva-valg med store konsekvenser`,
      avsnitt: [
        `Eiendom er en stor næring i ${navn} — ${tall(stats.eiendom)} registrerte virksomheter driver innen omsetning og drift av fast eiendom. Få bransjer har flere regnskapsvalg med varige konsekvenser: frivillig registrering i Merverdiavgiftsregisteret ved utleie til avgiftspliktige leietakere, justeringsreglene for mva ved byggetiltak, og skillet mellom vedlikehold og påkostning — som avgjør om kostnaden gir fradrag nå eller aktiveres over år.`,
        `Vi har lang erfaring med eiendomsselskaper og -forvaltere: fra single purpose-selskaper og konsernstrukturer til utleieregnskap og avskrivninger. Valgene bør tas bevisst tidlig, og vi går gjennom de skattemessige konsekvensene med deg før dere lander dem.`,
      ],
    }),
  },
  konsulent: {
    statKey: "konsulent",
    minAntall: 15,
    bygg: ({ navn, stats }) => ({
      id: "konsulent",
      tittel: `Kunnskapsbedriftene i ${navn}: enkel bokføring, viktige veivalg`,
      avsnitt: [
        `${navn} har et betydelig innslag av kunnskapsbedrifter — ${tall(stats.konsulent)} virksomheter innen IT, rådgivning og faglig tjenesteyting. For konsulenter og tjenestebedrifter er selve bokføringen ofte enkel: få bilag, ingen varelager. Verdien ligger i det rundt: riktig balanse mellom lønn og utbytte, forskuddsskatt som treffer, pensjon for deg selv, og fradragene du har krav på.`,
        `Du betaler etter omfanget på bokføringen, og får en rådgiver som går gjennom lønnsnivå, utbytte og pensjon med deg etter hvert som virksomheten vokser. Mange av kundene våre i denne kategorien startet som enkeltpersonforetak og driver i dag AS med ansatte.`,
      ],
    }),
  },
  handel: {
    statKey: "handel",
    minAntall: 25,
    bygg: ({ navn, stats }) => ({
      id: "handel",
      tittel: `Handelsbedriftene i ${navn}: varelager, kassasystem og marginer`,
      avsnitt: [
        `Handel er en bærebjelke i næringslivet i ${navn}, med ${tall(stats.handel)} registrerte virksomheter innen engros- og detaljhandel. Handelsregnskap hviler på tre forhold: varelager som telles og verdsettes riktig, kassasystem som oppfyller kassasystemlovens krav, og bruttomarginer du kan styre etter.`,
        `Vi setter opp regnskapet slik at du ser marginer per varegruppe, håndterer varetelling og svinn korrekt ved årsskiftet, og sørger for at kontantsalg og kortoppgjør avstemmes krone for krone. Selger du også på nett, kobler vi nettbutikk og betalingsløsninger direkte til regnskapet.`,
      ],
    }),
  },
  transport: {
    statKey: "transport",
    minAntall: 12,
    bygg: ({ navn, stats }) => ({
      id: "transport",
      tittel: `Transportnæringen i ${navn}: kostnadskontroll per kjøretøy`,
      avsnitt: [
        `${tall(stats.transport)} virksomheter i ${navn} driver innen transport og lagring. Lønnsomheten i næringen avgjøres av kontrollen på de løpende driftskostnadene: drivstoff, bompenger, vedlikehold og avskrivninger per kjøretøy, diett og kjøregodtgjørelse ført etter reglene, og løyver og forsikringer som skal henge sammen med regnskapet.`,
        `Vi setter opp kostnadsoppfølging per bil eller avdeling, holder orden på de bransjespesifikke fradragene, og gir deg rapportene som viser hvilke oppdrag og kjøretøy som lønner seg.`,
      ],
    }),
  },
};

/** Selskapsform-blokker — velges av ENK/AS-fordelingen i kommunen */
export function enkBlokk({ navn, stats }: Ctx): FagBlokk {
  return {
    id: "enk",
    tittel: `Mange driver enkeltpersonforetak i ${navn} — her er det viktigste å ha orden på`,
    avsnitt: [
      `${tall(stats.enk)} av virksomhetene i ${navn} er enkeltpersonforetak. Som ENK-innehaver er økonomien din og bedriftens økonomi tett vevd sammen: Du skatter løpende gjennom forskuddsskatt, leverer skattemelding med næringsspesifikasjon, og må selv holde orden på bokføringsplikten — også når omsetningen passerer mva-grensen og registrering i Merverdiavgiftsregisteret blir påkrevd.`,
      `Vi hjelper enkeltpersonforetak med akkurat så mye som du trenger: noen vil bare ha årsoppgjøret kvalitetssikret, andre vil at vi tar hele regnskapet. Og når driften vokser, går vi gjennom om det er på tide å gå over til AS — med en konkret kalkyle av hva det betyr for skatt, risiko og rettigheter.`,
    ],
  };
}

export function asBlokk({ navn, stats }: Ctx): FagBlokk {
  return {
    id: "as",
    tittel: `Aksjeselskapene i ${navn}: krav som må overholdes — og muligheter som bør brukes`,
    avsnitt: [
      `Med ${tall(stats.as)} registrerte aksjeselskaper er AS den dominerende selskapsformen i næringslivet i ${navn}. Et AS gir beskyttelse og fleksibilitet, men også forpliktelser: årsregnskap til Regnskapsregisteret, skattemelding levert gjennom godkjent system, aksjonærregisteroppgave og styredokumentasjon — pluss vurderingen av revisjonsplikt når selskapet vokser.`,
      `Vi tar hele pakken for aksjeselskaper: løpende regnskap, lønn til ansatte og eiere, utbyttevurderinger og hele årsoppgjøret med alle innleveringer. Du får én fast regnskapsfører som kjenner selskapet ditt — og som sier ifra i god tid før hver frist.`,
    ],
  };
}

/** Dynamikk-blokker — velges av nyetableringstakten */
export function oppstartBlokk({ navn, stats }: Ctx): FagBlokk {
  return {
    id: "oppstart",
    tittel: `${navn} har høy etableringstakt — kom riktig i gang fra dag én`,
    avsnitt: [
      `Det etableres mye i ${navn}: ${tall(stats.nyreg)} nye virksomheter er registrert bare de siste tolv månedene. Starter du ny bedrift, er de første valgene de viktigste — selskapsform, mva-registrering, regnskapssystem og rutiner som skalerer. Å rette opp i ettertid krever som regel mer arbeid enn å sette det opp riktig fra start.`,
      `Vi hjelper gründere i ${navn} med hele oppstarten: valg mellom ENK og AS, stiftelse, registreringer og et regnskapsoppsett som vokser med deg. Første samtale er uforpliktende, og du får en tydelig anbefaling før du bestemmer deg.`,
    ],
  };
}

export function etablertBlokk({ navn, stats }: Ctx): FagBlokk {
  return {
    id: "etablert",
    tittel: `Etablerte bedrifter i ${navn}: eierskap, struktur og verdier over tid`,
    avsnitt: [
      `Næringslivet i ${navn} preges av etablerte virksomheter — bedrifter som har vært i drift i årevis og bygget verdier over tid. For disse handler god økonomistyring om mer enn løpende bokføring: pensjon og lønn for eiere, strukturvalg som holding, og etter hvert spørsmålene om generasjonsskifte eller salg av virksomheten.`,
      `Når vi følger bedriften over tid, kjenner vi driften godt nok til å ta opp disse spørsmålene før de haster. Vi hjelper etablerte bedrifter i ${navn} med å sikre verdiene, skattemessig ryddig og i god tid.`,
    ],
  };
}
