import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

const facts = [
  { label: "mentorsLabel", value: "mentors" },
  { label: "preparedLabel", value: "prepared" },
  { label: "dateLabel", value: "date" },
] as const;

export function AboutThesis() {
  const t = useTranslations("about.thesis");

  return (
    <Section tone="mid" labelledBy="about-thesis-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md">
          <Photo name="thesis-cover" sizes="(min-width: 1024px) 420px, 80vw" className="shadow-warm-lg" />
          <div className="absolute -right-3 -bottom-5 flex items-center gap-3 rounded-sm bg-espresso px-4 py-3 text-cream shadow-warm-lg sm:-right-6">
            <GraduationCap aria-hidden className="size-7 shrink-0 text-brass" />
            <p className="flex flex-col leading-tight">
              <span className="type-label text-cream !font-sans">{t("sealTitle")}</span>
              <span className="type-label-sm text-brass">{t("sealText")}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="about-thesis-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("text")}</p>
          <p lang="en" className="border-l-2 border-brass pl-4 font-serif text-lg text-chestnut italic">
            {t("docTitle")}
          </p>

          <dl className="grid gap-4 border-t border-espresso/15 pt-6 sm:grid-cols-3">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="type-label-sm text-chestnut">{t(label)}</dt>
                <dd className="text-sm">{t(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
