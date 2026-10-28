import type { ComponentProps } from "react";
import { ButtonLink } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { Section } from "./Section";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  action: string;
  href: ComponentProps<typeof ButtonLink>["href"];
};

/** Compact dark call-to-action band that closes an inner page. */
export function PageCta({ eyebrow, title, text, action, href }: Props) {
  return (
    <Section tone="dark" className="py-14 sm:py-16 lg:py-20">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex max-w-2xl flex-col gap-3">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 className="type-headline-md text-cream">{title}</h2>
          <p className="text-sand/80">{text}</p>
        </div>
        <ButtonLink href={href} variant="brass" className="shrink-0">
          {action}
        </ButtonLink>
      </div>
    </Section>
  );
}
