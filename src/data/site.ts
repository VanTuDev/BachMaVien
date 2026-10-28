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

export const siteConfig = {
  name: "Bách Mã Viên",
  url: siteUrl(),
  phone: "(+84) 905 888 234",
  phoneHref: "tel:+84905888234",
  email: "concierge@bachmavien.vn",
  hours: { open: "07:00", close: "18:00" },
  copyrightYear: 2026,
  /** Approximate location of the Cổ Cò river corridor between Đà Nẵng and Hội An. */
  geo: { latitude: 15.9, longitude: 108.3 },
} as const;
