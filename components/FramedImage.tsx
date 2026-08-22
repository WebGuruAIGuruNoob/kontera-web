import Image from "next/image";

/**
 * Standardbehandlingen for alle foto (BILDEPLAN §5):
 * rammet (rounded-3xl + hairline), navy-tintet — aldri fullbredde, aldri overlay-tekst.
 * Bildetekst rendres under rammen (fylkessider: stedsnavn).
 */
export function FramedImage({
  src,
  alt,
  caption,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string | null;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-3xl border border-navy/10">
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={853}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-navy/20 mix-blend-multiply"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-slate">{caption}</figcaption>
      )}
    </figure>
  );
}
