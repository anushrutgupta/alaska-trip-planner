import {
  ACTIVITIES,
  GROUP_TOTAL,
  LOGISTICS,
  PER_PERSON_TOTAL,
  TRAVELERS,
  type BudgetCategory,
} from "../data/budget";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export function BudgetPanel() {
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">
          Budget
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Estimated per-person and group cost, excluding flights to Anchorage.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wide text-ink-500">
            Per person
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">
            {fmt(PER_PERSON_TOTAL)}
          </div>
        </div>
        <div className="rounded-xl border border-ink-200 bg-ink-900 p-5 text-white">
          <div className="text-xs uppercase tracking-wide text-white/60">
            Group ({TRAVELERS})
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">
            {fmt(GROUP_TOTAL)}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <Category category={ACTIVITIES} />
        <Category category={LOGISTICS} />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink-500">
        Numbers are rough — lodging and food can swing ±20%. Activity prices are
        fixed at vendor rates. The four highlight experiences (flightseeing,
        bear viewing, glacier landing, fjord cruise) make up roughly 70% of the
        activities budget.
      </p>
    </div>
  );
}

function Category({ category }: { category: BudgetCategory }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white">
      <div className="flex items-baseline justify-between border-b border-ink-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-ink-900">{category.title}</h3>
        <span className="text-sm font-semibold tabular-nums text-ink-900">
          {fmt(category.total)}
          <span className="ml-1 text-xs font-normal text-ink-500">/pp</span>
        </span>
      </div>
      <ul className="divide-y divide-ink-100">
        {category.lines.map((l) => (
          <li
            key={l.label}
            className="flex items-center justify-between px-5 py-2.5 text-sm"
          >
            <span className="text-ink-700">{l.label}</span>
            <span className="tabular-nums text-ink-600">{fmt(l.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
