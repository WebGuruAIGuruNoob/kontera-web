const milepæler = [
  {
    tid: "Januar",
    tittel: "Aksjonærregisteroppgaven",
    tekst: "Alle aksjeselskaper leverer aksjonærregisteroppgave innen utgangen av januar. Vi klargjør og leverer for selskapene vi fører.",
  },
  {
    tid: "Annenhver måned",
    tittel: "Mva-terminene",
    tekst: "Seks tomånedersterminer gjennom året. Vi kontrollerer, avstemmer og leverer mva-meldingen til hver eneste frist.",
  },
  {
    tid: "Hver måned",
    tittel: "A-melding og lønn",
    tekst: "Har du ansatte, kjører vi lønn og leverer a-melding innen fristen den 5. i påfølgende måned — hver måned, hele året.",
  },
  {
    tid: "Mai",
    tittel: "Skattemeldingen",
    tekst: "Skattemelding med næringsspesifikasjon leveres for både AS og ENK. Som samarbeidspartner hos oss er tallene klare i god tid.",
  },
  {
    tid: "Juni–juli",
    tittel: "Årsregnskapet",
    tekst: "Årsregnskapet fastsettes og sendes Regnskapsregisteret. Vi håndterer noter, styredokumenter og innsending.",
  },
  {
    tid: "Hele året",
    tittel: "Løpende sparring",
    tekst: "Oppdaterte tall, rapporter du forstår — og en regnskapsfører du kan ringe når som helst, uten taksameter.",
  },
];

/** Årshjulet: hva en bedrift må forholde seg til gjennom regnskapsåret. */
export function Arshjul({ stedsnavn }: { stedsnavn?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Regnskapsåret</p>
        <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
          Fristene vi tar ansvar for{stedsnavn ? ` — for bedrifter i ${stedsnavn}` : ""}
        </h2>
        <p className="mt-4 leading-relaxed text-slate">
          Et regnskapsår er en jevn strøm av frister. Dette er de viktigste —
          og som samarbeidspartner hos Kontera trenger du ikke huske en eneste
          av dem.
        </p>
      </div>
      <div data-reveal-group className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {milepæler.map((m) => (
          <div key={m.tittel} className="border-t border-navy/10 py-6">
            <p className="inline-block rounded-full bg-azure/12 px-2.5 py-0.5 font-sans text-[0.68rem] font-bold uppercase tracking-wider text-blue">
              {m.tid}
            </p>
            <h3 className="mt-2.5 font-sans text-base font-bold text-navy">{m.tittel}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate">{m.tekst}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
