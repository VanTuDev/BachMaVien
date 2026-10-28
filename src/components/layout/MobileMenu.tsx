"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";

/** Full-height drawer used below the `xl` breakpoint (phones and tablets). */
export function MobileMenu() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("menu.close") : t("menu.open")}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-sm text-espresso transition-colors hover:bg-sand/60"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-cream px-5 pt-6 pb-10 sm:px-8">
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="flex flex-col"
            linkClassName="block border-b border-espresso/10 py-4 type-title text-espresso"
            activeClassName="text-chestnut"
          />
          <div className="mt-8 flex flex-col gap-6">
            <ButtonLink href={bookingHref} onClick={() => setOpen(false)} className="w-full">
              {t("cta.book")}
            </ButtonLink>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
