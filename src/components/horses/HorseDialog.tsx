"use client";

import { useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  /** Text and styling of the button that opens the profile. */
  trigger: ReactNode;
  triggerClassName: string;
  /** Accessible names. */
  label: string;
  closeLabel: string;
  /** The profile, rendered on the server and shown inside the dialog. */
  children: ReactNode;
};

/**
 * Horse profile in a native modal <dialog>: focus is trapped, Esc closes it, and the page behind
 * stays put instead of the card stretching and breaking the grid.
 */
export function HorseDialog({ trigger, triggerClassName, label, closeLabel, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-haspopup="dialog"
        onClick={() => {
          document.documentElement.style.overflow = "hidden";
          ref.current?.showModal();
        }}
      >
        {trigger}
      </button>

      <dialog
        ref={ref}
        aria-label={label}
        onClose={() => {
          document.documentElement.style.overflow = "";
        }}
        // Clicks on the dimmed backdrop land on the dialog element itself, never on its content.
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
        className="horse-dialog m-auto max-h-[92dvh] w-[min(64rem,calc(100%-1.5rem))] overflow-hidden rounded-sm bg-surface p-0 text-espresso shadow-warm-lg backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-espresso/85 text-cream backdrop-blur-sm transition-colors hover:bg-brass hover:text-espresso"
        >
          <X aria-hidden className="size-5" />
        </button>
        {children}
      </dialog>
    </>
  );
}
