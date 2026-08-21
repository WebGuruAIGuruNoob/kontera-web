import Link from "next/link";

/**
 * Priser-teaser. Reelle tall er et åpent punkt (MASTERPLAN §14.7) —
 * inntil Henrik godkjenner priser omtales nivået kvalitativt. Aldri oppdiktede kronebeløp.
 */
export function PricingTeaser() {
  return (
    <section className="bg-navy py-16 text-white lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-azure">
            Priser
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold [text-wrap:balance]">
            Middels pris. Høy kvalitet. Ingen overraskelser.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80">
            Vi er ikke billigst, og det er et bevisst valg: Du betaler for en
            erfaren regnskapsfører som kjenner deg — ikke for et anonymt
            tastesenter. Prisen avtales ut fra bilagsmengde og behov, og korte
            spørsmål underveis koster aldri noe ekstra.
          </p>
          <ul className="mt-6 grid gap-2 text-sm font-semibold text-white/90 sm:grid-cols-2">
            <li>· Tilbud tilpasset din bedrift</li>
            <li>· Ingen faktura for korte spørsmål</li>
            <li>· Ingen skjulte gebyrer</li>
            <li>· Forutsigbarhet gjennom året</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            href="/priser"
            className="rounded-md bg-white px-6 py-3.5 text-center font-display font-bold text-navy shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Se hvordan prisen settes
          </Link>
          <Link
            href="/kontakt"
            data-cta="pris-tilbud"
            className="rounded-md border-2 border-white/50 px-6 py-3 text-center font-display font-bold text-white hover:border-white hover:bg-white/10"
          >
            Få ditt tilbud
          </Link>
        </div>
      </div>
    </section>
  );
}
