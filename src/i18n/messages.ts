import type { Locale } from "./routing";

/** One JSON file per page/section keeps translations small and easy to review. */
const namespaces = ["common", "images", "home", "about", "services", "menu", "safety", "booking", "seo"] as const;

export async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = (await import(`../../messages/${locale}/${ns}.json`)) as { default: Record<string, unknown> };
      return [ns, mod.default] as const;
    }),
  );
  return Object.fromEntries(entries) as Messages;
}

export type Messages = {
  common: typeof import("../../messages/vi/common.json");
  images: typeof import("../../messages/vi/images.json");
  home: typeof import("../../messages/vi/home.json");
  about: typeof import("../../messages/vi/about.json");
  services: typeof import("../../messages/vi/services.json");
  menu: typeof import("../../messages/vi/menu.json");
  safety: typeof import("../../messages/vi/safety.json");
  booking: typeof import("../../messages/vi/booking.json");
  seo: typeof import("../../messages/vi/seo.json");
};
