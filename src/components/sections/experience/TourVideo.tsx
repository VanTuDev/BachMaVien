"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

export type VideoChapterData = { key: string; time: number; title: string };

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  chapters: VideoChapterData[];
  labels: { playerLabel: string; play: string; chaptersLabel: string; unsupported: string };
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Demo video with chapter shortcuts. The file is ~35 MB, so it stays on `preload="none"`:
 * nothing is downloaded until the visitor presses play or picks a chapter.
 */
export function TourVideo({ src, poster, width, height, chapters, labels }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  let activeChapter = 0;
  chapters.forEach((chapter, i) => {
    if (time >= chapter.time) activeChapter = i;
  });

  function play(from?: number) {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    if (from !== undefined) {
      // Before metadata is loaded the seek has to wait; onLoadedMetadata applies it.
      if (video.readyState >= 1) video.currentTime = from;
      else pendingSeek.current = from;
    }
    void video.play().catch(() => setStarted(false));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      <div
        className="relative overflow-hidden rounded-sm bg-ink shadow-warm-lg lg:col-span-8"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <video
          ref={videoRef}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          aria-label={labels.playerLabel}
          className="absolute inset-0 size-full object-contain"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            if (pendingSeek.current !== null) {
              e.currentTarget.currentTime = pendingSeek.current;
              pendingSeek.current = null;
            }
          }}
          onPlay={() => setStarted(true)}
        >
          <source src={src} type="video/mp4" />
          {labels.unsupported}
        </video>

        {!started && (
          <button
            type="button"
            onClick={() => play()}
            aria-label={labels.play}
            className="group/play absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/55 via-transparent to-ink/10"
          >
            <span className="flex flex-col items-center gap-3">
              <span className="grid size-20 place-items-center rounded-full bg-brass text-espresso shadow-lg transition-transform duration-300 group-hover/play:scale-110 sm:size-24">
                <Play aria-hidden className="size-8 translate-x-0.5 fill-current sm:size-9" />
              </span>
              <span className="rounded-xs bg-espresso/70 px-3 py-1.5 type-label-sm text-cream backdrop-blur-sm">{labels.play}</span>
            </span>
          </button>
        )}
      </div>

      <div className="relative min-h-0 lg:col-span-4">
        <div className="flex flex-col gap-3 rounded-sm bg-espresso p-5 lg:absolute lg:inset-0 lg:p-6">
          <p className="type-label-sm text-brass">{labels.chaptersLabel}</p>
          <ol className="scroll-thin -mr-2 flex max-h-80 min-h-0 flex-col gap-1 overflow-y-auto pr-2 lg:max-h-none lg:flex-1">
            {chapters.map((chapter, i) => {
              const active = i === activeChapter && (started || time > 0);
              return (
                <li key={chapter.key}>
                  <button
                    type="button"
                    onClick={() => play(chapter.time)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex w-full items-baseline gap-3 rounded-xs border-l-2 px-3 py-2.5 text-left transition-colors",
                      active ? "border-brass bg-sand/10 text-cream" : "border-transparent text-sand/75 hover:bg-sand/5 hover:text-cream",
                    )}
                  >
                    <span className="w-9 shrink-0 font-mono text-xs text-brass tabular-nums">{formatTime(chapter.time)}</span>
                    <span className="text-sm leading-snug">{chapter.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
