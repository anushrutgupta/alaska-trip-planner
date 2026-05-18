import { useEffect, useRef } from "react";
import type { Stop } from "../data/stops";

interface Props {
  stops: Stop[];
  currentIndex: number;
  hoveredIndex: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
}

export function RouteTimeline({
  stops,
  currentIndex,
  hoveredIndex,
  onSelect,
  onHover,
}: Props) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll the selected row into view
  useEffect(() => {
    const el = itemRefs.current[currentIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentIndex]);

  return (
    <div className="scroll-soft flex-1 overflow-y-auto px-3 py-3">
      <ol className="relative">
        {/* Vertical line through dots */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-ink-200" />

        {stops.map((s, i) => {
          const isCurrent = i === currentIndex;
          const isVisited = i < currentIndex;
          const isHovered = i === hoveredIndex;

          return (
            <li key={s.index} className="relative">
              <button
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => onSelect(i)}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
                className={
                  "group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition-colors " +
                  (isCurrent
                    ? "bg-accent-50"
                    : isHovered
                      ? "bg-ink-50"
                      : "hover:bg-ink-50")
                }
              >
                <div className="relative z-10 mt-1 flex h-3 w-3 shrink-0 items-center justify-center">
                  <Dot
                    state={
                      isCurrent ? "current" : isVisited ? "visited" : "future"
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        "truncate text-sm font-medium " +
                        (isCurrent
                          ? "text-accent-700"
                          : isVisited
                            ? "text-ink-800"
                            : "text-ink-500")
                      }
                    >
                      {s.label}
                    </span>
                    {s.highlight && (
                      <span className="shrink-0 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
                        ★
                      </span>
                    )}
                    {isCurrent && (
                      <span className="shrink-0 rounded-full bg-accent-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                        Now
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink-500">
                    {s.day} · {s.date}
                    {s.distance && (
                      <>
                        {" "}
                        <span className="text-ink-300">·</span> {s.distance}
                      </>
                    )}
                  </div>
                </div>

                {isVisited && (
                  <svg
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Dot({ state }: { state: "current" | "visited" | "future" }) {
  if (state === "current") {
    return (
      <span className="relative inline-flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-3 w-3 rounded-full bg-accent-400 opacity-60 [animation:softPulse_1.8s_ease-in-out_infinite]" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-accent-600 ring-2 ring-white" />
      </span>
    );
  }
  if (state === "visited") {
    return <span className="h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-white" />;
  }
  return <span className="h-2.5 w-2.5 rounded-full border border-ink-300 bg-white" />;
}
