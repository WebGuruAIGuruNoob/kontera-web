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
        `Med ${tall(stats.bygg)} registrerte virksomheter innen bygg og anlegg er håndverksnæringen en betydelig del av næringslivet i ${navn}. For en byggmester eller håndverksbedrift er ikke regnskapet ferdig når bilagene er ført: Uten prosjektregnskap og etterkalkyle vet du ikke hvilke jobber du faktisk tjener penger på — og hvilke som spiser marginen din.`,
        `Vi setter opp prosjektregnskap som viser lønnsomhet per jobb, håndterer timelister og lønn med varierende timer og overtid, og holder styr på det bransjespesifikke: HMS-kort, innleie og underentreprenører, igangværende arbeid ved årsskiftet og garantiarbeider. Vi kjenner også mva-skillene mellom arbeid på bolig og næringsbygg — et område der feil fort blir dyrt.`,
        `Les mer om hvordan vi jobber med bransjen på siden vår om regnskap for håndverkere og byggebedrifter.`,
      ],
    }),
  },
  bil: {
    statKey: "bil",
    minAntall: 10,
    bygg: ({ navn, stats }) => ({
      id: "bil",
      tittel: `Bilbransjen i ${navn}: avansemoms er forskjellen på god og dårlig margin`,
      avsnitt: [
        `${tall(stats.bil)} virksomheter i ${navn} driver med salg, deler eller verksted i bilbransjen — og få bransjer har et mva-regelverk der riktig føring betyr mer for bunnlinjen. Selger du bruktbiler kjøpt fra privatpersoner eller tatt i innbytte, kan avansemetoden gi deg mva-beregning kun av avansen i stedet for av hele salgssummen. Brukt riktig er det et betydelig konkurransefortrinn; brukt feil er det en gjenganger i bokettersyn.`,
        `Bruktbilregnskap er Konteras dypeste spisskompetanse. Vi håndterer avansemoms med de spesifikasjonskravene regelverket stiller, innbytte og lagerbiler, omregistrering, demobiler og garanti­avsetninger — og passer på at hver eneste bil er dokumentert slik Skatteetaten forventer.`,
        `Driver du bilforhandler eller verksted i ${navn}? Se bransjesiden vår for bilforhandlere, eller ring oss direkte — dette er faget vårt.`,
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
        `Vi hjelper fiskere og havbruksbedrifter med å holde orden på oppgjør og fradrag, planlegge for de tunge periodene og levere skattemelding med riktige næringsspesifikasjoner. Du fisker — vi tar tallene.`,
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
        `Med ${tall(stats.landbruk)} registrerte virksomheter innen jordbruk og skogbruk er ${navn} en landbrukskommune — og landbruksregnskap er sitt eget fag. Jordbruksfradraget, gjennomsnittsligning for skogbruk, buskap og varelager, tilskuddsordninger og investeringer i driftsbygninger følger regler som et generalistbyrå sjelden er borti.`,
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
        `${tall(stats.reiseliv)} virksomheter i ${navn} driver innen overnatting og servering. Bransjen har to regnskapsfaglige kjennetegn: delte mva-satser — overnatting med redusert sats, servering med full — og sesongsvingninger som gjør likviditetsplanlegging til forskjellen på en trygg vinter og en tøff en.`,
        `Vi holder orden på satsene, kassaoppgjør og varelager, og setter opp rapporter som viser hvordan sesongen faktisk går — mens den går. Med riktige tall kan du bemanne, kjøpe inn og investere etter virkeligheten, ikke magefølelsen.`,
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
        `Eiendom er en stor næring i ${navn} — ${tall(stats.eiendom)} registrerte virksomheter driver innen omsetning og drift av fast eiendom. Få bransjer har flere regnskapsvalg med varige konsekvenser: frivillig registrering i Mva-registeret ved utleie til avgiftspliktige leietakere, justeringsreglene for mva ved byggetiltak, og det evige skillet mellom vedlikehold og påkostning — som avgjør om kostnaden gir fradrag nå eller aktiveres over år.`,
        `Vi har lang erfaring med eiendomsselskaper og -forvaltere: fra single purpose-selskaper og konsernstrukturer til utleieregnskap og avskrivninger. Riktige valg tidlig sparer betydelige beløp senere — og vi hjelper deg å ta dem.`,
      ],
    }),
  },
  konsulent: {
    statKey: "konsulent",
    minAntall: 15,
    bygg: ({ navn, stats }) => ({
      id: "konsulent",
      tittel: `Kunnskapsbedriftene i ${navn}: enkelt regnskap, verdifull rådgivning`,
      avsnitt: [
        `${navn} har et betydelig innslag av kunnskapsbedrifter — ${tall(stats.konsulent)} virksomheter innen IT, rådgivning og faglig tjenesteyting. For konsulenter og tjenestebedrifter er selve bokføringen ofte enkel: få bilag, ingen varelager. Verdien ligger i det rundt: riktig balanse mellom lønn og utbytte, forskuddsskatt som treffer, pensjon for deg selv, og fradragene du faktisk har krav på.`,
        `Hos oss betaler du ikke konsulentpriser for enkel bokføring — men du får en sparringspartner som hjelper deg å ta de smarte valgene etter hvert som virksomheten vokser. Mange av samarbeidspartnerne våre i denne kategorien startet som enkeltpersonforetak og driver i dag AS med ansatte.`,
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
        `Handel er en bærebjelke i næringslivet i ${navn}, med ${tall(stats.handel)} registrerte virksomheter innen engros- og detaljhandel. Handelsregnskap står og faller på tre ting: varelager som telles og verdsettes riktig, kassasystem som oppfyller kassasystemlovens krav, og bruttomarginer du faktisk kan styre etter.`,
        `Vi setter opp regnskapet slik at du ser marginer per varegruppe, håndterer varetelling og svinn korrekt ved årsskiftet, og sørger for at kontantsalg og kortoppgjør stemmer på øret. Selger du også på nett, kobler vi nettbutikk og betalingsløsninger rett mot regnskapet.`,
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
        `${tall(stats.transport)} virksomheter i ${navn} driver innen transport og lagring. I transportbransjen ligger lønnsomheten i detaljene: drivstoff, bompenger, vedlikehold og avskrivninger per kjøretøy, diett og kjøregodtgjørelse ført etter reglene, og løyver og forsikringer som skal henge sammen med regnskapet.`,
        `Vi setter opp kostnadsoppfølging per bil eller avdeling, holder orden på de bransjespesifikke fradragene, og gir deg rapportene som viser hvilke oppdrag og kjøretøy som faktisk lønner seg.`,
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
      `${tall(stats.enk)} av virksomhetene i ${navn} er enkeltpersonforetak. Som ENK-innehaver er økonomien din og bedriftens økonomi tett vevd sammen: Du skatter løpende gjennom forskuddsskatt, leverer skattemelding med næringsspesifikasjon, og må selv holde orden på bokføringsplikten — også når omsetningen passerer mva-grensen og registrering i Mva-registeret blir påkrevd.`,
      `Vi hjelper enkeltpersonforetak med akkurat så mye som du trenger: noen vil bare ha årsoppgjøret kvalitetssikret, andre vil slippe alt. Og når driften vokser, hjelper vi deg å vurdere om det er på tide å gå over til AS — med en ærlig kalkyle av hva det betyr for skatt, risiko og rettigheter.`,
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
      `Det etableres mye i ${navn}: ${tall(stats.nyreg)} nye virksomheter er registrert bare de siste tolv månedene. Starter du ny bedrift, er de første valgene de viktigste — selskapsform, mva-registrering, regnskapssystem og rutiner som skalerer. Feil her koster mer å rette senere enn å gjøre riktig fra start.`,
      `Vi hjelper gründere i ${navn} med hele oppstarten: valg mellom ENK og AS, stiftelse, registreringer og et regnskapsoppsett som vokser med deg. Første prat er uforpliktende — og ofte det billigste rådet du noen gang får.`,
    ],
  };
}

export function etablertBlokk({ navn, stats }: Ctx): FagBlokk {
  return {
    id: "etablert",
    tittel: `Etablerte bedrifter i ${navn}: fra drift til verdier som varer`,
    avsnitt: [
      `Næringslivet i ${navn} preges av etablerte virksomheter — bedrifter som har driftet i årevis og bygget verdier over tid. For disse handler god økonomistyring om mer enn løpende bokføring: pensjon og lønn for eiere, strukturvalg som holding, og etter hvert spørsmålene om generasjonsskifte eller salg av virksomheten.`,
      `Som fast samarbeidspartner kjenner vi bedriften din godt nok til å se disse behovene før de haster. Vi hjelper etablerte bedrifter i ${navn} med å sikre verdiene — skattemessig ryddig og i god tid.`,
    ],
  };
}
