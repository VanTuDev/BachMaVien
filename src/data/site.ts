/**
 * Public origin used for canonical URLs, sitemap and Open Graph.
 * Priority: NEXT_PUBLIC_SITE_URL (custom domain) > Vercel production URL (before DNS is set up) > local dev.
 */
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:5062";
}

/**
 * Business details. Phone and email are the real ones supplied by the ranch.
 * TODO(client): the address is still only "Hòa Bắc, Đà Nẵng"; add the street/hamlet when known.
 */
export const siteConfig = {
  name: "Bách Mã Viên",
  url: siteUrl(),
  phone: "0905.888.999",
  phoneHref: "tel:+84905888999",
  zaloHref: "https://zalo.me/0905888999",
  email: "bmv.bachmavien@gmail.com",
  copyrightYear: 2026,
  /** Open Tuesday to Sunday, closed Monday. */
  hours: {
    open: "08:00",
    close: "19:00",
    ridingMorning: "08:30 – 12:00",
    ridingAfternoon: "14:00 – 17:30",
    /** Date#getDay(): 1 = Monday. */
    closedWeekday: 1,
  },
} as const;
