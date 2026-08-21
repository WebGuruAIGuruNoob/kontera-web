import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";

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
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink [text-wrap:balance] lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-slate">
            Av {post.author} · Publisert {formatDate(post.date)}
            {post.updated !== post.date && ` · Sist faglig oppdatert ${formatDate(post.updated)}`}
          </p>
        </header>

        <div className="article-prose mx-auto mt-10 max-w-3xl">
          <MDXRemote source={post.content} />
        </div>

        <aside className="mx-auto mt-12 max-w-3xl rounded-lg border border-azure/40 bg-mist p-6">
          <p className="font-display text-lg font-bold text-navy">
            Vil du slippe å tenke på dette selv?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Ta en uforpliktende prat med en av oss — vi svarer på det du lurer
            på, helt uten taksameter.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="rounded-md bg-blue px-5 py-2.5 font-display text-sm font-bold text-white hover:bg-blue-dark"
            >
              Ring {site.phoneDisplay}
            </a>
            <Link
              href="/kontakt"
              className="rounded-md border border-line bg-white px-5 py-2.5 font-display text-sm font-bold text-navy hover:border-blue"
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
