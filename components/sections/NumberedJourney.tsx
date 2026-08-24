import { site } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Nummerert reise 1→2→3 (DESIGNPLAN §3, Linear/Conta-grepet).
 * Gjør «ikke kontor her» om til produktet og adresserer byttebarrieren.
 */
export function NumberedJourney({
  title = "Slik kommer du i gang — vi gjør det meste av jobben",
  leadEnabled,
}: {
  title?: string;
  leadEnabled: boolean;
}) {
  const steps = [
    {
      title: leadEnabled ? "Send skjemaet — eller ring" : "Ring oss — eller send e-post",
      text: leadEnabled
        ? `Fortell oss kort hva du ser etter, eller ring oss direkte på ${site.phoneDisplay}. Du snakker med en regnskapsfører, og samtalen forplikter deg ikke.`
        : `Ring ${site.phoneDisplay}, eller skriv til ${site.email}. Du snakker med en regnskapsfører, og samtalen forplikter deg ikke.`,
    },
    {
      title: "Vi vurderer sammen om vi passer for deg",
      text: "En åpen samtale om behovet ditt, bransjen din og hvordan du liker å jobbe. Passer vi ikke, sier vi fra og henviser deg gjerne videre.",
    },
    {
      title: "Vi håndterer overgangen fra dagens byrå",
      text: "Systemer, tilganger og hele overføringen fra dagens regnskapsfører. Overgangen krever lite av deg, og du får beskjed når noe trenger din signatur.",
    },
  ];

  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow="Oppstart og bytte" title={title} />
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
