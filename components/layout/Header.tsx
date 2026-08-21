import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/bransjer", label: "Bransjer" },
  { href: "/priser", label: "Priser" },
  { href: "/regnskapsforer", label: "Der du er" },
  { href: "/blogg", label: "Fagstoff" },
  { href: "/om-oss", label: "Om oss" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:h-[4.5rem]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Kontera Regnskap – til forsiden">
          <Image
            src="/images/brand/konteralogo-e1607685331288.png"
            alt="Kontera Regnskap AS"
            width={150}
            height={75}
            priority
            className="h-10 w-auto lg:h-11"
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
            className="hidden items-center gap-2 font-display text-sm font-bold text-navy sm:flex"
          >
            <PhoneIcon className="h-4 w-4 text-blue" />
            {site.phoneDisplay}
          </a>
          <Link
            href="/kontakt"
            className="hidden rounded-md bg-blue px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-dark sm:block"
          >
            Få et tilbud
          </Link>
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
