import { useState } from "react";
import type { TabKey } from "../App";

interface Props {
  active: TabKey;
  onTab: (t: TabKey) => void;
  todayBadge?: string;
  bookingsDone: number;
  bookingsTotal: number;
  preDone: number;
  preTotal: number;
  packedDone: number;
  packedTotal: number;
  /** Outstanding balance across bookings, in dollars. */
  outstanding: number;
  /** Unbooked critical activities + overdue pre-trip items. */
  attention: boolean;
}

const MORE_TABS: TabKey[] = ["bookings", "budget", "pack", "contacts"];

export function BottomNav(props: Props) {
  const { active, onTab, todayBadge, attention } = props;
  const [sheetOpen, setSheetOpen] = useState(false);
  const moreActive = MORE_TABS.includes(active);

  function go(t: TabKey) {
    setSheetOpen(false);
    onTab(t);
  }

  return (
    <>
      {sheetOpen && <MoreSheet {...props} onGo={go} onClose={() => setSheetOpen(false)} />}

      <nav
        className="z-30 flex shrink-0 border-t border-ink-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Primary"
      >
        <Slot
          label="Today"
          active={active === "today"}
          onClick={() => go("today")}
          badge={todayBadge}
          icon={<HomeIcon />}
        />
        <Slot
          label="Days"
          active={active === "days"}
          onClick={() => go("days")}
          icon={<CalendarIcon />}
        />
        <Slot
          label="Map"
          active={active === "journey"}
          onClick={() => go("journey")}
          icon={<MapIcon />}
        />
        <Slot
          label="More"
          active={moreActive}
          onClick={() => setSheetOpen((o) => !o)}
          dot={attention}
          icon={<MoreIcon />}
        />
      </nav>
    </>
  );
}

function Slot({
  label,
  icon,
  active,
  onClick,
  badge,
  dot,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  badge?: string;
  dot?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "relative flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors " +
        (active ? "text-accent-700" : "text-ink-500")
      }
    >
      <span className="relative">
        {icon}
        {badge && (
          <span className="absolute -right-5 -top-1 rounded-full bg-accent-100 px-1 py-px text-[9px] font-semibold tabular-nums text-accent-700">
            {badge}
          </span>
        )}
        {dot && (
          <span className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />
        )}
      </span>
      {label}
    </button>
  );
}

/* ---------------- More sheet ---------------- */

function MoreSheet({
  active,
  onGo,
  onClose,
  bookingsDone,
  bookingsTotal,
  preDone,
  preTotal,
  packedDone,
  packedTotal,
  outstanding,
}: Props & { onGo: (t: TabKey) => void; onClose: () => void }) {
  const rows: { key: TabKey; label: string; sub: string; warn?: boolean }[] = [
    {
      key: "bookings",
      label: "Bookings",
      sub:
        `${bookingsDone}/${bookingsTotal} confirmed` +
        (outstanding > 0
          ? ` · $${outstanding.toLocaleString("en-US", { maximumFractionDigits: 0 })} due`
          : ""),
      warn: outstanding > 0,
    },
    { key: "budget", label: "Budget", sub: "group ledger + balances" },
    {
      key: "pack",
      label: "Pack",
      sub: `pre-trip ${preDone}/${preTotal} · packed ${packedDone}/${packedTotal}`,
    },
    { key: "contacts", label: "Contacts", sub: "operators, lodging, emergency" },
  ];

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/30"
      />
      <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-2xl">
        <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-ink-200" />
        <ul className="px-3 pt-2">
          {rows.map((r) => (
            <li key={r.key}>
              <button
                onClick={() => onGo(r.key)}
                className={
                  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors " +
                  (active === r.key ? "bg-accent-50" : "hover:bg-ink-50")
                }
              >
                <div>
                  <div className="text-sm font-medium text-ink-900">{r.label}</div>
                  <div
                    className={
                      "mt-0.5 text-xs " +
                      (r.warn ? "font-medium text-rose-600" : "text-ink-500")
                    }
                  >
                    {r.sub}
                  </div>
                </div>
                <ChevronRight />
              </button>
            </li>
          ))}
        </ul>
        <div className="mx-3 mt-1 border-t border-ink-100 px-3 pt-2.5">
          <a
            href="?print"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-accent-700"
          >
            PDF packet ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- icons ---------------- */

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-8 9 8M5 9.5V21h14V9.5" {...stroke} />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" {...stroke} />
      <path d="M3 10h18M8 3v4M16 3v4" {...stroke} />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" {...stroke} />
      <circle cx="12" cy="10" r="3" {...stroke} />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-ink-400">
      <path d="M9 6l6 6-6 6" {...stroke} />
    </svg>
  );
}
