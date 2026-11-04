import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-50">
      {/* The blurred backdrop lives in its own layer: backdrop-filter on the header itself would trap the fixed mobile drawer inside it. */}
      <div aria-hidden className="header-backdrop absolute inset-0 border-b border-espresso/10 bg-cream/92 backdrop-blur-md" />
      <Container className="relative flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={t("brand.homeLabel")}>
          <Image src="/images/logo.png" alt="" width={48} height={48} priority className="size-11 shrink-0 object-contain sm:size-12" />
          <span className="flex flex-col leading-tight">
            <span className="whitespace-nowrap text-base font-bold text-espresso sm:text-lg">{siteConfig.name}</span>
            <span className="hidden whitespace-nowrap type-label-sm text-chestnut 2xl:block">{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav aria-label={t("nav.label")} className="hidden xl:block">
          <NavLinks
            className="flex items-center gap-4 min-[1400px]:gap-6 2xl:gap-9"
            linkClassName="whitespace-nowrap py-1 type-label text-muted transition-colors hover:text-espresso"
            activeClassName="!text-chestnut underline decoration-brass decoration-2 underline-offset-[10px]"
          />
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden lg:block">
            <ButtonLink href={bookingHref} icon={false} className="whitespace-nowrap !py-2.5">
              {t("cta.book")}
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
