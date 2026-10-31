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
 * Business details. TODO(client): phone, email and address below are placeholders carried over from the
 * generated design. Replace them with the real company details before launch.
 */
export const siteConfig = {
  name: "Bách Mã Viên",
  url: siteUrl(),
  phone: "(+84) 905 888 234",
  phoneHref: "tel:+84905888234",
  zaloHref: "https://zalo.me/0905888234",
  email: "concierge@bachmavien.vn",
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
  /** Approximate location of the Cổ Cò river corridor between Đà Nẵng and Hội An. */
  geo: { latitude: 15.9, longitude: 108.3 },
} as const;
