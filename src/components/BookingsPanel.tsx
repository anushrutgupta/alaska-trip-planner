import { BOOKINGS } from "../data/bookings";

interface Props {
  booked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function BookingsPanel({ booked, onToggle }: Props) {
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">
          Bookings
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Priority-sorted. Top items have hard capacity limits — book early.
        </p>
      </div>

      <ul className="space-y-2">
        {BOOKINGS.map((b) => {
          const isBooked = !!booked[b.id];
          return (
            <li key={b.id}>
              <button
                onClick={() => onToggle(b.id)}
                className={
                  "group flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors " +
                  (isBooked
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50")
                }
              >
                <Checkbox checked={isBooked} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-ink-400">
                      {String(b.priority).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        "text-sm font-medium " +
                        (isBooked ? "text-ink-500 line-through" : "text-ink-900")
                      }
                    >
                      {b.name}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-500">
                    <span>{b.date}</span>
                    <span className="text-ink-300">·</span>
                    <span className="font-medium text-ink-700">{b.price}</span>
                    <span className="text-ink-300">·</span>
                    <span>{b.contact}</span>
                  </div>
                  {b.notes && (
                    <p className="mt-1 text-xs italic text-ink-500">{b.notes}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors " +
        (checked
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-ink-300 bg-white text-transparent group-hover:border-ink-400")
      }
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
