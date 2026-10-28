/**
 * Formats a Vietnamese dong amount: "450.000đ" in Vietnamese, "450,000 VND" otherwise.
 * Intl's currency style would give "450.000 ₫" / "₫450,000", which doesn't match the brand's price style.
 */
export function formatVnd(amount: number, locale: string) {
  const number = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(amount);
  return locale === "vi" ? `${number}đ` : `${number} VND`;
}
