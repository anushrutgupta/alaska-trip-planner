import { useMemo } from "react";
import { DAYS } from "../data/days";
import { BOOKINGS } from "../data/bookings";
import { PRETRIP } from "../data/pretrip";
import { PACKING } from "../data/packing";
import { EventRow } from "./EventRow";
import { TideStrip } from "./TideStrip";
import { ActionLinks } from "./ActionLinks";
import type { TripDateInfo } from "../hooks/useTripDate";

interface Props {
  trip: TripDateInfo;
  booked: Record<string, boolean>;
  packed: Record<string, boolean>;
  preReady: Record<string, boolean>;
  onJumpToStop: (stopIndex: number) => void;
  onGoToTab: (t: string) => void;
}

export function TodayPanel({
  trip,
  booked,
  packed,
  preReady,
  onJumpToStop,
  onGoToTab,
}: Props) {
  const bookingsDone = BOOKINGS.filter((b) => booked[b.id]).length;
  const packedDone = PACKING.filter((p) => packed[p.id]).length;
  const preDone = PRETRIP.filter((p) => preReady[p.id]).length;

  if (trip.phase === "before") {
    return (
      <BeforeView
        trip={trip}
        booked={booked}
        bookingsDone={bookingsDone}
        packedDone={packedDone}
        preDone={preDone}
        onGoToTab={onGoToTab}
      />
    );
  }
  if (trip.phase === "after") {
    return <AfterView trip={trip} />;
  }
  return <DuringView trip={trip} onJumpToStop={onJumpToStop} onGoToTab={onGoToTab} />;
}

/* ---------------- Before trip ---------------- */

