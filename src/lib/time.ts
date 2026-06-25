// Times are STORED as 24h "HH:MM" (the now/next-event logic and event sorting
// rely on lexicographic string comparison of that format — see useTripDate.ts).
// We only convert to 12-hour AM/PM at DISPLAY time via this helper.

/** "06:30" → "6:30 AM", "13:30" → "1:30 PM", "00:10" → "12:10 AM". */
export function formatTime12h(hhmm: string): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return hhmm; // leave anything non-clock untouched
  const h = Number(m[1]);
  const min = m[2];
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${min} ${period}`;
}
