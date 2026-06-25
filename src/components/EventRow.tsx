import type { DayEvent, EventType } from "../data/days";
import { BOOKINGS } from "../data/bookings";
import { ActionLinks } from "./ActionLinks";
import { formatTime12h } from "../lib/time";

interface Props {
  event: DayEvent;
  onJumpToStop?: (stopIndex: number) => void;
  compact?: boolean;
  emphasis?: "now" | "next" | "past" | "future";
}

const TYPE_STYLES: Record<EventType, { dot: string; label: string }> = {
  wake: { dot: "bg-amber-300", label: "Wake" },
  meal: { dot: "bg-rose-300", label: "Meal" },
  drive: { dot: "bg-emerald-300", label: "Drive" },
  activity: { dot: "bg-accent-400", label: "Activity" },
  highlight: { dot: "bg-amber-500", label: "★ Highlight" },
  transit: { dot: "bg-violet-400", label: "Transit" },
  checkin: { dot: "bg-sky-400", label: "Check-in" },
  sleep: { dot: "bg-ink-400", label: "Sleep" },
  flex: { dot: "bg-ink-300", label: "Flex" },
  note: { dot: "bg-orange-300", label: "Reminder" },
};

export function EventRow({
  event,
  onJumpToStop,
  compact = false,
  emphasis,
}: Props) {
  const style = TYPE_STYLES[event.type];
  const isHighlight = event.type === "highlight";
  const booking = event.bookingId
    ? BOOKINGS.find((b) => b.id === event.bookingId)
    : undefined;
  const confRef = booking?.confRef;

  return (
    <div
      className={
        "group relative flex gap-3 rounded-lg px-3 py-2 transition-colors " +
        (emphasis === "now"
          ? "bg-accent-50 ring-1 ring-accent-200"
          : emphasis === "next"
            ? "bg-amber-50/60 ring-1 ring-amber-100"
            : isHighlight
              ? "bg-amber-50/40"
              : "hover:bg-ink-50") +
        (emphasis === "past" ? " opacity-60" : "")
      }
    >
      <div className="flex w-14 shrink-0 flex-col items-end pt-0.5">
        <div className="font-mono text-xs font-medium tabular-nums text-ink-700">
          {formatTime12h(event.time)}
        </div>
        {event.duration && (
          <div className="text-[10px] tabular-nums text-ink-400">{event.duration}</div>
        )}
      </div>

      <div className="relative pt-1.5">
        <span className={"block h-2.5 w-2.5 rounded-full " + style.dot} />
        {!compact && (
          <span className="absolute left-1/2 top-4 -ml-px h-full w-px bg-ink-200" />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={
                  "text-sm " +
                  (isHighlight
                    ? "font-semibold text-amber-900"
                    : "font-medium text-ink-900")
                }
              >
                {event.title}
              </span>
              {emphasis === "now" && (
                <span className="rounded-full bg-accent-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Now
                </span>
              )}
              {emphasis === "next" && (
                <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Next
                </span>
              )}
            </div>
            {event.detail && (
              <p className="mt-0.5 text-xs leading-relaxed text-ink-600">
                {event.detail}
              </p>
            )}
            {event.planB && (
              <p className="mt-1 rounded-md bg-ink-50 px-2 py-1 text-[11px] leading-relaxed text-ink-600">
                <span className="font-medium text-ink-700">Plan B: </span>
                {event.planB}
              </p>
            )}
            {confRef && (
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                <span className="uppercase tracking-wide text-emerald-600">Conf</span>
                <span className="font-mono">{confRef}</span>
              </div>
            )}
            {(event.phone ||
              booking?.phone ||
              event.mapsQuery ||
              event.stopIndex !== undefined) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <ActionLinks
                  phone={event.phone ?? booking?.phone}
                  mapsQuery={event.mapsQuery}
                />
                {event.stopIndex !== undefined && onJumpToStop && (
                  <button
                    onClick={() => onJumpToStop(event.stopIndex!)}
                    className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Show on map
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
