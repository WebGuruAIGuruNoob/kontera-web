import { CheckIcon } from "@/components/icons";

/**
 * «Hvorfor velge Kontera»-ikonraden («Inkludert»-designet): fire USP-er om
 * SELSKAPET — aldri stedsdata — på hvit stripe rett under heroen.
 * Brukes på forsiden og alle geo-sider (Henriks CRO-ordre 2026-08-25:
 * front selskapet og USP-ene først, tallene nederst).
 */
const punkter = [
  { t: "Én fast regnskapsfører", u: "samme person hver gang" },
  { t: "Fast stedfortreder", u: "kjenner også bedriften din" },
  { t: "Spørsmål inkludert", u: "en del av honoraret" },
  { t: "Fristene er vårt ansvar", u: "mva, a-melding, årsoppgjør" },
];

export function TrustRad() {
  return (
    <section aria-label="Hvorfor velge Kontera" className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
        {punkter.map((p) => (
          <div key={p.t} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
              <CheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-semibold leading-snug text-navy">{p.t}</p>
              <p className="text-sm text-slate/80">{p.u}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
