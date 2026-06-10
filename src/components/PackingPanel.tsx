import type { ReactNode } from "react";
import { PACKING } from "../data/packing";
import { PRETRIP, type PreTripItem } from "../data/pretrip";

interface Props {
  packed: Record<string, boolean>;
  onTogglePack: (id: string) => void;
  preReady: Record<string, boolean>;
  onTogglePre: (id: string) => void;
  today: string; // ISO date, for deadline chips
}

const CATEGORY_LABELS: Record<PreTripItem["category"], string> = {
  docs: "Documents",
  tech: "Tech",
  health: "Health",
  group: "Group",
  logistics: "Logistics",
};

export function PackingPanel({
  packed,
  onTogglePack,
  preReady,
  onTogglePre,
  today,
}: Props) {
  const grouped = PRETRIP.reduce<Record<string, PreTripItem[]>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold tracking-tight text-ink-900">
            Pre-trip checklist
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Booking ≠ ready-to-fly. Knock these out in the 2 weeks before.
          </p>
        </div>

        {(Object.keys(grouped) as PreTripItem["category"][]).map((cat) => (
          <div key={cat} className="mb-4">
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              {CATEGORY_LABELS[cat]}
            </h3>
            <ul className="space-y-1.5">
              {grouped[cat].map((p) => (
                <li key={p.id}>
                  <CheckRow
                    checked={!!preReady[p.id]}
                    onToggle={() => onTogglePre(p.id)}
                    label={p.label}
                    note={p.note}
                    chip={
                      p.deadline && !preReady[p.id] ? (
                        <DeadlineChip deadline={p.deadline} today={today} />
                      ) : undefined
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <hr className="my-6 border-ink-200" />

      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold tracking-tight text-ink-900">
            Packing
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Layered + waterproof. The Spit, the bus, and the boat all get wet.
          </p>
        </div>

        <ul className="space-y-1.5">
          {PACKING.map((p) => (
            <li key={p.id}>
              <CheckRow
                checked={!!packed[p.id]}
                onToggle={() => onTogglePack(p.id)}
                label={p.label}
                note={p.note}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// "2026-06-15" → "Jun 15" (avoid Date() — UTC parsing shifts the day locally)
function shortDate(iso: string): string {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

function daysBetween(fromISO: string, toISO: string): number {
  return Math.round(
    (Date.parse(toISO + "T00:00:00") - Date.parse(fromISO + "T00:00:00")) /
      86_400_000,
  );
}

function DeadlineChip({ deadline, today }: { deadline: string; today: string }) {
  const daysLeft = daysBetween(today, deadline);
  const overdue = daysLeft < 0;
  const soon = daysLeft >= 0 && daysLeft <= 3;
  return (
    <span
      className={
        "ml-2 inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums " +
        (overdue
          ? "bg-rose-100 text-rose-700"
          : soon
            ? "bg-amber-100 text-amber-700"
            : "bg-ink-100 text-ink-500")
      }
    >
      {overdue ? `overdue · ${shortDate(deadline)}` : `by ${shortDate(deadline)}`}
    </span>
  );
}

function CheckRow({
  checked,
  onToggle,
  label,
  note,
  chip,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  note?: string;
  chip?: ReactNode;
}) {
  return (
    <button
      onClick={onToggle}
      className={
        "group flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left transition-colors " +
        (checked
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50")
      }
    >
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
      <div className="min-w-0 flex-1">
        <div
          className={
            "text-sm " + (checked ? "text-ink-500 line-through" : "text-ink-900")
          }
        >
          {label}
          {chip}
        </div>
        {note && (
          <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{note}</p>
        )}
      </div>
    </button>
  );
}
