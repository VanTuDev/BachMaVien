import { defineRouting } from "next-intl/routing";

/**
 * Supported languages. To add Chinese or Korean later:
 *   1. add "zh" / "ko" here and to `localeMeta` below,
 *   2. copy messages/en to messages/zh (or ko) and translate,
 *   3. register the CJK font in src/lib/fonts.ts.
 */
export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Display data for the language switcher and Open Graph. */
export const localeMeta: Record<Locale, { label: string; short: string; ogLocale: string }> = {
  vi: { label: "Tiếng Việt", short: "VI", ogLocale: "vi_VN" },
  en: { label: "English", short: "EN", ogLocale: "en_US" },
};
