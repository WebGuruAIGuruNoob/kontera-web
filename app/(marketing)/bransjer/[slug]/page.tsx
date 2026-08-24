import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bransjer, getBransje } from "@/content/bransjer";
import { getTjeneste } from "@/content/tjenester";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { Icon } from "@/components/Icon";
import { Arrow } from "@/components/icons";
import { FramedImage } from "@/components/FramedImage";
import { EditorialSections } from "@/components/sections/EditorialSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return bransjer.map((b) => ({ slug: b.slug }));
}

/** Rammede, tintede bransjefoto (DESIGNPLAN §2.4 — aldri fullbredde med overlay) */
const bransjeFoto: Record<string, string> = {
  bilforhandlere: "/images/pexels/bilforhandler-1.jpg",
  handverkere: "/images/pexels/handverker-4.jpg", // handverker-1 strøket i bilderevisjonen (BILDEPLAN §2)
  eiendom: "/images/pexels/eiendom-1.jpg",
  netthandel: "/images/pexels/netthandel-1.jpg",
  "borettslag-sameier": "/images/pexels/borettslag-1.jpg",
  tjenesteytende: "/images/pexels/konsulent-1.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBransje(slug);
  if (!b) return {};
  return {
    title: { absolute: b.metaTitle },
    description: b.metaDescription,
    alternates: { canonical: `/bransjer/${b.slug}` },
  };
}

export default async function BransjePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBransje(slug);
  if (!b) notFound();

  const enabled = leadEnabled();
  const tjenesteLenker = b.relaterteTjenester
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskap for ${b.omtale}`,
          description: b.metaDescription,
          url: `${site.url}/bransjer/${b.slug}`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Bransjer", href: "/bransjer" },
          { name: b.navn, href: `/bransjer/${b.slug}` },
        ]}
      />
      <HeroSplit
        compact
        eyebrow={`Regnskap for ${b.omtale}`}
        title={b.tittel}
        subtitle={b.heroUndertekst}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          enabled ? "Svar innen én arbeidsdag" : "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud for ${b.virksomhetsord}`}
            subheading="En kort samtale om driften — så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />

      {/* Bransjens problemstillinger — beskrivelser i du-form, aldri fingerte sitater (ekthetsregel §9.1) */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="font-display text-h2 font-bold text-ink [text-wrap:balance]">
              Typiske problemstillinger i bransjen
            </h2>
            <ul data-reveal-group className="mt-6">
              {b.smerter.map((smerte) => (
                <li
                  key={smerte}
                  className="border-t border-navy/10 py-4 font-display text-lg leading-snug text-navy"
                >
                  {smerte}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate">
              Dette er problemstillingene vi arbeider med for {b.omtale} til
              daglig. Regelverket og rutinene er ulike fra bransje til bransje,
              og kjennskapen til dem avgjør hva regnskapet gir deg utover selve
              bokføringen.
            </p>
          </div>
          {bransjeFoto[b.slug] && (
            <FramedImage
              src={bransjeFoto[b.slug]}
              alt={`Regnskap for ${b.omtale} — illustrasjon fra bransjen`}
              className="lg:col-span-5"
            />
          )}
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <EditorialSections blokker={b.seksjoner} />
        </div>
      </section>

      <section className="section-y mx-auto max-w-6xl px-4">
        <h2 className="font-display text-h2 font-bold text-ink">
          Slik arbeider vi for {b.omtale}
        </h2>
        <div data-reveal-group className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-12">
          {b.slikHjelperVi.map((item, i) => (
            <div
              key={item.tittel}
              className={`card-line p-6 ${
                i === 0
                  ? "sm:col-span-12 lg:col-span-6"
                  : "sm:col-span-6 lg:col-span-3"
              }`}
            >
              <h3 className="font-sans text-base font-bold text-navy">{item.tittel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.tekst}</p>
            </div>
          ))}
        </div>

        {tjenesteLenker.length > 0 && (
          <div className="mt-10">
            <h3 className="font-sans text-lg font-bold text-ink">
              Mest relevante tjenester for {b.omtale}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tjenesteLenker.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tjenester/${t.slug}`}
                  className="group card-line card-line-hover flex items-center gap-4 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                    <Icon name={t.ikon} className="h-5 w-5" />
                  </span>
                  <span className="font-sans font-bold text-navy group-hover:text-blue">
                    {t.navn} <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <NumberedJourney leadEnabled={enabled} />
      <Faq items={b.faq} title={`Spørsmål og svar — regnskap for ${b.omtale}`} />
      <FinalCta title={`En fast regnskapsfører som kjenner bransjen din`} />
    </>
  );
}
