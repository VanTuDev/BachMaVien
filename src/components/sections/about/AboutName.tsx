import { useTranslations } from "next-intl";
import type { ImageName } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const posters: ImageName[] = ["brand-1", "brand-2", "brand-3", "brand-4"];

/** The four brand-story posters, shown whole in a square grid. */
export function AboutName() {
  const t = useTranslations("about.name");

  return (
    <Section labelledBy="about-name-title">
      <SectionHeader id="about-name-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6">
        {posters.map((name) => (
          <li key={name}>
            <Photo name={name} sizes="(min-width: 1024px) 440px, 45vw" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
