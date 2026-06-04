export interface BudgetLine {
  label: string;
  amount: number;
}

export interface BudgetCategory {
  title: string;
  total: number;
  lines: BudgetLine[];
}

// Updated 2026-06-03 once the big-ticket items were booked. Activities + rental
// car are ACTUAL per-person (paid). Lodging is 3-of-6 actual + estimates for the
// two motels and the arrival-night Airbnb (prices not on those confirmations).
// Excludes flights to/from Anchorage.

export const ACTIVITIES: BudgetCategory = {
  title: "Activities (actual)",
  total: 1996,
  lines: [
    { label: "Lake Clark bears — Destination Alaska", amount: 970 },
    { label: "Flightseeing + glacier — K2", amount: 580 },
    { label: "Kenai Fjords cruise — Major Marine", amount: 340 },
    { label: "Denali transit bus", amount: 34 },
    { label: "AWCC", amount: 15 },
    { label: "Anchorage Museum", amount: 20 },
    { label: "Heritage Center", amount: 25 },
    { label: "Pratt Museum", amount: 12 },
  ],
};

export const LOGISTICS: BudgetCategory = {
  title: "Logistics",
  total: 1811,
  lines: [
    { label: "Lodging (3 of 6 actual, rest est.)", amount: 745 },
    { label: "Rental car — Budget (actual)", amount: 366 },
    { label: "Gas (~1,400 mi, est.)", amount: 50 },
    { label: "Food (10 days, est.)", amount: 550 },
    { label: "Misc (tips, parking, est.)", amount: 100 },
  ],
};

export const PER_PERSON_TOTAL = 3807;
export const GROUP_TOTAL = 22800;
export const TRAVELERS = 6;
