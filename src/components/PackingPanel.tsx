import { PACKING } from "../data/packing";

interface Props {
  packed: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function PackingPanel({ packed, onToggle }: Props) {
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">
          Packing
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Layered + waterproof. The Spit, the bus, and the boat all get wet.
        </p>
      </div>

      <ul className="space-y-1.5">
        {PACKING.map((p) => {
          const isPacked = !!packed[p.id];
          return (
            <li key={p.id}>
              <button
                onClick={() => onToggle(p.id)}
                className={
                  "group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors " +
                  (isPacked
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50")
                }
              >
                <span
                  className={
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors " +
                    (isPacked
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
                <span
                  className={
                    "flex-1 text-sm " +
                    (isPacked ? "text-ink-500 line-through" : "text-ink-800")
                  }
                >
                  {p.label}
                </span>
                {p.note && (
                  <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-600">
                    {p.note}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
