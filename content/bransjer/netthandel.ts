import type { BransjeContent } from "@/lib/content-types";

export const netthandel: BransjeContent = {
  slug: "netthandel",
  navn: "Netthandel",
  tittel: "Netthandelsregnskap som stemmer – helt ned til siste gebyr",
  metaTitle: "Regnskap for nettbutikk og netthandel | Kontera Regnskap",
  metaDescription:
    "Nettbutikk? Vi avstemmer Klarna, Stripe og Vipps, kobler Shopify mot regnskapet og tar mva ved salg til utlandet. Ring 960 00 400 for en uforpliktende prat.",
  heroUndertekst:
    "Vi rigger nettbutikken din mot regnskapssystemet slik at salg, gebyrer og utbetalinger stemmer av seg selv – og du får en fast regnskapsfører som kan e-handel, ikke bare bilag.",
  kortBeskrivelse:
    "Avstemming av Klarna, Stripe og Vipps, integrasjon mot Shopify og mva ved salg til utlandet – rigget for høyt volum.",
  ikon: "handlekurv",
  smerter: [
    "Utbetalingene fra Klarna stemmer aldri med det jeg faktisk har solgt",
    "Jeg aner ikke om tallene i Shopify og tallene i regnskapet er de samme",
    "Returer og refusjoner roter til hele måneden",
    "Hva gjør jeg egentlig med mva når jeg selger til kunder i utlandet?",
    "Jeg bruker kveldene på å flytte ordrer inn i regnskapet manuelt",
  ],
  seksjoner: [
    {
      tittel: "Derfor stemmer ikke Klarna-utbetalingen med salget",
      avsnitt: [
        "Selger du gjennom Klarna, Stripe, Vipps eller PayPal, får du ikke betalt per ordre. Du får en samlet utbetaling noen dager etter salget – fratrukket gebyrer. Da er det fristende å føre beløpet som kommer inn på konto som omsetning. Det blir feil: Salget skal bokføres brutto på salgstidspunktet, gebyrene skal føres som kostnad, og utbetalingen er bare et oppgjør av pengene betalingsløsningen skylder deg.",
        "Derfor må hver betalingsløsning avstemmes hver måned: salget per kanal fra butikksystemet, mot utbetalinger og gebyrer fra leverandørens rapporter, mot det som faktisk kom inn i banken. Differanser har som regel en naturlig forklaring – salg i månedsskiftet som utbetales neste måned, refusjoner, chargebacks eller valuta. Men finner du dem ikke løpende, vokser de til et nøste ingen orker å nøste opp i ved årsslutt.",
        "Feilen koster mer enn rot. Fører du netto, blir både omsetning og kostnader for lave – da blir grunnlaget i mva-meldingen feil, og bruttomarginen din ser bedre ut enn den er. Du tror du tjener mer per ordre enn du gjør, og priser deretter.",
      ],
    },
    {
      tittel: "Systemoppsettet avgjør: riktig rigget er regnskapet nesten selvgående",
      avsnitt: [
        "Netthandelsregnskap er først og fremst et systemspørsmål. Shopify og WooCommerce kan kobles mot regnskapssystemer som Tripletex og Uni Micro, slik at salgsoppgjør flyter over automatisk – fordelt på betalingsmåte, med riktige mva-koder satt allerede i butikken. Da bokføres salget riktig i det øyeblikket det skjer, i stedet for å repareres i etterkant.",
        "Med høyt transaksjonsvolum skal du ikke bokføre hver enkelt ordre som eget bilag. Løsningen er samlede dagsoppgjør per salgskanal og betalingsmåte, mens butikksystemet tar vare på detaljene per ordre som underdokumentasjon. Det holder bokføringen sporbar slik bokføringsreglene krever – uten at regnskapet drukner i tusenvis av småposter.",
        "Poenget vårt er enkelt: Dette er en jobb du gjør grundig én gang. Er oppsettet riktig, koster ordre nummer tusen like lite regnskapsarbeid som ordre nummer ti. Er det feil, betaler du for manuell opprydding hver eneste måned – ofte uten å vite hva som egentlig er galt.",
      ],
    },
    {
      tittel: "Mva i nettbutikken – hjemme og over grensen",
      avsnitt: [
        "I Norge er hovedregelen grei: Du skal mva-registreres når avgiftspliktig omsetning passerer 50 000 kroner i løpet av tolv måneder, og de fleste varer selges med alminnelig sats på 25 prosent. Til forbrukere skal prisene i butikken vises med mva inkludert – mva-kodene i butikksystemet må derfor stemme fra første ordre.",
        "Selger du varer til kunder i utlandet, er utførselen fritatt for norsk mva. Men fritaket henger på dokumentasjonen: Du må kunne vise salgsdokument og at varen faktisk er sendt ut av landet, med utførselsdeklarasjon eller attest der det kreves. Mangler dokumentasjonen, kan Skatteetaten kreve norsk mva av salget – i praksis rett fra marginen din.",
        "Samtidig slipper ikke salget unna avgift – kjøperlandet vil som regel ha sin. Selger du til forbrukere i EU, finnes forenklede ordninger som IOSS, der du krever inn kjøperlandets mva i kassen for forsendelser opp til 150 euro og rapporterer samlet gjennom én registrering. Norge har en tilsvarende ordning, VOEC, for utenlandske butikker som selger hit. Regelverket er detaljert og avhenger av hvor og hvor mye du selger – dette går vi konkret gjennom med deg før du ekspanderer, ikke etterpå.",
      ],
    },
    {
      tittel: "Lager, returer og valuta – der marginene gjemmer seg",
      avsnitt: [
        "Vareforbruket ditt beregnes ut fra lagerbevegelsen: verdien du startet med, pluss innkjøp, minus verdien du sitter igjen med. Er lagerverdien feil, er bruttomarginen og resultatet feil – uansett hvor pent resten av regnskapet ser ut. Derfor må lageret telles minst en gang i året, per 31. desember, og varer som ikke lar seg selge til full pris skal skrives ned i regnskapet. Merk fellen: Skattemessig får du normalt ikke fradrag for nedskrivningen før varene faktisk er solgt eller kastet.",
        "Returer er en del av hverdagen i netthandel, og de skal krediteres ordentlig: kreditnota som reduserer både omsetning og mva-grunnlag i riktig periode. Er butikk, betalingsløsning og regnskap riktig koblet, skjer dette automatisk når du refunderer kunden. Er de ikke det, blir hver retur en manuell felle – og en differanse i neste avstemming.",
        "Selger du i euro, dollar eller svenske kroner, skal salget bokføres i norske kroner, og forskjellen mellom kurs på salgstidspunktet og kurs ved utbetaling blir valutagevinst eller -tap. Gebyrer trekkes gjerne i samme valuta. Også dette er ren rutine når systemet er rigget for det – og kilde til evig hodebry når det ikke er det.",
      ],
    },
  ],
  slikHjelperVi: [
    {
      tittel: "Avstemming av betalingsløsninger",
      tekst:
        "Vi avstemmer Klarna, Stripe, Vipps, PayPal og kortinnløser hver måned: salg mot utbetalinger, gebyrer og bank. Differanser fanges når de oppstår – ikke i årsoppgjøret.",
    },
    {
      tittel: "Systemoppsett og integrasjon",
      tekst:
        "Vi kobler Shopify eller WooCommerce mot Tripletex eller Uni Micro, setter riktige mva-koder i butikken og rigger automatiske dagsoppgjør. Målet er et regnskap som nesten fører seg selv.",
    },
    {
      tittel: "Mva – i Norge og ut av landet",
      tekst:
        "Vi leverer mva-meldingen, passer på dokumentasjonen for avgiftsfri utførsel og hjelper deg å vurdere hva som gjelder når du selger til forbrukere i utlandet.",
    },
    {
      tittel: "Lager og vareforbruk",
      tekst:
        "Vi setter opp rutiner for varetelling og lagerverdi, slik at vareforbruk og bruttomargin i regnskapet viser virkeligheten – ikke et anslag.",
    },
    {
      tittel: "Tall du kan styre butikken etter",
      tekst:
        "Rapporter som viser det som betyr noe i e-handel: omsetning per kanal, bruttomargin, gebyrer og returer. Forklart på vanlig norsk, uten at du må grave selv.",
    },
    {
      tittel: "Fast regnskapsfører som kan e-handel",
      tekst:
        "Du får én fast person som kjenner butikken din, pluss en fast backup som gjør det samme. Og korte spørsmål – «hvordan fører jeg denne refusjonen?» – koster aldri noe ekstra.",
    },
  ],
  faq: [
    {
      q: "Hvorfor stemmer ikke utbetalingen fra Klarna med det jeg har solgt?",
      a: "Fordi utbetalingen kommer etter fradrag for gebyrer, og gjerne noen dager etter salget. Salget skal bokføres brutto og gebyrene som kostnad – da stemmer alt, og avstemmingen viser hvor hver krone ble av.",
    },
    {
      q: "Kan dere koble nettbutikken min mot regnskapssystemet?",
      a: "Ja. Vi jobber mest i Tripletex og Uni Micro, som begge har gode integrasjoner mot Shopify og WooCommerce. Har du en annen kombinasjon, finner vi som regel en løsning der også.",
    },
    {
      q: "Må jeg bokføre hver eneste ordre?",
      a: "Nei. Med riktig oppsett bokføres samlede dagsoppgjør per salgskanal og betalingsmåte, mens butikksystemet tar vare på detaljene per ordre som dokumentasjon. Det er både lovlig og eneste fornuftige måte ved høyt volum.",
    },
    {
      q: "Skal jeg legge på norsk mva når jeg selger til utlandet?",
      a: "Vareeksport er fritatt for norsk mva, men du må kunne dokumentere at varen er sendt ut av landet. Samtidig kan kjøperlandet kreve sin avgift, for eksempel gjennom EU-ordninger som IOSS. Vi hjelper deg å finne ut hva som gjelder for akkurat ditt salg.",
    },
    {
      q: "Hvordan håndterer jeg returer og refusjoner i regnskapet?",
      a: "Hver retur skal krediteres med kreditnota som reduserer omsetning og mva i riktig periode. Er systemene riktig koblet, skjer det automatisk når du refunderer kunden – det er en av de første tingene vi rigger.",
    },
    {
      q: "Må jeg telle varelageret?",
      a: "Ja, minst én gang i året, per 31. desember. Uten riktig lagerverdi blir vareforbruk, bruttomargin og resultat feil. Vi gir deg telleliste og rutine, og hjelper deg å vurdere nedskrivning av varer som ikke lenger er salgbare til full pris.",
    },
  ],
  relaterteTjenester: ["regnskapsforing", "mva", "lonn"],
};
