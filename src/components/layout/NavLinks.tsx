"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  /** Called after a link is chosen, so the mobile drawer can close itself. */
  onNavigate?: () => void;
};

/** Primary navigation. Client component only so it can highlight the current page. */
export function NavLinks({ className, linkClassName, activeClassName, onNavigate }: Props) {
  const t = useTranslations("common.nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {mainNav.map(({ key, href }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={key}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(linkClassName, active && activeClassName)}
            >
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
