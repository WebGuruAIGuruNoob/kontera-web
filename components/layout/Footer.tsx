import Link from "next/link";
import { site } from "@/data/site";
import { fylker } from "@/lib/geo";
import { tjenester } from "@/content/tjenester";
import { bransjer } from "@/content/bransjer";

/**
 * Mega-footer (DESIGNPLAN §2.6): navigasjon, trygghet, compliance, kontakt —
 * avsluttet med dekorativt lavopasitets-wordmark (konkurrerer ikke med logoen).
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-sans text-lg font-bold tracking-wide">
              KONTERA<span className="text-gul"> REGNSKAP</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Autorisert regnskapsforetak under tilsyn av Finanstilsynet. Du får
              en fast regnskapsfører, en fast stedfortreder som også kjenner
              bedriften, og korte spørsmål er inkludert.
            </p>
            <p className="mt-4 text-sm font-semibold text-white/90">
              <a href={site.phoneHref} className="hover:text-gul">
                {site.phoneDisplay}
              </a>
              {" · "}
              <a href={site.emailHref} className="hover:text-gul">
                {site.email}
              </a>
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              {site.offices.map((office) => (
                <li key={office.id}>
                  <p className="font-semibold text-white/90">{office.label}</p>
                  <a
                    href={office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gul"
                  >
                    {office.street}, {office.postalCode} {office.city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-eyebrow-dark">
              Tjenester
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {tjenester.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tjenester/${t.slug}`} className="text-white/80 hover:text-gul">
                    {t.navn}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/priser" className="text-white/80 hover:text-gul">
                  Priser
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="section-eyebrow-dark">
              Bransjer
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {bransjer.map((b) => (
                <li key={b.slug}>
                  <Link href={`/bransjer/${b.slug}`} className="text-white/80 hover:text-gul">
                    {b.navn}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blogg" className="text-white/80 hover:text-gul">
                  Fagstoff og guider
                </Link>
              </li>
              <li>
                <Link href="/jobb" className="text-white/80 hover:text-gul">
                  Jobb i Kontera
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="section-eyebrow-dark">
              Regnskapsfører etter fylke
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {fylker.map((f) => (
                <li key={f.nr}>
                  <Link
                    href={`/regnskapsforer/${f.slug}`}
                    className="text-white/80 hover:text-gul"
                  >
                    {f.visningsnavn}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/regnskapsforer"
              className="mt-3 inline-block text-sm font-bold text-gul hover:underline"
            >
              Alle områder →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · Org.nr {site.orgNr} ·
            Statsautoriserte regnskapsførere
          </p>
          <p className="flex gap-4">
            <Link href="/personvern" className="hover:text-gul">
              Personvern
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gul"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      {/* 2026-signaturen: dekorativt fullbredde-wordmark i lav opasitet */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-sans text-[clamp(4rem,14vw,11rem)] font-bold leading-[0.8] tracking-tight text-white/[0.06]"
      >
        KONTERA
      </p>
    </footer>
  );
}
