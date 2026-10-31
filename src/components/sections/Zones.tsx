import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { zones } from "@/data/zones";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = { eyebrow: string; title: string; action?: ReactNode };

/** Icon grid of everything on the ranch. Names follow the list supplied by the owners. */
export function Zones({ eyebrow, title, action }: Props) {
  const t = useTranslations("shared.zones");

  return (
    <Section labelledBy="zones-title">
      <SectionHeader id="zones-title" align="center" eyebrow={eyebrow} title={title} />
      <ul className="reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {zones.map(({ key, icon: Icon }) => (
          <li
            key={key}
            className="flex flex-col items-center gap-3 rounded-sm border border-espresso/10 bg-surface p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-warm"
          >
            <span className="grid size-12 place-items-center rounded-full bg-sand text-chestnut">
              <Icon aria-hidden className="size-6" />
            </span>
            <span className="type-title !text-base">{t(key)}</span>
          </li>
        ))}
      </ul>
      {action && <div className="mt-10 flex justify-center">{action}</div>}
    </Section>
  );
}
