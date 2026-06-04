import { useEffect, useMemo, useState } from "react";
import { MapView } from "./components/MapView";
import { Header } from "./components/Header";
import { DetailCard } from "./components/DetailCard";
import { RouteTimeline } from "./components/RouteTimeline";
import { BookingsPanel, type BookingConfirmation } from "./components/BookingsPanel";
import { BudgetPanel, type Expense } from "./components/BudgetPanel";
import { PackingPanel } from "./components/PackingPanel";
import { TodayPanel } from "./components/TodayPanel";
import { DaysPanel } from "./components/DaysPanel";
import { ContactsPanel } from "./components/ContactsPanel";
import { STOPS } from "./data/stops";
import { BOOKINGS } from "./data/bookings";
import { PACKING } from "./data/packing";
import { SEED_EXPENSES } from "./data/seedExpenses";
import { useStepNavigation } from "./hooks/useStepNavigation";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTripDate } from "./hooks/useTripDate";

export type TabKey =
  | "today"
  | "journey"
  | "days"
  | "bookings"
  | "budget"
  | "pack"
  | "contacts";

export default function App() {
  const trip = useTripDate();

  // v3 = Homer-first itinerary
  const [currentIndex, setCurrentIndex] = useLocalStorage<number>(
    "alaska.v3.currentIndex",
    0,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Smart default tab: Today if trip is active or starting in <30 days, else Journey
  const initialTab: TabKey = useMemo(() => {
    if (trip.phase === "during") return "today";
    if (trip.phase === "before" && trip.daysUntilTrip <= 30) return "today";
    if (trip.phase === "after") return "today";
    return "journey";
  }, [trip.phase, trip.daysUntilTrip]);

  const [tab, setTab] = useState<TabKey>(initialTab);

  const [packed, setPacked] = useLocalStorage<Record<string, boolean>>(
    "alaska.packed",
    {},
  );
  const [preReady, setPreReady] = useLocalStorage<Record<string, boolean>>(
    "alaska.preReady",
    {},
  );
  const [confirmations, setConfirmations] = useLocalStorage<
    Record<string, BookingConfirmation>
  >("alaska.confirmations", {});
  // v2 key so the receipt-seeded ledger loads (old empty "alaska.expenses" ignored).
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    "alaska.expenses.v2",
    SEED_EXPENSES,
  );
  const [dayNotes, setDayNotes] = useLocalStorage<Record<string, string>>(
    "alaska.dayNotes",
    {},
  );

  // Arrow-key navigation only matters in Journey + Days
  useStepNavigation({
    total: STOPS.length,
    current: currentIndex,
    setCurrent: setCurrentIndex,
  });

  // Booking status is driven entirely by the `confirmed` flag (set from a
  // reconciled receipt) — no separate per-device toggle to drift out of sync.
  const bookingsDone = useMemo(
    () => BOOKINGS.filter((b) => b.confirmed).length,
    [],
  );
  const packedDone = useMemo(
    () => PACKING.filter((p) => packed[p.id]).length,
    [packed],
  );

  const current = STOPS[currentIndex];
  const prev = currentIndex > 0 ? STOPS[currentIndex - 1] : null;
  const next = currentIndex < STOPS.length - 1 ? STOPS[currentIndex + 1] : null;

  const todayBadge = useMemo(() => {
    if (trip.phase === "during") return "Now";
    if (trip.phase === "before") return `T-${trip.daysUntilTrip}`;
    return undefined;
  }, [trip.phase, trip.daysUntilTrip]);

  function jumpToStop(i: number) {
    setCurrentIndex(i);
    // Stay on the current tab — user wanted to highlight on the map, not
    // navigate away from where they were reading.
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <Header
        active={tab}
        onTab={setTab}
        showToday={trip.phase !== "before" || trip.daysUntilTrip <= 60}
        todayBadge={todayBadge}
        bookingsDone={bookingsDone}
        bookingsTotal={BOOKINGS.length}
        packedDone={packedDone}
        packedTotal={PACKING.length}
      />

      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Map: stacked on top (40vh) on mobile, left ~55% on desktop. */}
        <section className="relative h-[40vh] shrink-0 border-b border-ink-200 lg:h-full lg:basis-[55%] lg:border-b-0 lg:border-r">
          <MapView
            stops={STOPS}
            currentIndex={currentIndex}
            hoveredIndex={hoveredIndex}
            onSelect={setCurrentIndex}
            onHover={setHoveredIndex}
          />
          <MapLegend />
        </section>

        {/* Panel: below on mobile, right ~45% on desktop */}
        <section className="flex min-h-0 flex-1 flex-col lg:h-full lg:basis-[45%]">
          {tab === "today" && (
            <TodayPanel
              trip={trip}
              packed={packed}
              preReady={preReady}
              onJumpToStop={jumpToStop}
              onGoToTab={(t) => setTab(t as TabKey)}
            />
          )}
          {tab === "journey" && (
            <>
              <DetailCard
                stop={current}
                prev={prev}
                next={next}
                onPrev={() => setCurrentIndex(currentIndex - 1)}
                onNext={() => setCurrentIndex(currentIndex + 1)}
                totalStops={STOPS.length}
              />
              <RouteTimeline
                stops={STOPS}
                currentIndex={currentIndex}
                hoveredIndex={hoveredIndex}
                onSelect={setCurrentIndex}
                onHover={setHoveredIndex}
              />
            </>
          )}
          {tab === "days" && (
            <DaysPanel
              trip={trip}
              notes={dayNotes}
              setNotes={setDayNotes}
              onJumpToStop={jumpToStop}
            />
          )}
          {tab === "bookings" && (
            <BookingsPanel
              confirmations={confirmations}
              setConfirmations={setConfirmations}
            />
          )}
          {tab === "budget" && (
            <BudgetPanel expenses={expenses} setExpenses={setExpenses} />
          )}
          {tab === "pack" && (
            <PackingPanel
              packed={packed}
              onTogglePack={(id) => setPacked({ ...packed, [id]: !packed[id] })}
              preReady={preReady}
              onTogglePre={(id) =>
                setPreReady({ ...preReady, [id]: !preReady[id] })
              }
            />
          )}
          {tab === "contacts" && <ContactsPanel />}
        </section>
      </main>
    </div>
  );
}

