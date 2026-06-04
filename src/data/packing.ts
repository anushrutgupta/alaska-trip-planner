export interface PackingItem {
  id: string;
  label: string;
  note?: string;
}

export const PACKING: PackingItem[] = [
  { id: "rain-shell", label: "Rain shell", note: "Mandatory" },
  { id: "fleece", label: "Fleece mid-layer" },
  { id: "base-layer", label: "Wool base layer" },
  { id: "hat-gloves", label: "Warm hat + gloves" },
  { id: "sunglasses", label: "Sunglasses" },
  { id: "sunscreen", label: "Sunscreen" },
  { id: "hiking-shoes", label: "Hiking shoes (waterproof)" },
  { id: "sleep-masks", label: "Sleep masks", note: "19 hrs daylight" },
  { id: "motion-meds", label: "Dramamine / Bonine" },
  { id: "binoculars", label: "Binoculars" },
  { id: "bug-spray", label: "Bug spray (DEET)" },
  { id: "head-net", label: "Head net", note: "Denali mosquitoes, early July" },
  {
    id: "bear-spray",
    label: "Bear spray",
    note: "Buy in AK — banned on flights + the bush plane. For self-guided hikes (Exit Glacier, Savage Alpine, Horseshoe Lake).",
  },
  { id: "water-bottle", label: "Reusable water bottles" },
  { id: "phone-charger", label: "Portable phone charger" },
  { id: "offline-maps", label: "Offline Google Maps" },
];
