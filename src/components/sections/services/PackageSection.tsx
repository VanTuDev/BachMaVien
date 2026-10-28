import { Flame } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import type { ExperiencePackage } from "@/data/packages";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type PackageCopy = {
  tag: string;
  title: string;
  subtitle: string;
  text: string;
  highlights: Record<string, { title: string; text: string }>;
  features: Record<string, string>;
  priceLabel: string;
  cta: string;
};

type Props = { pkg: ExperiencePackage; reversed?: boolean };

/** One experience package: uncropped photo set on one side, details, price and booking link on the other. */
export function PackageSection({ pkg, reversed = false }: Props) {
  const t = useTranslations("services");
  // Package copy has a different set of highlight/feature keys per package, so read the whole object.
  const copy: PackageCopy = useMessages().services.packages[pkg.key];
  const dark = pkg.tone === "dark";
  const [mainImage, ...restImages] = pkg.images;
  const titleId = `${pkg.id}-title`;
  const unit = pkg.key === "photo" ? t("package.priceUnitCrew") : t("package.priceUnitGuest");

  return (
    <Section id={pkg.id} tone={pkg.tone} labelledBy={titleId}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={cn("flex flex-col gap-4 lg:col-span-6", reversed && "lg:order-2")}>
          <Photo name={mainImage} sizes="(min-width: 1280px) 576px, (min-width: 1024px) 50vw, 100vw" className="shadow-warm-lg" />
          <div className={cn("grid gap-4", restImages.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
            {restImages.map((name) => (
              <Photo key={name} name={name} sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, 50vw" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            {pkg.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-xs bg-brass px-2.5 py-1 type-label-sm text-espresso">
                <Flame aria-hidden className="size-3.5" />
                {t("package.featuredBadge")}
              </span>
            )}
            <p className={cn("type-label-sm", dark ? "text-brass" : "text-chestnut")}>{copy.tag}</p>
          </div>

          <h2 id={titleId} className={cn("type-headline-lg", dark ? "text-cream" : "text-espresso")}>
            {copy.title}
            {copy.subtitle && (
              <>
                <br />
                <em className={cn("text-[0.72em]", dark ? "text-brass" : "text-chestnut")}>{copy.subtitle}</em>
              </>
            )}
          </h2>

          <p className={dark ? "text-sand/85" : "text-muted"}>{copy.text}</p>

          <ul className={cn("grid gap-3", pkg.highlights.length === 3 ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
            {pkg.highlights.map(({ key, icon: Icon }) => (
              <li
                key={key}
                className={cn(
                  "flex items-start gap-3 rounded-sm p-4",
                  dark ? "border border-sand/15 bg-sand/5" : "border border-espresso/10 bg-surface-mid",
                )}
              >
                <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", dark ? "text-brass" : "text-chestnut")} />
                <div>
                  <p className={cn("type-title", dark ? "text-cream" : "text-espresso")}>{copy.highlights[key].title}</p>
                  <p className={cn("text-sm", dark ? "text-sand/75" : "text-muted")}>{copy.highlights[key].text}</p>
                </div>
              </li>
            ))}
          </ul>

          {pkg.features.length > 0 && <CheckList items={pkg.features.map((key) => copy.features[key])} tone={dark ? "dark" : "light"} />}

          <div
            className={cn(
              "mt-2 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-end sm:justify-between",
              dark ? "border-sand/20" : "border-espresso/10",
            )}
          >
            <div className="flex flex-col gap-1">
              <span className={cn("type-label-sm", dark ? "text-brass" : "text-chestnut")}>{copy.priceLabel}</span>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <Price amount={pkg.price} className={cn("font-serif text-3xl", dark ? "text-cream" : "text-espresso")} />
                <span className={cn("text-sm", dark ? "text-sand/70" : "text-muted")}>{unit}</span>
              </p>
            </div>
            <ButtonLink href={{ pathname: "/booking", query: { package: pkg.key } }} variant={dark ? "brass" : "primary"}>
              {copy.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
