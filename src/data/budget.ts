// Per-person budget. Edit the individual line `amount`s only — every total
// (category, per-person, group) is DERIVED below. Nothing is hardcoded twice.
//
// `estimated: true` marks a number that isn't a confirmed/paid figure yet.
// Activities + rental car are actual (paid/known rates); lodging is 3-of-6
// actual + estimates; gas/food/misc are estimates. Excludes flights.

export interface BudgetLine {
  label: string;
  amount: number;
  estimated?: boolean;
}

export interface BudgetCategory {
  title: string;
  lines: BudgetLine[];
}

export const TRAVELERS = 6;

// First names used in the ledger's paid-by chips (matches bookedBy/paidBy
// usage in bookings + seed expenses). 2 couples + 2 friends:
// Anushrut+Deeksha, Rachita+Harry, plus Avidipto (Avi) and Abhinav.
// Keep "Avidipto" spelled out to match the seeded receipt expenses.
export const TRAVELER_NAMES = [
  "Anushrut",
  "Deeksha",
  "Rachita",
  "Harry",
  "Avidipto",
  "Abhinav",
];

export const ACTIVITIES: BudgetCategory = {
  title: "Activities",
  lines: [
    { label: "Lake Clark bears — Destination Alaska", amount: 970 },
    { label: "Flightseeing + glacier — K2", amount: 580 },
    { label: "Kenai Fjords cruise — Major Marine", amount: 340 },
    { label: "Denali transit bus", amount: 34 },
    { label: "AWCC", amount: 30 },
    { label: "Anchorage Museum", amount: 25 },
    { label: "Heritage Center", amount: 30 },
    { label: "Pratt Museum", amount: 15 },
  ],
};

export const LOGISTICS: BudgetCategory = {
  title: "Logistics",
  lines: [
    { label: "Lodging (3 of 6 actual)", amount: 745, estimated: true },
    { label: "Rental car — Budget", amount: 366 },
    { label: "Gas (~1,400 mi)", amount: 50, estimated: true },
    { label: "Food (10 days)", amount: 550, estimated: true },
    { label: "Misc (tips, parking)", amount: 100, estimated: true },
  ],
};

const CATEGORIES = [ACTIVITIES, LOGISTICS];

// ---- derived totals (do not hardcode) ----
export function categoryTotal(c: BudgetCategory): number {
  return c.lines.reduce((sum, l) => sum + l.amount, 0);
}

export const PER_PERSON_TOTAL = CATEGORIES.reduce(
  (sum, c) => sum + categoryTotal(c),
  0,
);

export const GROUP_TOTAL = PER_PERSON_TOTAL * TRAVELERS;
