import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects "/" and unprefixed paths to the visitor's best-matching locale.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, icons, sitemap.xml...).
  matcher: ["/((?!api|_next|_vercel|.*\..*).*)"],
};
