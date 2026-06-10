import { TIDES, morningLow, type TideEvent } from "../data/tides";

/** Compact Homer tide row for a date. Renders nothing if no data for that day. */
export function TideStrip({ dateISO }: { dateISO: string }) {
  const tides = TIDES[dateISO];
  if (!tides) return null;
  const bearWindow = morningLow(dateISO);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-sky-50 px-2.5 py-1.5 text-[11px] ring-1 ring-sky-100">
      <span className="font-semibold uppercase tracking-wide text-sky-700">
        Homer tides
      </span>
      {tides.map((t) => (
        <Tide key={t.time} t={t} isBearWindow={t === bearWindow} />
      ))}
      <span className="text-sky-600">· bears fly near the morning low</span>
    </div>
  );
}

function Tide({ t, isBearWindow }: { t: TideEvent; isBearWindow: boolean }) {
  const isLow = t.type === "L";
  const isMorningLow = isBearWindow;
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 tabular-nums " +
        (isMorningLow
          ? "bg-sky-600 font-medium text-white"
          : "text-sky-800")
      }
    >
      <span className="opacity-70">{isLow ? "L" : "H"}</span>
      {t.time}
      <span className="opacity-70">{t.ft > 0 ? `+${t.ft}` : t.ft}ft</span>
    </span>
  );
}
