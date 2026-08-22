import type { TjenesteContent } from "@/lib/content-types";

export const regnskapsforing: TjenesteContent = {
  slug: "regnskapsforing",
  navn: "Regnskapsføring",
  tittel: "Regnskapsføring med fast fører som kjenner bedriften din",
  metaTitle: "Regnskapsføring med fast regnskapsfører | Kontera Regnskap",
  metaDescription:
    "Løpende regnskapsføring med fast regnskapsfører som kjenner bedriften din. Alltid oppdaterte tall, alle frister overholdt – og ingen faktura for korte spørsmål. Ring 960 00 400.",
  heroUndertekst:
    "Du får én fast regnskapsfører som gjør hele regnskapet ditt og kjenner bedriften din. Vi tar fristene, du får oppdaterte tall – og korte spørsmål koster aldri noe ekstra.",
  kortBeskrivelse:
    "Løpende bokføring, avstemming og rapporter fra en fast regnskapsfører som kjenner deg.",
  ikon: "bok",
  passerFor: [
    "Du driver AS, enkeltpersonforetak eller ansvarlig selskap og vil bruke tiden på drift, ikke bilag",
    "Du vil ha én fast person å forholde deg til – ikke et sentralbord",
    "Du er lei av regnskapsfører som fakturerer for hver telefonsamtale",
    "Du vil ha oppdaterte tall å styre etter, ikke tall som er tre måneder gamle",
    "Du vurderer å bytte byrå, men gruer deg til overgangen (vi ordner den for deg)",
  ],
  hvaInngar: [
    {
      tittel: "Løpende bokføring",
      tekst:
        "Vi konterer og fører alle bilag fortløpende. Du leverer bilag slik det passer deg best – i appen, på e-post eller via EHF – så tar vi resten.",
    },
    {
      tittel: "Avstemming og etterkontroll",
      tekst:
        "Alle konti avstemmes jevnlig, med etterkontroll som fanger feil før de blir dyre. Banken, kunder og leverandører skal alltid stemme med regnskapet.",
    },
    {
      tittel: "Rapporter tilpasset deg",
      tekst:
        "Resultat, balanse og likviditet presentert slik at du faktisk får bruk for dem – enkelt når det holder, detaljert når du trenger det.",
    },
    {
      tittel: "Alle offentlige frister",
      tekst:
        "Mva-meldinger, a-meldinger og andre innleveringer sendes til rett tid. Du trenger aldri tenke på en frist fra Skatteetaten igjen.",
    },
    {
      tittel: "Fast kontaktperson + backup",
      tekst:
        "Regnskapsføreren din kjenner bedriften din i detalj – og en fast backup gjør det samme, så du aldri står uten hjelp i ferier eller ved sykdom.",
    },
    {
      tittel: "Fri tilgang til korte spørsmål",
      tekst:
        "«Kan jeg føre dette som fradrag?» «Hvordan bokfører jeg dette?» Ring eller skriv – korte spørsmål og små avklaringer fakturerer vi aldri for.",
    },
  ],
  seksjoner: [
    {
      tittel: "Slik fungerer løpende regnskap hos Kontera",
      avsnitt: [
        "Når du blir samarbeidspartner hos oss, får du en fast statsautorisert eller erfaren regnskapsfører som setter seg grundig inn i bedriften din: bransjen, systemene, rutinene og tallene. Det er samme person som fører regnskapet ditt måned etter måned – ikke en tilfeldig saksbehandler fra et køsystem.",
        "Bilagene leverer du digitalt når det passer deg. Vi jobber i moderne skybaserte systemer som Tripletex og Uni Micro, og har god kjennskap til de fleste andre regnskapsprogram og ERP-systemer. Bruker du allerede et system du trives med, kan vi som regel jobbe videre i det – du slipper å bytte.",
        "Deretter går regnskapet sin gang uten at du merker det: bokføring, avstemming, mva-melding, rapportering. Du får beskjed når noe krever en beslutning fra deg – ellers hører du fra oss med oppdaterte tall og et blikk på hvordan det går.",
      ],
    },
    {
      tittel: "Hvorfor et lite byrå ofte gir bedre regnskap",
      avsnitt: [
        "I store byråer er det gjerne systemet som eier kunden, ikke regnskapsføreren. Hos oss er det motsatt: Vi er seks ansatte, og hver av oss kjenner kundene sine godt. Det betyr at regnskapsføreren din ser sammenhengene i tallene dine – og reagerer når noe ser rart ut, i stedet for bare å taste videre.",
        "Det betyr også at terskelen for å ta kontakt er lav. Du ringer direkte til personen som fører regnskapet ditt, ikke til et sentralbord. Og fordi vi ikke fakturerer for korte spørsmål, trenger du aldri lure på om en femminutters telefon blir en post på neste faktura.",
      ],
    },
    {
      tittel: "Bytte regnskapsfører? Vi ordner overgangen",
      avsnitt: [
        "Mange blir værende hos et byrå de er misfornøyde med fordi byttet virker som styr. I praksis er det enkelt: Du sier opp hos dagens byrå (vi hjelper deg gjerne med formuleringen), og vi håndterer resten – overføring av saldobalanse, åpne poster, historikk og tilganger. Som regel merker du knapt overgangen.",
        "Beste tidspunkt å bytte er ved årsskiftet eller etter en mva-termin, men det går fint midt i året også. Ta en uforpliktende prat med oss, så legger vi en konkret plan for akkurat din situasjon.",
      ],
    },
    {
      tittel: "Hva koster løpende regnskapsføring?",
      avsnitt: [
        "Prisen avhenger av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. Vi ligger på et middels prisnivå – vi er ikke billigst, og det er et bevisst valg: Du betaler for en erfaren regnskapsfører som kjenner deg, ikke for et anonymt tastesenter. Se prissiden vår for konkrete fra-priser, eller ring oss så gir vi deg et estimat på minuttet.",
      ],
    },
  ],
  faq: [
    {
      q: "Må jeg bytte regnskapsprogram for å bli kunde hos dere?",
      a: "Som regel ikke. Vi jobber mest i Tripletex og Uni Micro, men har god kjennskap til de fleste systemer. Bruker du et system som fungerer, fortsetter vi gjerne i det.",
    },
    {
      q: "Hvor ofte får jeg rapporter?",
      a: "Det avtaler vi sammen – månedlig er vanligst. Du får rapportene forklart på vanlig norsk, og du kan alltid ringe for en gjennomgang uten at det koster ekstra.",
    },
    {
      q: "Hva skjer hvis regnskapsføreren min blir syk eller har ferie?",
      a: "Da tar backup-personen din over sømløst. Hos oss blir alltid to personer kjent med hver samarbeidspartner – det er en del av modellen vår, ikke en nødløsning.",
    },
    {
      q: "Fører dere regnskap for enkeltpersonforetak også?",
      a: "Ja. Vi fører regnskap for AS, enkeltpersonforetak og ansvarlige selskap, og hjelper deg også med å vurdere om selskapsformen din fortsatt er riktig for deg.",
    },
    {
      q: "Kan jeg gjøre deler av regnskapet selv?",
      a: "Absolutt. Noen kunder fakturerer selv og lar oss ta resten; andre leverer alt til oss. Vi setter opp arbeidsdelingen som passer deg – og justerer den når behovet endrer seg.",
    },
    {
      q: "Hvor raskt kan dere ta over regnskapet mitt?",
      a: "Vanligvis i løpet av et par uker. Har du frister som nærmer seg, prioriterer vi det som haster først, så ingenting går tapt i overgangen.",
    },
  ],
  relaterte: ["lonn", "arsoppgjor", "mva"],
};
