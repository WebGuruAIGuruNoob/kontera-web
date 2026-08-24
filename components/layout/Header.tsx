import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { PhoneIcon } from "@/components/icons";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/bransjer", label: "Bransjer" },
  { href: "/priser", label: "Priser" },
  { href: "/regnskapsforer", label: "Områder" },
  { href: "/blogg", label: "Fagstoff" },
  { href: "/om-oss", label: "Om oss" },
];

/** Slank glass-header (DESIGNPLAN §2.6) — eneste sted med backdrop-blur. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Kontera Regnskap – til forsiden">
          <Image
            src="/images/brand/konteralogo-e1607685331288.png"
            alt="Kontera Regnskap AS"
            width={150}
            height={75}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.95rem] font-semibold text-ink transition-colors hover:text-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            data-cta="header-ring"
            className="hidden items-center gap-2 font-sans text-sm font-bold text-navy transition-colors hover:text-blue sm:flex"
          >
            <PhoneIcon className="h-4 w-4 text-blue" />
            {site.phoneDisplay}
          </a>
          <div className="hidden sm:block">
            <Link href="/kontakt" data-cta="header-tilbud" className="pille-sm">
              Få tilbud
            </Link>
          </div>
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}
