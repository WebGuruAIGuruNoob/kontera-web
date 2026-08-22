import { CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

const pairs = [
  {
    problem: "Jeg tør ikke ringe regnskapsføreren min — det koster 400 kr bare å spørre om noe.",
    solution:
      "Hos oss er korte spørsmål og små avklaringer alltid inkludert. Ring når du lurer på noe — det er sånn et samarbeid skal fungere.",
  },
  {
    problem: "Jeg får en ny saksbehandler hver gang, og må forklare bedriften min på nytt.",
    solution:
      "Du får én fast regnskapsfører som gjør hele regnskapet ditt og kjenner bedriften din i detalj — pluss en fast backup som også kjenner deg.",
  },
  {
    problem: "Tallene mine er alltid tre måneder gamle når jeg endelig får dem.",
    solution:
      "Vi fører løpende og holder tallene oppdaterte, så du kan ta beslutninger på ferske tall — ikke historie.",
  },
  {
    problem: "Jeg er redd for å ryke på en frist fra Skatteetaten.",
    solution:
      "Vi eier fristene dine: mva, a-melding, skattemelding, årsregnskap. Du skal aldri måtte tenke på en offentlig frist igjen.",
  },
];

/** Redaksjonell problem→løsning (DESIGNPLAN §3): serif-sitater, hairline-rader. */
export function ProblemSolution() {
  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <SectionHeading
        eyebrow="Kjenner du deg igjen?"
        title="Tør du ringe regnskapsføreren din?"
      />
      <div data-reveal-group className="mt-10 grid gap-x-12 gap-y-0 lg:grid-cols-2">
        {pairs.map((pair) => (
          <div key={pair.problem} className="border-t border-navy/10 py-7">
            <p className="font-display text-lg italic leading-snug text-navy [text-wrap:balance]">
              «{pair.problem}»
            </p>
            <div className="mt-3.5 flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <p className="max-w-[52ch] text-sm leading-relaxed text-slate">
                {pair.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
