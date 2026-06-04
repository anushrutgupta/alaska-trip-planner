export type TravelMode = "fly" | "drive" | "bus" | "boat";

export interface Stop {
  index: number;
  label: string;
  lat: number;
  lng: number;
  day: string;
  date: string;
  mode: TravelMode;
  distance: string;
  region: string;
  description: string;
  highlight?: boolean;
}

export const STOPS: Stop[] = [
  {
    index: 0,
    label: "ANC Airport",
    lat: 61.174,
    lng: -149.996,
    day: "Night 0",
    date: "Thu Jun 25",
    mode: "fly",
    distance: "",
    region: "Anchorage",
    description:
      "Land 11:41 PM. Pick up the Budget Ford Expedition Max at the counter (open until 1:45 AM). Drive ~10 min to Glacier Chalet — a 3BR A-Frame Airbnb at 2815 Glacier St (host Amara). Self check-in via keypad.",
  },
  {
    index: 1,
    label: "Fred Meyer (Groceries)",
    lat: 61.21,
    lng: -149.82,
    day: "Day 1",
    date: "Fri Jun 26",
    mode: "drive",
    distance: "5 mi",
    region: "Anchorage",
    description:
      "8:30 AM wake. 9:30 AM at Fred Meyer (Northern Lights Blvd). Sandwich supplies, snacks, water, granola bars for the whole trip — you'll burn through these on bus days and long drives. Depart ANC south ~10:30 AM.",
  },
  {
    index: 2,
    label: "Turnagain Arm",
    lat: 61.0,
    lng: -149.6,
    day: "Day 1",
    date: "Fri Jun 26",
    mode: "drive",
    distance: "40 mi · 45 min",
    region: "Kenai Peninsula",
    description:
      "Beluga Point (Mile 110) and Bird Point (Mile 96) overlooks on the Seward Highway. Dall sheep on the cliffs above, occasionally beluga whales in the water. 10–15 min at each pullout.",
  },
  {
    index: 3,
    label: "AWCC (Portage)",
    lat: 60.82,
    lng: -148.98,
    day: "Day 1",
    date: "Fri Jun 26",
    mode: "drive",
    distance: "20 mi",
    region: "Kenai Peninsula",
    description:
      "Alaska Wildlife Conservation Center at Mile 79. Rescued brown bears, black bears, moose, muskox, wood bison, porcupine. $15/pp, 45 min. Zero detour — right on the highway. Great guaranteed-close-up wildlife photos early in the trip.",
  },
  {
    index: 4,
    label: "Soldotna",
    lat: 60.49,
    lng: -151.06,
    day: "Day 1",
    date: "Fri Jun 26",
    mode: "drive",
    distance: "100 mi · 2 hrs",
    region: "Kenai Peninsula",
    description:
      "Gas & stretch on the Sterling Hwy. The road parallels the Kenai River — fishermen everywhere. Don't linger.",
  },
  {
    index: 5,
    label: "Homer",
    lat: 59.643,
    lng: -151.548,
    day: "Day 1",
    date: "Fri Jun 26",
    mode: "drive",
    distance: "75 mi · 1.5 hrs",
    region: "Homer",
    description:
      "Arrive ~4 PM. End of the road. Walk the 4.5-mile Homer Spit — fishing charters, shops, Salty Dawg Saloon (must-visit dive bar in a lighthouse-shaped cabin), Kachemak Bay views, glaciers + volcanoes across the water. Dinner on the Spit: Captain Pattie's, La Baleine, or Fat Olives. Watch for Destination Alaska's text/WhatsApp with tomorrow's tide-dependent bear-flight check-in time (meet at Beluga Lake Office, 1184 Lakeshore Dr). Sleep Homer (1 of 2).",
  },
  {
    index: 6,
    label: "Lake Clark NP",
    lat: 59.96,
    lng: -152.82,
    day: "Day 2",
    date: "Sat Jun 27",
    mode: "fly",
    distance: "~1 hr flight",
    region: "Lake Clark",
    description:
      "Destination Alaska / Northwind (conf 349623320), ~8 AM (tide-dependent). Bush plane across Cook Inlet — Redoubt, Iliamna, glaciers, coastline. Beach landing at Chinitna Bay or Silver Salmon Creek. 3 hrs walking among coastal brown bears on tidal flats with pilot/guide. Late June = clamming, sedge grazing, mating-season behavior, sows with cubs. Within 50–125 ft of bears. No platforms, no fences. ~$970/pp (6 booked).",
    highlight: true,
  },
  {
    index: 7,
    label: "Homer (evening)",
    lat: 59.643,
    lng: -151.548,
    day: "Day 2",
    date: "Sat Jun 27",
    mode: "fly",
    distance: "return flight",
    region: "Homer",
    description:
      "Back in Homer ~1 PM. Lunch at the Spit. PM options: Pratt Museum ($12, 1 hr — natural history, tide pool touch tank), Bishops Beach walk below the bluffs, Homer Brewing Company taproom. Or just decompress — you walked among grizzlies this morning. Sleep Homer (2 of 2). Buffer day if bears weather-cancelled.",
  },
  {
    index: 8,
    label: "Exit Glacier",
    lat: 60.19,
    lng: -149.63,
    day: "Day 3",
    date: "Sun Jun 28",
    mode: "drive",
    distance: "182 mi · 3.5 hrs from Homer",
    region: "Seward",
    description:
      "Depart Homer ~10 AM via Sterling Hwy. Kenai Mountains, river valley, moose country. Gas in Soldotna. Arrive Seward ~2 PM, head straight to Exit Glacier (12 mi from town). Overlook Loop Trail: 2.2 mi moderate, 1.5–2 hrs. Views of Exit Glacier and the edge of the Harding Icefield. Free.",
  },
  {
    index: 9,
    label: "Seward",
    lat: 60.104,
    lng: -149.442,
    day: "Day 3",
    date: "Sun Jun 28",
    mode: "drive",
    distance: "12 mi back",
    region: "Seward",
    description:
      "Back to town. Walk the harbor — fishing boats, sea otters, mountain backdrop. Check in at Marina Motel (1603 Seward Hwy). Note tomorrow's cruise checks in separately at the Harbor 360 dock (1412 4th Ave). Dinner: Chinooks Waterfront (seafood) or Resurrect Art Coffee House. Sleep Seward (1 of 2).",
  },
  {
    index: 10,
    label: "Kenai Fjords Cruise",
    lat: 59.8,
    lng: -149.65,
    day: "Day 4",
    date: "Mon Jun 29",
    mode: "boat",
    distance: "~100 mi by sea",
    region: "Kenai Fjords",
    description:
      "Major Marine Tours 8.5-hr Northwestern Fjord on the Viewfinder (max 36 pax). Check-in 7:30 AM, depart 8:30 AM, return 5 PM. Resurrection Bay → Chiswell Islands → Cape Resurrection → Harris Bay → Northwestern Fjord. Three tidewater glaciers (Northwestern, Anchor, Ogive) — watch for calving. Peak humpback season (~80% sighting rate), orcas, harbor seals on ice, sea lions, puffins. Light breakfast + deli lunch included. $309/pp. Bonine the night before AND morning of. Wind shell + fleece + warm hat mandatory.",
    highlight: true,
  },
  {
    index: 11,
    label: "Seward (evening)",
    lat: 60.104,
    lng: -149.442,
    day: "Day 4",
    date: "Mon Jun 29",
    mode: "boat",
    distance: "return",
    region: "Seward",
    description:
      "Return 5 PM. Waterfront walk, dinner, early bed — you've been on a boat all day. Sleep Seward (2 of 2).",
  },
  {
    index: 12,
    label: "Anchorage (pass-through)",
    lat: 61.218,
    lng: -149.9,
    day: "Day 5",
    date: "Tue Jun 30",
    mode: "drive",
    distance: "125 mi · 2.5 hrs",
    region: "Anchorage",
    description:
      "Depart Seward ~9 AM. Drive Seward Hwy north — National Scenic Byway, second pass at Turnagain Arm in different light. Pass through ANC ~noon: lunch + gas + any city errands (last big grocery/pharmacy before Talkeetna/Denali). All 6 continue north through the Jul 1 flightseeing; Abhinav (his own car) drives himself back to ANC on Jul 2.",
  },
  {
    index: 13,
    label: "Talkeetna",
    lat: 62.321,
    lng: -150.107,
    day: "Day 5",
    date: "Tue Jun 30",
    mode: "drive",
    distance: "113 mi · 2.5 hrs",
    region: "Talkeetna",
    description:
      "Arrive 3–4 PM. Mountain town at the base of Denali. Confirm tomorrow's 8:30 AM K2 flight; if skies look clear, ask about a PM standby — bonus attempt. Walk downtown: Roadhouse cinnamon rolls, Denali Brewing taproom, Nagley's General Store, river overlook. Sleep Talkeetna (1 of 2) — split across Talkeetna Denali View Lodge (Trapper's Cabin) + Liberty Farms (Bunk Suite).",
  },
  {
    index: 14,
    label: "Ruth Glacier",
    lat: 63.07,
    lng: -150.7,
    day: "Day 6",
    date: "Wed Jul 1",
    mode: "fly",
    distance: "~45 min · 1h 45m total",
    region: "Alaska Range",
    description:
      "K2 Aviation Denali Flyer + Glacier Landing (conf 353115058), 8:30–10:15 AM. AM = best weather odds. Fly through the Alaska Range — Denali's south and west faces, Ruth Glacier, Great Gorge (deepest in North America), Kahiltna Glacier. Land in the Don Sheldon Amphitheater. $580/pp; 6 adults across 2 planes. NPS fee covered by the Jul 3 transit bus. Back in Talkeetna — sleep there (2 of 2). PM options: Talkeetna Historical Society Museum, river confluence walk, Denali State Park viewpoint, Denali Brewing.",
    highlight: true,
  },
  {
    index: 15,
    label: "Denali State Park Viewpoint",
    lat: 62.73,
    lng: -150.0,
    day: "Day 7",
    date: "Thu Jul 2",
    mode: "drive",
    distance: "en route, Mile 135",
    region: "Denali",
    description:
      "Depart Talkeetna AM (one final flightseeing retry if still pending). Mile 135 viewpoint en route. If the mountain is out (only ~30% of days) this is one of the best roadside views of Denali. Worth the short pullout on a clear day.",
  },
  {
    index: 16,
    label: "Denali NP Entrance",
    lat: 63.73,
    lng: -148.9,
    day: "Day 7",
    date: "Thu Jul 2",
    mode: "drive",
    distance: "150 mi · 2.5 hrs",
    region: "Denali",
    description:
      "Arrive ~1 PM. Check in at Denali RV Park & Motel (Mile 245.1 Parks Hwy, Healy). PM: Visitor Center + park film (20 min), Horseshoe Lake Trail (easy 2 mi loop, beaver lodge), or drive to Mile 15 (Savage River — farthest you can take your own car). Pack tomorrow's lunch + layers; the transit bus departs a relaxed 9:30 AM. Sleep Denali (1 of 2).",
  },
  {
    index: 17,
    label: "Denali Mile 43 (East Fork)",
    lat: 63.53,
    lng: -149.7,
    day: "Day 8",
    date: "Fri Jul 3",
    mode: "bus",
    distance: "43 mi · ~7 hrs RT",
    region: "Denali",
    description:
      "East Fork Transit Bus departs 9:30 AM (conf 3EY7SH) — arrive the Denali Bus Depot by 9:10. Mile 43 (Murie Cabin) is the deepest visitors can go in 2026 — Pretty Rocks landslide closed the road past this point. Expect grizzlies foraging on tundra, caribou herds, Dall sheep on ridgelines, moose in willows. Hop off at Igloo Canyon (Mile 34) for a tundra hike — no trails, just walk across open tundra and flag the next bus. $33.50/pp.",
    highlight: true,
  },
  {
    index: 18,
    label: "Denali NP (night 2)",
    lat: 63.73,
    lng: -148.9,
    day: "Day 8",
    date: "Fri Jul 3",
    mode: "bus",
    distance: "return",
    region: "Denali",
    description:
      "Return ~2 PM. 2 PM Sled Dog Demo at park HQ (free, ~30 min — only sled dog team in the NPS). PM: Savage River Loop (2 mi easy, great valley views) if energy permits, or rest at the cabin. Sleep Denali (2 of 2).",
  },
  {
    index: 19,
    label: "Hatcher Pass",
    lat: 61.79,
    lng: -149.28,
    day: "Day 9",
    date: "Sat Jul 4",
    mode: "drive",
    distance: "~180 mi · adds 1.5 hrs",
    region: "Mat-Su",
    description:
      "Depart Denali ~11 AM. Turn off Parks Hwy at Willow (Mile 71). Independence Mine State Historical Park — gold-rush ruins at 3,500 ft surrounded by alpine meadows. Early July = wildflowers peaking. Road paved to the mine. Free to walk around (parking $5). One of the most beautiful drives in Alaska.",
  },
  {
    index: 20,
    label: "Anchorage",
    lat: 61.218,
    lng: -149.9,
    day: "Day 9",
    date: "Sat Jul 4",
    mode: "drive",
    distance: "60 mi",
    region: "Anchorage",
    description:
      "Arrive ~5 PM. Options: Alaska Native Heritage Center ($25/pp, closes 5 PM — check hours), Flattop Mountain hike (3.3 mi RT, 1,300 ft, doable until 10 PM in July light), July 4th festivities at Delaney Park, or just dinner at Moose's Tooth (before 5 PM or 45-min wait). Sleep ANC (final night).",
  },
  {
    index: 21,
    label: "ANC → Home",
    lat: 61.174,
    lng: -149.996,
    day: "Day 10",
    date: "Sun Jul 5",
    mode: "drive",
    distance: "local",
    region: "Anchorage",
    description:
      "Buffer day. Pick 2–3: Anchorage Museum ($20/pp, 2–3 hrs — best museum in the state), Tony Knowles Coastal Trail by bike (Pablo's downtown, 11 mi), Earthquake Park (free, 30 min), brunch at Snow City Cafe, last-minute souvenir shopping. Or rest. Return rental ~8 PM. Alaska 1563 11:33 PM → LAX → SFO, arrive 8:39 AM Mon Jul 6. Change of clothes + toothbrush in carry-on.",
  },
];
