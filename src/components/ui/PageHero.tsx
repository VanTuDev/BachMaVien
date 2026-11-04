import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  /** Small row above the title (breadcrumb tag, badges). */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Second line of the h1, rendered in italic brass-deep. */
  accent?: ReactNode;
  lead?: ReactNode;
  /** Optional column beside the intro on large screens. */
  aside?: ReactNode;
  /** Optional content under the intro (stats, actions). */
  children?: ReactNode;
  className?: string;
};

/** Opening block for inner pages: parchment background with a faint brass glow, h1 and lead paragraph. */
export function PageHero({ eyebrow, title, accent, lead, aside, children, className }: Props) {
  return (
    <section className={cn("relative overflow-hidden bg-cream py-14 sm:py-20 lg:py-24", className)}>
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-sand/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-brass/10 blur-3xl" />

      <Container className="relative">
        <div className={cn("grid gap-12 lg:gap-16", !!aside && "lg:grid-cols-12 lg:items-center")}>
          <div className={cn("enter flex flex-col gap-6", !!aside && "lg:col-span-7")}>
            {eyebrow && <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{eyebrow}</div>}
            <h1 className="type-display text-espresso">
              {title}
              {accent && (
                <>
                  <br />
                  <em className="text-chestnut">{accent}</em>
                </>
              )}
            </h1>
            {lead && <p className="type-lead max-w-2xl text-muted">{lead}</p>}
            {children}
          </div>
          {aside && (
            <div style={{ "--d": 2 } as CSSProperties} className="enter lg:col-span-5">
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
