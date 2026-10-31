import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { fontSans, fontSerif } from "@/lib/fonts";
import { localizedUrl } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: { default: t("home.title"), template: `%s | ${siteConfig.name}` },
    description: t("home.description"),
    keywords: t("keywords").split(","),
    formatDetection: { telephone: true, email: true, address: false },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "seo" });

  return (
    <html lang={locale} className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brass" />
        <NextIntlClientProvider locale={locale} messages={{ common: messages.common, booking: messages.booking, shared: messages.shared }}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
          >
            {messages.common.a11y.skipToContent}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "SportsActivityLocation"],
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            alternateName: "Bach Ma Vien",
            description: t("home.description"),
            url: localizedUrl(locale),
            logo: `${siteConfig.url}/images/logo.png`,
            image: `${siteConfig.url}/og-default.jpg`,
            telephone: "+84905888234",
            email: siteConfig.email,
            slogan: "Wild West, Real Feel",
            inLanguage: locale,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hòa Bắc",
              addressRegion: "Đà Nẵng",
              addressCountry: "VN",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: siteConfig.hours.open,
              closes: siteConfig.hours.close,
            },
            availableLanguage: routing.locales,
          }}
        />
      </body>
    </html>
  );
}
