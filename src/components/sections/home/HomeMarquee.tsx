import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const keys = ["m1", "m2", "m3", "m4", "m5", "m6"] as const;

/** Decorative brand ticker. Duplicated once so the CSS loop is seamless; hidden from assistive tech. */
export function HomeMarquee() {
  const t = useTranslations("home.marquee");

  return (
    <div aria-hidden className="marquee overflow-hidden border-y border-espresso/10 bg-sand py-5 text-chestnut">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {keys.map((key) => (
              <li key={key} className="flex items-center">
                <span className="px-8 font-serif text-xl tracking-wide whitespace-nowrap uppercase sm:text-2xl">{t(key)}</span>
                <Star className="size-4 fill-brass text-brass" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
