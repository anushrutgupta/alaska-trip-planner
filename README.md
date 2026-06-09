# Alaska 2026 — Trip Planner

A self-contained, offline-friendly trip planner for a ~11-day Alaska road trip
(**Jun 25 – Jul 5, 2026**). It's a single-page React app: an interactive map of
the route plus tabbed panels for the day-by-day plan, bookings, budget, packing,
and contacts. No backend, no accounts — all your edits (packing checkboxes,
expenses, notes) live in your browser via `localStorage`.

> Built for one specific trip, but easy to fork and retarget to your own — the
> whole itinerary is plain data under [`src/data/`](src/data).

## Features

- **Map** — Leaflet route with color-coded legs (drive / fly / bus / boat), click
  or arrow-key to step through stops.
- **Today** — context-aware home screen that shows a `T-minus` countdown before
  the trip and the live "what's now / next" view during it.
- **Journey** — stop-by-stop detail cards (Anchorage → Homer → Lake Clark →
  Seward → Kenai Fjords → Talkeetna → Denali → back to Anchorage).
- **Days** — hour-by-hour daily schedule with editable per-day notes.
- **Bookings** — every reservation with confirmation numbers and status.
- **Budget** — expense ledger (seeded from real receipts) with running totals.
- **Packing** — checklist split into pre-trip prep and gear to pack.
- **Contacts** — lodging, activity, and emergency numbers in one place.

Mobile-friendly (installable as a PWA) and includes a print/PDF view.

## Tech stack

Vite · React 18 · TypeScript · Tailwind CSS · React-Leaflet. No server.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev          # http://localhost:5173
npm run dev:lan      # same, exposed on your LAN (open it on your phone)
```

Build for production:

```bash
npm run build        # type-checks, then outputs to dist/
npm run preview      # serve the production build locally
```

## Make it your own

All trip content is data, not code — edit these and the UI follows:

| File | What it drives |
|------|----------------|
| [`src/data/stops.ts`](src/data/stops.ts) | Map markers + route legs |
| [`src/data/days.ts`](src/data/days.ts) | Hour-by-hour daily schedule |
| [`src/data/bookings.ts`](src/data/bookings.ts) | Reservations & confirmation #s |
| [`src/data/budget.ts`](src/data/budget.ts) · [`seedExpenses.ts`](src/data/seedExpenses.ts) | Budget config + starting ledger |
| [`src/data/packing.ts`](src/data/packing.ts) | Packing / prep checklist |
| [`src/data/contacts.ts`](src/data/contacts.ts) | Phone numbers & addresses |

## Contributing

`main` is protected — direct pushes are blocked, so changes come in via pull
request:

1. **Fork** this repo (top-right on GitHub).
2. Create a branch, commit your change, and push it to your fork.
3. Open a **pull request** back here.

That's it — no need to be added as a collaborator.
