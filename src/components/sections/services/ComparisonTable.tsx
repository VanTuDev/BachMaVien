import { Banknote, Coffee, Shirt, Timer, Trophy, UserCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { packages } from "@/data/packages";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const rows: { key: "duration" | "coach" | "gear" | "technique" | "drink"; icon: LucideIcon }[] = [
  { key: "duration", icon: Timer },
  { key: "coach", icon: UserCheck },
  { key: "gear", icon: Shirt },
  { key: "technique", icon: Trophy },
  { key: "drink", icon: Coffee },
];

const rowHeaderClass = "sticky left-0 z-10 bg-surface px-5 py-4 text-left align-top font-semibold";

export function ComparisonTable() {
  const t = useTranslations("services.comparison");

  return (
    <Section id="comparison" tone="low" labelledBy="comparison-title">
      <SectionHeader id="comparison-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <div className="overflow-x-auto rounded-sm border border-espresso/10 bg-surface shadow-warm">
        <table className="w-full min-w-[56rem] border-collapse text-sm">
          <caption className="sr-only">{t("title")}</caption>
          <thead>
            <tr className="bg-espresso text-cream">
              <th scope="col" className="sticky left-0 z-10 bg-espresso px-5 py-4 text-left type-label-sm text-brass">
                {t("criteria")}
              </th>
              {packages.map((pkg) => (
                <th key={pkg.key} scope="col" className={cn("px-5 py-4 text-left type-label", pkg.featured && "text-brass")}>
                  {t(`columns.${pkg.key}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-espresso/10">
            {rows.map(({ key, icon: Icon }) => (
              <tr key={key}>
                <th scope="row" className={rowHeaderClass}>
                  <span className="flex items-center gap-3">
                    <Icon aria-hidden className="size-4 shrink-0 text-brass-deep" />
                    {t(`rows.${key}.label`)}
                  </span>
                </th>
                {packages.map((pkg) => (
                  <td
                    key={pkg.key}
                    className={cn("px-5 py-4 align-top text-muted", pkg.featured && "bg-sand/30 font-medium text-espresso")}
                  >
                    {t(`rows.${key}.${pkg.key}`)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className={rowHeaderClass}>
                <span className="flex items-center gap-3">
                  <Banknote aria-hidden className="size-4 shrink-0 text-brass-deep" />
                  {t("rows.price.label")}
                </span>
              </th>
              {packages.map((pkg) => (
                <td key={pkg.key} className={cn("px-5 py-4 align-top font-serif text-lg text-espresso", pkg.featured && "bg-sand/30")}>
                  <Price amount={pkg.price} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky left-0 z-10 bg-surface" />
              {packages.map((pkg) => (
                <td key={pkg.key} className={cn("px-5 py-4", pkg.featured && "bg-sand/30")}>
                  <ButtonLink
                    href={{ pathname: "/booking", query: { package: pkg.key } }}
                    variant={pkg.featured ? "primary" : "outline"}
                    icon={false}
                    className="w-full !px-3 !py-2.5"
                  >
                    {t("book")}
                  </ButtonLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
