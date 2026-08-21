import type { MetadataRoute } from "next";
import { fylker } from "@/lib/geo";
import { tjenester } from "@/content/tjenester";
import { bransjer } from "@/content/bransjer";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/data/site";

/**
 * Segmenterte sitemaps (MASTERPLAN §7.5/§8): «kjerne» + én per fylke,
 * slik at indekseringsdekning kan overvåkes per pulje i Search Console.
 */
export async function generateSitemaps() {
  return [{ id: "kjerne" }, ...fylker.map((f) => ({ id: f.slug }))];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();

  if (id === "kjerne") {
    const statiske = [
      "",
      "/tjenester",
      "/bransjer",
      "/priser",
      "/om-oss",
      "/kontakt",
      "/blogg",
      "/jobb",
      "/personvern",
      "/regnskapsforer",
    ].map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }));

    const tjenesteUrls = tjenester.map((t) => ({
      url: `${base}/tjenester/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

    const bransjeUrls = bransjer.map((b) => ({
      url: `${base}/bransjer/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

    const bloggUrls = getAllPosts().map((post) => ({
      url: `${base}/blogg/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...statiske, ...tjenesteUrls, ...bransjeUrls, ...bloggUrls];
  }

  const fylke = fylker.find((f) => f.slug === id);
  if (!fylke) return [];

  return [
    {
      url: `${base}/regnskapsforer/${fylke.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...fylke.kommuner.map((kommune) => ({
      url: `${base}/regnskapsforer/${fylke.slug}/${kommune.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
