import { site } from "@/data/site";

/**
 * Nummerert reise 1→2→3 (DESIGNPLAN §3, Linear/Conta-grepet).
 * Gjør «ikke kontor her» om til produktet og adresserer byttebarrieren.
 */
export function NumberedJourney({
  title = "Slik kommer du i gang",
  leadEnabled,
}: {
  title?: string;
  leadEnabled: boolean;
}) {
  const steps = [
    {
      title: leadEnabled ? "Send skjemaet — eller ring" : "Ring oss — eller send e-post",
      text: leadEnabled
        ? `Fortell oss kort hva du ser etter, eller ta praten direkte på ${site.phoneDisplay}. Ingen forpliktelser, ingen selgere.`
        : `Ta en uforpliktende prat på ${site.phoneDisplay}, eller skriv til ${site.email}. Ingen forpliktelser, ingen selgere.`,
    },
    {
      title: "Vi finner ut om vi er en god match",
      text: "En ærlig prat om behovet ditt, bransjen din og hvordan du liker å jobbe. Passer vi ikke, sier vi det — og peker deg gjerne videre.",
    },
    {
      title: "Vi ordner alt — også byttet",
      text: "Systemer, tilganger og hele overføringen fra dagens regnskapsfører. Du merker knapt overgangen før tallene er oppdaterte.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Enkelt å starte — enkelt å bytte</p>
        <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
          {title}
        </h2>
      </div>
      <ol data-reveal-group className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="relative border-t-2 border-navy/10 pt-6">
            <span
              aria-hidden="true"
              className="absolute -top-[1.4rem] left-0 bg-paper pr-3 font-display text-3xl font-bold text-azure"
            >
              {i + 1}
              <span className="ml-2 text-navy/25">→</span>
            </span>
            <h3 className="font-sans text-lg font-bold text-navy">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
