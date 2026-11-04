"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize, Minimize, Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { useFullscreen, useMediaQuery } from "@/lib/use-media";

export type TourScene = { src: string; width: number; height: number; alt: string; label: string };

export type TourStopData = {
  key: string;
  zone: string;
  title: string;
  subtitle: string;
  text: string;
  views: TourScene[];
  link?: { href: string; label: string };
};

export type TourLabels = {
  stageLabel: string;
  /** Contains {current}, {total} and {title}. */
  sceneStatus: string;
  /** Contains {current} and {total}. */
  stopStatus: string;
  prev: string;
  next: string;
  zoomIn: string;
  zoomOut: string;
  resetZoom: string;
  fullscreen: string;
  exitFullscreen: string;
  autoplay: string;
  pause: string;
  hint: string;
  hintTouch: string;
  viewsLabel: string;
  routeLabel: string;
  disclaimer: string;
};

type Props = {
  stops: TourStopData[];
  zones: { key: string; label: string }[];
  labels: TourLabels;
};

type View = { z: number; x: number; y: number };

const RESET: View = { z: 1, x: 0, y: 0 };
const MAX_ZOOM = 3;
const DOUBLE_CLICK_ZOOM = 2.4;
const AUTOPLAY_MS = 7000;
/** Max tilt in degrees while the pointer moves over an un-zoomed scene. */
const TILT_Y = 4;
const TILT_X = 3;

const iconButton =
  "grid size-10 place-items-center rounded-sm bg-espresso/70 text-cream backdrop-blur-sm transition-colors hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-40";

const arrowButton = cn(
  iconButton,
  "absolute top-1/2 size-11 -translate-y-1/2 sm:size-12",
  "opacity-100 transition-opacity md:opacity-0 md:group-focus-within/stage:opacity-100 md:group-hover/stage:opacity-100",
);

