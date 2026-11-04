import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

const secondaryLink =
  "btn-shine inline-flex items-center gap-2.5 rounded-sm border border-brass px-6 py-3.5 type-label text-espresso transition-colors hover:bg-sand/50";

/** Photo-space rental (quoted by message, no price on the site) and the café, side by side. */
export function Extras() {
  const rental = useTranslations("shared.rental");
  const cafe = useTranslations("shared.cafe");

  return (
    <Section tone="mid" labelledBy="rental-title">
      <div className="reveal-stagger grid items-stretch gap-6 lg:grid-cols-2">
        <article className="flex flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
          <Photo name="scene-photo-zone" framed={false} sizes="(min-width: 1280px) 580px, (min-width: 1024px) 45vw, 100vw" />
          <div className="flex flex-1 flex-col items-start gap-4 p-7">
            <Eyebrow>{rental("eyebrow")}</Eyebrow>
            <h2 id="rental-title" className="type-headline-md">
              {rental("title")}
            </h2>
            <p className="text-muted">{rental("text")}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a
                href={siteConfig.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2.5 rounded-sm bg-espresso px-6 py-3.5 type-label text-cream transition-colors hover:bg-chestnut"
              >
                <MessageCircle aria-hidden className="size-4" />
                {rental("zalo")}
              </a>
              <a href={siteConfig.phoneHref} className={secondaryLink}>
                <Phone aria-hidden className="size-4" />
                {rental("call")}
              </a>
            </div>
          </div>
        </article>

        <article className="flex flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
          <Photo name="scene-cafe-front" framed={false} sizes="(min-width: 1280px) 580px, (min-width: 1024px) 45vw, 100vw" />
          <div className="flex flex-1 flex-col items-start gap-4 p-7">
            <Eyebrow>{cafe("eyebrow")}</Eyebrow>
            <h2 className="type-headline-md">{cafe("title")}</h2>
            <p className="text-muted">{cafe("text")}</p>
            <ButtonLink href="/menu" variant="outline" className="mt-auto">
              {cafe("action")}
            </ButtonLink>
          </div>
        </article>
      </div>
    </Section>
  );
}
