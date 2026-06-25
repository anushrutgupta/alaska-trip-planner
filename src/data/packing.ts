export type PackCategory =
  | "wear"
  | "documents"
  | "clothing"
  | "footwear"
  | "toiletries"
  | "electronics"
  | "daypack";

export interface PackingItem {
  id: string;
  label: string;
  note?: string;
  category: PackCategory;
}

// Display order + labels for the personal packing list.
export const PACK_ORDER: PackCategory[] = [
  "wear",
  "documents",
  "clothing",
  "footwear",
  "toiletries",
  "electronics",
  "daypack",
];

export const PACK_CATEGORY_LABELS: Record<PackCategory, string> = {
  wear: "Wear on the plane",
  documents: "Documents & money",
  clothing: "Clothing · 11 days",
  footwear: "Footwear",
  toiletries: "Toiletries · ≤100 ml",
  electronics: "Electronics",
  daypack: "Day pack & outdoors",
};

// Baggage limit: ONE personal item + ONE carry-on per person — no checked
// bag. So wear the bulkiest layers on the plane, pick clothes you can
// re-wear / sink-wash, and keep liquids ≤100 ml in a 1-quart bag.
//
// Counts assume an 11-day trip with a mid-trip laundry/sink-wash.

export const PACKING: PackingItem[] = [
  // ---- Wear on the plane (saves carry-on space) ----
  {
    id: "wear-boots",
    label: "Waterproof hiking shoes — worn",
    category: "wear",
    note: "Bulkiest item; wear them flying.",
  },
  {
    id: "wear-shell",
    label: "Rain shell — worn / in personal item",
    category: "wear",
    note: "Mandatory. Doubles as your wind layer all trip.",
  },
  {
    id: "wear-fleece",
    label: "Fleece or puffy — worn",
    category: "wear",
  },

  // ---- Documents & money ----
  {
    id: "id",
    label: "Driver's license / REAL ID (or passport)",
    category: "documents",
    note: "Physical ID required at car rental + every activity check-in.",
  },
  {
    id: "credit-card",
    label: "Physical credit card",
    category: "documents",
    note: "Budget needs the real card (not Apple Pay) at the counter.",
  },
  {
    id: "cash",
    label: "~$40 cash",
    category: "documents",
    note: "Some Homer Spit + Talkeetna vendors are cash-only.",
  },
  {
    id: "insurance-card",
    label: "Insurance card + emergency contact",
    category: "documents",
  },

  // ---- Clothing (11 days, carry-on) ----
  {
    id: "underwear",
    label: "Underwear ×6",
    category: "clothing",
    note: "Sink-wash mid-trip; quick-dry pairs travel best.",
  },
  {
    id: "socks",
    label: "Socks ×5 (2 wool)",
    category: "clothing",
    note: "Wool pairs for hikes + the cold cruise.",
  },
  {
    id: "tops",
    label: "T-shirts / tops ×4",
    category: "clothing",
    note: "Merino re-wears without smelling.",
  },
  {
    id: "base-layer",
    label: "Wool base layer (top + bottom)",
    category: "clothing",
    note: "For the cruise, glacier landing, Denali bus.",
  },
  {
    id: "mid-layer",
    label: "Long-sleeve / extra mid-layer",
    category: "clothing",
  },
  {
    id: "puffy",
    label: "Packable down / puffy jacket",
    category: "clothing",
    note: "Cruise deck + glacier landing get near freezing.",
  },
  {
    id: "pants",
    label: "Hiking pants ×1 + casual pants ×1",
    category: "clothing",
  },
  {
    id: "sleepwear",
    label: "Sleepwear",
    category: "clothing",
  },
  {
    id: "hat-gloves",
    label: "Warm hat + gloves",
    category: "clothing",
    note: "Yes, in summer — the boat and glacier are cold.",
  },
  {
    id: "buff",
    label: "Buff / neck gaiter",
    category: "clothing",
  },

  // ---- Footwear ----
  {
    id: "camp-shoes",
    label: "Camp / casual shoes",
    category: "footwear",
    note: "Sneakers or sandals for towns + driving.",
  },

  // ---- Toiletries (≤100 ml, 1-quart bag) ----
  { id: "toothbrush", label: "Toothbrush + paste", category: "toiletries" },
  { id: "deodorant", label: "Deodorant", category: "toiletries" },
  { id: "shampoo", label: "Travel shampoo + body wash", category: "toiletries" },
  {
    id: "sunscreen",
    label: "Sunscreen + SPF lip balm",
    category: "toiletries",
    note: "Glacier + snow glare is brutal.",
  },
  {
    id: "meds",
    label: "Personal meds + Dramamine/Bonine",
    category: "toiletries",
    note: "Motion meds for bear plane, cruise, flightseeing.",
  },
  {
    id: "contacts",
    label: "Contacts + glasses + solution",
    category: "toiletries",
  },
  {
    id: "toiletry-misc",
    label: "Razor, hairbrush, hand sanitizer, wet wipes",
    category: "toiletries",
  },
  {
    id: "quick-towel",
    label: "Quick-dry travel towel",
    category: "toiletries",
  },

  // ---- Electronics ----
  {
    id: "phone-cable",
    label: "Phone + charging cable",
    category: "electronics",
  },
  {
    id: "wall-charger",
    label: "Multi-port wall charger",
    category: "electronics",
    note: "One brick charges the group at lodging.",
  },
  {
    id: "power-bank",
    label: "Power bank (charged)",
    category: "electronics",
    note: "Cruise + Denali bus = 8+ hrs with no outlet.",
  },
  {
    id: "camera",
    label: "Camera + spare battery + SD cards",
    category: "electronics",
    note: "Bears, whales, glaciers eat memory + battery.",
  },
  { id: "headphones", label: "Headphones", category: "electronics" },

  // ---- Day pack & outdoors ----
  {
    id: "daypack",
    label: "Small daypack",
    category: "daypack",
    note: "Can double as your plane personal item.",
  },
  {
    id: "water-bottle",
    label: "Reusable water bottle",
    category: "daypack",
  },
  {
    id: "dry-bag",
    label: "Dry bag / waterproof phone pouch",
    category: "daypack",
    note: "For the Kenai Fjords cruise spray.",
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    category: "daypack",
  },
  {
    id: "binoculars",
    label: "Binoculars",
    category: "daypack",
    note: "Wildlife is usually at a distance.",
  },
  {
    id: "sleep-mask",
    label: "Sleep mask",
    category: "daypack",
    note: "~19 hrs of daylight — it never gets properly dark.",
  },
  {
    id: "bug-spray",
    label: "DEET bug spray + head net",
    category: "daypack",
    note: "Denali mosquitoes are aggressive in early July.",
  },
  {
    id: "bear-spray",
    label: "Bear spray — buy in Alaska",
    category: "daypack",
    note: "Banned on flights + the bush plane. For self-guided hikes (Exit Glacier, Savage Alpine, Horseshoe Lake).",
  },
  {
    id: "snacks",
    label: "Travel snacks",
    category: "daypack",
  },
];