/** Keeps the zoomed picture covering the stage: at zoom z the picture may move (z-1)/2 of the stage on each side. */
function clampView(view: View, width: number, height: number): View {
  const maxX = ((view.z - 1) * width) / 2;
  const maxY = ((view.z - 1) * height) / 2;
  return { z: view.z, x: Math.min(maxX, Math.max(-maxX, view.x)), y: Math.min(maxY, Math.max(-maxY, view.y)) };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Interactive viewer for the 3D renders. The renders are flat images (not panoramas), so the "3D" feel comes from
 * a light parallax tilt, zoom-and-drag exploration of the 2560 px source and a guided auto tour.
 */
export function TourViewer({ stops, zones, labels }: Props) {
  const flat = useMemo(
    () => stops.flatMap((stop, stopIndex) => stop.views.map((scene, viewIndex) => ({ stopIndex, viewIndex, scene }))),
    [stops],
  );
  const total = flat.length;
  const firstIndexOfStop = useMemo(
    () => stops.map((_, stopIndex) => flat.findIndex((item) => item.stopIndex === stopIndex)),
    [stops, flat],
  );

  const [index, setIndex] = useState(0);
  const [view, setView] = useState<View>(RESET);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; originX: number; originY: number } | null>(null);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const fullscreen = useFullscreen();

  const current = flat[index];
  const stop = stops[current.stopIndex];
  const zoomed = view.z > 1;

  const clearTilt = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--ts", "1");
    el.style.setProperty("--glare", "0");
  }, []);

  const select = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
      setView(RESET);
      clearTilt();
    },
    [total, clearTilt],
  );
  const goPrev = () => select(index - 1);
  const goNext = () => select(index + 1);

  /** Zoom to `z`, keeping the point under `focus` (px from the stage centre) fixed on screen. */
  function zoomTo(z: number, focus = { x: 0, y: 0 }) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nz = Math.min(MAX_ZOOM, Math.max(1, z));
    clearTilt();
    setView((v) => {
      if (nz === 1) return RESET;
      const x = focus.x - (nz * (focus.x - v.x)) / v.z;
      const y = focus.y - (nz * (focus.y - v.y)) / v.z;
      return clampView({ z: nz, x, y }, rect.width, rect.height);
    });
  }

  function toggleFullscreen() {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") goNext();
    else if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "+" || e.key === "=") zoomTo(view.z + 0.6);
    else if (e.key === "-") zoomTo(view.z - 0.6);
    else if (e.key === "0") zoomTo(1);
    else return;
    e.preventDefault();
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button, a")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, originX: view.x, originY: view.y };
    if (zoomed) setDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const rect = e.currentTarget.getBoundingClientRect();
    if (d && d.id === e.pointerId && zoomed) {
      setView((v) => clampView({ z: v.z, x: d.originX + e.clientX - d.x, y: d.originY + e.clientY - d.y }, rect.width, rect.height));
      return;
    }
    const el = tiltRef.current;
    if (!el || zoomed || reducedMotion || e.pointerType !== "mouse") return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${((px - 0.5) * 2 * TILT_Y).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-(py - 0.5) * 2 * TILT_X).toFixed(2)}deg`);
    el.style.setProperty("--ts", "1.04");
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--glare", "1");
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    // A quick horizontal flick on a touch screen changes scene, like a photo gallery.
    if (d && !zoomed && e.pointerType !== "mouse") {
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) select(dx < 0 ? index + 1 : index - 1);
    }
  }

  function onDoubleClick(e: MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button, a")) return;
    if (zoomed) {
      zoomTo(1);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    zoomTo(DOUBLE_CLICK_ZOOM, { x: e.clientX - rect.left - rect.width / 2, y: e.clientY - rect.top - rect.height / 2 });
  }

  // Guided tour: advance after a pause; zooming in (the visitor is inspecting) holds it.
  useEffect(() => {
    if (!playing || zoomed) return;
    const id = window.setTimeout(() => select(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, zoomed, index, select]);

  // Keep the active thumbnail centred without scrolling the page itself.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !active) return;
    strip.scrollTo({ left: active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2, behavior: reducedMotion ? "auto" : "smooth" });
  }, [current.stopIndex, reducedMotion]);

  const nextScene = flat[(index + 1) % total].scene;
  const prevScene = flat[(index - 1 + total) % total].scene;
  const baseSizes = fullscreen.active ? "100vw" : "(min-width: 1024px) 66vw, 100vw";
  const imageSizes = zoomed ? "200vw" : baseSizes;

  const status = labels.sceneStatus
    .replace("{current}", String(index + 1))
    .replace("{total}", String(total))
    .replace("{title}", stop.title);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="flex min-w-0 flex-col gap-5 lg:col-span-8">
        <div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={labels.stageLabel}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={clearTilt}
          onDoubleClick={onDoubleClick}
          className={cn(
            "group/stage relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-ink shadow-warm-lg select-none",
            "[&:fullscreen]:aspect-auto [&:fullscreen]:h-dvh [&:fullscreen]:rounded-none",
            zoomed ? "cursor-grab touch-none active:cursor-grabbing" : "cursor-zoom-in touch-pan-y",
          )}
        >
          <div
            ref={tiltRef}
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--ts, 1))" }}
          >
            <div
              className={cn("absolute inset-0", !dragging && "transition-transform duration-300 ease-out")}
              style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.z})` }}
            >
              <Image
                key={index}
                src={current.scene.src}
                alt={current.scene.alt}
                fill
                quality={85}
                sizes={imageSizes}
                draggable={false}
                className="scene-in object-contain"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: "var(--glare, 0)",
                background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgb(255 244 224 / 0.16), transparent 45%)",
              }}
            />
          </div>

          {/* Warm up the neighbouring scenes so arrows feel instant. */}
          <div aria-hidden className="pointer-events-none absolute size-0 overflow-hidden">
            {[nextScene, prevScene].map((scene) => (
              <Image key={scene.src} src={scene.src} alt="" fill quality={85} sizes={baseSizes} loading="eager" />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
            <p className="rounded-xs bg-espresso/70 px-3 py-1.5 type-label-sm text-brass backdrop-blur-sm">
              {pad(index + 1)} / {pad(total)}
            </p>
            <div className="pointer-events-auto flex items-center gap-1.5">
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-pressed={playing}
                  aria-label={playing ? labels.pause : labels.autoplay}
                  title={playing ? labels.pause : labels.autoplay}
                  className={iconButton}
                >
                  {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => zoomTo(view.z - 0.6)}
                disabled={!zoomed}
                aria-label={labels.zoomOut}
                title={labels.zoomOut}
                className={iconButton}
              >
                <ZoomOut aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => zoomTo(view.z + 0.6)}
                disabled={view.z >= MAX_ZOOM}
                aria-label={labels.zoomIn}
                title={labels.zoomIn}
                className={iconButton}
              >
                <ZoomIn aria-hidden className="size-4" />
              </button>
              {zoomed && (
                <button
                  type="button"
                  onClick={() => zoomTo(1)}
                  aria-label={labels.resetZoom}
                  title={labels.resetZoom}
                  className={iconButton}
                >
                  <RotateCcw aria-hidden className="size-4" />
                </button>
              )}
              {fullscreen.supported && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen.active ? labels.exitFullscreen : labels.fullscreen}
                  title={fullscreen.active ? labels.exitFullscreen : labels.fullscreen}
                  className={iconButton}
                >
                  {fullscreen.active ? <Minimize aria-hidden className="size-4" /> : <Maximize aria-hidden className="size-4" />}
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label={labels.prev}
            title={labels.prev}
            className={cn(arrowButton, "left-2 sm:left-3")}
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={labels.next}
            title={labels.next}
            className={cn(arrowButton, "right-2 sm:right-3")}
          >
            <ArrowRight aria-hidden className="size-5" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-4 pt-14 pb-4 sm:px-5 sm:pb-5">
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-cream sm:text-xl">{stop.title}</p>
              <p className="truncate text-xs text-sand/85 sm:text-sm">
                {stop.subtitle}
                {stop.views.length > 1 && <span className="text-brass"> · {current.scene.label}</span>}
              </p>
            </div>
            <p className="hidden shrink-0 text-xs text-sand/70 md:block">{coarsePointer ? labels.hintTouch : labels.hint}</p>
          </div>

          {playing && !zoomed && (
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-cream/15">
              <div
                key={index}
                className="tour-progress h-full bg-brass"
                style={{ animation: `tour-progress ${AUTOPLAY_MS}ms linear both` }}
              />
            </div>
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          {status}
        </p>

        <div className="flex flex-col gap-3">
          <div role="group" aria-label={labels.routeLabel} className="flex flex-wrap gap-2">
            {zones.map((zone) => {
              const first = stops.findIndex((s) => s.zone === zone.key);
              const active = stop.zone === zone.key;
              return (
                <button
                  key={zone.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(firstIndexOfStop[first])}
                  className={cn(
                    "rounded-xs border px-3.5 py-2 type-label-sm transition-colors",
                    active ? "border-espresso bg-espresso text-cream" : "border-brass/50 text-chestnut hover:bg-sand/60",
                  )}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>

          <ul ref={stripRef} className="scroll-thin relative -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
            {stops.map((s, stopIndex) => {
              const active = stopIndex === current.stopIndex;
              const thumb = s.views[0];
              return (
                <li key={s.key} className="w-36 shrink-0 snap-start sm:w-44">
                  <button
                    type="button"
                    onClick={() => select(firstIndexOfStop[stopIndex])}
                    aria-current={active ? "true" : undefined}
                    className="group/thumb flex w-full flex-col gap-2 text-left"
                  >
                    <span
                      className={cn(
                        "photo relative block aspect-[3/2] overflow-hidden rounded-xs bg-sand ring-2 ring-offset-2 ring-offset-cream transition-shadow",
                        active ? "ring-brass" : "ring-transparent group-hover/thumb:ring-brass/40",
                      )}
                    >
                      <Image
                        src={thumb.src}
                        alt=""
                        fill
                        sizes="176px"
                        className={cn("object-cover transition-opacity", !active && "opacity-80 group-hover/thumb:opacity-100")}
                      />
                      <span className="absolute top-1.5 left-1.5 rounded-xs bg-espresso/75 px-1.5 py-0.5 type-label-sm !text-[0.625rem] text-cream backdrop-blur-sm">
                        {pad(stopIndex + 1)}
                      </span>
                      {s.views.length > 1 && (
                        <span className="absolute right-1.5 bottom-1.5 rounded-xs bg-espresso/75 px-1.5 py-0.5 type-label-sm !text-[0.625rem] text-brass backdrop-blur-sm">
                          ×{s.views.length}
                        </span>
                      )}
                    </span>
                    <span
                      className={cn("line-clamp-2 text-xs leading-snug sm:text-sm", active ? "font-semibold text-espresso" : "text-muted")}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
        <div className="flex flex-col gap-5 rounded-sm border border-brass/30 bg-surface-low p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>{zones.find((z) => z.key === stop.zone)?.label}</Eyebrow>
            <p className="type-label-sm text-muted">
              {labels.stopStatus.replace("{current}", String(current.stopIndex + 1)).replace("{total}", String(stops.length))}
            </p>
          </div>

          <div key={stop.key} className="scene-in flex flex-col gap-3">
            <h3 className="type-headline-md text-espresso">{stop.title}</h3>
            <p className="text-chestnut italic">{stop.subtitle}</p>
            <p className="text-muted">{stop.text}</p>
          </div>

          {stop.views.length > 1 && (
            <div className="flex flex-col gap-2.5 border-t border-espresso/10 pt-5">
              <p className="type-label-sm text-chestnut">{labels.viewsLabel}</p>
              <div role="group" aria-label={labels.viewsLabel} className="flex flex-wrap gap-2">
                {stop.views.map((scene, viewIndex) => {
                  const active = viewIndex === current.viewIndex;
                  return (
                    <button
                      key={scene.src}
                      type="button"
                      aria-pressed={active}
                      onClick={() => select(firstIndexOfStop[current.stopIndex] + viewIndex)}
                      className={cn(
                        "rounded-xs border px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "border-brass bg-sand text-espresso"
                          : "border-espresso/15 text-muted hover:border-brass hover:text-espresso",
                      )}
                    >
                      {scene.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {stop.link && (
            <div className="border-t border-espresso/10 pt-5">
              <TextLink href={stop.link.href}>{stop.link.label}</TextLink>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs text-muted">{labels.disclaimer}</p>
      </aside>
    </div>
  );
}
