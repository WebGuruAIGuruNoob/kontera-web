import Link from "next/link";
import { Icon } from "@/components/Icon";
import { bransjer } from "@/content/bransjer";

export function IndustryCards({
  eyebrow = "Bransjer",
  title = "Spisskompetanse der det teller mest",
  intro = "Vi kan regelverket i dybden der det gir deg mest igjen — og har bred kompetanse som passer de fleste andre bransjer.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-slate">{intro}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bransjer.map((b, i) => (
            <Link
              key={b.slug}
              href={`/bransjer/${b.slug}`}
              className={`group rounded-lg border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${
                i === 0 ? "border-azure ring-1 ring-azure/40" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                  <Icon name={b.ikon} className="h-6 w-6" />
                </span>
                {i === 0 && (
                  <span className="rounded-full bg-azure/15 px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wider text-blue">
                    Spisskompetanse
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{b.navn}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{b.kortBeskrivelse}</p>
              <span className="mt-4 inline-block text-sm font-bold text-blue group-hover:underline">
                Les mer →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          Ikke i listen? Vi har et bredt spekter av kompetanse som passer de
          fleste bransjer —{" "}
          <Link href="/kontakt" className="font-bold text-blue hover:underline">
            ta en prat med oss
          </Link>
          , så finner vi ut om vi er en god match.
        </p>
      </div>
    </section>
  );
}
