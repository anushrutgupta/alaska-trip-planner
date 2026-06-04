export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
  altPhone?: string;
  url?: string;
  address?: string;
  notes?: string;
}

export interface ContactGroup {
  title: string;
  contacts: Contact[];
}

export const CONTACT_GROUPS: ContactGroup[] = [
  {
    title: "Anchor activities",
    contacts: [
      {
        id: "major-marine",
        name: "Major Marine Tours",
        role: "Kenai Fjords 8.5-hr cruise (Jun 29)",
        phone: "+19072747300",
        url: "https://majormarine.com",
        notes: "Check-in 7:30 AM at Harbor 360 dock.",
      },
      {
        id: "destination-alaska",
        name: "Destination Alaska (Northwind)",
        role: "Lake Clark bears (Jun 27) · conf 349623320",
        phone: "+19074354011",
        url: "https://destinationakcharters.com",
        address: "1184 Lakeshore Drive, Homer",
        notes: "Meet at Beluga Lake Office. Tide-dependent — they text/WhatsApp the check-in time the day before.",
      },
      {
        id: "tat",
        name: "K2 Aviation",
        role: "Flightseeing + glacier (Jul 1, 8:30 AM) · conf 353115058",
        phone: "+18007642291",
        url: "https://flyk2.com",
        address: "14052 E 2nd St, Talkeetna",
        notes: "Check in at the K2 airport office 8:00 AM (30 min before). Balance $1,627.50 due. They call if weather forces a change.",
      },
      {
        id: "denali-bus",
        name: "Denali Park Reservations",
        role: "East Fork transit bus (Jul 3) · conf 3EY7SH",
        phone: "+18006221297",
        url: "https://reservedenali.com",
        notes: "Pickup 9:30 AM at Denali Bus Depot, Mile 1. Arrive 20 min early.",
      },
    ],
  },
  {
    title: "Lodging",
    contacts: [
      {
        id: "glacier-chalet",
        name: "Glacier Chalet (Airbnb · Amara)",
        role: "Arrival night, Jun 25",
        address: "2815 Glacier St, Anchorage",
        notes: "3BR A-Frame w/ King Loft Suite. Self check-in (keypad) after 4 PM — land 11:41 PM, check in late.",
      },
      {
        id: "homer-lodging",
        name: "Homer VRBO (host Remy Hough)",
        role: "Jun 26–27 · conf HA-L2CYBY",
        url: "https://vrbo.com",
        notes: "3BR. 6 adults. Arrive 3 PM Jun 26, depart 12 PM Jun 28.",
      },
      {
        id: "marina-motel",
        name: "Marina Motel",
        role: "Seward, Jun 28–29",
        address: "1603 Seward Hwy, Seward",
        notes: "Cruise check-in is separately at the Harbor 360 dock (1412 4th Ave).",
      },
      {
        id: "talkeetna-denali-view",
        name: "Talkeetna Denali View Lodge",
        role: "Jun 30 – Jul 1 · Trapper's Cabin · conf 99713",
        phone: "+19077334111",
        altPhone: "+19073515830",
        address: "15669 E Coffey Lane, Talkeetna",
        notes: "2 adults. Off Parks Hwy Mile 99 → Spur Rd to Mile 3. Day-of: Dawn 907-351-5830. Balance $278.25 due.",
      },
      {
        id: "liberty-farms",
        name: "Liberty Farms",
        role: "Jun 30 – Jul 1 · Bunk Suite · conf 6307",
        notes: "2 guests (Rachita). Mat-Su area. Balance $262.90 due. VERIFY combined Talkeetna capacity for 6.",
      },
      {
        id: "denali-rv-park",
        name: "Denali RV Park & Motel",
        role: "Denali, Jul 2–3",
        address: "Mile 245.1 Parks Hwy, Healy",
        notes: "Two consecutive 1-night stays. Check-in 3–8 PM, checkout by 10 AM.",
      },
      {
        id: "anc-final",
        name: "Alaskana Wildlife Townhome (Airbnb · Whitney)",
        role: "Anchorage final night, Jul 4 · conf HM2FXNBW4Z",
        phone: "+19073504819",
        address: "8010 Queen Victoria Dr, Anchorage",
        notes: "5 adults. Self check-in (keypad) after 4 PM.",
      },
    ],
  },
  {
    title: "Rental car",
    contacts: [
      {
        id: "rental",
        name: "Budget Rent A Car",
        role: "Jun 26 – Jul 5 · conf 46242799US1",
        phone: "+19072430150",
        address: "ANC airport, 5000 W Intl Airport Rd",
        notes:
          "Ford Expedition Max. Hard-copy license + physical credit card required. Counter 6 AM–1:45 AM. After-hours key drop available.",
      },
    ],
  },
  {
    title: "Emergency · medical",
    contacts: [
      {
        id: "emergency",
        name: "Emergency",
        role: "Police · Fire · Medical",
        phone: "+19115551212",
        notes: "Dial 911 in any emergency. Listed with placeholder.",
      },
      {
        id: "providence-anc",
        name: "Providence Alaska Medical Center",
        role: "Anchorage ER",
        phone: "+19075626611",
        address: "3200 Providence Dr, Anchorage",
      },
      {
        id: "south-peninsula",
        name: "South Peninsula Hospital",
        role: "Homer ER",
        phone: "+19072350500",
        address: "4300 Bartlett St, Homer",
      },
      {
        id: "providence-seward",
        name: "Providence Seward Medical Center",
        role: "Seward ER",
        phone: "+19072248384",
        address: "417 1st Ave, Seward",
      },
      {
        id: "denali-clinic",
        name: "Canyon Clinic Denali",
        role: "Urgent care near Denali NP",
        phone: "+19076837500",
        notes: "Limited hours — call ahead.",
      },
      {
        id: "poison-control",
        name: "Poison Control",
        role: "National hotline",
        phone: "+18002221222",
      },
      {
        id: "alaska-state-troopers",
        name: "Alaska State Troopers",
        role: "Non-emergency · highway",
        phone: "+19072695511",
      },
    ],
  },
  {
    title: "Logistics",
    contacts: [
      {
        id: "anc-airport",
        name: "ANC Airport (general info)",
        role: "Ted Stevens Anchorage Intl",
        phone: "+19072662526",
      },
      {
        id: "alaska-air",
        name: "Alaska Airlines",
        role: "Outbound flight Jul 5",
        phone: "+18002527522",
      },
      {
        id: "tides",
        name: "NOAA Tide Predictions",
        role: "Reference (Homer Spit)",
        url: "https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9455500",
        notes: "Destination Alaska's bear-flight tide call comes from here.",
      },
      {
        id: "weather",
        name: "NWS Anchorage",
        role: "Forecasts",
        url: "https://www.weather.gov/afc/",
      },
    ],
  },
];
