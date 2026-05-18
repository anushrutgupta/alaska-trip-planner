import { useMemo, useState } from "react";
import { MapView } from "./components/MapView";
import { Header } from "./components/Header";
import { DetailCard } from "./components/DetailCard";
import { RouteTimeline } from "./components/RouteTimeline";
import { BookingsPanel } from "./components/BookingsPanel";
import { BudgetPanel } from "./components/BudgetPanel";
import { PackingPanel } from "./components/PackingPanel";
import { STOPS } from "./data/stops";
import { BOOKINGS } from "./data/bookings";
import { PACKING } from "./data/packing";
import { useStepNavigation } from "./hooks/useStepNavigation";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type TabKey = "journey" | "bookings" | "budget" | "packing";

export default function App() {
  // v3 = Homer-first itinerary (Lake Clark → Kenai Fjords order swapped).
  // Bumped key so saved indices from v1/v2 don't resurface on the wrong stop.
  // booked/packed keys are intentionally NOT bumped — those IDs are stable
  // so user's checklists survive across plan revisions.
  const [currentIndex, setCurrentIndex] = useLocalStorage<number>(
    "alaska.v3.currentIndex",
    0,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<TabKey>("journey");

  const [booked, setBooked] = useLocalStorage<Record<string, boolean>>(
    "alaska.booked",
    {},
  );
  const [packed, setPacked] = useLocalStorage<Record<string, boolean>>(
    "alaska.packed",
    {},
  );

  useStepNavigation({
    total: STOPS.length,
    current: currentIndex,
    setCurrent: setCurrentIndex,
  });

  const bookingsDone = useMemo(
    () => BOOKINGS.filter((b) => booked[b.id]).length,
    [booked],
  );
  const packedDone = useMemo(
    () => PACKING.filter((p) => packed[p.id]).length,
    [packed],
  );

  const current = STOPS[currentIndex];
  const prev = currentIndex > 0 ? STOPS[currentIndex - 1] : null;
  const next = currentIndex < STOPS.length - 1 ? STOPS[currentIndex + 1] : null;

  return (
    <div className="flex h-full flex-col bg-white">
      <Header
        active={tab}
        onTab={setTab}
        bookingsDone={bookingsDone}
        bookingsTotal={BOOKINGS.length}
        packedDone={packedDone}
        packedTotal={PACKING.length}
      />

      <main className="flex min-h-0 flex-1">
        {/* Left: Map (~55%). Always rendered. */}
        <section className="relative h-full basis-[55%] border-r border-ink-200">
          <MapView
            stops={STOPS}
            currentIndex={currentIndex}
            hoveredIndex={hoveredIndex}
            onSelect={setCurrentIndex}
            onHover={setHoveredIndex}
          />
          <MapLegend />
        </section>

        {/* Right: tabbed panel (~45%) */}
        <section className="flex h-full basis-[45%] flex-col">
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
          {tab === "bookings" && (
            <BookingsPanel
              booked={booked}
              onToggle={(id) =>
                setBooked({ ...booked, [id]: !booked[id] })
              }
            />
          )}
          {tab === "budget" && <BudgetPanel />}
          {tab === "packing" && (
            <PackingPanel
              packed={packed}
              onToggle={(id) =>
                setPacked({ ...packed, [id]: !packed[id] })
              }
            />
          )}
        </section>
      </main>
    </div>
  );
}

function MapLegend() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-ink-200 bg-white/95 px-3 py-2 text-[11px] shadow-sm backdrop-blur">
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
      <div className="mt-1 text-[10px] text-ink-400">← → arrow keys to step</div>
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
