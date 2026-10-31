import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingSidebar } from "@/components/booking/BookingSidebar";
import { Container } from "@/components/ui/Container";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/booking">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "booking", "/booking");
}

function BookingIntro() {
  const t = useTranslations("booking.hero");

  return (
    <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center">
      <h1 className="type-display text-espresso">{t("title")}</h1>
      <p className="type-lead text-muted">{t("lead")}</p>
    </div>
  );
}

export default async function BookingPage({ params }: PageProps<"/[locale]/booking">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className="bg-cream py-14 sm:py-20">
      <Container>
        <BookingIntro />
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {/* useSearchParams (preselected ticket) needs a Suspense boundary to keep the page static. */}
            <Suspense fallback={<div aria-hidden className="min-h-[36rem] rounded-sm bg-surface shadow-warm" />}>
              <BookingForm />
            </Suspense>
          </div>
          <div className="lg:sticky lg:top-28 lg:col-span-4">
            <BookingSidebar />
          </div>
        </div>
      </Container>
    </section>
  );
}
