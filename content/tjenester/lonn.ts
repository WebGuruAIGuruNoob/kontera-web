import type { TjenesteContent } from "@/lib/content-types";

export const lonn: TjenesteContent = {
  slug: "lonn",
  navn: "Lønnskjøring",
  tittel: "Lønnskjøring: riktig utbetalt, riktig innberettet — hver måned",
  metaTitle: "Lønnskjøring for små bedrifter | Kontera Regnskap",
  metaDescription:
    "Vi tar hele lønnskjøringen: lønnsberegning, a-melding, feriepenger, sykepenger og OTP. Fast lønnsansvarlig som kjenner bedriften din. Ring 960 00 400.",
  heroUndertekst:
    "Vi tar hele lønnskjøringen for deg: beregning, utbetalingsgrunnlag, a-melding, feriepenger og oppfølging mot NAV. Du får en fast lønnsansvarlig som kjenner bedriften og de ansatte, og en fast stedfortreder som kjenner den like godt.",
  kortBeskrivelse:
    "Komplett lønnskjøring med a-melding, feriepenger og refusjonskrav mot NAV – for deg med 1–20 ansatte.",
  ikon: "lonn",
  passerFor: [
    "Du har mellom én og tjue ansatte og bruker for mye tid på lønn, a-melding og reiseregninger",
    "Du vet at feil i lønn er kostbart, og at det svekker tilliten hos ansatte som venter på riktig utbetaling",
    "Du er usikker på reglene for feriepenger, skattetrekk og arbeidsgiveravgift, og vil ha et sikkert svar framfor å lete deg fram til det på egen hånd",
    "Du har hatt sykefravær og mistenker at bedriften går glipp av refusjoner fra NAV",
    "Du vil at lønnen skal håndteres av noen som gjør dette hver dag, og ikke som en oppgave du selv må rekke ved siden av driften",
  ],
  hvaInngar: [
    {
      tittel: "Lønnsberegning og utbetalingsgrunnlag",
      tekst:
        "Vi beregner lønn, tillegg, trekk og skatt for hver ansatt og sender deg et ferdig utbetalingsgrunnlag til godkjenning. Du godkjenner og betaler ut i nettbanken – eller lar oss legge betalingene klare der.",
    },
    {
      tittel: "A-melding hver måned",
      tekst:
        "Vi rapporterer lønn, skattetrekk og arbeidsgiveravgift i a-meldingen innen fristen den 5. hver måned. Riktig første gang, så du unngår tvangsmulkt og purringer fra Skatteetaten.",
    },
    {
      tittel: "Skattetrekk og arbeidsgiveravgift",
      tekst:
        "Vi trekker riktig skatt etter skattekortet og beregner arbeidsgiveravgift med riktig sats for din sone. Fra 2026 skal forskuddstrekket betales direkte til Skatteetaten ved hver lønnskjøring – det håndterer vi for deg.",
    },
    {
      tittel: "Feriepenger: opptjening, avsetning og utbetaling",
      tekst:
        "Vi beregner feriepengegrunnlaget gjennom året, setter av riktig beløp i regnskapet og kjører feriepengeutbetalingen med riktig sats og riktig trekk – uten overraskelser i juni.",
    },
    {
      tittel: "Sykepenger og refusjon fra NAV",
      tekst:
        "Blir noen syke, beregner vi sykepengene, holder oversikt over arbeidsgiverperioden og sender refusjonskrav til NAV innen fristen. Refusjon bedriften har krav på, skal ikke bli stående ukrevd.",
    },
    {
      tittel: "Reiseregninger, utlegg og OTP",
      tekst:
        "Vi håndterer reiseregninger og utlegg etter gjeldende satser, følger opp at pensjonsordningen (OTP) omfatter de riktige ansatte, og kontrollerer at innberetningen ved årsslutt stemmer krone for krone.",
    },
  ],
  seksjoner: [
    {
      tittel: "Slik foregår lønnskjøring hos Kontera",
      avsnitt: [
        "Hver måned sender du oss det som er nytt: timelister, overtid, nyansatte, endringer i stilling eller trekk. Har du fastlønn og få endringer, tar det deg et par minutter – og noen måneder trenger du ikke sende noe i det hele tatt.",
        "Vi beregner lønnen, kontrollerer skattetrekket og lager et utbetalingsgrunnlag som du godkjenner før noe betales ut. Lønnsslippene går digitalt til de ansatte, a-meldingen leveres innen fristen, og tallene lander rett i regnskapet. Fører vi regnskapet ditt også, henger alt sammen uten dobbeltarbeid.",
        "Du får en fast lønnsansvarlig som kjenner bedriften og de ansatte, og en fast stedfortreder som kan ta over ved ferie og sykdom. Lønn har en utbetalingsdato som ikke kan utsettes. Derfor er vi alltid to som kan kjøre lønnen din.",
      ],
    },
    {
      tittel: "A-meldingen: innhold, frist og konsekvenser ved feil",
      avsnitt: [
        "A-meldingen er månedsrapporten alle arbeidsgivere må sende til Skatteetaten, NAV og SSB. Fristen er den 5. i måneden etter lønnsutbetalingen – faller den på helg eller helligdag, er fristen første virkedag etter. Leverer du for sent eller med feil, risikerer du tvangsmulkt som løper dag for dag til feilen er rettet.",
        "Innholdet må også stemme: arbeidsforhold, stillingsprosent, permisjoner, lønnsarter og trekk. Feil her forplanter seg videre – til de ansattes skattemelding, til sykepengegrunnlaget hos NAV og til pensjonsopptjeningen. Derfor kontrollerer vi a-meldingen mot regnskapet hver måned før den sendes inn.",
        "Reglene endrer seg også. Fra 2026 avvikles ordningen med egen skattetrekkskonto, og forskuddstrekket skal betales direkte til Skatteetaten ved hver lønnskjøring. Slike endringer følger vi med på og innarbeider i rutinene dine, så de ikke først blir synlige som et gebyr.",
      ],
    },
    {
      tittel: "Feriepenger og skattetrekk – her skjer de vanligste feilene",
      avsnitt: [
        "Feriepenger tjenes opp året før de utbetales, og satsen er minst 10,2 prosent av feriepengegrunnlaget – 12 prosent hvis de ansatte har avtale om fem ukers ferie. Ansatte over 60 år har krav på en ekstra sats i tillegg. Typiske feil er at grunnlaget mangler bonuser og overtid, eller at satsen ikke stemmer med bedriftens ferieavtale.",
        "Skatten er et annet vanlig spørsmål: Feriepenger er skattepliktige, men det trekkes normalt ikke skatt når de utbetales – trekket er i stedet fordelt på årets øvrige lønnsutbetalinger. Blir dette gjort feil, ender det med etterberegning og unødige konflikter med de ansatte. Vi setter av riktig beløp løpende i regnskapet, slik at feriepengene verken gir avvik som må rettes i ettertid eller en likviditetsbelastning du ikke har planlagt for i juni.",
      ],
    },
    {
      tittel: "Sykepenger, NAV-refusjon og pensjon: plikter og refusjoner som er lette å overse",
      avsnitt: [
        "Som arbeidsgiver betaler du sykepenger de første 16 kalenderdagene av et sykefravær. Etter det overtar NAV – men bare hvis du krever refusjon, og kravet må sendes innen tre måneder. Fristen er absolutt: Blir den oversittet, faller kravet bort. Vi holder oversikt over fraværet, beregner riktig og sender kravene fortløpende.",
        "Forskutterer du lønn under sykdom eller foreldrepermisjon, følger vi opp refusjonene helt til pengene er utbetalt til bedriften. Og har en ansatt hyppig fravær på grunn av langvarig eller kronisk sykdom, hjelper vi deg å søke NAV om unntak fra arbeidsgiverperioden.",
        "Obligatorisk tjenestepensjon (OTP) er også et område med flere vanlige feilkilder. Som hovedregel skal alle ansatte over 13 år med rapporteringspliktig lønn meldes inn, og sparingen er minst 2 prosent fra første krone. Vi passer på at inn- og utmeldinger følger lønnen, og at grunnlaget pensjonsleverandøren bruker stemmer med det som er utbetalt.",
      ],
    },
  ],
  faq: [
    {
      q: "Hva er fristen for a-melding?",
      a: "Den 5. i måneden etter at lønnen er utbetalt. Faller den 5. på helg eller helligdag, er fristen første virkedag etter. Som kunde hos oss trenger du ikke huske den – vi holder oversikt over fristen og leverer i god tid.",
    },
    {
      q: "Når skal feriepengene utbetales?",
      a: "Hovedregelen i ferieloven er siste vanlige lønningsdag før ferien. De fleste bedrifter utbetaler alt i juni og trekker samtidig lønn for feriedagene. Vi setter opp den løsningen som passer din bedrift – og forklarer de ansatte hvordan den virker.",
    },
    {
      q: "Kan dere kjøre lønn selv om dere ikke fører regnskapet vårt?",
      a: "Ja. Lønn kan kjøpes som egen tjeneste. Noen starter med lønnen og lar oss ta regnskapet senere – andre beholder regnskapet et annet sted. Det avgjør du selv.",
    },
    {
      q: "Hvilket lønnssystem bruker dere?",
      a: "Vi jobber mest i Tripletex og Uni Micro, men kjenner de fleste andre systemene. Har du et lønnssystem du er fornøyd med, kan vi som regel jobbe videre i det.",
    },
    {
      q: "Hva koster det å sette bort lønnskjøringen?",
      a: "Prisen avhenger av antall ansatte og hvor ofte du kjører lønn. For små bedrifter veier de fleste kostnaden opp mot timene og risikoen ved å gjøre jobben selv. Se prissiden vår, eller ring 960 00 400 for et konkret estimat.",
    },
    {
      q: "Hva gjør dere hvis det blir feil i en lønnskjøring?",
      a: "Feil skal oppdages og rettes raskt. Vi korrigerer i neste kjøring eller med en ekstra kjøring, retter a-meldingen og gir beskjed til den det gjelder. Og fordi vi alltid er to som kjenner lønnen din, blir ingenting liggende til noen er tilbake fra ferie.",
    },
  ],
  relaterte: ["regnskapsforing", "arsoppgjor"],
};
