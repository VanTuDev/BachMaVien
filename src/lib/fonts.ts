import { Be_Vietnam_Pro } from "next/font/google";

/**
 * One family for the whole site, headings included. Be Vietnam Pro was drawn by Vietnamese designers for
 * Vietnamese, so every tone mark stacks correctly. Weights 400-800 cover body (400/500), labels and
 * subheadings (600/700) and the largest titles (800).
 *
 * If the font fails to load the browser falls back to Noto Sans, then the device's default sans-serif.
 */
export const fontSans = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-be-vietnam",
  display: "swap",
  fallback: ["Noto Sans", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});
