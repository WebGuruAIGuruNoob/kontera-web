import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tjenester, getTjeneste } from "@/content/tjenester";
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
import { CheckIcon, Arrow } from "@/components/icons";
import { FramedImage } from "@/components/FramedImage";
import { tjenesteBilde, tjeneste2Bilde } from "@/lib/bilder";
import { EditorialSections } from "@/components/sections/EditorialSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return tjenester.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) return {};
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: `/tjenester/${t.slug}` },
  };
}

export default async function TjenestePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) notFound();

  const enabled = leadEnabled();
  const tjenesteFoto = tjenesteBilde(t.slug);
  const tjenesteFoto2 = tjeneste2Bilde(t.slug);
  const relaterte = t.relaterte
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  // Bento-spans for «hva inngår» — varierte celler, aldri uniform grid
  const spans = [
    "sm:col-span-6 lg:col-span-6",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-12 lg:col-span-6",
    "sm:col-span-6 lg:col-span-6",
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: t.navn,
          description: t.metaDescription,
          url: `${site.url}/tjenester/${t.slug}`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Tjenester", href: "/tjenester" },
          { name: t.navn, href: `/tjenester/${t.slug}` },
        ]}
      />
      <HeroSplit
        compact
        eyebrow={t.navn}
        title={t.tittel}
        subtitle={t.heroUndertekst}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
          enabled ? "Svar innen én arbeidsdag" : "Korte spørsmål: 0 kr",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud på ${t.navn.toLowerCase()}`}
            subheading="En kort prat om behovet ditt — så får du et ærlig, konkret tilbud."
          />
        }
      />

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="font-display text-h2 font-bold text-ink">
              Passer for deg som …
            </h2>
            <ul data-reveal-group className="mt-6">
              {t.passerFor.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3 border-t border-navy/10 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed text-ink">{punkt}</span>
                </li>
              ))}
            </ul>
          </div>
          {tjenesteFoto && (
            <FramedImage
              src={tjenesteFoto.src}
              alt={tjenesteFoto.alt}
              className="lg:col-span-5 lg:mt-14"
            />
          )}
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-h2 font-bold text-ink">Dette inngår</h2>
          <div data-reveal-group className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-12">
            {t.hvaInngar.map((item, i) => (
              <div
                key={item.tittel}
                className={`card-line p-6 ${spans[i % spans.length]}`}
              >
                <h3 className="font-sans text-base font-bold text-navy">{item.tittel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y mx-auto max-w-6xl px-4">
        <EditorialSections
          blokker={t.seksjoner}
          bilder={(_, i) => (i === 1 ? tjenesteFoto2 : null)}
        />
        {relaterte.length > 0 && (
          // R-B: relaterte tjenester som lenkerad i fagseksjonen — ikke egen seksjon
          <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy/10 pt-6 text-sm">
            <span className="font-bold text-slate">Relaterte tjenester:</span>
            {relaterte.map((rel) => (
              <Link
                key={rel.slug}
                href={`/tjenester/${rel.slug}`}
                className="font-bold text-blue hover:underline"
              >
                {rel.navn} <Arrow />
              </Link>
            ))}
          </p>
        )}
      </section>

      <NumberedJourney leadEnabled={enabled} />
      <Faq items={t.faq} title={`Spørsmål og svar om ${t.navn.toLowerCase()}`} />
      <FinalCta />
    </>
  );
}
