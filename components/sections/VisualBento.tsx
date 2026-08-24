import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { bilde } from "@/lib/bilder";
import { Arrow } from "@/components/icons";

/**
 * 2030-FORSIDEBENTO (kun forsiden): bilderik og fargerik — foto i cellene med
 * brand-gradient-tint, fargede løfteceller i azur/teal/blå. Holder seg til
 * merkevarehuene (aldri lilla/indigo) og hairline-doktrinen.
 */
function FotoCelle({
  plassering,
  span,
  overlay,
}: {
  plassering: string;
  span: string;
  overlay: string;
}) {
  const foto = bilde(plassering);
  if (!foto) return null;
  return (
    <div className={`relative min-h-44 overflow-hidden rounded-2xl border border-navy/10 ${span}`}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
      />
      <div aria-hidden="true" className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}

export function VisualBento() {
  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <div data-reveal-group className="grid auto-rows-[11rem] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {/* Rad 1 */}
        <FotoCelle
          plassering="team:samarbeid-1"
          span="col-span-2 row-span-2 lg:col-span-2"
          overlay="bg-gradient-to-tr from-navy/45 via-blue/15 to-transparent mix-blend-multiply"
        />
        <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue to-azure p-5 text-white">
          <p className="font-display text-4xl font-bold tabular-nums">
            <span data-count-to="357">357</span>
          </p>
          <p className="text-sm font-semibold text-white/90">
            kommuner dekket — heldigitalt, med én fast regnskapsfører
          </p>
        </div>
        <FotoCelle
          plassering="collage:naert"
          span=""
          overlay="bg-teal/25 mix-blend-multiply"
        />

        {/* Rad 2 */}
        <div className="flex flex-col justify-between rounded-2xl bg-teal/20 p-5">
          <p className="font-display text-3xl font-bold text-navy">Inkludert.</p>
          <p className="text-sm font-semibold text-navy/80">
            Korte spørsmål og småavklaringer er en del av honoraret
          </p>
        </div>
        <Link
          href="/kontakt"
          data-cta="bento-tilbud"
          className="group flex flex-col justify-between rounded-2xl bg-navy p-5 text-white transition-colors hover:bg-navy-deep"
        >
          <p className="font-display text-xl font-bold leading-snug [text-wrap:balance]">
            Klar for en regnskapsfører som kjenner deg?
          </p>
          <p className="text-sm font-bold text-azure">
            Få et uforpliktende tilbud{" "}
            <Arrow className="inline-block transition-transform group-hover:translate-x-0.5" />
          </p>
        </Link>

        {/* Rad 3 */}
        <FotoCelle
          plassering="collage:miljo"
          span="lg:col-span-1"
          overlay="bg-gradient-to-t from-azure/30 to-transparent mix-blend-multiply"
        />
        <FotoCelle
          plassering="omoss:kaffe-og-notater"
          span=""
          overlay="bg-blue/20 mix-blend-multiply"
        />
        <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-azure/12 p-5 lg:col-span-2">
          <p className="font-display text-xl font-bold leading-snug text-navy [text-wrap:balance]">
            {site.employees} ansatte. {site.statsautoriserte} statsautoriserte.
            Null sentralbord.
          </p>
          <p className="text-sm font-semibold text-slate">
            Du ringer direkte til personen som fører regnskapet ditt — og en
            fast stedfortreder kjenner bedriften like godt.
          </p>
        </div>
      </div>
    </section>
  );
}
