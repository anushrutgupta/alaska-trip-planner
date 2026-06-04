import { useEffect, useRef, useState } from "react";
import { DAYS } from "../data/days";
import { EventRow } from "./EventRow";
import { TideStrip } from "./TideStrip";
import type { TripDateInfo } from "../hooks/useTripDate";

interface Props {
  trip: TripDateInfo;
  notes: Record<string, string>;
  setNotes: (n: Record<string, string>) => void;
  onJumpToStop: (i: number) => void;
}

export function DaysPanel({ trip, notes, setNotes, onJumpToStop }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (trip.todayIndex !== null && trip.todayIndex >= 0) return trip.todayIndex;
    return 0;
  });

  const day = DAYS[activeIndex];

  // Keep active day in sync if URL date changes
  useEffect(() => {
    if (trip.todayIndex !== null && trip.todayIndex >= 0) {
      setActiveIndex(trip.todayIndex);
    }
  }, [trip.todayIndex]);

  const stripRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLButtonElement>(
      `[data-day-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  const noteVal = notes[day.dateISO] ?? "";

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Day strip — horizontal scroll */}
      <div
        ref={stripRef}
        className="scroll-soft flex shrink-0 gap-1.5 overflow-x-auto border-b border-ink-200 px-3 py-2"
      >
        {DAYS.map((d, i) => {
          const isActive = i === activeIndex;
          const isToday = trip.todayIndex === i && trip.phase === "during";
          return (
            <button
              key={d.dateISO}
              data-day-index={i}
              onClick={() => setActiveIndex(i)}
              className={
                "flex shrink-0 flex-col items-center rounded-md px-2.5 py-1.5 text-xs transition-colors " +
                (isActive
                  ? "bg-ink-900 text-white"
                  : isToday
                    ? "bg-accent-100 text-accent-800 ring-1 ring-accent-300"
                    : "bg-white text-ink-600 hover:bg-ink-100")
              }
            >
              <span className="font-semibold">{d.label}</span>
              <span className={isActive ? "text-white/80" : "text-ink-500"}>
                {d.date.split(" ").slice(0, 2).join(" ")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day header */}
      <div className="shrink-0 px-6 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-ink-500">
              {day.label} · {day.date}
            </div>
            <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-ink-900">
              {day.theme}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="rounded-md border border-ink-200 bg-white px-2 py-1 text-xs text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>
            <button
              onClick={() =>
                activeIndex < DAYS.length - 1 && setActiveIndex(activeIndex + 1)
              }
              disabled={activeIndex === DAYS.length - 1}
              className="rounded-md border border-ink-200 bg-white px-2 py-1 text-xs text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span>☀ {day.sunrise}</span>
          <span>☾ {day.sunset}</span>
          <span aria-hidden className="text-ink-300">|</span>
          <span>Overnight: <span className="text-ink-700">{day.overnight}</span></span>
          {day.driveMiles && (
            <>
              <span aria-hidden className="text-ink-300">|</span>
              <span>
                Drive: <span className="text-ink-700">{day.driveMiles} mi · {day.driveTime}</span>
              </span>
            </>
          )}
        </div>
        {day.weather && (
          <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{day.weather}</p>
        )}
        <TideStrip dateISO={day.dateISO} />
      </div>

      {/* Schedule */}
      <div className="scroll-soft flex-1 overflow-y-auto px-3 pb-3">
        <div className="space-y-0.5">
          {day.events.map((e) => (
            <EventRow key={e.id} event={e} onJumpToStop={onJumpToStop} />
          ))}
        </div>

        {/* Per-day notes */}
        <div className="mt-4 rounded-xl border border-ink-200 bg-white p-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Notes for {day.date}
          </label>
          <textarea
            value={noteVal}
            onChange={(e) =>
              setNotes({ ...notes, [day.dateISO]: e.target.value })
            }
            placeholder="What we saw, where we ate, what to remember."
            rows={3}
            className="mt-1.5 w-full resize-y rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
          />
        </div>
      </div>
    </div>
  );
}
