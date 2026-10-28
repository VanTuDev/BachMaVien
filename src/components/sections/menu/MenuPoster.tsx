import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The original printed menu, shown whole so every price on it stays legible. */
export function MenuPoster() {
  const t = useTranslations("menu.poster");

  return (
    <Section labelledBy="menu-poster-title">
      <SectionHeader id="menu-poster-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
        <Photo name="menu-poster" sizes="(min-width: 1024px) 1024px, 100vw" className="w-full shadow-warm-lg" />
        <a
          href="/images/menu-poster.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 type-label text-chestnut underline decoration-brass underline-offset-[6px] hover:text-espresso"
        >
          {t("open")}
          <ExternalLink aria-hidden className="size-4" />
        </a>
      </div>
    </Section>
  );
}
