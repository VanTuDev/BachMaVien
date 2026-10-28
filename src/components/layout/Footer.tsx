import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const linkClass = "text-sm text-sand/75 transition-colors hover:text-cream";

export function Footer() {
  const t = useTranslations("common");
  const year = siteConfig.copyrightYear;

  return (
    <footer className="bg-espresso text-sand">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Link href="/" className="flex items-center gap-4" aria-label={t("brand.homeLabel")}>
            <Image src="/images/logo-white.png" alt="" width={72} height={72} className="size-[4.5rem] shrink-0 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-bold text-cream">{siteConfig.name}</span>
              <span className="type-label-sm text-brass">{t("brand.tagline")}</span>
            </span>
          </Link>
          <p className="max-w-md text-sm text-sand/75">{t("footer.about")}</p>
          <div className="flex flex-wrap gap-2">
            <Chip tone="dark">{t("footer.badgeWelfare")}</Chip>
            <Chip tone="dark">{t("footer.badgeHeritage")}</Chip>
          </div>
        </div>

        <nav aria-label={t("footer.exploreTitle")} className="flex flex-col gap-4 lg:col-span-3">
          <h2 className="type-label text-brass !font-sans">{t("footer.exploreTitle")}</h2>
          <ul className="flex flex-col gap-3">
            {mainNav.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className={linkClass}>
                  {t(`footer.links.${key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className={linkClass}>
                {t("footer.links.booking")}
              </Link>
            </li>
          </ul>
        </nav>

        <address className="flex flex-col gap-4 not-italic lg:col-span-4">
          <h2 className="type-label text-brass !font-sans">{t("footer.contactTitle")}</h2>
          <ul className="flex flex-col gap-3 text-sm text-sand/80">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brass" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-brass" />
              <a href={siteConfig.phoneHref} className="font-medium text-cream hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden className="mt-1 size-4 shrink-0 text-brass" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cream hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock aria-hidden className="mt-1 size-4 shrink-0 text-brass" />
              <span>{t("footer.hours", { open: siteConfig.hours.open, close: siteConfig.hours.close })}</span>
            </li>
          </ul>
        </address>
      </Container>

      <div className="border-t border-sand/15">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-sand/60 sm:flex-row">
          <p>{t("footer.copyright", { year, name: siteConfig.name })}</p>
          <LanguageSwitcher tone="dark" />
        </Container>
      </div>
    </footer>
  );
}
