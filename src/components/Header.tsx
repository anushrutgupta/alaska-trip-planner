import type { TabKey } from "../App";

interface Props {
  active: TabKey;
  onTab: (t: TabKey) => void;
  bookingsDone: number;
  bookingsTotal: number;
  packedDone: number;
  packedTotal: number;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "journey", label: "Journey" },
  { key: "bookings", label: "Bookings" },
  { key: "budget", label: "Budget" },
  { key: "packing", label: "Packing" },
];

export function Header({
  active,
  onTab,
  bookingsDone,
  bookingsTotal,
  packedDone,
  packedTotal,
}: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-6">
      <div className="flex items-baseline gap-4">
        <h1 className="text-base font-semibold tracking-tight text-ink-900">
          Alaska 2026
        </h1>
        <div className="text-xs text-ink-500">
          Jun 25 – Jul 5  ·  6 travelers
        </div>
      </div>
      <nav className="flex items-center gap-1">
        {TABS.map((t) => {
          const isActive = t.key === active;
          let label: string = t.label;
          if (t.key === "bookings")
            label = `Bookings (${bookingsDone}/${bookingsTotal})`;
          if (t.key === "packing")
            label = `Packing (${packedDone}/${packedTotal})`;
          return (
            <button
              key={t.key}
              onClick={() => onTab(t.key)}
              className={
                "rounded-md px-3 py-1.5 text-sm transition-colors " +
                (isActive
                  ? "bg-ink-900 text-white"
                  : "text-ink-600 hover:bg-ink-100")
              }
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
