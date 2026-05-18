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
        id: "smokey-bay",
        name: "Smokey Bay Air",
        role: "Lake Clark bears (Jun 27)",
        phone: "+19075310602",
        altPhone: "+18884821511",
        address: "2100 Kachemak Drive, Homer",
        notes: "Tide-dependent. Call AM-of for exact time.",
      },
      {
        id: "tat",
        name: "Talkeetna Air Taxi",
        role: "Mountain Voyager + glacier (Jul 1)",
        phone: "+19077332218",
        url: "https://talkeetnaair.com",
        notes: "Status call AM of flight. Body weights required.",
      },
      {
        id: "denali-bus",
        name: "Denali Park Reservations",
        role: "East Fork transit bus (Jul 3)",
        phone: "+18006221297",
        url: "https://reservedenali.com",
      },
    ],
  },
  {
    title: "Lodging",
    contacts: [
      {
        id: "courtyard-anc",
        name: "Courtyard Anchorage Airport",
        role: "Night 0 (Jun 25)",
        phone: "+19072454650",
      },
      {
        id: "homer-lodging",
        name: "Homer lodging",
        role: "Jun 26–27",
        notes: "Add your VRBO or Land's End confirmation here.",
      },
      {
        id: "harbor-360",
        name: "Harbor 360 Hotel",
        role: "Seward, Jun 28–29",
        phone: "+19072251330",
        address: "1412 4th Ave, Seward",
        notes: "Cruise dock is directly behind the hotel.",
      },
      {
        id: "talkeetna-cabin",
        name: "Talkeetna VRBO cabin",
        role: "Jun 30 – Jul 1",
        notes: "3BR lakefront. Add VRBO confirmation + lockbox code here.",
      },
      {
        id: "carlo-creek",
        name: "Carlo Creek cabins",
        role: "Denali, Jul 2–3",
        notes: "15 min south of park entrance. Two cabins for the group.",
      },
      {
        id: "anc-final",
        name: "Anchorage final night",
        role: "Jul 4",
        notes: "Downtown hotel or Airbnb.",
      },
    ],
  },
  {
    title: "Rental car",
    contacts: [
      {
        id: "rental",
        name: "Rental car",
        role: "Jun 25 PM – Jul 5 PM",
        notes:
          "Add agency + confirmation # + after-hours number here. Late-arrival counter open for Alaska flights.",
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
        notes: "Smokey Bay's tide call comes from here.",
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
