import { Heart, Moon, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

const points = [
  { key: "communication", Icon: Heart },
  { key: "grooming", Icon: Sparkles },
  { key: "rest", Icon: Moon },
] as const;

export function HomeWelfare() {
  const t = useTranslations("home.welfare");

  return (
    <Section labelledBy="home-welfare-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="grid grid-cols-2 items-start gap-4 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <Photo name="stable-4" sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, 45vw" />
            <div className="flex flex-col gap-2 rounded-sm bg-sand/50 p-5">
              <span className="type-label-sm text-chestnut">{t("cards.nutrition.label")}</span>
              <p className="text-sm">{t("cards.nutrition.text")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8">
            <div className="flex flex-col gap-2 rounded-sm bg-espresso p-5 text-cream">
              <span className="type-label-sm text-brass">{t("cards.vet.label")}</span>
              <p className="text-sm text-sand/80">{t("cards.vet.text")}</p>
            </div>
            <Photo name="stable-3" sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, 45vw" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-welfare-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("text")}</p>
          <ul className="flex flex-col gap-5 pt-2">
            {points.map(({ key, Icon }) => (
              <li key={key} className="flex items-start gap-4">
                <Icon aria-hidden className="mt-1 size-5 shrink-0 text-brass-deep" />
                <div>
                  <h3 className="type-title">{t(`points.${key}.title`)}</h3>
                  <p className="text-sm text-muted">{t(`points.${key}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
