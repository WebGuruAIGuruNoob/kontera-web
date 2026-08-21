import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Hjem", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Brødsmulesti" className="mx-auto max-w-6xl px-4 pt-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate">
          {all.map((crumb, i) => {
            const last = i === all.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-blue">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
