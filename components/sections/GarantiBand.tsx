/**
 * Typografisk pull-quote-brudd (LØFTEPLAN funn 6): egne løfter som store
 * serif-sitater — ALDRI kundesitater (ekthetsregelen). Varieres deterministisk.
 */
const garantier = [
  "Korte spørsmål koster aldri noe ekstra. Det er sånn et samarbeid skal fungere.",
  "Én fast regnskapsfører gjør hele regnskapet ditt — og en backup kjenner deg like godt.",
  "Fristene til Skatteetaten er vårt ansvar. Du skal aldri måtte tenke på dem igjen.",
];

function seededIndex(seed: string, length: number): number {
  let hash = 7;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) % 100003;
  return hash % length;
}

export function GarantiBand({ seed = "" }: { seed?: string }) {
  const quote = garantier[seededIndex(seed, garantier.length)];
  return (
    <section className="border-y border-navy/10 bg-surface py-14 lg:py-16">
      <blockquote className="mx-auto max-w-4xl px-4 text-center">
        <p className="font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-semibold italic leading-snug text-navy [text-wrap:balance]">
          «{quote}»
        </p>
        <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate">
          Løftet vårt — til hver samarbeidspartner
        </footer>
      </blockquote>
    </section>
  );
}
