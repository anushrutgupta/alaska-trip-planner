export interface Booking {
  id: string;
  priority: number;
  name: string;
  date: string;
  contact: string;
  phone?: string;
  url?: string;
  price: string;
  notes: string;
  planB?: string;
  // --- Reconciled from confirmations (receipts/, 2026-06-03) ---
  confirmed?: boolean;
  confRef?: string;
  bookedBy?: string;
  paid?: string;
  balanceDue?: string;
}

export const BOOKINGS: Booking[] = [
  {
    id: "kenai-fjords-cruise",
    priority: 1,
    name: "Kenai Fjords 8.5-hr cruise",
    date: "Mon Jun 29 · check-in 7:30 AM",
    contact: "Major Marine Tours · Harbor 360 dock",
    phone: "+19072747300",
    url: "https://majormarine.com",
    price: "$309/pp",
    notes:
      "6 adults. Depart 8:30 AM, return 5:00 PM. Deli lunches pre-selected. Parking $15/day at North/South Harbor lots.",
    planB:
      "<10% cancel rate. Refundable up to 3 days prior; date change free up to 24 hrs out.",
    confirmed: true,
    confRef: "Order 226242",
    bookedBy: "Avidipto",
    paid: "$2,040.78",
  },
  {
    id: "smokey-bay-air",
    priority: 2,
    name: "Lake Clark bears — Destination Alaska",
    date: "Sat Jun 27 (tide-dependent AM)",
    contact: "Destination Alaska / Northwind · meet 1184 Lakeshore Dr, Homer",
    phone: "+19074354011",
    url: "https://destinationakcharters.com",
    price: "~$970/pp paid",
    notes:
      "6 people. Was planned as Smokey Bay Air — actually booked with Destination Alaska Adventure Co. (Northwind Aviation). Online waivers + accurate body weights required. 45-min bush flight each way; 2–3 hrs on site.",
    planB:
      "Weather delays common — keep the day flexible. Full refund or reschedule if they cancel.",
    confirmed: true,
    confRef: "349623320",
    bookedBy: "Avidipto",
    paid: "$5,817.96 (group)",
  },
  {
    id: "tat-flightseeing",
    name: "Flightseeing + glacier landing — K2 Aviation",
    priority: 3,
    date: "Wed Jul 1 · 8:30–10:15 AM (check in 8:00)",
    contact: "K2 Aviation · meet 14052 E 2nd St, Talkeetna",
    phone: "+18007642291",
    url: "https://flyk2.com",
    price: "$580/pp",
    notes:
      "6 adults, Denali Flyer with Glacier Landing. Booked with K2 (not TAT). Bring sunglasses + camera; headset, glacier overboots provided. NPS park fee is covered by the Jul 3 transit bus (within 7 days) — no separate pass needed.",
    planB:
      "Weather: K2 lets you reschedule, take an alternate flight, or cancel for a full refund. Jun 30 PM (on arrival) + Jul 2 AM are natural retry windows if Jul 1 scrubs.",
    confirmed: true,
    confRef: "353115058",
    bookedBy: "Anushrut",
    paid: "$1,852.50",
    balanceDue: "$1,627.50",
  },
  {
    id: "transit-bus",
    priority: 4,
    name: "Denali East Fork transit bus",
    date: "Fri Jul 3 · pickup 9:30 AM",
    contact: "Reserve Denali · Denali Bus Depot (Mile 1)",
    phone: "+18006221297",
    url: "https://reservedenali.com",
    price: "$33.50/pp",
    notes:
      "5 adults. Runs ~11:30 AM–4:15 PM. Arrive depot 20 min early. $15 NPS entry collected at check-in.",
    planB: "<5% cancel rate, runs rain or shine.",
    confirmed: true,
    confRef: "3EY7SH · itin 30002M4VB",
    bookedBy: "Avidipto",
    paid: "$167.50",
  },
  {
    id: "rental-car",
    priority: 5,
    name: "Rental car — Budget Ford Expedition Max",
    date: "Jun 26 12:00 AM – Jul 5 10:00 PM",
    contact: "Budget · ANC airport · 907-243-0150",
    phone: "+19072430150",
    price: "$2,196.58 total",
    notes:
      "Unlimited miles, automatic. Physical credit card + hard-copy license required at counter. After-hours key drop available. Booked under corporate BCD — bring company ID.",
    confirmed: true,
    confRef: "46242799US1",
    bookedBy: "Deeksha",
    paid: "$2,196.58",
  },
  {
    id: "denali-lodging",
    priority: 6,
    name: "Denali lodging — Denali RV Park & Motel",
    date: "Jul 2–3 (2 nights)",
    contact: "Mile 245.1 Parks Hwy, Healy",
    price: "—",
    notes: "Booked as two consecutive 1-night stays. Check-in 3–8 PM, check-out by 10 AM.",
    confirmed: true,
  },
  {
    id: "seward-lodging",
    priority: 7,
    name: "Seward lodging — Marina Motel",
    date: "Jun 28–29 (2 nights)",
    contact: "1603 Seward Hwy, Seward",
    price: "—",
    notes:
      "Not Harbor 360 (the plan's pick) — Harbor 360 is still the cruise check-in dock. Check-in 3–9 PM.",
    confirmed: true,
  },
  {
    id: "homer-lodging",
    priority: 8,
    name: "Homer lodging — VRBO 3BR",
    date: "Jun 26–28 (2 nights)",
    contact: "Host: Remy Hough · via Vrbo",
    url: "https://vrbo.com",
    price: "$914.00 total",
    notes: "6 adults. Arrive Jun 26 3 PM, depart Jun 28 12 PM. 100% refund until Jun 12.",
    confirmed: true,
    confRef: "HA-L2CYBY",
    bookedBy: "Deeksha",
    paid: "$914.00",
  },
  {
    id: "talkeetna-lodging",
    priority: 9,
    name: "Talkeetna lodging — 2 properties",
    date: "Jun 30 – Jul 1 (2 nights)",
    contact: "Denali View Lodge (907-733-4111) + Liberty Farms",
    phone: "+19077334111",
    price: "$556.50 + $501.90",
    notes:
      "VERIFY CAPACITY: Trapper's Cabin (#99713, 2 ad) + Liberty Farms bunk suite (#6307, 2 guests) = 4 beds for 6 people. Day-of contact at Denali View: Dawn 907-351-5830.",
    planB: "Confirm bunk suite sleeps 4+, or book the 2-bed shortfall.",
    confirmed: true,
    confRef: "99713 (Deeksha) · 6307 (Rachita)",
    bookedBy: "Deeksha + Rachita",
    paid: "$278.25 + $239.00",
    balanceDue: "$278.25 + $262.90",
  },
  {
    id: "anchorage-lodging",
    priority: 10,
    name: "Anchorage lodging — Alaskana Wildlife Townhome",
    date: "Jul 4 (final night)",
    contact: "Host: Whitney · 8010 Queen Victoria Dr",
    phone: "+19073504819",
    url: "https://airbnb.com",
    price: "$646.24 total",
    notes: "5 adults. Self check-in with keypad after 4 PM, checkout by 11 AM.",
    confirmed: true,
    confRef: "HM2FXNBW4Z",
    bookedBy: "Deeksha",
    paid: "$646.24",
  },
  {
    id: "airport-hotel",
    priority: 11,
    name: "Arrival night — Glacier Chalet (Airbnb)",
    date: "Thu Jun 25",
    contact: "Host: Amara · 2815 Glacier St, Anchorage",
    url: "https://airbnb.com",
    price: "—",
    notes:
      "3BR A-Frame w/ King Loft Suite. Not the Courtyard the plan assumed. Land 11:41 PM → check in late (keypad). Checkout Jun 26 11 AM.",
    confirmed: true,
  },
  {
    id: "flights",
    priority: 12,
    name: "Flights — Alaska Airlines (round trip)",
    date: "Jun 25 out · Jul 5 red-eye home",
    contact: "AS 212 SFO→ANC · AS 1563/1603 ANC→LAX→SFO",
    phone: "+18002527522",
    price: "—",
    notes:
      "Out: AS 212 SFO 7:47 PM → ANC 11:41 PM (Jun 25). Home: AS 1563 ANC 11:33 PM (Jul 5) → LAX → AS 1603 → SFO 8:39 AM (Jul 6).",
    confirmed: true,
  },
];
