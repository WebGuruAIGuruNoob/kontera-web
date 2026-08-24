import type { BransjeContent } from "@/lib/content-types";

export const netthandel: BransjeContent = {
  slug: "netthandel",
  navn: "Netthandel",
  tittel: "Regnskap for netthandel. Klarna-oppgjøret skal stemme.",
  metaTitle: "Regnskap for nettbutikk og netthandel | Kontera Regnskap",
  metaDescription:
    "Regnskap for nettbutikk: vi avstemmer Klarna, Stripe og Vipps, kobler Shopify mot regnskapet og håndterer mva ved salg til utlandet. Ring 960 00 400.",
  heroUndertekst:
    "Vi kobler nettbutikken din til regnskapssystemet, så salg, gebyrer og utbetalinger avstemmes løpende — kanal for kanal, måned for måned. Du får en fast regnskapsfører med e-handel som spesialområde, og korte avklaringer underveis er inkludert i honoraret.",
  kortBeskrivelse:
    "Avstemming av Klarna, Stripe og Vipps, integrasjon mot Shopify og mva ved salg til utlandet – tilpasset høyt transaksjonsvolum.",
  ikon: "handlekurv",
  omtale: "nettbutikker",
  virksomhetsord: "nettbutikken din",
  smerter: [
    "Utbetalingene fra Klarna stemmer ikke med det du har solgt",
    "Shopify sier én ting om omsetningen din — regnskapet sier noe annet",
    "Returer og refusjoner skaper merarbeid gjennom hele måneden",
    "Du er usikker på hvordan mva skal håndteres ved salg til kunder i utlandet",
    "Du bruker kveldene på å flytte ordrer inn i regnskapet manuelt",
  ],
  seksjoner: [
    {
      tittel: "Utbetalingen er ikke omsetningen. Forskjellen må bokføres.",
      avsnitt: [
        "Selger du gjennom Klarna, Stripe, Vipps eller PayPal, får du ikke betalt per ordre. Du får en samlet utbetaling noen dager etter salget – fratrukket gebyrer. Da er det nærliggende å føre beløpet som kommer inn på konto som omsetning. Det blir feil: Salget skal bokføres brutto på salgstidspunktet, gebyrene skal føres som kostnad, og utbetalingen er bare et oppgjør av pengene betalingsløsningen skylder deg.",
        "Derfor må hver betalingsløsning avstemmes hver måned: salget per kanal fra butikksystemet, mot utbetalinger og gebyrer fra leverandørens rapporter, mot det som kom inn i banken. Differanser har som regel en naturlig forklaring – salg i månedsskiftet som utbetales neste måned, refusjoner, chargebacks eller valuta. Men finner du dem ikke løpende, hoper de seg opp til en tidkrevende opprydding ved årsslutt.",
        "Konsekvensen er større enn merarbeidet. Fører du netto, blir både omsetning og kostnader for lave – da blir grunnlaget i mva-meldingen feil, og bruttomarginen din ser bedre ut enn den er. Du legger til grunn en høyere inntjening per ordre enn den reelle, og priser deretter.",
      ],
    },
    {
      tittel: "Oppsettet gjøres riktig én gang. Det sparer deg hver måned.",
      avsnitt: [
        "Netthandelsregnskap er først og fremst et systemspørsmål. Shopify og WooCommerce kan kobles mot regnskapssystemer som Tripletex og Uni Micro, slik at salgsoppgjør flyter over automatisk – fordelt på betalingsmåte, med riktige mva-koder satt allerede i butikken. Da bokføres salget riktig i det øyeblikket det skjer, i stedet for å repareres i etterkant.",
        "Med høyt transaksjonsvolum skal du ikke bokføre hver enkelt ordre som eget bilag. Løsningen er samlede dagsoppgjør per salgskanal og betalingsmåte, mens butikksystemet tar vare på detaljene per ordre som underdokumentasjon. Det holder bokføringen sporbar slik bokføringsreglene krever, uten at regnskapet fylles med tusenvis av småposter.",
        "Dette er en jobb du gjør grundig én gang. Er oppsettet riktig, koster ordre nummer tusen like lite regnskapsarbeid som ordre nummer ti. Er det feil, betaler du for manuell opprydding hver måned, ofte uten å vite hvor avviket oppstår.",
      ],
    },
    {
      tittel: "Mva hjemme og over grensen. Dokumentasjonen avgjør.",
      avsnitt: [
        "Hovedregelen i Norge er klar: Du skal mva-registreres når avgiftspliktig omsetning passerer 50 000 kroner i løpet av tolv måneder, og de fleste varer selges med alminnelig sats på 25 prosent. Til forbrukere skal prisene i butikken vises med mva inkludert – mva-kodene i butikksystemet må derfor stemme fra første ordre.",
        "Selger du varer til kunder i utlandet, er utførselen fritatt for norsk mva. Men fritaket henger på dokumentasjonen: Du må kunne vise salgsdokument og at varen faktisk er sendt ut av landet, med utførselsdeklarasjon eller attest der det kreves. Mangler dokumentasjonen, kan Skatteetaten kreve norsk mva av salget – i praksis rett fra marginen din.",
        "Salget er likevel ikke avgiftsfritt i mottakerlandet. Selger du til forbrukere i EU, finnes forenklede ordninger som IOSS, der du krever inn kjøperlandets mva i kassen for forsendelser opp til 150 euro og rapporterer samlet gjennom én registrering. Norge har en tilsvarende ordning, VOEC, for utenlandske butikker som selger hit. Regelverket er detaljert og avhenger av hvor og hvor mye du selger. Dette går vi gjennom med deg før du utvider salget til nye markeder.",
      ],
    },
    {
      tittel: "Lager, returer og valuta. Der avgjøres bruttomarginen.",
      avsnitt: [
        "Vareforbruket ditt beregnes ut fra lagerbevegelsen: verdien du startet med, pluss innkjøp, minus verdien du sitter igjen med. Er lagerverdien feil, er bruttomarginen og resultatet feil, uansett hvor ryddig resten av regnskapet er. Derfor må lageret telles minst en gang i året, per 31. desember, og varer som ikke lar seg selge til full pris skal skrives ned i regnskapet. Vær oppmerksom på at du skattemessig normalt ikke får fradrag for nedskrivningen før varene er solgt eller kastet.",
        "Returer er en del av hverdagen i netthandel, og de skal krediteres ordentlig: kreditnota som reduserer både omsetning og mva-grunnlag i riktig periode. Er butikk, betalingsløsning og regnskap riktig koblet, skjer dette automatisk når du refunderer kunden. Er de ikke det, blir hver retur manuelt arbeid og en differanse i neste avstemming.",
        "Selger du i euro, dollar eller svenske kroner, skal salget bokføres i norske kroner, og forskjellen mellom kurs på salgstidspunktet og kurs ved utbetaling blir valutagevinst eller -tap. Gebyrer trekkes gjerne i samme valuta. Også dette er rutine når systemet er satt opp for det, og en kilde til manuelt merarbeid når det ikke er det.",
      ],
    },
  ],
  slikHjelperVi: [
    {
      tittel: "Avstemming av betalingsløsninger",
      tekst:
        "Vi avstemmer Klarna, Stripe, Vipps, PayPal og kortinnløser hver måned: salg mot utbetalinger, gebyrer og bank. Differanser fanges opp når de oppstår.",
    },
    {
      tittel: "Systemoppsett og integrasjon",
      tekst:
        "Vi kobler Shopify eller WooCommerce mot Tripletex eller Uni Micro, setter riktige mva-koder i butikken og setter opp automatiske dagsoppgjør. Målet er at mest mulig bokføres automatisk og riktig første gang.",
    },
    {
      tittel: "Mva – i Norge og ut av landet",
      tekst:
        "Vi leverer mva-meldingen, passer på dokumentasjonen for avgiftsfri utførsel og hjelper deg å vurdere hva som gjelder når du selger til forbrukere i utlandet.",
    },
    {
      tittel: "Lager og vareforbruk",
      tekst:
        "Vi setter opp rutiner for varetelling og lagerverdi, slik at vareforbruk og bruttomargin i regnskapet bygger på faktiske lagertall.",
    },
    {
      tittel: "Tall du kan styre butikken etter",
      tekst:
        "Rapporter som viser det som betyr noe i e-handel: omsetning per kanal, bruttomargin, gebyrer og returer. Forklart i klartekst, med kommentar til det som skiller seg ut.",
    },
    {
      tittel: "Fast regnskapsfører med e-handel som spesialområde",
      tekst:
        "Du snakker med den samme regnskapsføreren hver gang, og en fast stedfortreder kjenner butikken din like godt. Løpende avklaringer inngår i avtalen.",
    },
  ],
  faq: [
    {
      q: "Hvorfor stemmer ikke utbetalingen fra Klarna med det jeg har solgt?",
      a: "Fordi utbetalingen kommer etter fradrag for gebyrer, og gjerne noen dager etter salget. Salget skal bokføres brutto og gebyrene som kostnad. Da stemmer regnskapet, og avstemmingen viser hva som er utbetalt, hva som er trukket i gebyr og hva som fortsatt er til gode.",
    },
    {
      q: "Kan dere koble nettbutikken min mot regnskapssystemet?",
      a: "Ja. Vi jobber mest i Tripletex og Uni Micro, som begge har gode integrasjoner mot Shopify og WooCommerce. Har du en annen kombinasjon, finner vi som regel en løsning der også.",
    },
    {
      q: "Må jeg bokføre hver eneste ordre?",
      a: "Nei. Med riktig oppsett bokføres samlede dagsoppgjør per salgskanal og betalingsmåte, mens butikksystemet tar vare på detaljene per ordre som dokumentasjon. Det er i tråd med bokføringsreglene og den mest praktiske løsningen ved høyt volum.",
    },
    {
      q: "Skal jeg legge på norsk mva når jeg selger til utlandet?",
      a: "Vareeksport er fritatt for norsk mva, men du må kunne dokumentere at varen er sendt ut av landet. Samtidig kan kjøperlandet kreve sin avgift, for eksempel gjennom EU-ordninger som IOSS. Vi hjelper deg å finne ut hva som gjelder for akkurat ditt salg.",
    },
    {
      q: "Hvordan håndterer jeg returer og refusjoner i regnskapet?",
      a: "Hver retur skal krediteres med kreditnota som reduserer omsetning og mva i riktig periode. Er systemene riktig koblet, skjer det automatisk når du refunderer kunden – det er noe av det første vi setter opp.",
    },
    {
      q: "Må jeg telle varelageret?",
      a: "Ja, minst én gang i året, per 31. desember. Uten riktig lagerverdi blir vareforbruk, bruttomargin og resultat feil. Vi gir deg telleliste og rutine, og hjelper deg å vurdere nedskrivning av varer som ikke lenger er salgbare til full pris.",
    },
  ],
  relaterteTjenester: ["regnskapsforing", "mva", "lonn"],
};
