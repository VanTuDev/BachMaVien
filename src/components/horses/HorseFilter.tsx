"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Item = { key: string; purposes: readonly string[]; node: ReactNode };

type Props = {
  items: Item[];
  filters: { value: string; label: string }[];
  filterLabel: string;
  /** Template with {shown} and {total} placeholders, e.g. "{shown} / {total} horses". */
  countTemplate: string;
};

/** Filter chips for the herd. Cards are rendered on the server and passed in, so only the chips are client code. */
export function HorseFilter({ items, filters, filterLabel, countTemplate }: Props) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? items : items.filter((item) => item.purposes.includes(active));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <div role="group" aria-label={filterLabel} className="flex flex-wrap justify-center gap-2">
          {filters.map(({ value, label }) => {
            const selected = active === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(value)}
                className={cn(
                  "rounded-full border px-5 py-2.5 type-label transition-colors",
                  selected
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/20 bg-surface text-muted hover:border-brass hover:text-espresso",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-sm text-muted tabular-nums">
          {countTemplate.replace("{shown}", String(visible.length)).replace("{total}", String(items.length))}
        </p>
      </div>

      <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <li key={item.key} className="page-enter">
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
