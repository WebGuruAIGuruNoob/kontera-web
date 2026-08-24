import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Fagstoff og guider – regnskap, frister og skatt",
  description:
    "Guider om pris på regnskapsfører, mva-frister, årsoppgjør og oppstart av AS. Skrevet av regnskapsførerne hos Kontera.",
  alternates: { canonical: "/blogg" },
};

export default function BloggPage() {
  const posts = getAllPosts();
  return (
    <>
      <Breadcrumbs items={[{ name: "Fagstoff", href: "/blogg" }]} />

      {/* ===== Kompakt hero på grønt bånd ===== */}
      <section className="bg-mist">
        <div className="section-y-sm mx-auto max-w-6xl px-4">
          <p className="section-eyebrow">Fagstoff</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.3rem+2.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-navy [text-wrap:balance]">
            Fagstoff om regnskap, frister og skatt
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-slate">
            Guider og svar på spørsmålene bedrifter stiller oftest — om priser,
            frister, regler og valg. Skrevet av regnskapsførerne hos Kontera.
          </p>
        </div>
      </section>

      {/* ===== Artikkelkort med løft-hover ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="group flex flex-col rounded-3xl border border-navy/10 bg-surface p-7 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]"
            >
              <p className="text-sm font-medium text-slate/80">
                {formatDate(post.date)}
                {post.tags.length > 0 && ` · ${post.tags.slice(0, 2).join(" · ")}`}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-navy [text-wrap:balance]">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">
                {post.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                Les guiden <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