function BeforeView({
  trip,
  booked,
  bookingsDone,
  packedDone,
  preDone,
  onGoToTab,
}: {
  trip: TripDateInfo;
  booked: Record<string, boolean>;
  bookingsDone: number;
  packedDone: number;
  preDone: number;
  onGoToTab: (t: string) => void;
}) {
  const unbookedCritical = BOOKINGS.filter(
    (b) => b.priority <= 4 && !booked[b.id],
  );

  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      {trip.isOverridden && <OverrideBanner today={trip.today} />}

      <div className="rounded-2xl bg-gradient-to-br from-accent-50 to-white p-6 ring-1 ring-accent-100">
        <div className="text-xs font-medium uppercase tracking-wide text-accent-700">
          Countdown
        </div>
        <div className="mt-1 flex items-baseline gap-3">
          <div className="text-5xl font-semibold tracking-tight text-ink-900">
            {trip.daysUntilTrip}
          </div>
          <div className="text-sm text-ink-600">
            days until <span className="font-medium text-ink-900">Thu Jun 25</span>
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {unbookedCritical.length > 0
            ? trip.daysUntilTrip > 14
              ? "Lock in the sell-out activities — cruise, bears, glaciers, bus."
              : "Final stretch — book the remaining sell-out activities ASAP."
            : trip.daysUntilTrip > 14
              ? "Big-ticket activities are all booked. Pay the remaining balances, then start pre-trip prep."
              : trip.daysUntilTrip > 3
                ? "Final week. Body weights, offline maps, prescriptions, packing, balances due."
                : "Departure imminent — pack and confirm pickup times."}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat
          label="Booked"
          done={bookingsDone}
          total={BOOKINGS.length}
          onClick={() => onGoToTab("bookings")}
        />
        <Stat
          label="Pre-trip"
          done={preDone}
          total={PRETRIP.length}
          onClick={() => onGoToTab("pack")}
        />
        <Stat
          label="Packed"
          done={packedDone}
          total={PACKING.length}
          onClick={() => onGoToTab("pack")}
        />
      </div>

      {unbookedCritical.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-ink-900">Book this week</h3>
            <span className="text-xs text-ink-500">
              {unbookedCritical.length} remaining
            </span>
          </div>
          <ul className="space-y-2">
            {unbookedCritical.map((b) => (
              <li
                key={b.id}
                className="rounded-xl border border-ink-200 bg-white p-3"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-ink-400">
                    #{b.priority}
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink-900">
                    {b.name}
                  </span>
                  <span className="text-xs tabular-nums text-ink-500">
                    {b.price}
                  </span>
                </div>
                <div className="mt-1 text-xs text-ink-500">{b.date}</div>
                <div className="mt-2">
                  <ActionLinks phone={b.phone} url={b.url} />
                </div>
                {b.notes && (
                  <p className="mt-1.5 text-xs italic text-ink-500">{b.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Preview the trip
        </div>
        <p className="mt-1 text-xs leading-relaxed text-ink-600">
          You can simulate any day by appending{" "}
          <code className="rounded bg-white px-1 py-0.5 text-ink-800 ring-1 ring-ink-200">
            ?d=2026-06-29
          </code>{" "}
          to the URL. Useful for testing the during-trip view ahead of time.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {DAYS.slice(0, 6).map((d) => (
            <a
              key={d.dateISO}
              href={`?d=${d.dateISO}`}
              className="rounded-md border border-ink-200 bg-white px-2 py-1 text-xs text-ink-700 hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700"
            >
              {d.date}
            </a>
          ))}
          <span className="self-center text-xs text-ink-400">…</span>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  done,
  total,
  onClick,
}: {
  label: string;
  done: number;
  total: number;
  onClick: () => void;
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-ink-200 bg-white p-3 text-left transition-colors hover:border-accent-400 hover:bg-accent-50"
    >
      <div className="text-xs uppercase tracking-wide text-ink-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight text-ink-900 tabular-nums">
          {done}
        </span>
        <span className="text-xs text-ink-500 tabular-nums">/ {total}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-accent-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </button>
  );
}

/* ---------------- During trip ---------------- */

function DuringView({
  trip,
  onJumpToStop,
  onGoToTab,
}: {
  trip: TripDateInfo;
  onJumpToStop: (i: number) => void;
  onGoToTab: (t: string) => void;
}) {
  const day = trip.today_day!;
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      {trip.isOverridden && <OverrideBanner today={trip.today} />}

      <div className="flex items-baseline gap-2 text-xs text-ink-500">
        <span className="font-medium text-ink-700">{day.label}</span>
        <span aria-hidden>·</span>
        <span>{day.date}</span>
        <span aria-hidden>·</span>
        <span>Overnight: {day.overnight}</span>
      </div>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink-900">
        {day.theme}
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
        ☀ {day.sunrise}  ·  ☾ {day.sunset}  ·  {day.weather}
      </p>
      <TideStrip dateISO={day.dateISO} />

      {trip.currentEvent && (
        <div className="mt-5">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-accent-700">
            Right now
          </div>
          <EventRow
            event={trip.currentEvent}
            emphasis="now"
            onJumpToStop={onJumpToStop}
            compact
          />
        </div>
      )}

      {trip.nextEvent && (
        <div className="mt-4">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Up next
          </div>
          <EventRow
            event={trip.nextEvent}
            emphasis="next"
            onJumpToStop={onJumpToStop}
            compact
          />
        </div>
      )}

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-ink-900">Today</h3>
          <button
            onClick={() => onGoToTab("days")}
            className="text-xs font-medium text-accent-600 hover:underline"
          >
            Full schedule →
          </button>
        </div>
        <div className="space-y-0.5">
          {day.events.map((e) => {
            let emphasis: "now" | "next" | "past" | "future" | undefined;
            if (trip.currentEvent && e.id === trip.currentEvent.id) emphasis = "now";
            else if (trip.nextEvent && e.id === trip.nextEvent.id) emphasis = "next";
            else if (trip.currentEvent && e.time < trip.currentEvent.time)
              emphasis = "past";
            return (
              <EventRow
                key={e.id}
                event={e}
                emphasis={emphasis}
                onJumpToStop={onJumpToStop}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- After trip ---------------- */

function AfterView({ trip }: { trip: TripDateInfo }) {
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-10">
      {trip.isOverridden && <OverrideBanner today={trip.today} />}
      <div className="rounded-2xl bg-gradient-to-br from-accent-50 to-white p-6 ring-1 ring-accent-100">
        <div className="text-xs font-medium uppercase tracking-wide text-accent-700">
          Trip complete
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink-900">
          Welcome home
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          You made it. The trip ended {trip.daysSinceTrip} day
          {trip.daysSinceTrip === 1 ? "" : "s"} ago. Tab through the Journey or
          Days view to revisit any leg.
        </p>
      </div>
    </div>
  );
}

/* ---------------- URL date override banner ---------------- */

function OverrideBanner({ today }: { today: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      <span>
        Simulating <span className="font-semibold">{today}</span> via{" "}
        <code className="rounded bg-white px-1 py-0.5 ring-1 ring-amber-200">
          ?d=
        </code>{" "}
        URL param.
      </span>
      <a
        href={window.location.pathname}
        className="font-medium text-amber-700 underline"
      >
        Use real today
      </a>
    </div>
  );
}
