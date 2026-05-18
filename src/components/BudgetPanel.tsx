import { useMemo, useState } from "react";
import {
  ACTIVITIES,
  GROUP_TOTAL,
  LOGISTICS,
  PER_PERSON_TOTAL,
  TRAVELERS,
  type BudgetCategory,
} from "../data/budget";

export interface Expense {
  id: string;
  date: string;
  label: string;
  amount: number;
  paidBy: string;
  splitAmong: number;
}

interface Props {
  expenses: Expense[];
  setExpenses: (x: Expense[]) => void;
}

function fmt(n: number) {
  const sign = n < 0 ? "-" : "";
  return sign + "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
}

export function BudgetPanel({ expenses, setExpenses }: Props) {
  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">
          Budget
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Plan estimates above, live group ledger below.
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

      <hr className="my-6 border-ink-200" />

      <Ledger expenses={expenses} setExpenses={setExpenses} />
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

/* ---------------- Expense ledger ---------------- */

function Ledger({ expenses, setExpenses }: Props) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [split, setSplit] = useState(6);

  const total = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses],
  );

  const perPersonOwed = useMemo(() => {
    // Each row: each non-payer in splitAmong owes (amount / splitAmong) to paidBy.
    // Net balance per person = sum(paid for the table) - sum(owed for the table).
    const tally: Record<string, number> = {};
    for (const e of expenses) {
      tally[e.paidBy] = (tally[e.paidBy] || 0) + e.amount;
      const share = e.amount / e.splitAmong;
      // Subtract a share from everyone in the split — but we don't know names
      // of non-payers in this simple model. Instead we track the net for the
      // payer as "amount - share" (they covered their own share too).
      // Show net positive for the payer minus their own share.
      tally[e.paidBy] = (tally[e.paidBy] || 0) - share;
    }
    return tally;
  }, [expenses]);

  function add() {
    const a = parseFloat(amount);
    if (!label.trim() || !paidBy.trim() || !Number.isFinite(a) || a <= 0) return;
    const entry: Expense = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      label: label.trim(),
      amount: a,
      paidBy: paidBy.trim(),
      splitAmong: split,
    };
    setExpenses([entry, ...expenses]);
    setLabel("");
    setAmount("");
  }

  function remove(id: string) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-ink-900">Group ledger</h3>
        <span className="text-xs text-ink-500">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"} ·{" "}
          <span className="text-ink-700">{fmt(total)} total</span>
        </span>
      </div>

      <div className="rounded-xl border border-ink-200 bg-white p-3">
        <div className="grid grid-cols-12 gap-2">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="What"
            className="col-span-4 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-sm placeholder:text-ink-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$"
            inputMode="decimal"
            className="col-span-2 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-sm tabular-nums placeholder:text-ink-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
          />
          <input
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            placeholder="Paid by"
            className="col-span-3 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-sm placeholder:text-ink-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
          />
          <select
            value={split}
            onChange={(e) => setSplit(parseInt(e.target.value, 10))}
            className="col-span-2 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                ÷{n}
              </option>
            ))}
          </select>
          <button
            onClick={add}
            className="col-span-1 rounded-md bg-ink-900 px-2 py-1.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
          >
            +
          </button>
        </div>
      </div>

      {expenses.length > 0 && (
        <ul className="mt-3 divide-y divide-ink-100 rounded-xl border border-ink-200 bg-white">
          {expenses.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-3 px-3 py-2 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-ink-900">{e.label}</div>
                <div className="text-xs text-ink-500">
                  {e.date} · {e.paidBy} paid · split ÷{e.splitAmong}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium tabular-nums text-ink-900">
                  {fmt(e.amount)}
                </div>
                <div className="text-xs tabular-nums text-ink-500">
                  {fmt(e.amount / e.splitAmong)}/pp
                </div>
              </div>
              <button
                onClick={() => remove(e.id)}
                className="text-ink-400 transition-colors hover:text-red-600"
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {Object.keys(perPersonOwed).length > 0 && (
        <div className="mt-3 rounded-xl border border-ink-200 bg-ink-50 p-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
            Running balances
          </div>
          <ul className="space-y-0.5">
            {Object.entries(perPersonOwed)
              .sort((a, b) => b[1] - a[1])
              .map(([name, net]) => (
                <li
                  key={name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-ink-700">{name}</span>
                  <span
                    className={
                      "tabular-nums " +
                      (net > 0
                        ? "font-medium text-emerald-700"
                        : net < 0
                          ? "text-rose-700"
                          : "text-ink-500")
                    }
                  >
                    {net > 0 ? "is owed " : net < 0 ? "owes " : ""}
                    {fmt(Math.abs(net))}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
