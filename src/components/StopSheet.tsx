import { useState } from "react";
import type { Stop } from "../data/stops";

/* Mobile-only overlay card pinned to the bottom of the full-bleed map —
 * the phone equivalent of DetailCard. Prev/next are the primary stepper. */

interface Props {
  stop: Stop;
  prev: Stop | null;
  next: Stop | null;
  onPrev: () => void;
  onNext: () => void;
  totalStops: number;
}

const MODE_LABEL: Record<string, string> = {
  fly: "Fly",
  drive: "Drive",
  bus: "Bus",
  boat: "Boat",
};

export function StopSheet({ stop, prev, next, onPrev, onNext, totalStops }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-x-2 bottom-2 z-[1000] lg:hidden">
      <div className="pointer-events-auto rounded-2xl border border-ink-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="block w-full text-left"
        >
          <div className="flex items-center gap-2 text-[11px] text-ink-500">
            <span>
              Stop {stop.index + 1}/{totalStops}
            </span>
            <span aria-hidden>·</span>
            <span>
              {stop.day} · {stop.date}
            </span>
            {stop.distance && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {MODE_LABEL[stop.mode]} {stop.distance}
                </span>
              </>
            )}
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-base font-semibold leading-tight text-ink-900">
              {stop.label}
            </span>
            {stop.highlight && (
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
                ★
              </span>
            )}
          </div>
          <p
            className={
              "mt-1 text-xs leading-relaxed text-ink-600 " +
              (expanded ? "" : "line-clamp-2")
            }
          >
            {stop.description}
          </p>
        </button>

        <div className="mt-2.5 flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!prev}
            aria-label="Previous stop"
            className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 disabled:opacity-40"
          >
            ←
          </button>
          <button
            onClick={onNext}
            disabled={!next}
            className="flex flex-1 items-center justify-between gap-1 truncate rounded-md bg-ink-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            <span className="truncate">
              <span className="text-ink-400">Next:</span>{" "}
              {next ? next.label : "End of trip"}
            </span>
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
