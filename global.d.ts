import type { Locale } from "./src/i18n/routing";
import type { Messages } from "./src/i18n/messages";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
