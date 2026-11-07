import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { getImage } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

type Props = {
  horse: Horse;
  /** card: 4:3 panel, feature: tall panel for the mascot, mini: square tile for the home teaser. */
  variant?: "card" | "feature" | "mini";
  sizes: string;
  className?: string;
};

const ratio = { card: "aspect-[5/4]", feature: "aspect-[4/5]", mini: "aspect-square" } as const;

/**
 * Real photo when the ranch has one, otherwise a portrait panel in the horse's own coat colors
 * with the mane tone and the brand mark, so every horse still has a face.
 */
export function HorsePortrait({ horse, variant = "card", sizes, className }: Props) {
  const t = useTranslations("horses");
  const tImg = useTranslations("images");
  const light = horse.ink === "light";
  const logo = getImage(light ? "logo-white" : "logo");

  if (horse.image) {
    // The spotlight shows the photo whole. Cards and tiles fill a fixed frame so rows line up; `focus` keeps the head in view.
    if (variant === "feature") return <Photo name={horse.image} framed={false} sizes={sizes} className={className} />;
    return (
      <div className={cn("photo relative overflow-hidden bg-sand", ratio[variant], className)}>
        <Image
          src={getImage(horse.image).src}
          alt={tImg(horse.image)}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: horse.focus ?? "50% 50%" }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={horse.name}
      className={cn("relative isolate overflow-hidden", ratio[variant], light ? "text-cream" : "text-espresso", className)}
      style={{ backgroundImage: `linear-gradient(150deg, ${horse.coat.from}, ${horse.coat.to})` }}
    >
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt=""
        sizes={sizes}
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm",
          variant === "mini" ? "w-[62%]" : "w-[46%]",
          light ? "opacity-80" : "opacity-90",
        )}
      />
      {variant !== "mini" && (
        <>
          <span aria-hidden className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="size-3.5 rounded-full ring-2 ring-white/60" style={{ backgroundColor: horse.coat.to }} />
            <span className="size-3.5 rounded-full ring-2 ring-white/60" style={{ backgroundColor: horse.coat.mane }} />
          </span>
          <span className="absolute right-3 bottom-3 type-label-sm opacity-70">{t("photoSoon")}</span>
        </>
      )}
    </div>
  );
}