function MapLegend() {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 hidden rounded-lg border border-ink-200 bg-white/95 px-2.5 py-1.5 text-[11px] shadow-sm backdrop-blur sm:block lg:bottom-4 lg:left-4 lg:px-3 lg:py-2">
      <div className="mb-1 font-semibold uppercase tracking-wide text-ink-500">
        Route
      </div>
      <div className="flex items-center gap-3">
        <LegendLine kind="solid" color="#3b82f6" label="Visited" />
        <LegendLine kind="dashed" color="#cbd5e1" label="Upcoming" />
      </div>
      <div className="mt-1.5 flex items-center gap-3 text-ink-600">
        <span className="inline-flex items-center gap-1">
          <Dot color="#34d399" />
          Drive
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot color="#a78bfa" />
          Fly
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot color="#fb923c" />
          Bus
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot color="#38bdf8" />
          Boat
        </span>
      </div>
      <div className="mt-1 hidden text-[10px] text-ink-400 lg:block">← → arrow keys to step</div>
    </div>
  );
}

function LegendLine({
  kind,
  color,
  label,
}: {
  kind: "solid" | "dashed";
  color: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-700">
      <svg width="22" height="4" viewBox="0 0 22 4">
        {kind === "solid" ? (
          <line x1="0" y1="2" x2="22" y2="2" stroke={color} strokeWidth="2" />
        ) : (
          <line
            x1="0"
            y1="2"
            x2="22"
            y2="2"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        )}
      </svg>
      {label}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: color }}
    />
  );
}
