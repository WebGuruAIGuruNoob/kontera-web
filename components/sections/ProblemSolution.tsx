import { CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

const pairs = [
  {
    problem: "Du lar være å ringe regnskapsføreren om en kort avklaring, fordi hver henvendelse blir fakturert.",
    solution:
      "Korte spørsmål og småavklaringer er inkludert i honoraret. Du kan ta kontakt om en kort avklaring uten at det utløser en faktura.",
  },
  {
    problem: "Du får en ny saksbehandler hver gang og må forklare bedriften på nytt.",
    solution:
      "Du snakker med den samme regnskapsføreren hver gang — én som kjenner bedriften og historikken i tallene. En fast stedfortreder kjenner også bedriften din, slik at du ikke står uten hjelp ved ferie eller sykdom.",
  },
  {
    problem: "Tallene er tre måneder gamle når du endelig får dem.",
    solution:
      "Vi fører løpende gjennom året og avstemmer underveis, slik at du kan ta beslutninger på oppdaterte tall.",
  },
  {
    problem: "Du er usikker på om alle frister overfor Skatteetaten blir holdt.",
    solution:
      "Vi holder oversikt over fristene dine — mva, a-melding, skattemelding og årsregnskap — og sørger for at leveransene er klare i god tid før forfall. Du får beskjed når noe krever din signatur eller godkjenning.",
  },
];

/** Redaksjonell problem→løsning (DESIGNPLAN §3): serif-innledning, hairline-rader. */
export function ProblemSolution() {
  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <SectionHeading
        eyebrow="Vanlige utfordringer"
        title="Det vi oftest hører fra bedrifter som vil bytte"
      />
      <div data-reveal-group className="mt-10 grid gap-x-12 gap-y-0 lg:grid-cols-2">
        {pairs.map((pair) => (
          <div key={pair.problem} className="border-t border-navy/10 py-7">
            <p className="font-display text-lg leading-snug text-navy [text-wrap:balance]">
              {pair.problem}
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
