export interface PreTripItem {
  id: string;
  label: string;
  note?: string;
  category: "docs" | "tech" | "health" | "group" | "logistics";
}

export const PRETRIP: PreTripItem[] = [
  // Docs
  {
    id: "ids",
    label: "Photo IDs · everyone",
    category: "docs",
    note: "Destination Alaska + K2 both verify at check-in.",
  },
  {
    id: "confirmations",
    label: "Print + save digital confirmations",
    category: "docs",
    note: "Cruise, both flights, bus, all lodging, rental car. Offline copies critical past Cantwell.",
  },
  {
    id: "insurance",
    label: "Travel insurance · trip cancel + medical",
    category: "docs",
    note: "Optional but Lake Clark + glacier landing tilts the math.",
  },

  // Tech
  {
    id: "offline-maps",
    label: "Download offline Google Maps",
    category: "tech",
    note: "ANC→Homer, Seward Hwy, Parks Hwy Wasilla→Denali, Denali NP. Cell dies past Soldotna and Cantwell.",
  },
  {
    id: "downloads",
    label: "Download podcasts / playlists",
    category: "tech",
    note: "Long drives. Spotify offline mode.",
  },
  {
    id: "power-banks",
    label: "Charge all power banks",
    category: "tech",
    note: "Cruise + bus day = 8+ hrs no outlet.",
  },
  {
    id: "camera-prep",
    label: "Camera batteries + SD cards",
    category: "tech",
    note: "Pack 2 spare batteries. Bears + glaciers eat memory.",
  },

  // Health
  {
    id: "bonine",
    label: "Bonine / Dramamine — 4 doses each",
    category: "health",
    note: "Bear plane + cruise + (optional) flightseeing. Bonine = less drowsy.",
  },
  {
    id: "deet",
    label: "DEET 30%+ bug spray",
    category: "health",
    note: "Denali mosquitoes are aggressive late June onward.",
  },
  {
    id: "sunscreen",
    label: "Sunscreen + lip balm SPF",
    category: "health",
    note: "Glacier sun is brutal. UV reflects off snow.",
  },
  {
    id: "prescriptions",
    label: "Refill prescriptions · 14-day buffer",
    category: "health",
  },
  {
    id: "first-aid",
    label: "Small first-aid kit",
    category: "health",
    note: "Blister care, ibuprofen, antihistamine.",
  },

  // Group
  {
    id: "body-weights",
    label: "Collect everyone's body weight",
    category: "group",
    note: "Destination Alaska + K2 need them (done at booking — keep them current). Dressed-with-camera weight; being off by 15+ lbs can mean no fly, no refund.",
  },
  {
    id: "venmo",
    label: "Confirm everyone has Venmo / Splitwise",
    category: "group",
    note: "Use the Budget tab's expense ledger or your own group.",
  },
  {
    id: "group-chat",
    label: "Group chat with all 6",
    category: "group",
    note: "Signal/iMessage. Add the friend who leaves Jul 2 to a separate handoff thread for ANC drop-off logistics.",
  },
  {
    id: "wakeup-norms",
    label: "Agree on morning alarm norms",
    category: "group",
    note: "Day 4 (cruise) = 06:30, Day 8 (bus) = 05:15. Non-negotiables.",
  },

  // Logistics
  {
    id: "rental-car",
    label: "Book SUV / minivan rental",
    category: "logistics",
    note: "Same booking covers Jun 25 PM – Jul 5 PM. Confirm late-night pickup.",
  },
  {
    id: "cooler",
    label: "Soft cooler bag",
    category: "logistics",
    note: "Pack with the groceries on Day 1.",
  },
  {
    id: "cash",
    label: "$200 cash split across group",
    category: "logistics",
    note: "Some Talkeetna + Homer Spit vendors are cash-only.",
  },
];
