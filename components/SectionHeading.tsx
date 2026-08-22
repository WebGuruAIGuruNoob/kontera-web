/**
 * R1 (RYDDEPLAN): ETT seksjonshode for hele siten — fast intern rytme
 * (eyebrow → H2 mt-2 → intro mt-4 max-w-2xl). Aldri håndbygde hoder igjen.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  tone?: "light" | "dark";
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <div id={id} className="max-w-2xl">
      <p className={dark ? "section-eyebrow-dark" : "section-eyebrow"}>{eyebrow}</p>
      <h2
        className={`mt-2 font-display text-h2 font-bold [text-wrap:balance] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 leading-relaxed ${dark ? "text-white/80" : "text-slate"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
