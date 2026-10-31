import type { ComponentProps } from "react";
import { ButtonLink } from "./Button";
import { Section } from "./Section";

type Props = {
  title: string;
  action: string;
  href: ComponentProps<typeof ButtonLink>["href"];
};

/** Compact dark call-to-action band that closes an inner page. */
export function PageCta({ title, action, href }: Props) {
  return (
    <Section tone="dark" className="py-14 sm:py-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <h2 className="type-headline-md text-cream">{title}</h2>
        <ButtonLink href={href} variant="brass" className="shrink-0">
          {action}
        </ButtonLink>
      </div>
    </Section>
  );
}
