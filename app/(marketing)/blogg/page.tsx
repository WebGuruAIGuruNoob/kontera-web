import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Fagstoff og guider – regnskap forklart på vanlig norsk",
  description:
    "Guider om pris på regnskapsfører, mva-frister, årsoppgjør, å starte AS og mer – skrevet av regnskapsførere, forklart på vanlig norsk.",
  alternates: { canonical: "/blogg" },
};

export default function BloggPage() {
  const posts = getAllPosts();
  return (
    <>
      <Breadcrumbs items={[{ name: "Fagstoff", href: "/blogg" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Fagstoff</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-ink [text-wrap:balance]">
            Regnskap forklart på vanlig norsk
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Guider og svar på det bedrifter faktisk lurer på — priser, frister,
            regler og valg. Skrevet av oss som jobber med dette hver dag.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="group flex flex-col rounded-lg border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                {formatDate(post.date)}
                {post.tags.length > 0 && ` · ${post.tags.slice(0, 2).join(" · ")}`}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-navy group-hover:text-blue [text-wrap:balance]">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {post.description}
              </p>
              <span className="mt-4 text-sm font-bold text-blue group-hover:underline">
                Les guiden →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
