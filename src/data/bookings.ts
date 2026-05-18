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
}

export const BOOKINGS: Booking[] = [
  {
    id: "kenai-fjords-cruise",
    priority: 1,
    name: "Kenai Fjords 8.5-hr cruise (6 seats)",
    date: "Mon Jun 29",
    contact: "Major Marine Tours",
    phone: "+19072747300",
    url: "https://majormarine.com",
    price: "$309/pp",
    notes: "Only 36 seats. Book NOW.",
    planB:
      "<10% cancel rate. If cancelled: refund + half-day backup if any slots open same week.",
  },
  {
    id: "smokey-bay-air",
    priority: 2,
    name: "Smokey Bay Air bears (6 ppl, 2 planes)",
    date: "Sat Jun 27 (buffer: Jun 28)",
    contact: "Smokey Bay Air",
    phone: "+19075310602",
    price: "~$625/pp",
    notes: "Confirm same departure slot. Need body weights. Full refund on weather cancel.",
    planB: "Day 3 AM buffer attempt. If 2 cancels in a row: refund and accept the miss.",
  },
  {
    id: "tat-flightseeing",
    priority: 3,
    name: "TAT flightseeing + glacier landing",
    date: "Wed Jul 1 AM (primary)",
    contact: "Talkeetna Air Taxi",
    phone: "+19077332218",
    url: "https://talkeetnaair.com",
    price: "$525 + $15/pp",
    notes: "Body weights. 5 ppl = 2 planes; confirm simultaneous.",
    planB:
      "PM standby Jun 30 (bonus). PM standby Jul 1 if AM cancels. Final retry Jul 2 AM en route to Denali. After 3 attempts, refund.",
  },
  {
    id: "transit-bus",
    priority: 4,
    name: "Transit bus (5 seats, one reservation)",
    date: "Fri Jul 3, earliest AM",
    contact: "Reserve Denali",
    phone: "+18006221297",
    url: "https://reservedenali.com",
    price: "$33.50/pp",
    notes: "All on one reservation.",
    planB: "<5% cancel rate. If cancelled: 9 AM Tundra Wilderness Tour as backup.",
  },
  {
    id: "rental-car",
    priority: 5,
    name: "Rental car (SUV / minivan, 11 days)",
    date: "Jun 25 PM – Jul 5 PM",
    contact: "Kayak · Enterprise · Avis",
    price: "~$170/day",
    notes: "Compare on Kayak. Book within 2 weeks.",
  },
  {
    id: "denali-lodging",
    priority: 6,
    name: "Denali lodging (2 nights)",
    date: "Jul 2–3",
    contact: "Carlo Creek cabins (preferred)",
    price: "~$250/room",
    notes: "Tight supply — book soon. 2 cabins for 5.",
  },
  {
    id: "seward-lodging",
    priority: 7,
    name: "Seward lodging (2 nights)",
    date: "Jun 28–29",
    contact: "Harbor 360 (cruise dock behind)",
    phone: "+19072251330",
    price: "~$220/room",
    notes: "Ideal cruise-day logistics.",
  },
  {
    id: "homer-lodging",
    priority: 8,
    name: "Homer lodging (2 nights)",
    date: "Jun 26–27",
    contact: "VRBO cabin · Land's End",
    price: "~$200/room",
    notes: "On the Spit if budget allows.",
  },
  {
    id: "talkeetna-lodging",
    priority: 9,
    name: "Talkeetna lodging (2 nights)",
    date: "Jun 30 – Jul 1",
    contact: "3BR VRBO cabin",
    price: "~$300/night",
    notes: "Lakefront + hot tub + kitchen for 5.",
  },
  {
    id: "anchorage-lodging",
    priority: 10,
    name: "Anchorage lodging (1 night)",
    date: "Sat Jul 4",
    contact: "Downtown hotel · Airbnb",
    price: "~$170/room",
    notes: "Final night. + 1 ANC night Jun 30 for the friend departing Jul 2.",
  },
  {
    id: "airport-hotel",
    priority: 11,
    name: "Airport hotel (1 night)",
    date: "Thu Jun 25",
    contact: "Courtyard ANC Airport",
    phone: "+19072454650",
    price: "~$160/room",
    notes: "Late arrival — counters stay open.",
  },
];
