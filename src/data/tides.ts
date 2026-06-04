// Homer tide predictions (NOAA station 9455500, datum MLLW, local time, feet).
// The Lake Clark bear flight is tide-driven — the operator times departure so
// you're on the tidal flats near low tide, when clams/sedge draw the bears out.
// Source: api.tidesandcurrents.noaa.gov (pulled 2026-06-03, deterministic).

export interface TideEvent {
  time: string; // "HH:MM" local
  type: "H" | "L";
  ft: number;
}

export const TIDES: Record<string, TideEvent[]> = {
  // Day 1 — arrive Homer
  "2026-06-26": [
    { time: "00:17", type: "H", ft: 15.9 },
    { time: "07:15", type: "L", ft: 1.0 },
    { time: "13:48", type: "H", ft: 13.9 },
    { time: "19:03", type: "L", ft: 6.1 },
  ],
  // Day 2 — ★ bear flight (primary). Morning low 07:57 → ~8 AM departure.
  "2026-06-27": [
    { time: "01:02", type: "H", ft: 16.3 },
    { time: "07:57", type: "L", ft: 0.2 },
    { time: "14:32", type: "H", ft: 14.7 },
    { time: "19:49", type: "L", ft: 5.8 },
  ],
  // Day 3 — bear buffer / leave for Seward. Morning low 08:35.
  "2026-06-28": [
    { time: "01:44", type: "H", ft: 16.7 },
    { time: "08:35", type: "L", ft: -0.5 },
    { time: "15:11", type: "H", ft: 15.4 },
    { time: "20:31", type: "L", ft: 5.3 },
  ],
};

/** The morning low-tide event for a date, if any — the bear-viewing window. */
export function morningLow(dateISO: string): TideEvent | undefined {
  return (TIDES[dateISO] ?? []).find(
    (t) => t.type === "L" && t.time < "12:00",
  );
}
