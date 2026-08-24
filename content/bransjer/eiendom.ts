import type { BransjeContent } from "@/lib/content-types";

export const eiendom: BransjeContent = {
  slug: "eiendom",
  navn: "Eiendom",
  tittel: "Regnskap for eiendom — frivillig mva-registrering og justeringsreglene",
  metaTitle: "Regnskap for eiendomsselskap | Kontera Regnskap",
  metaDescription:
    "Regnskapsfører med lang erfaring fra eiendom: frivillig mva-registrering, justeringsregler, avskrivninger og konsernstruktur. Ring 960 00 400.",
  heroUndertekst:
    "Vi har ført regnskap for eiendomsselskaper og forvaltere i mange år og kjenner områdene som krever mest presisjon: frivillig mva-registrering, justeringsreglene og grensen mellom vedlikehold og påkostning. Du får en fast regnskapsfører med eiendom som spesialområde, og korte spørsmål og småavklaringer er inkludert i honoraret.",
  kortBeskrivelse:
    "Regnskap for eiendomsselskap, utleiere og forvaltere – med kontroll på mva, avskrivninger og konsernstruktur.",
  ikon: "bygg",
  omtale: "eiendomsselskaper",
  virksomhetsord: "eiendomsselskapet ditt",
  smerter: [
    "Du er usikker på om husleien skal faktureres med eller uten mva",
    "Ingen har full oversikt over justeringsforpliktelsene, eller hva som skjer den dagen bygget selges",
    "Du vil ikke miste fradrag fordi alt aktiveres som påkostning for sikkerhets skyld",
    "Dere har mange små selskaper, og hvert årsoppgjør blir en heldagsjobb",
    "Banken vil ha tall per eiendom, mens rapportene viser bare totalen",
  ],
  seksjoner: [
    {
      tittel: "Mva på utleie: frivillig registrering er et valg med konsekvenser",
      avsnitt: [
        "Utleie av fast eiendom er i utgangspunktet unntatt fra mva. Baksiden er at du heller ikke får fradrag for mva på drift, vedlikehold og byggekostnader. For et næringsbygg med store kostnader betyr det at hele merverdiavgiften blir en ren kostnad – også i tilfeller der vilkårene for frivillig registrering er oppfylt.",
        "Leier du ut til leietakere som er registrert i Merverdiavgiftsregisteret og bruker lokalene i avgiftspliktig virksomhet, kan utleien frivillig registreres. Da fakturerer du husleie med mva og får fradrag for inngående mva på kostnadene. Er selskapet allerede ordinært registrert, holder det å tilkjennegi valget – altså behandle leieforholdet som avgiftspliktig i leiekontrakt og faktura. Ellers må du søke. Grunnvilkåret er leieinntekter fra registrerte leietakere over 50 000 kroner i løpet av tolv måneder, og det må foreligge en bindende leiekontrakt.",
        "Registreringen omfatter bare arealene som leies ut til avgiftspliktige leietakere. Har du et bygg med både butikk, legekontor og leiligheter, må du fordele arealer og kostnader – og dokumentere fordelingen. Boligutleie kan aldri inn i ordningen. Flytter en avgiftspliktig leietaker ut og en unntatt virksomhet inn, endres fradragsretten din. Dette er detaljer som avgjør store beløp, og de må håndteres løpende gjennom året.",
      ],
    },
    {
      tittel: "Justeringsreglene: mva-fradraget følger bygget i ti år",
      avsnitt: [
        "Har du bygget nytt, bygget på eller bygget om, og inngående mva på tiltaket var minst 100 000 kroner, er bygget en kapitalvare etter merverdiavgiftsloven. Da gjelder justeringsreglene i ti år fra byggetiltaket ble fullført: Endres bruken i perioden – ny leietaker uten mva-registrering, lokaler som gjøres om til bolig, eller salg av eiendommen – skal fradraget justeres opp eller ned for den gjenværende delen av perioden. Fradrag du tok for fem år siden, kan altså måtte betales tilbake.",
        "Ved salg kan hele den gjenværende justeringsforpliktelsen bli utløst på én gang. Den kan i stedet overføres til kjøper gjennom en justeringsavtale – men avtalen må ha riktig innhold og være på plass innen bestemte frister. I eiendomstransaksjoner er dette et fast punkt i oppgjøret, og feil her kan bli kostbart for selger.",
        "Alt dette krever en justeringsoppstilling per byggetiltak: kostnad, fradragsført mva, fradragsprosent og fullføringstidspunkt. Vår erfaring er at mange eiendomsselskaper mangler denne oversikten, og oppdager det først når bygget skal selges. Vi bygger og vedlikeholder oppstillingen som en del av det løpende regnskapet, så tallene ligger klare den dagen du trenger dem.",
      ],
    },
    {
      tittel: "Vedlikehold eller påkostning – grensen med størst skattemessig betydning",
      avsnitt: [
        "Grensen mellom vedlikehold og påkostning er trolig den enkeltvurderingen med størst skatteeffekt i eiendom. Vedlikehold – å føre bygget tilbake til den standen det har vært i tidligere – gir fullt fradrag med en gang. Påkostning – å heve bygget til en høyere standard eller endre det – må aktiveres og avskrives over mange år. For et forretningsbygg med 2 prosent saldoavskrivning er forskjellen i nåverdi betydelig.",
        "Vurderingen gjøres per arbeid, ikke per prosjekt, og dokumentasjonen underveis er avgjørende. Et rehabiliteringsprosjekt inneholder som regel begge deler, og da skal kostnadene splittes. Og gjør du endringsarbeider som erstatter vedlikehold som uansett måtte vært gjort, kan deler av kostnaden likevel gi direkte fradrag – såkalt tenkt vedlikehold. Aktiveres alt uten vurdering, går du glipp av fradrag du har krav på.",
        "Avskrivningene må også ligge i riktig saldogruppe: forretningsbygg avskrives med inntil 2 prosent, bygg og anlegg med inntil 4 prosent, og faste tekniske installasjoner – ventilasjon, heis, elektro, varme – med inntil 10 prosent. Tomta avskrives ikke i det hele tatt. Ved kjøp eller nybygg setter fordelingen av kostprisen på tomt, bygg og tekniske installasjoner rammene for alle framtidige avskrivninger. Fordelingen bør derfor være riktig allerede ved kjøpet.",
      ],
    },
    {
      tittel: "Single purpose, konsern og dokumentavgift",
      avsnitt: [
        "De fleste som eier flere eiendommer, legger hver eiendom i sitt eget single purpose-selskap under et holdingselskap. Det isolerer risiko, og det gjør at et salg kan gjennomføres som aksjesalg i stedet for eiendomssalg. Da skjer ingen tinglyst hjemmelsovergang, og kjøper slipper dokumentavgiften på 2,5 prosent av eiendomsverdien. For selger kan gevinst på aksjene være skattefri etter fritaksmetoden når aksjonæren er et selskap. Strukturen bør imidlertid være på plass i god tid – å endre den rett før et salg er både dyrere og mer risikabelt.",
        "Prisen for strukturen er flere regnskap: hvert selskap skal ha egen bokføring, eget årsregnskap og egen skattemelding, og mellomværender, felleskostnader og konsernbidrag skal henge sammen på tvers. Med gode rutiner og likt oppsett i alle selskapene blir dette effektivt. Vi fører flere slike konserner og vet hvor arbeidet kan effektiviseres uten at kvaliteten svekkes.",
        "Og før du kjøper neste eiendom: Vurder om den skal eies privat eller gjennom selskap. Utleie privat beskattes som kapitalinntekt så lenge aktiviteten ikke regnes som virksomhet – men ved et visst omfang blir det virksomhet med til dels betydelig høyere marginalskatt. Tommelfingerregelen er rundt fem boligenheter, og ved intensiv korttidsutleie kan grensen gå ved færre. Valget avhenger av omfang, belåning og hva du planlegger videre. Det er vesentlig enklere å velge riktig før kjøpet enn å flytte eiendommen etterpå.",
      ],
    },
  ],
  slikHjelperVi: [
    {
      tittel: "Riktig mva fra første faktura",
      tekst:
        "Vi vurderer frivillig registrering, setter opp riktig fakturering per leieforhold og holder orden på arealfordelingen i blandede bygg – med dokumentasjonen Skatteetaten forventer.",
    },
    {
      tittel: "Justeringsoppstilling per eiendom",
      tekst:
        "Vi dokumenterer hvert byggetiltak og følger justeringsforpliktelsene gjennom hele tiårsperioden, så du vet nøyaktig hva som står på spill ved leietakerbytte eller salg.",
    },
    {
      tittel: "Vedlikehold og påkostning riktig klassifisert",
      tekst:
        "Vi splitter rehabiliteringsprosjekter løpende, sørger for riktig saldogruppe på bygg og tekniske installasjoner, og passer på at du får fradragene du har krav på.",
    },
    {
      tittel: "Rapportering per eiendom",
      tekst:
        "Resultat og likviditet per bygg og per selskap, i tillegg til totalen. Tall du kan styre etter, og som er dokumentert godt nok til å legges fram for banken.",
    },
    {
      tittel: "Effektivt årsoppgjør for hele strukturen",
      tekst:
        "Vi tar årsregnskap og skattemelding for alle selskapene i konsernet med likt oppsett og god flyt, inkludert konsernbidrag og mellomværender som stemmer.",
    },
    {
      tittel: "Rådgivning ved kjøp, salg og omstrukturering",
      tekst:
        "Vi regner på privat eie mot selskap, bistår med kostprisfordeling ved kjøp og deltar i transaksjoner – i samspill med advokaten din der det trengs.",
    },
  ],
  faq: [
    {
      q: "Skal jeg fakturere husleien med eller uten mva?",
      a: "Utgangspunktet er uten mva. Men er utleien frivillig registrert og leietakeren bruker lokalene i mva-pliktig virksomhet, skal husleien faktureres med mva – og da får du også fradrag for mva på kostnadene. Vurderingen gjøres per leieforhold, ikke per bygg, så samme eiendom kan ha begge deler.",
    },
    {
      q: "Lønner det seg alltid å frivillig registrere utleien?",
      a: "Som regel ja når leietakeren er mva-pliktig, fordi du får fradrag for mva på drift og byggekostnader. Men det forplikter: riktig fakturering, arealdokumentasjon og justeringsoppfølging. Vi går gjennom leietakerne dine og anbefaler konkret hva som lønner seg for ditt bygg.",
    },
    {
      q: "Hva skjer med mva-fradraget hvis lokalet står tomt?",
      a: "Tomme lokaler utløser ikke justering i seg selv, men fradragsretten for løpende kostnader kan bli begrenset, og mye avhenger av hvem som flytter inn etterpå. Får du inn en leietaker uten mva-plikt, kan tidligere fradrag måtte justeres. Ta kontakt med oss før du signerer en ny leiekontrakt.",
    },
    {
      q: "Hva er forskjellen på vedlikehold og påkostning?",
      a: "Vedlikehold fører bygget tilbake til tidligere stand og gir fullt fradrag med en gang. Påkostning hever standarden eller endrer bygget og må avskrives over mange år – for forretningsbygg med bare 2 prosent i året. Et rehabiliteringsprosjekt inneholder ofte begge deler og skal splittes, med dokumentasjon per arbeid.",
    },
    {
      q: "Hva er en justeringsavtale, og når trenger jeg den?",
      a: "Selger du en eiendom med byggetiltak som er under ti år gamle, kan gjenværende mva-fradrag måtte tilbakebetales samlet. Med en justeringsavtale overtar kjøperen forpliktelsen i stedet. Avtalen må ha riktig innhold og komme på plass innen fristen – dette er et fast punkt i ethvert eiendomssalg vi bistår i.",
    },
    {
      q: "Vi har mange små single purpose-selskaper – blir ikke det dyrt med regnskapsfører?",
      a: "Kostnaden per selskap blir lavere enn mange regner med. Selskapene ligner på hverandre, og med likt oppsett og felles rutiner går hvert enkelt regnskap raskt. Fellesarbeidet gjøres én gang, og hvert selskap krever mindre arbeid enn et frittstående regnskap. Se prissiden vår, eller ring 960 00 400 så gir vi deg et konkret estimat.",
    },
  ],
  relaterteTjenester: ["regnskapsforing", "radgivning", "arsoppgjor"],
};
