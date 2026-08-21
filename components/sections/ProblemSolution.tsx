import { CheckIcon } from "@/components/sections/Hero";

const pairs = [
  {
    problem: "«Jeg tør ikke ringe regnskapsføreren min — det koster 400 kr bare å spørre om noe.»",
    solution:
      "Hos oss er korte spørsmål og små avklaringer alltid inkludert. Ring når du lurer på noe — det er sånn et samarbeid skal fungere.",
  },
  {
    problem: "«Jeg får en ny saksbehandler hver gang, og må forklare bedriften min på nytt.»",
    solution:
      "Du får én fast regnskapsfører som gjør hele regnskapet ditt og kjenner bedriften din i detalj — pluss en fast backup som også kjenner deg.",
  },
  {
    problem: "«Tallene mine er alltid tre måneder gamle når jeg endelig får dem.»",
    solution:
      "Vi fører løpende og holder tallene oppdaterte, så du kan ta beslutninger på ferske tall — ikke historie.",
  },
  {
    problem: "«Jeg er redd for å ryke på en frist fra Skatteetaten.»",
    solution:
      "Vi eier fristene dine: mva, a-melding, skattemelding, årsregnskap. Du skal aldri måtte tenke på en offentlig frist igjen.",
  },
];

export function ProblemSolution() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Kjenner du deg igjen?</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
          Regnskapsfører skal ikke være et taksameter
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pairs.map((pair) => (
          <div
            key={pair.problem}
            className="rounded-lg border border-line bg-white p-6 shadow-card"
          >
            <p className="italic leading-relaxed text-slate">{pair.problem}</p>
            <div className="mt-4 flex gap-3 border-t border-line pt-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold leading-relaxed text-navy">
                {pair.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
