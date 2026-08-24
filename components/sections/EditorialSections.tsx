import { FramedImage } from "@/components/FramedImage";

/**
 * Redaksjonell 4/8-fagseksjon (LØFTEPLAN funn 3): serif-tittelkolonne venstre
 * (+ ev. fagbilde), tekst høyre — bryter den lange tekstsøylen uten å ofre lesemål.
 * Brukes av geo-fagblokkene og tjeneste-/bransjeseksjonene.
 */
export type EditorialBlokk = {
  id?: string;
  tittel: string;
  avsnitt: string[];
};

export function EditorialSections({
  blokker,
  bilder,
}: {
  blokker: EditorialBlokk[];
  /** Bilde per blokk-indeks (null = ingen). Begrens til 1–2 per side. */
  bilder?: (blokk: EditorialBlokk, index: number) => { src: string; alt: string } | null;
}) {
  return (
    <div className="divide-y divide-navy/10">
      {blokker.map((blokk, i) => {
        const img = bilder?.(blokk, i) ?? null;
        return (
          <div
            key={blokk.tittel}
            className="grid gap-5 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-navy [text-wrap:balance] lg:text-2xl">
                {blokk.tittel}
              </h2>
              {img && (
                <FramedImage
                  src={img.src}
                  alt={img.alt}
                  className="mt-5 hidden lg:block"
                  sizes="(min-width: 1024px) 20rem, 100vw"
                />
              )}
            </div>
            <div className="lg:col-span-8">
              {blokk.avsnitt.map((avsnitt, j) => (
                <p
                  key={j}
                  className="mt-4 max-w-[70ch] leading-relaxed text-slate first:mt-0"
                >
                  {avsnitt}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
