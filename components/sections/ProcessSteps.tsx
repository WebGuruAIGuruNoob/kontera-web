const steps = [
  {
    title: "Ring — eller send skjema",
    text: "Ta en uforpliktende prat på 960 00 400, eller send oss noen linjer om hva du ser etter. Ingen forpliktelser, ingen selgere.",
  },
  {
    title: "Vi finner ut om vi er en god match",
    text: "Vi tar en ærlig prat om behovet ditt, bransjen din og hvordan du liker å jobbe. Passer vi ikke, sier vi det — og peker deg gjerne i riktig retning.",
  },
  {
    title: "Vi ordner alt — også byttet",
    text: "Sier du ja, setter vi opp alt: systemer, tilganger og overføring fra dagens regnskapsfører. Du merker knapt overgangen før tallene er oppdaterte.",
  },
];

/** Prosess-seksjonen — adresserer byttebarrieren eksplisitt (MASTERPLAN §9). */
export function ProcessSteps({
  title = "Slik kommer du i gang",
}: {
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <p className="section-eyebrow text-center">Enkelt å starte — enkelt å bytte</p>
      <h2 className="mt-2 text-center font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
        {title}
      </h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative rounded-lg border border-line bg-white p-6 pt-8 shadow-card"
          >
            <span
              className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-blue font-display text-sm font-extrabold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-bold text-navy">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
