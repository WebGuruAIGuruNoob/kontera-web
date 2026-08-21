import Link from "next/link";
import { Icon } from "@/components/Icon";
import { bransjer } from "@/content/bransjer";
import { Arrow } from "@/components/icons";

/**
 * Bransjebento-lite (DESIGNPLAN §5): featurecelle for spisskompetansen
 * (bilforhandlere), varierte spans, hairlines — aldri seks like celler.
 */
export function IndustryCards({
  eyebrow = "Bransjer",
  title = "Spisskompetanse der det teller mest",
  intro = "Vi kan regelverket i dybden der det gir deg mest igjen — og har bred kompetanse som passer de fleste andre bransjer.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const [feature, ...rest] = bransjer;
  const spans = [
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-12 lg:col-span-6",
  ];

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-slate">{intro}</p>
        </div>

        <div data-reveal-group className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-12">
          <Link
            href={`/bransjer/${feature.slug}`}
            className="group card-line card-line-hover rounded-2xl p-7 sm:col-span-12 lg:col-span-6 lg:row-span-2 lg:p-8"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                  <Icon name={feature.ikon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-azure/15 px-3 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-blue">
                  Spisskompetanse
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                {feature.navn}
              </h3>
              <p className="mt-2 max-w-[46ch] flex-1 leading-relaxed text-slate">
                {feature.kortBeskrivelse} Avansemetoden brukt riktig er
                forskjellen på god og dårlig margin per bil — og det er faget
                vårt.
              </p>
              <span className="mt-5 text-sm font-bold text-blue group-hover:underline">
                Les mer <Arrow />
              </span>
            </div>
          </Link>

          {rest.map((b, i) => (
            <Link
              key={b.slug}
              href={`/bransjer/${b.slug}`}
              className={`group card-line card-line-hover p-6 ${spans[i]}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                <Icon name={b.ikon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-sans text-base font-bold text-navy">{b.navn}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{b.kortBeskrivelse}</p>
              <span className="mt-3 inline-block text-sm font-bold text-blue group-hover:underline">
                Les mer <Arrow />
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
