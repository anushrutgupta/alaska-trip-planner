// Hour-by-hour day-by-day schedule. Times are local (Alaska, UTC-8 in summer).
// Treat times as targets, not commitments — bear viewing and flightseeing both
// slide based on weather and tides.

export type EventType =
  | "wake"
  | "meal"
  | "drive"
  | "activity"
  | "highlight"
  | "transit"
  | "checkin"
  | "sleep"
  | "flex"
  | "note";

export interface DayEvent {
  id: string;
  time: string; // "HH:MM" 24h
  duration?: string;
  type: EventType;
  title: string;
  detail?: string;
  stopIndex?: number; // link to map marker
  mapsQuery?: string; // Google Maps search query
  phone?: string;
  planB?: string;
  bookingId?: string; // link to a BOOKINGS entry → surfaces its confirmation
}

export interface Day {
  index: number;
  label: string; // "Day 1"
  date: string; // "Fri Jun 26"
  dateISO: string; // "2026-06-26"
  theme: string;
  overnight: string;
  sunrise: string; // "04:30"
  sunset: string; // "23:30"
  weather: string; // static seasonal note
  driveMiles?: number;
  driveTime?: string;
  events: DayEvent[];
}

export const DAYS: Day[] = [
  {
    index: 0,
    label: "Night 0",
    date: "Thu Jun 25",
    dateISO: "2026-06-25",
    theme: "Arrival",
    overnight: "Airport hotel (Anchorage)",
    sunrise: "04:22",
    sunset: "23:42",
    weather: "Late June Anchorage: 55–65°F. Likely clear at 11 PM landing — still light outside.",
    events: [
      {
        id: "d0-land",
        time: "23:41",
        type: "transit",
        title: "Land at ANC",
        detail: "Alaska Airlines / United. Baggage claim → rental counters (same level).",
        mapsQuery: "Ted Stevens Anchorage International Airport",
      },
      {
        id: "d0-rental",
        time: "00:10",
        duration: "30 min",
        type: "checkin",
        title: "Pick up rental car",
        detail:
          "Counter stays open for late Alaska arrivals. Verify roof rack / cargo space — you'll have luggage for 6 plus groceries.",
      },
      {
        id: "d0-hotel",
        time: "00:45",
        type: "checkin",
        title: "Check in at Glacier Chalet (Airbnb)",
        detail:
          "3BR A-Frame w/ King Loft Suite, 2815 Glacier St. Self check-in via keypad — host Amara. ~10 min from terminal.",
        mapsQuery: "2815 Glacier St, Anchorage AK",
      },
      { id: "d0-sleep", time: "01:30", type: "sleep", title: "Sleep" },
    ],
  },

  {
    index: 1,
    label: "Day 1",
    date: "Fri Jun 26",
    dateISO: "2026-06-26",
    theme: "ANC → Homer (225 mi, scenic drive day)",
    overnight: "Homer (1 of 2)",
    sunrise: "04:21",
    sunset: "23:43",
    weather: "Cooler near the coast. Bring layers — Turnagain Arm wind chill drops it ~10°F.",
    driveMiles: 225,
    driveTime: "5 hrs (with stops)",
    events: [
      { id: "d1-wake", time: "08:30", type: "wake", title: "Wake at Glacier Chalet" },
      {
        id: "d1-coffee",
        time: "09:00",
        type: "meal",
        title: "Hotel breakfast / coffee",
      },
      {
        id: "d1-groceries",
        time: "09:30",
        duration: "45 min",
        type: "activity",
        title: "Fred Meyer groceries",
        detail:
          "Northern Lights Blvd. Sandwich supplies, snacks, water, granola bars for the whole trip. Don't underestimate — you'll burn through these on bus + boat days.",
        stopIndex: 1,
        mapsQuery: "Fred Meyer Northern Lights Anchorage",
      },
      {
        id: "d1-depart-anc",
        time: "10:30",
        type: "drive",
        title: "Depart ANC south on Seward Hwy",
        detail: "Top off fuel before leaving city. Cell service drops past Girdwood.",
      },
      {
        id: "d1-beluga",
        time: "11:15",
        duration: "10 min",
        type: "activity",
        title: "Beluga Point overlook (Mile 110)",
        detail: "Turnagain Arm. Dall sheep on the cliffs above. Quick photo stop.",
        stopIndex: 2,
        mapsQuery: "Beluga Point Alaska",
      },
      {
        id: "d1-bird",
        time: "11:35",
        duration: "5 min",
        type: "activity",
        title: "Bird Point (Mile 96)",
        detail: "Second Turnagain pullout. If the tide is going out, look for bores.",
        mapsQuery: "Bird Point Alaska",
      },
      {
        id: "d1-awcc",
        time: "12:00",
        duration: "45 min",
        type: "activity",
        title: "AWCC at Portage",
        detail:
          "Brown + black bears, moose, muskox, bison, porcupine. Walk the loop. $15/pp at the gate.",
        stopIndex: 3,
        mapsQuery: "Alaska Wildlife Conservation Center",
        phone: "+19077832025",
      },
      {
        id: "d1-lunch",
        time: "13:00",
        type: "meal",
        title: "Picnic lunch on the road",
        detail: "Sandwiches from groceries. Tern Lake Junction has pullouts and bathrooms.",
      },
      {
        id: "d1-soldotna",
        time: "15:00",
        duration: "15 min",
        type: "activity",
        title: "Soldotna — gas + bathrooms",
        detail: "Don't grocery shop again here. Just fuel + stretch.",
        stopIndex: 4,
        mapsQuery: "Soldotna Alaska",
      },
      {
        id: "d1-arrive-homer",
        time: "16:00",
        type: "checkin",
        title: "Arrive Homer · Check in",
        detail: "Lodging check-in. Dump bags. Confirm everyone has rain shell + layers for tomorrow.",
        stopIndex: 5,
      },
      {
        id: "d1-spit",
        time: "16:45",
        duration: "1.5 hrs",
        type: "activity",
        title: "Walk Homer Spit",
        detail:
          "4.5-mile sandspit. Shops, fishing charters, views across Kachemak Bay to glaciers + volcanoes.",
        mapsQuery: "Homer Spit",
      },
      {
        id: "d1-salty",
        time: "18:30",
        duration: "30 min",
        type: "activity",
        title: "Salty Dawg Saloon",
        detail: "Lighthouse-shaped dive bar. Touristy in a good way. One drink, take a photo.",
        mapsQuery: "Salty Dawg Saloon Homer",
      },
      {
        id: "d1-dinner",
        time: "19:30",
        type: "meal",
        title: "Dinner on the Spit",
        detail: "Captain Pattie's (fish & chips), La Baleine (French-Alaskan), or Fat Olives.",
        mapsQuery: "Captain Pattie's Homer",
      },
      {
        id: "d1-smokey",
        time: "21:00",
        duration: "5 min",
        type: "checkin",
        title: "Watch for Destination Alaska check-in text",
        detail:
          "Destination Alaska / Northwind (conf 349623320) text/WhatsApp tomorrow's exact check-in time (tide-dependent). Meet at Beluga Lake Office, 1184 Lakeshore Dr. Set alarms accordingly.",
        mapsQuery: "1184 Lakeshore Drive, Homer AK",
        phone: "+19074354011",
      },
      {
        id: "d1-prep",
        time: "21:30",
        type: "note",
        title: "Bonine pre-dose · Layout layers · Charge cameras",
        detail:
          "Take Bonine tonight + tomorrow AM. Layout rain shell, fleece, base layer, hat, gloves for the morning.",
      },
      { id: "d1-sleep", time: "22:30", type: "sleep", title: "Sleep (alarms set)" },
    ],
  },

  {
    index: 2,
    label: "Day 2",
    date: "Sat Jun 27",
    dateISO: "2026-06-27",
    theme: "★ LAKE CLARK BEAR VIEWING",
    overnight: "Homer (2 of 2)",
    sunrise: "04:22",
    sunset: "23:43",
    weather:
      "Coastal — could be foggy AM. Bay temp ~45°F, beach 50–60°F. Wind shell essential.",
    events: [
      { id: "d2-wake", time: "06:30", type: "wake", title: "Wake · Bonine AM dose" },
      {
        id: "d2-breakfast",
        time: "07:00",
        type: "meal",
        title: "Light breakfast",
        detail: "Skip greasy/heavy. Coffee + toast. Bumpy 1-hr bush plane ahead.",
      },
      {
        id: "d2-drive-smokey",
        time: "07:30",
        type: "drive",
        title: "Drive to Beluga Lake Office (15 min)",
        detail: "1184 Lakeshore Dr. Tide-dependent — exact check-in confirmed last night. Don't arrive >10 min early.",
        mapsQuery: "1184 Lakeshore Drive, Homer AK",
      },
      {
        id: "d2-checkin-smokey",
        time: "07:45",
        duration: "15–30 min",
        type: "checkin",
        title: "Destination Alaska check-in · Weigh-in · Waders",
        detail:
          "Bring photo IDs + completed online waivers. Weigh-in for plane balance (misreporting by 15+ lbs = no fly, no refund). Try on hip waders. No bear spray/weapons on the flight. Conf 349623320.",
        phone: "+19074354011",
        mapsQuery: "1184 Lakeshore Drive, Homer AK",
      },
      {
        id: "d2-flight-out",
        time: "08:00",
        duration: "1 hr",
        type: "transit",
        title: "Flight to Lake Clark NP",
        detail:
          "Across Cook Inlet — Redoubt + Iliamna volcanoes, glaciers, coastline. Sit on the right side for best volcano views.",
      },
      {
        id: "d2-bears",
        time: "09:00",
        duration: "3 hrs",
        type: "highlight",
        title: "Bears at Chinitna Bay / Silver Salmon",
        detail:
          "Beach landing. Walking among coastal brown bears on tidal flats. Late June: clamming, sedge grazing, mating behavior, sows with cubs. Pilot/guide leads. Within 50–125 ft. Zoom lens recommended.",
        stopIndex: 6,
        bookingId: "smokey-bay-air",
        planB:
          "If weather cancels: refund OR rebook tomorrow AM. Don't push to a third attempt — your buffer is Day 3 only.",
      },
      {
        id: "d2-flight-back",
        time: "12:30",
        duration: "45 min",
        type: "transit",
        title: "Return flight to Homer",
      },
      {
        id: "d2-back",
        time: "13:30",
        type: "meal",
        title: "Late lunch at Homer Spit",
        detail: "Decompress. You just walked among grizzlies.",
      },
      {
        id: "d2-flex",
        time: "15:00",
        duration: "3 hrs",
        type: "flex",
        title: "Homer afternoon (pick 1–2)",
        detail:
          "Pratt Museum ($12, 1 hr — natural history + tide pool touch tank). Bishops Beach (easy stroll below bluffs). Homer Brewing Company. Or genuinely rest.",
        mapsQuery: "Pratt Museum Homer",
      },
      {
        id: "d2-dinner",
        time: "18:30",
        type: "meal",
        title: "Dinner",
        detail: "Whichever Spit restaurant you didn't hit last night.",
      },
      { id: "d2-sleep", time: "22:00", type: "sleep", title: "Sleep" },
    ],
  },

  {
    index: 3,
    label: "Day 3",
    date: "Sun Jun 28",
    dateISO: "2026-06-28",
    theme: "Homer → Seward + Exit Glacier",
    overnight: "Seward (1 of 2)",
    sunrise: "04:23",
    sunset: "23:42",
    weather: "Possible rain. Trail will be wet — waterproof boots non-negotiable.",
    driveMiles: 170,
    driveTime: "3.5 hrs",
    events: [
      { id: "d3-wake", time: "08:30", type: "wake", title: "Wake · Pack out of Homer" },
      { id: "d3-breakfast", time: "09:00", type: "meal", title: "Breakfast + check out" },
      {
        id: "d3-depart-homer",
        time: "10:00",
        type: "drive",
        title: "Depart Homer north on Sterling Hwy",
        detail: "Same road you came in on — Soldotna at the halfway point.",
      },
      {
        id: "d3-soldotna",
        time: "12:00",
        duration: "15 min",
        type: "activity",
        title: "Soldotna — gas + lunch",
        detail: "Drive-thru or quick deli. Don't sit down.",
      },
      {
        id: "d3-arrive-seward",
        time: "14:00",
        type: "drive",
        title: "Arrive Seward area",
        detail: "Head straight to Exit Glacier — don't bother with town yet.",
      },
      {
        id: "d3-exit-glacier",
        time: "14:30",
        duration: "2 hrs",
        type: "activity",
        title: "Exit Glacier · Overlook Loop Trail",
        detail:
          "2.2 mi moderate. Views of Exit Glacier face + Harding Icefield. Free entry. Bathrooms at the visitor center.",
        stopIndex: 8,
        mapsQuery: "Exit Glacier Trailhead Seward",
      },
      {
        id: "d3-checkin-seward",
        time: "17:00",
        type: "checkin",
        title: "Check in at Marina Motel",
        detail:
          "1603 Seward Hwy. Note: tomorrow's cruise check-in is separately at the Harbor 360 dock (1412 4th Ave) — scope the parking tonight.",
        stopIndex: 9,
        mapsQuery: "Marina Motel Seward",
      },
      {
        id: "d3-harbor",
        time: "17:45",
        duration: "1 hr",
        type: "activity",
        title: "Walk Seward harbor",
        detail:
          "Fishing boats, sea otters near the docks, mountain backdrop. Stretch — tomorrow is 8.5 hrs on a boat.",
      },
      {
        id: "d3-dinner",
        time: "19:00",
        type: "meal",
        title: "Dinner: Chinooks Waterfront",
        detail: "Or Resurrect Art Coffee House for something casual.",
        mapsQuery: "Chinooks Waterfront Seward",
      },
      {
        id: "d3-prep",
        time: "20:30",
        type: "note",
        title: "Bonine night-dose · Charge everything · Pack daypack",
        detail:
          "Take Bonine NOW for tomorrow's cruise. Pack: rain shell, fleece, warm hat, gloves, sunglasses, sunscreen, water, snacks, full camera batteries.",
      },
      { id: "d3-sleep", time: "21:30", type: "sleep", title: "Sleep · Alarms 06:30" },
    ],
  },

  {
    index: 4,
    label: "Day 4",
    date: "Mon Jun 29",
    dateISO: "2026-06-29",
    theme: "★ KENAI FJORDS 8.5-HR CRUISE",
    overnight: "Seward (2 of 2)",
    sunrise: "04:31",
    sunset: "23:35",
    weather:
      "On the outer coast, 4–6 ft swells possible. 45–50°F with wind chill on deck. Sit mid-ship if seasickness-prone.",
    events: [
      { id: "d4-wake", time: "06:30", type: "wake", title: "Wake · Bonine AM dose" },
      {
        id: "d4-breakfast",
        time: "07:00",
        type: "meal",
        title: "Light breakfast (avoid greasy)",
        detail: "Coffee + dry toast. They serve a deli lunch onboard — don't overeat.",
      },
      {
        id: "d4-checkin",
        time: "07:30",
        duration: "30 min",
        type: "checkin",
        title: "Cruise check-in at Harbor 360 dock",
        detail:
          "Bring printed/digital booking confirmation, photo IDs, layers, binoculars (provided but yours are better).",
        phone: "+19072747300",
        mapsQuery: "Major Marine Tours Seward",
      },
      {
        id: "d4-depart",
        time: "08:30",
        duration: "8.5 hrs",
        type: "highlight",
        title: "Northwestern Fjord cruise",
        detail:
          "Resurrection Bay → Chiswell Islands (sea lions + puffins) → Cape Resurrection → Harris Bay → Northwestern Fjord. Three tidewater glaciers. Peak humpback season. Orcas common. Lunch served on board. Captain narrates the whole way.",
        stopIndex: 10,
        bookingId: "kenai-fjords-cruise",
        planB:
          "Major Marine cancel rate <10%. If cancelled: full refund + push to a half-day tour same week (limited slots).",
      },
      {
        id: "d4-return",
        time: "17:00",
        type: "transit",
        title: "Return to Seward",
        detail: "Off the boat. Bathroom, water, breathe still air.",
      },
      {
        id: "d4-dinner",
        time: "18:30",
        type: "meal",
        title: "Dinner near the harbor",
        detail: "Whichever you skipped last night. Or grab pizza + collapse.",
      },
      {
        id: "d4-sleep",
        time: "21:00",
        type: "sleep",
        title: "Early bed",
        detail: "You've been on a moving boat for 9 hours. Your body wants horizontal.",
      },
    ],
  },

  {
    index: 5,
    label: "Day 5",
    date: "Tue Jun 30",
    dateISO: "2026-06-30",
    theme: "Seward → Talkeetna (drop-off in ANC)",
    overnight: "Talkeetna (1 of 2)",
    sunrise: "04:32",
    sunset: "23:34",
    weather:
      "Likely clear inland — Talkeetna sits in a drier rain shadow. 60s by afternoon.",
    driveMiles: 250,
    driveTime: "5 hrs",
    events: [
      { id: "d5-wake", time: "08:00", type: "wake", title: "Wake · Pack out of Seward" },
      { id: "d5-breakfast", time: "08:30", type: "meal", title: "Breakfast + check out" },
      {
        id: "d5-depart-seward",
        time: "09:00",
        type: "drive",
        title: "Depart Seward — Seward Hwy north",
        detail:
          "National Scenic Byway. Second pass at Turnagain Arm in different light. Tide bores possible mid-morning.",
      },
      {
        id: "d5-anc-dropoff",
        time: "11:30",
        duration: "30 min",
        type: "transit",
        title: "Anchorage friend drop-off",
        detail:
          "Friend leaving Jul 2 gets dropped at their ANC hotel here. They get Jul 1 solo (Museum + Heritage Center + Flattop).",
        stopIndex: 12,
      },
      {
        id: "d5-lunch",
        time: "12:30",
        type: "meal",
        title: "Lunch in Anchorage",
        detail:
          "Snow City Cafe (downtown), Moose's Tooth (Midtown), or grab-and-go at New Sagaya City Market.",
        mapsQuery: "Snow City Cafe Anchorage",
      },
      {
        id: "d5-depart-anc",
        time: "13:30",
        type: "drive",
        title: "Depart ANC north on Parks Hwy",
        detail: "Gas in Wasilla. Cell service holds until Willow.",
      },
      {
        id: "d5-arrive-tal",
        time: "16:00",
        type: "checkin",
        title: "Arrive Talkeetna · Check in (2 properties)",
        detail:
          "Split across Talkeetna Denali View Lodge (Trapper's Cabin, #99713 — off Spur Rd Mile 3, day-of Dawn 907-351-5830) and Liberty Farms (Bunk Suite, #6307). Confirm who's where + that all 6 have a bed.",
        stopIndex: 13,
        phone: "+19077334111",
      },
      {
        id: "d5-tat-checkin",
        time: "16:30",
        duration: "15 min",
        type: "checkin",
        title: "K2 Aviation — confirm tomorrow's 8:30 flight",
        detail:
          "Conf 353115058. Confirm the AM slot; if skies are clear on arrival, ask about a bonus standby flight this afternoon.",
        phone: "+18007642291",
        mapsQuery: "K2 Aviation Talkeetna",
      },
      {
        id: "d5-roadhouse",
        time: "17:30",
        duration: "30 min",
        type: "activity",
        title: "Talkeetna Roadhouse (cinnamon rolls)",
        detail: "Famous. Get one for breakfast tomorrow too.",
        mapsQuery: "Talkeetna Roadhouse",
      },
      {
        id: "d5-dinner",
        time: "19:30",
        type: "meal",
        title: "Dinner: Denali Brewing or Roadhouse",
      },
      {
        id: "d5-stroll",
        time: "20:30",
        type: "activity",
        title: "River overlook + Nagley's General Store",
        detail: "Confluence of three rivers. Sunset still 3 hrs away.",
      },
      { id: "d5-sleep", time: "22:00", type: "sleep", title: "Sleep · Alarms 07:00" },
    ],
  },

  {
    index: 6,
    label: "Day 6",
    date: "Wed Jul 1",
    dateISO: "2026-07-01",
    theme: "★ FLIGHTSEEING + GLACIER LANDING",
    overnight: "Talkeetna (2 of 2)",
    sunrise: "04:33",
    sunset: "23:33",
    weather:
      "Mornings clearest before afternoon convection — your 8:30 AM slot is the smart pick. K2 calls if weather forces a change.",
    events: [
      { id: "d6-wake", time: "06:45", type: "wake", title: "Wake" },
      { id: "d6-breakfast", time: "07:10", type: "meal", title: "Breakfast (Roadhouse rolls)" },
      {
        id: "d6-drive-k2",
        time: "07:40",
        type: "drive",
        title: "Drive to K2 Aviation",
        detail: "14052 E 2nd St (Talkeetna airport), ~15–20 min from the lodge.",
        mapsQuery: "K2 Aviation Talkeetna",
      },
      {
        id: "d6-tat-status",
        time: "08:00",
        duration: "30 min",
        type: "checkin",
        title: "Check in at K2 · weigh-in · briefing",
        detail:
          "Conf 353115058. Check in 30 min before. They verify weights and fit glacier overboots. Headsets provided. NPS fee covered by the Jul 3 bus.",
        phone: "+18007642291",
        mapsQuery: "K2 Aviation Talkeetna",
      },
      {
        id: "d6-flight",
        time: "08:30",
        duration: "1 hr 45 min",
        type: "highlight",
        title: "Denali Flyer + Glacier Landing (K2)",
        detail:
          "8:30–10:15 AM. Fly through the Alaska Range — Denali's south + west faces, Ruth Glacier, Great Gorge. Set foot on the glacier in Denali NP. 6 adults across 2 planes.",
        stopIndex: 14,
        bookingId: "tat-flightseeing",
        planB:
          "Weather: K2 lets you reschedule, take an alternate flight, or full-refund. Natural retries: this afternoon, or Jul 2 AM before the Denali drive.",
      },
      {
        id: "d6-lunch",
        time: "11:30",
        type: "meal",
        title: "Lunch in Talkeetna",
        detail: "You'll be hungry — the flight burns more than you'd think.",
      },
      {
        id: "d6-flex",
        time: "13:00",
        duration: "4 hrs",
        type: "flex",
        title: "Talkeetna afternoon (pick 1–2)",
        detail:
          "Historical Society Museum ($5, 1 hr — mountaineering history). River confluence walk. Denali State Park Mile 135 viewpoint (30 min south, worth it on a clear day). Denali Brewing taproom.",
      },
      {
        id: "d6-dinner",
        time: "18:00",
        type: "meal",
        title: "Dinner in Talkeetna",
      },
      {
        id: "d6-tub",
        time: "20:00",
        duration: "1 hr",
        type: "activity",
        title: "Hot tub at the cabin",
        detail: "If the VRBO has one. Earned.",
      },
      { id: "d6-sleep", time: "22:00", type: "sleep", title: "Sleep" },
    ],
  },

  {
    index: 7,
    label: "Day 7",
    date: "Thu Jul 2",
    dateISO: "2026-07-02",
    theme: "Talkeetna → Denali",
    overnight: "Denali (1 of 2)",
    sunrise: "04:36",
    sunset: "23:31",
    weather:
      "Interior. Drier. 65–75°F afternoons. Mosquitoes biting hard once you're past Cantwell — DEET out.",
    driveMiles: 150,
    driveTime: "2.5 hrs",
    events: [
      { id: "d7-wake", time: "09:00", type: "wake", title: "Wake · Pack out of Talkeetna" },
      {
        id: "d7-flight-retry",
        time: "09:30",
        type: "flex",
        title: "Flightseeing rain-check (only if Jul 1 scrubbed)",
        detail: "If yesterday's K2 flight got weather-cancelled and they offer a morning window, take it before driving. Otherwise head out.",
        phone: "+18007642291",
      },

      {
        id: "d7-depart-tal",
        time: "10:30",
        type: "drive",
        title: "Depart Talkeetna north on Parks Hwy",
      },
      {
        id: "d7-mile135",
        time: "11:30",
        duration: "20 min",
        type: "activity",
        title: "Mile 135 — Denali State Park viewpoint",
        detail:
          "If the mountain is out (~30% of days), best roadside view in the state. If clouded, skip.",
        stopIndex: 15,
        mapsQuery: "Denali View South Mile 135",
      },
      {
        id: "d7-cantwell",
        time: "12:45",
        type: "meal",
        title: "Lunch in Cantwell",
        detail: "Last gas before Denali. 50-mile run to the park entrance from here.",
      },
      {
        id: "d7-arrive-denali",
        time: "13:30",
        type: "checkin",
        title: "Arrive Denali · Check in at Denali RV Park & Motel",
        detail:
          "Mile 245.1 Parks Hwy, Healy (booked as two 1-night stays, Jul 2 + Jul 3). Check-in 3–8 PM.",
        stopIndex: 16,
        mapsQuery: "Denali RV Park and Motel Healy",
      },
      {
        id: "d7-visitor-center",
        time: "14:30",
        duration: "45 min",
        type: "activity",
        title: "Denali Visitor Center · Park film",
        detail: "20-min film is genuinely good. Pick up the park newspaper at the desk.",
        mapsQuery: "Denali Visitor Center",
      },
      {
        id: "d7-horseshoe",
        time: "15:30",
        duration: "1.5 hrs",
        type: "activity",
        title: "Horseshoe Lake Trail",
        detail: "Easy 2-mi loop. Old-growth spruce, beaver lodge. Trailhead near the visitor center.",
        mapsQuery: "Horseshoe Lake Trail Denali",
      },
      {
        id: "d7-prep",
        time: "18:00",
        type: "note",
        title: "Pack tomorrow's lunch · Charge everything · Alarms 05:00",
        detail:
          "Sandwiches, snacks, full water bottles, layers, binoculars, sunscreen, DEET, camera with full battery, lens cleaning cloth.",
      },
      { id: "d7-dinner", time: "18:30", type: "meal", title: "Dinner" },
      { id: "d7-sleep", time: "21:00", type: "sleep", title: "Sleep early · Alarms 05:00" },
    ],
  },

  {
    index: 8,
    label: "Day 8",
    date: "Fri Jul 3",
    dateISO: "2026-07-03",
    theme: "★ TRANSIT BUS · MILE 43",
    overnight: "Denali (2 of 2)",
    sunrise: "04:38",
    sunset: "23:29",
    weather:
      "Cool AM (45°F), warming to 65°F by midday. Wind on ridgelines. Always pack rain shell.",
    events: [
      {
        id: "d8-wake",
        time: "07:30",
        type: "wake",
        title: "Wake — no 5 AM today",
        detail: "Bus departs 9:30 AM — no pre-dawn start. Relaxed morning.",
      },
      {
        id: "d8-coffee",
        time: "08:00",
        type: "meal",
        title: "Breakfast + pack the daypack",
        detail: "Packed lunch, snacks, full water, layers, binoculars, DEET, camera. Eat well — limited food in the park.",
      },
      {
        id: "d8-drive-depot",
        time: "09:00",
        type: "drive",
        title: "Drive to Denali Bus Depot (Mile 1)",
        detail: "Arrive by 9:10 — check in 20 min before departure to collect tickets and pay the $15 NPS entry. No overnight parking; use Riley Creek.",
        mapsQuery: "Denali Bus Depot",
      },
      {
        id: "d8-bus",
        time: "09:30",
        duration: "~6–7 hrs",
        type: "highlight",
        title: "East Fork Transit Bus → Mile 43",
        detail:
          "Conf 3EY7SH. Departure is 9:30 AM sharp. Murie Cabin (Mile 43) is the deepest you can go in 2026 (Pretty Rocks landslide). Buses stop for wildlife — grizzlies, caribou, Dall sheep, moose. Hop off at Igloo Canyon (Mile 34) for an off-trail tundra walk and flag the next bus back.",
        stopIndex: 17,
        mapsQuery: "Denali Bus Depot",
        phone: "+18006221297",
        bookingId: "transit-bus",
        planB:
          "Bus cancel rate <5%; runs rain or shine. Smoking/alcohol not permitted on board.",
      },
      {
        id: "d8-return",
        time: "16:00",
        type: "transit",
        title: "Return to park entrance",
        detail: "Back early-mid afternoon (~4 PM). Bathroom, refill water.",
      },
      {
        id: "d8-sled-dogs",
        time: "16:30",
        duration: "30 min",
        type: "flex",
        title: "Sled Dog Demonstration (if a later demo runs)",
        detail:
          "The free 2 PM demo at park HQ likely won't be catchable with a 9:30 bus — check the day's demo times at the visitor center, or do it tomorrow morning (Day 9) before driving out.",
        mapsQuery: "Denali Sled Dog Kennels",
      },
      {
        id: "d8-late-lunch",
        time: "16:15",
        type: "meal",
        title: "Late snack / early dinner",
      },
      {
        id: "d8-savage",
        time: "16:00",
        duration: "1 hr",
        type: "flex",
        title: "Savage River Loop (optional)",
        detail: "2 mi easy. Great valley views. Skip if exhausted.",
        mapsQuery: "Savage River Loop Trail Denali",
      },
      { id: "d8-dinner", time: "18:30", type: "meal", title: "Dinner in Healy / park entrance area" },
      { id: "d8-sleep", time: "21:30", type: "sleep", title: "Sleep" },
    ],
  },

  {
    index: 9,
    label: "Day 9",
    date: "Sat Jul 4",
    dateISO: "2026-07-04",
    theme: "Denali → ANC via Hatcher Pass",
    overnight: "Anchorage (final)",
    sunrise: "04:41",
    sunset: "23:27",
    weather:
      "Hatcher Pass at 3,500 ft — could be 15°F cooler than ANC. Wildflowers peaking.",
    driveMiles: 280,
    driveTime: "6 hrs (with Hatcher Pass)",
    events: [
      { id: "d9-wake", time: "08:00", type: "wake", title: "Wake · Pack" },
      {
        id: "d9-am-hike",
        time: "09:00",
        duration: "2.5 hrs",
        type: "flex",
        title: "Morning option: Savage Alpine Trail",
        detail:
          "4 mi out-and-back, moderate, above treeline. Best morning hike near the entrance. Or sleep in.",
        mapsQuery: "Savage Alpine Trail Denali",
      },
      {
        id: "d9-depart",
        time: "11:30",
        type: "drive",
        title: "Depart Denali south on Parks Hwy",
        detail: "Gas in Healy or Cantwell on the way out.",
      },
      {
        id: "d9-willow",
        time: "14:00",
        type: "drive",
        title: "Willow turnoff → Hatcher Pass",
        detail: "Mile 71. Watch for the Hatcher Pass Rd sign. Road is paved to the mine.",
      },
      {
        id: "d9-mine",
        time: "14:45",
        duration: "1 hr",
        type: "activity",
        title: "Independence Mine SHP · Hatcher Pass",
        detail:
          "Gold-rush ruins at 3,500 ft. Alpine meadows + wildflowers peaking. $5 parking. Walk the ruins loop.",
        stopIndex: 19,
        mapsQuery: "Independence Mine State Historical Park",
      },
      {
        id: "d9-resume",
        time: "16:00",
        type: "drive",
        title: "Resume drive to ANC",
      },
      {
        id: "d9-arrive-anc",
        time: "17:00",
        type: "checkin",
        title: "Arrive Anchorage · Check in",
        stopIndex: 20,
      },
      {
        id: "d9-evening",
        time: "17:30",
        duration: "2.5 hrs",
        type: "flex",
        title: "Evening — pick 1",
        detail:
          "(a) Alaska Native Heritage Center ($25, closes 5 PM — only works if you arrive before then). (b) Flattop Mountain (3.3 mi, 1,300 ft — doable until 22:00 in July light). (c) July 4th festivities at Delaney Park. (d) Skip it all, have a long dinner.",
        mapsQuery: "Flattop Mountain Trailhead Anchorage",
      },
      {
        id: "d9-dinner",
        time: "20:00",
        type: "meal",
        title: "Dinner: Moose's Tooth Brewing",
        detail:
          "If arriving after 7 PM expect a 45-min wait. Backup: Simon & Seafort's (upscale, Cook Inlet views).",
        mapsQuery: "Moose's Tooth Pub Anchorage",
      },
      { id: "d9-sleep", time: "23:00", type: "sleep", title: "Sleep" },
    ],
  },

  {
    index: 10,
    label: "Day 10",
    date: "Sun Jul 5",
    dateISO: "2026-07-05",
    theme: "Anchorage flex → Depart",
    overnight: "Red-eye home",
    sunrise: "04:43",
    sunset: "23:25",
    weather: "ANC mild. 65°F.",
    events: [
      { id: "d10-wake", time: "09:00", type: "wake", title: "Wake — last morning" },
      {
        id: "d10-brunch",
        time: "10:00",
        type: "meal",
        title: "Brunch at Snow City Cafe",
        detail: "Weekend wait can hit 45 min. Worth it.",
        mapsQuery: "Snow City Cafe Anchorage",
      },
      {
        id: "d10-museum",
        time: "11:30",
        duration: "2.5 hrs",
        type: "activity",
        title: "Anchorage Museum",
        detail:
          "Alaska Native art, Smithsonian Arctic Studies, Alaska history + science. The best museum in the state. Skip nothing else for this.",
        mapsQuery: "Anchorage Museum",
      },
      {
        id: "d10-coastal",
        time: "14:30",
        duration: "2 hrs",
        type: "flex",
        title: "Coastal Trail by bike (alt: Earthquake Park)",
        detail:
          "Pablo's Bicycle Rentals downtown. 11 mi paved, moose sightings. Or just walk Earthquake Park (free, 30 min).",
        mapsQuery: "Pablo's Bicycle Rentals Anchorage",
      },
      {
        id: "d10-pack",
        time: "17:00",
        type: "note",
        title: "Pack · Last shower · Change of clothes in carry-on",
        detail:
          "Carry-on: toothbrush, change of clothes, charger. You arrive SFO Monday morning and may go straight to work.",
      },
      {
        id: "d10-dinner",
        time: "18:00",
        type: "meal",
        title: "Early dinner",
        detail: "Don't risk being hungry on a red-eye with no food service.",
      },
      {
        id: "d10-return-car",
        time: "20:00",
        type: "checkin",
        title: "Return rental car at ANC",
        detail: "Allow 30 min for return + shuttle if off-site.",
      },
      {
        id: "d10-airport",
        time: "21:00",
        type: "checkin",
        title: "ANC airport · Security",
      },
      {
        id: "d10-flight",
        time: "23:33",
        type: "transit",
        title: "Alaska 1563 · ANC → LAX → SFO",
        detail: "Arrive SFO 08:39 Mon Jul 6.",
      },
    ],
  },
];
