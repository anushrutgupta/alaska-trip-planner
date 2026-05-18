import type { Stop } from "../data/stops";

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

export function DetailCard({
  stop,
  prev,
  next,
  onPrev,
  onNext,
  totalStops,
}: Props) {
  return (
    <div className="border-b border-ink-200 px-6 pt-5 pb-4">
      <div className="flex items-center gap-2 text-xs text-ink-500">
        <span>
          Stop {stop.index + 1} of {totalStops}
        </span>
        <span aria-hidden>·</span>
        <span>{stop.region}</span>
      </div>

      <div className="mt-2 flex items-start gap-3">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-ink-900">
          {stop.label}
        </h2>
        {stop.highlight && (
          <span className="mt-1.5 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
            Highlight
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-600">
        <span className="font-medium text-ink-700">
          {stop.day} · {stop.date}
        </span>
        <span aria-hidden className="text-ink-300">|</span>
        <span>
          <ModeDot mode={stop.mode} />
          <span className="ml-1.5">{MODE_LABEL[stop.mode]}</span>
          {stop.distance && (
            <span className="ml-2 text-ink-500">{stop.distance}</span>
          )}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        {stop.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={!prev}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft />
          <span>{prev ? prev.label : "Start"}</span>
        </button>
        <button
          onClick={onNext}
          disabled={!next}
          className="inline-flex flex-1 items-center justify-between gap-1 rounded-md bg-ink-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="truncate">
            <span className="text-ink-400">Next:</span>{" "}
            <span className="font-medium">{next ? next.label : "End of trip"}</span>
          </span>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModeDot({ mode }: { mode: string }) {
  const colors: Record<string, string> = {
    fly: "bg-violet-400",
    drive: "bg-emerald-400",
    bus: "bg-orange-400",
    boat: "bg-sky-400",
  };
  return (
    <span
      className={
        "inline-block h-1.5 w-1.5 rounded-full align-middle " +
        (colors[mode] ?? "bg-ink-400")
      }
    />
  );
}
