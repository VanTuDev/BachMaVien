import { ArrowDown, PawPrint, Sparkles, UserCheck, Warehouse } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

const pills = [
  { key: "welfare", Icon: PawPrint },
  { key: "coaching", Icon: UserCheck },
  { key: "stable", Icon: Warehouse },
] as const;

export function ServicesHero() {
  const t = useTranslations("services.hero");

  return (
    <PageHero
      eyebrow={
        <>
          <span className="flex items-center gap-2 type-label-sm text-chestnut">
            <Sparkles aria-hidden className="size-4" />
            {t("tag")}
          </span>
          <span aria-hidden className="hidden h-px w-8 bg-chestnut/40 sm:block" />
          <span className="type-label-sm text-muted">{t("place")}</span>
        </>
      }
      title={t("titleA")}
      accent={t("titleB")}
      lead={t("lead")}
    >
      <div className="flex flex-col gap-8 pt-2">
        <ButtonLink href="#comparison" icon={<ArrowDown aria-hidden className="size-4 shrink-0" />} className="self-start">
          {t("action")}
        </ButtonLink>
        <ul className="reveal-stagger grid gap-4 border-t border-espresso/15 pt-8 md:grid-cols-3">
          {pills.map(({ key, Icon }) => (
            <li key={key} className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-chestnut">
                <Icon aria-hidden className="size-5" />
              </span>
              <div>
                <p className="type-title">{t(`pills.${key}.title`)}</p>
                <p className="text-sm text-muted">{t(`pills.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageHero>
  );
}
