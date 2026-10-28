"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeMeta, routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = { tone?: "light" | "dark"; className?: string };

/** Plain links (no JS needed to switch) that keep the visitor on the same page in another language. */
export function LanguageSwitcher({ tone = "light", className }: Props) {
  const t = useTranslations("common.language");
  const current = useLocale();
  const pathname = usePathname();
  const dark = tone === "dark";

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-2", className)}>
      <Languages aria-hidden className={cn("size-4 shrink-0", dark ? "text-brass" : "text-chestnut")} />
      <ul className="flex items-center gap-1">
        {routing.locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                title={localeMeta[locale].label}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "rounded-xs px-2 py-1 type-label-sm transition-colors",
                  active
                    ? dark
                      ? "bg-brass text-espresso"
                      : "bg-espresso text-cream"
                    : dark
                      ? "text-sand/70 hover:text-cream"
                      : "text-muted hover:text-espresso",
                )}
              >
                {localeMeta[locale].short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
