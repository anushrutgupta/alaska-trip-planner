import type { Expense } from "../components/BudgetPanel";

// Seeded from confirmed receipts (2026-06-03). Every amount + payer below is
// taken directly off a confirmation — nothing inferred. "deposit" rows are the
// amount actually paid so far (a balance is still due).
//
// Deliberately NOT seeded (would be assuming):
//   - Rental car: $2,196.58 is an ESTIMATE charged at pickup, not a paid amount.
//   - Glacier Chalet / Marina Motel / Denali RV / flights: no price on the receipt.
//
// `splitAmong` is a sensible default (6 = whole group; 5 = after the Jul 2
// departure). Adjust per your real arrangements — every row is editable.
export const SEED_EXPENSES: Expense[] = [
  { id: "seed-bears", date: "2026-05-18", label: "Lake Clark bears (Destination Alaska)", amount: 5817.96, paidBy: "Avidipto", splitAmong: 6 },
  { id: "seed-cruise", date: "2026-05-18", label: "Kenai Fjords cruise (Major Marine)", amount: 2040.78, paidBy: "Avidipto", splitAmong: 6 },
  { id: "seed-bus", date: "2026-05-18", label: "Denali transit bus", amount: 167.5, paidBy: "Avidipto", splitAmong: 5 },
  { id: "seed-homer", date: "2026-05-18", label: "Homer VRBO (2 nights)", amount: 914.0, paidBy: "Deeksha", splitAmong: 6 },
  { id: "seed-flightseeing", date: "2026-06-03", label: "Flightseeing — K2 (deposit)", amount: 1852.5, paidBy: "Anushrut", splitAmong: 6 },
  { id: "seed-talkeetna-dv", date: "2026-06-01", label: "Talkeetna Denali View (deposit)", amount: 278.25, paidBy: "Deeksha", splitAmong: 6 },
  { id: "seed-liberty", date: "2026-06-01", label: "Liberty Farms (deposit)", amount: 239.0, paidBy: "Rachita", splitAmong: 6 },
  { id: "seed-anc-airbnb", date: "2026-06-01", label: "Anchorage Airbnb Jul 4 (deposit)", amount: 288.5, paidBy: "Deeksha", splitAmong: 5 },
];
