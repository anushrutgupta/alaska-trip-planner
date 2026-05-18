import type { TabKey } from "../App";

interface Props {
  active: TabKey;
  onTab: (t: TabKey) => void;
  showToday: boolean;
  todayBadge?: string;
  bookingsDone: number;
  bookingsTotal: number;
  packedDone: number;
  packedTotal: number;
}

interface TabDef {
  key: TabKey;
  label: string;
}

const TABS: TabDef[] = [
  { key: "today", label: "Today" },
  { key: "journey", label: "Journey" },
  { key: "days", label: "Days" },
  { key: "bookings", label: "Bookings" },
  { key: "budget", label: "Budget" },
  { key: "pack", label: "Pack" },
  { key: "contacts", label: "Contacts" },
];

export function Header({
  active,
  onTab,
  showToday,
  todayBadge,
  bookingsDone,
  bookingsTotal,
  packedDone,
  packedTotal,
}: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-ink-200 bg-white px-6">
      <div className="flex shrink-0 items-baseline gap-4">
        <h1 className="text-base font-semibold tracking-tight text-ink-900">
          Alaska 2026
        </h1>
        <div className="hidden text-xs text-ink-500 md:block">
          Jun 25 – Jul 5  ·  6 travelers
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-1">
        {TABS.map((t) => {
          if (t.key === "today" && !showToday) return null;
          const isActive = t.key === active;
          let label: string = t.label;
          if (t.key === "bookings")
            label = `Bookings ${bookingsDone}/${bookingsTotal}`;
          if (t.key === "pack")
            label = `Pack ${packedDone}/${packedTotal}`;

          return (
            <button
              key={t.key}
              onClick={() => onTab(t.key)}
              className={
                "rounded-md px-2.5 py-1.5 text-sm transition-colors " +
                (isActive
                  ? "bg-ink-900 text-white"
                  : "text-ink-600 hover:bg-ink-100")
              }
            >
              <span>{label}</span>
              {t.key === "today" && todayBadge && (
                <span
                  className={
                    "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums " +
                    (isActive
                      ? "bg-white/20 text-white"
                      : "bg-accent-100 text-accent-700")
                  }
                >
                  {todayBadge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
