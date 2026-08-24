import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { FramedImage } from "@/components/FramedImage";
import { bloggBilde } from "@/lib/bilder";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Kontera Regnskap` },
    description: post.description,
    alternates: { canonical: `/blogg/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const toppBilde = bloggBilde(slug);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          url: `${site.url}/blogg/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updated,
          authorName: post.author,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Fagstoff", href: "/blogg" },
          { name: post.title, href: `/blogg/${post.slug}` },
        ]}
      />
      <article className="mx-auto max-w-6xl px-4 py-12">
        <header className="mx-auto max-w-3xl">
          <p className="section-eyebrow">Fagstoff</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-navy [text-wrap:balance] lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-slate">
            Av {post.author} · Publisert {formatDate(post.date)}
            {post.updated !== post.date && ` · Sist faglig oppdatert ${formatDate(post.updated)}`}
          </p>
        </header>

        {toppBilde && (
          <div className="mx-auto mt-8 max-w-3xl">
            <FramedImage
              src={toppBilde.src}
              alt={toppBilde.alt}
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
            />
          </div>
        )}

        <div className="article-prose mx-auto mt-10 max-w-3xl">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <aside className="mx-auto mt-12 max-w-3xl rounded-3xl bg-mist p-6 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
          <p className="font-display text-lg font-semibold text-navy">
            Snakk med en regnskapsfører om din situasjon
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Ta kontakt med en av oss for en kort gjennomgang. Vi svarer på det
            du lurer på, og korte spørsmål og småavklaringer er inkludert i
            honoraret.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="pille-sm">
              Ring {site.phoneDisplay}
            </a>
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center rounded-full border border-navy/25 bg-white px-5 text-sm font-bold text-navy transition-colors hover:border-navy/50"
            >
              Send en melding
            </Link>
          </div>
        </aside>
      </article>
      <FinalCta />
    </>
  );
}
