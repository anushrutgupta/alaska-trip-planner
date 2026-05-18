export interface BudgetLine {
  label: string;
  amount: number;
}

export interface BudgetCategory {
  title: string;
  total: number;
  lines: BudgetLine[];
}

export const ACTIVITIES: BudgetCategory = {
  title: "Activities",
  total: 1601,
  lines: [
    { label: "Lake Clark Bears (Smokey Bay)", amount: 625 },
    { label: "Flightseeing (TAT + glacier)", amount: 540 },
    { label: "Kenai Fjords Cruise", amount: 330 },
    { label: "Transit Bus (Denali)", amount: 34 },
    { label: "AWCC", amount: 15 },
    { label: "Anchorage Museum", amount: 20 },
    { label: "Heritage Center", amount: 25 },
    { label: "Pratt Museum", amount: 12 },
  ],
};

export const LOGISTICS: BudgetCategory = {
  title: "Logistics",
  total: 2060,
  lines: [
    { label: "Lodging (10 nights, shared)", amount: 1050 },
    { label: "Rental car (11 days ÷ 6→5)", amount: 310 },
    { label: "Gas (~1,400 mi)", amount: 50 },
    { label: "Food (10 days × $55)", amount: 550 },
    { label: "Misc (tips, parking, souvenirs)", amount: 100 },
  ],
};

// Headline numbers match the user's rounded estimates from the itinerary.
// Line items sum to ~$3,661 — the small gap is rounding, not error.
export const PER_PERSON_TOTAL = 3650;
export const GROUP_TOTAL = 21900;
export const TRAVELERS = 6;
