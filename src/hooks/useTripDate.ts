import { useEffect, useState } from "react";
import { DAYS, type Day, type DayEvent } from "../data/days";

export type TripPhase = "before" | "during" | "after";

export interface TripDateInfo {
  /** YYYY-MM-DD effective date (URL override or real today). */
  today: string;
  /** Real wall clock — independent of override. */
  now: Date;
  phase: TripPhase;
  /** Number of days until the trip starts (0 if active or past). */
  daysUntilTrip: number;
  /** Number of days since the trip ended (0 if active or upcoming). */
  daysSinceTrip: number;
  /** Day object for today, if trip is active. */
  today_day: Day | null;
  /** Index into DAYS for today. */
  todayIndex: number | null;
  /** Current event happening right now, if active. */
  currentEvent: DayEvent | null;
  /** Next upcoming event today, if active. */
  nextEvent: DayEvent | null;
  /** Effective "HH:MM" clock (honors the ?t= override). */
  hhmm: string;
  /** Was the date overridden from the URL? */
  isOverridden: boolean;
}

const TRIP_START = "2026-06-25";
const TRIP_END = "2026-07-05";

function getURLDate(): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const d = url.searchParams.get("d");
  if (!d) return null;
  // Accept YYYY-MM-DD only.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  return d;
}

function getURLTime(): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const t = url.searchParams.get("t");
  if (!t) return null;
  if (!/^\d{2}:\d{2}$/.test(t)) return null;
  return t;
}

function todayISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nowHHMM(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function useTripDate(): TripDateInfo {
  const [now, setNow] = useState<Date>(() => new Date());

  // Tick every minute so "current event" stays fresh during the trip.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const overrideDate = getURLDate();
  const overrideTime = getURLTime();
  const isOverridden = !!overrideDate;
  const today = overrideDate ?? todayISO(now);
  const hhmm = overrideTime ?? nowHHMM(now);

  // Trip phase
  let phase: TripPhase;
  if (today < TRIP_START) phase = "before";
  else if (today > TRIP_END) phase = "after";
  else phase = "during";

  const todayIndex = DAYS.findIndex((d) => d.dateISO === today);
  const today_day = todayIndex >= 0 ? DAYS[todayIndex] : null;

  // Day-of math
  const daysUntilTrip = phase === "before" ? daysBetween(today, TRIP_START) : 0;
  const daysSinceTrip = phase === "after" ? daysBetween(TRIP_END, today) : 0;

  // Find current + next event from today's schedule
  let currentEvent: DayEvent | null = null;
  let nextEvent: DayEvent | null = null;
  if (today_day) {
    const events = today_day.events;
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      if (e.time <= hhmm) {
        currentEvent = e;
      } else if (!nextEvent) {
        nextEvent = e;
        break;
      }
    }
    // If we're before the first event of the day, currentEvent is null and
    // nextEvent is the first event.
    if (!currentEvent && events.length > 0 && events[0].time > hhmm) {
      nextEvent = events[0];
    }
    // If we're after the last event, nextEvent rolls into tomorrow's wake.
    if (currentEvent && !nextEvent && todayIndex + 1 < DAYS.length) {
      nextEvent = DAYS[todayIndex + 1].events[0];
    }
  }

  return {
    today,
    now,
    phase,
    daysUntilTrip,
    daysSinceTrip,
    today_day,
    todayIndex,
    currentEvent,
    nextEvent,
    hhmm,
    isOverridden,
  };
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}
