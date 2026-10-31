"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

export type CarouselSlide = { src: string; width: number; height: number; alt: string };

export type CarouselLabels = {
  region: string;
  prev: string;
  next: string;
  pause: string;
  play: string;
  /** "Go to photo {n}" already resolved per slide by the caller. */
  goTo: string[];
  /** "Photo {current} of {total}" already resolved per slide by the caller. */
  slide: string[];
};

type Props = { slides: CarouselSlide[]; labels: CarouselLabels; className?: string };

/**
 * Looping photo carousel (Embla). Slides keep their intrinsic ratio, so photos are never cropped.
 * Autoplay pauses on hover/focus, can be toggled, and is off for people who prefer reduced motion.
 */
export function Carousel({ slides, labels, className }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect).on("reInit", onSelect);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      embla.plugins().autoplay?.stop();
      // Subscribed callback, not a synchronous effect update.
      queueMicrotask(() => setPlaying(false));
    }
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  const toggle = useCallback(() => {
    const autoplay = embla?.plugins().autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setPlaying(false);
    } else {
      autoplay.play();
      setPlaying(true);
    }
  }, [embla]);

  const control =
    "grid size-11 place-items-center rounded-full border border-sand/30 text-cream transition-colors hover:border-brass hover:bg-brass hover:text-espresso";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region} className={className}>
      <div ref={emblaRef} className="-mx-3 overflow-hidden px-3 py-4">
        <div className="-ml-4 flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={labels.slide[index]}
              className="min-w-0 flex-[0_0_80%] pl-4 sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
            >
              <div
                className={cn(
                  "photo-frame transition-transform duration-500",
                  index === selected ? "scale-100" : "scale-[0.97] opacity-80",
                )}
              >
                <Image
                  src={slide.src}
                  width={slide.width}
                  height={slide.height}
                  alt={slide.alt}
                  sizes="(min-width: 1280px) 384px, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 80vw"
                  draggable={false}
                  loading="eager"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => embla?.scrollPrev()} aria-label={labels.prev} className={control}>
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button type="button" onClick={() => embla?.scrollNext()} aria-label={labels.next} className={control}>
            <ChevronRight aria-hidden className="size-5" />
          </button>
          <button type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play} className={control}>
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p aria-hidden className="font-serif text-sm tabular-nums text-sand/70">
            {String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => embla?.scrollTo(index)}
                aria-label={labels.goTo[index]}
                aria-current={index === selected ? "true" : undefined}
                className="grid h-6 w-4 place-items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    index === selected ? "w-5 bg-brass" : "w-1.5 bg-sand/35",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
