import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref, mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const linkClass = "text-sm text-cream/75 transition-colors hover:text-brass-light";

/** Compact footer: brand, page links and contact on one row, then a single small print line. */
export function Footer() {
  const t = useTranslations("common");
  const { open, close } = siteConfig.hours;

  return (
    <footer className="bg-brick-deep text-cream">
      <Container className="grid items-center gap-6 py-8 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <Link href="/" className="flex items-center gap-3" aria-label={t("brand.homeLabel")}>
          <Image src="/images/logo-white.png" alt="" width={44} height={44} className="size-11 shrink-0 object-contain" />
          <span className="flex flex-col leading-tight">
            <span className="font-bold text-cream">{siteConfig.name}</span>
            <span className="type-label-sm text-brass-light">{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav aria-label={t("footer.exploreTitle")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-center">
            {mainNav.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className={linkClass}>
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={bookingHref} className={linkClass}>
                {t("footer.links.booking")}
              </Link>
            </li>
          </ul>
        </nav>

        <address className="flex flex-col gap-1.5 text-sm not-italic">
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 font-semibold text-cream hover:text-brass-light">
            <Phone aria-hidden className="size-4 text-brass-light" />
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-cream/75 hover:text-brass-light">
            <Mail aria-hidden className="size-4 text-brass-light" />
            {siteConfig.email}
          </a>
        </address>
      </Container>

      <div className="border-t border-cream/15">
        <Container className="flex flex-col gap-3 py-4 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("footer.address")} · {t("footer.hours", { open, close })}
          </p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p>{t("footer.copyright", { year: siteConfig.copyrightYear, name: siteConfig.name })}</p>
            <LanguageSwitcher tone="dark" />
          </div>
        </Container>
      </div>
    </footer>
  );
}
