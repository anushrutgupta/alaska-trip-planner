import type { Day } from "../data/days";

/** Temp + conditions chip. All temps are °C. */
export function WeatherChip({ day }: { day: Day }) {
  if (day.hiC == null) {
    return day.weather ? (
      <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{day.weather}</p>
    ) : null;
  }
  return (
    <div className="mt-2 rounded-md bg-ink-50 px-2.5 py-2 ring-1 ring-ink-100">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="font-semibold tabular-nums text-ink-900">
          {day.hiC}° / {day.loC}°C
        </span>
        {day.precipPct != null && (
          <span className="tabular-nums text-sky-700">
            💧 {day.precipPct}%
          </span>
        )}
        <span
          className={
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
            (day.weatherForecast
              ? "bg-emerald-100 text-emerald-700"
              : "bg-ink-200 text-ink-500")
          }
          title={
            day.weatherForecast
              ? "From the NWS forecast"
              : "Seasonal estimate — refresh closer to the day"
          }
        >
          {day.weatherForecast ? "forecast" : "est."}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-600">{day.weather}</p>
    </div>
  );
}

/** Day-of "confirm this first" banner (tide texts, weather-gated flights, road status). */
export function VerifyBanner({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="mt-2 flex gap-2 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-2 text-xs leading-relaxed text-amber-900">
      <span aria-hidden className="shrink-0 font-semibold">⚠ Verify</span>
      <span>{text}</span>
    </div>
  );
}

/** What to wear / carry / prep for the day. */
export function DayTips({ tips }: { tips?: string[] }) {
  if (!tips || tips.length === 0) return null;
  return (
    <div className="mt-3 rounded-lg border border-accent-100 bg-accent-50/50 px-3 py-2">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-accent-700">
        Wear · carry · prep
      </div>
      <ul className="space-y-1">
        {tips.map((t, i) => (
          <li key={i} className="flex gap-1.5 text-xs leading-relaxed text-ink-700">
            <span aria-hidden className="text-accent-500">•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
