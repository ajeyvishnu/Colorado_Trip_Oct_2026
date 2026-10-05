// ---- Data model -----------------------------------------------------
// Each stop: { id, name, time, locationName, locationLink, isExploring, activityType }
// time: rough placeholder label ("Morning"/"Afternoon"/"All day") - swap for exact times later.
// locationLink: placeholder for now ("" or "#") - drop in real Google Maps links later.
// isExploring: places worth rating (sights, hikes, towns) vs. logistics/lodging/events.
// activityType: "hike" (on foot, a real trail/walk), "drive" (scenic drive, no
//   stop), "bike" (a bike ride), "none" (no icon), or "driveStop" (drive
//   there, get out, look around) - the default for most sights.

const ACTIVITY_ICONS = { hike: "🥾", drive: "🚗", driveStop: "🚗🥾", bike: "🚲", none: "" };

function stop(id, name, time, locationName, locationLink, isExploring = true, allTrailsLink = "", activityType = "driveStop") {
  return { id, name, time, locationName: locationName || "", locationLink: locationLink || "", isExploring, allTrailsLink, activityType };
}

const AIRBNB_1_LINK = "https://maps.app.goo.gl/3of7ebzTx19yzbJr7"; // 7170 Tobin Rd, Colorado Springs (Oct 20-21 nights)
const AIRBNB_2_LINK = "https://maps.app.goo.gl/GcRNsqC7xPatrLVg6"; // YMCA of the Rockies, Estes Park (Oct 22-24 nights)
const VENUE_LINK = "https://maps.app.goo.gl/dFZP9qc2jay65Xtp7"; // Black Forest Meadows

const COLORADO_DAYS = [
  {
    id: "oct20",
    date: "2026-10-20",
    label: "Tue, Oct 20",
    title: "Day 0: Arrival Day",
    stay: { name: "Airbnb - 7170 Tobin Rd, Colorado Springs", link: AIRBNB_1_LINK },
    nextDayWake: "Wake by 7:30 AM",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("oct20-landing", "Landing (Ajay, Rahul)", "3:00 PM", "Denver Airport", "", false),
          stop("oct20-rental-car", "Take a Rental car", "Afternoon", "Denver Airport", "", false),
          stop("oct20-explore-boulder", "Explore Boulder & Denver Downtown", "Afternoon", "Boulder", "https://maps.app.goo.gl/Tyw95BGp8J3rWYYf8"),
          stop("oct20-return-airbnb-1", "Return to Airbnb (Ajay & Rahul)", "Evening", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct20-2nd-car", "Rent the other 2 cars", "11:30 PM", "Denver Airport", "", false),
          stop("oct20-return-airbnb", "Rest of the gang to Airbnb", "Late Night", "Airbnb", AIRBNB_1_LINK, false)
        ]
      }
    ]
  },
  {
    id: "oct21",
    date: "2026-10-21",
    label: "Wed, Oct 21",
    title: "Day 1: Wedding Day",
    stay: { name: "Airbnb - 7170 Tobin Rd, Colorado Springs", link: AIRBNB_1_LINK },
    nextDayWake: "Wake by 7:00 AM",
    sections: [
      {
        label: "Haldi",
        split: false,
        activities: [
          stop("oct21-haldi-ready", "Ready by 9:30 AM", "9:30 AM", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct21-haldi", "Haldi", "11:30 AM", "Venue", VENUE_LINK, false),
          stop("oct21-haldi-outfit-change", "Outfit change", "Midday", "Airbnb", AIRBNB_1_LINK, false)
        ]
      },
      {
        label: "Wedding",
        split: false,
        activities: [
          stop("oct21-wedding-ready", "Ready by 1:30 PM", "1:30 PM", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct21-wedding", "Wedding", "3:00 PM", "Venue", VENUE_LINK, false),
          stop("oct21-wedding-outfit-change", "Outfit change", "Afternoon", "Airbnb", AIRBNB_1_LINK, false)
        ]
      },
      {
        label: "Reception",
        split: false,
        activities: [
          stop("oct21-reception-ready", "Ready by 4:45 PM", "4:45 PM", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct21-reception", "Reception", "6:00 PM", "Venue", VENUE_LINK, false),
          stop("oct21-reception-drive-airbnb", "Drive to Airbnb", "Night", "Airbnb", AIRBNB_1_LINK, false)
        ]
      }
    ]
  },
  {
    id: "oct22",
    date: "2026-10-22",
    label: "Thu, Oct 22",
    title: {
      byGroup: {
        hikers: "Day 2: Pikes Peak & Manitou Springs",
        casual: "Day 2: Aspen & Maroon Bells"
      }
    },
    stay: {
      byGroup: {
        hikers: { name: "Tonight: YMCA of the Rockies, Estes Park", link: AIRBNB_2_LINK },
        casual: { name: "Tonight: Glenwood Springs", link: "https://maps.app.goo.gl/FJT6QpqEMndiCcYa9" }
      }
    },
    nextDayWake: "Hikers wake by 3:45 AM · Casual wake by 7:15 AM",
    sections: [
      {
        label: "",
        split: true,
        hikers: [
          stop("oct22-start-day", "Leave Airbnb, start the day", "8:00 AM", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct22-pikes-peak", "Pikes Peak", "10:15 AM", "Pikes Peak", "https://maps.app.goo.gl/JzDto3tDcCocqqPm6"),
          stop("oct22-manitou-springs", "Manitou Springs (Lunch)", "1:00 PM", "Manitou Springs", "https://maps.app.goo.gl/Fk17Ky97cXtn4KHGA"),
          stop("oct22-manitou-mineral-walk", "Manitou Mineral Spring Walk", "2:00 PM", "Manitou Springs", "https://maps.app.goo.gl/Fk17Ky97cXtn4KHGA", true, "", "hike"),
          stop("oct22-manitou-cliff-dwellings", "Manitou Cliff Dwellings", "3:30 PM", "Manitou Cliff Dwellings", "https://maps.app.goo.gl/FiMuiAf8QskcvVre9"),
          stop("oct22-garden-of-gods", "Garden of the Gods", "4:30 PM", "Garden of the Gods", "https://maps.app.goo.gl/8HSc3iTex7KmHmYx7"),
          stop("oct22-drive-estes", "Drive to Estes Park", "5:15 PM", "Estes Park", "https://maps.app.goo.gl/KByAYrgDgfoPtFGG6", false),
          stop("oct22-mountain-shop-rent", "Estes Park Mountain Shop (Rent gear for tomorrow's hike, Closes 8 PM)", "7:00 PM", "Estes Park Mountain Shop", "https://maps.app.goo.gl/qfCoaTQHuodc1oHGA", false),
          stop("oct22-arrive-airbnb", "Arrive at Airbnb (YMCA of the Rockies)", "7:30 PM", "YMCA of the Rockies", AIRBNB_2_LINK, false)
        ],
        casual: [
          stop("oct22-maroon-start-day", "Leave Airbnb, start the day (~4.5hr scenic drive)", "8:00 AM", "Airbnb", AIRBNB_1_LINK, false),
          stop("oct22-maroon-aspen", "Aspen", "12:15 PM", "Aspen", "https://maps.app.goo.gl/hV3nEjAbYpDbnv4Q8"),
          stop("oct22-maroon-bells", "Maroon Bells", "1:15 PM", "Maroon Bells", "https://maps.app.goo.gl/oyjVpfD8FofDoySV7"),
          stop("oct22-maroon-glenwood", "Glenwood Springs (staying overnight)", "5:00 PM", "Glenwood Springs", "https://maps.app.goo.gl/FJT6QpqEMndiCcYa9", false)
        ]
      }
    ]
  },
  {
    id: "oct23",
    date: "2026-10-23",
    label: "Fri, Oct 23",
    title: "Day 3: Chasm Lake Hike or Casual Loop",
    stay: { name: "YMCA of the Rockies, Estes Park", link: AIRBNB_2_LINK },
    nextDayWake: "Wake by 7:00 AM",
    sections: [
      {
        label: "",
        split: true,
        hikers: [
          stop("oct24-hikers-start-day", "Leave Airbnb, start the day", "5:00 AM", "Airbnb", AIRBNB_2_LINK, false),
          stop("oct24-hikers-chasm-lake", "Chasm Lake hike", "5:30 AM", "Chasm Lake Trailhead", "https://maps.app.goo.gl/mh9U4Ms78ngKqVHR9", true, "https://www.alltrails.com/trail/us/colorado/chasm-lake?p=-1&sh=bx29ua&utm_medium=trail_share&utm_source=alltrails_virality", "hike"),
          stop("oct24-hikers-lunch", "Lunch", "12:30 PM", "", "", false)
        ],
        casual: [
          stop("oct24-casual-start-day", "Leave Airbnb, start the day", "8:30 AM", "Airbnb", AIRBNB_2_LINK, false),
          stop("oct24-casual-alluvial-fan", "Alluvial Fan", "9:00 AM", "Alluvial Fan", "https://maps.app.goo.gl/9nqcwJ1WXaJkHJb4A"),
          stop("oct24-casual-horseshoe-park", "Horseshoe Park", "9:55 AM", "Horseshoe Park", "https://maps.app.goo.gl/nKG9vtoVquJSYofz6"),
          stop("oct24-casual-lily-lake", "Lily Lake", "11:10 AM", "Lily Lake", "https://maps.app.goo.gl/oFmrvamhYbkjEv9a7"),
          stop("oct24-casual-lunch", "Lunch", "12:30 PM", "", "", false)
        ]
      },
      {
        label: "",
        split: false,
        activities: [
          stop("oct24-devils-gulch-road", "Drive through Devils Gulch Road", "2:00 PM", "Devils Gulch Road", "", true, "", "drive"),
          stop("oct24-glen-haven", "Visit Glen Haven", "2:15 PM", "Glen Haven", "https://maps.app.goo.gl/e7Q4ws9XbaPB8qrd8"),
          stop("oct24-mustang-coaster", "Mustang Mountain Coaster", "3:00 PM", "Mustang Mountain Coaster", "https://maps.app.goo.gl/s6h77Fh76uReS7hc9", true, "", "none"),
          stop("oct24-explore-estes", "Explore Estes Park Town", "3:30 PM", "Estes Park", "https://maps.app.goo.gl/KByAYrgDgfoPtFGG6"),
          stop("oct24-back-airbnb", "Back to Airbnb", "7:00 PM", "Airbnb", AIRBNB_2_LINK, false)
        ]
      }
    ]
  },
  {
    id: "oct24",
    date: "2026-10-24",
    label: "Sat, Oct 24",
    title: "Day 4: Rocky Mountain NP & Trail Ridge Road",
    stay: { name: "YMCA of the Rockies, Estes Park", link: AIRBNB_2_LINK },
    nextDayWake: "Wake by 5:30 AM",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("oct23-start-day", "Leave Airbnb, start the day", "8:00 AM", "Airbnb", AIRBNB_2_LINK, false),
          stop("oct23-beaver-meadows-vc", "Beaver Meadows Visitor Center", "8:15 AM", "Beaver Meadows Visitor Center", "https://maps.app.goo.gl/ggdNA88GvpvA6ZBo9", true, "", "none"),
          stop("oct23-sprague-lake", "Sprague Lake", "8:55 AM", "Sprague Lake", "https://maps.app.goo.gl/8DmmvoWUeDumeNoKA"),
          stop("oct23-moraine-discovery", "Moraine Park Discovery Center", "10:10 AM", "Moraine Park Discovery Center", "https://maps.app.goo.gl/1Vx295rv6fMjhfaUA", true, "", "none"),
          stop("oct23-moraine-views", "Moraine Park Views", "11:00 AM", "Moraine Park", "https://maps.app.goo.gl/T63yMKbeHpLMkYzR6"),
          stop("oct23-alpine-visitor-center", "Trail Ridge Road Drive / Drinks in Estes Park", "12:30 PM", "Alpine Visitor Center", "https://maps.app.goo.gl/exYEPaG3ML6cArCa7", true, "", "drive"),
          stop("oct23-alluvial-fan", "Alluvial Fan", "2:30 PM", "Alluvial Fan", "https://maps.app.goo.gl/9nqcwJ1WXaJkHJb4A"),
          stop("oct23-horseshoe-park", "Horseshoe Park", "3:00 PM", "Horseshoe Park", "https://maps.app.goo.gl/nKG9vtoVquJSYofz6"),
          stop("oct23-lily-lake", "Lily Lake", "3:30 PM", "Lily Lake", "https://maps.app.goo.gl/oFmrvamhYbkjEv9a7"),
          stop("oct23-mountain-shop", "Back to Estes Park Mountain Shop (Closes 8 PM)", "6:00 PM", "Estes Park Mountain Shop", "https://maps.app.goo.gl/qfCoaTQHuodc1oHGA", false),
          stop("oct23-bike-lake-estes", "Bike ride at Lake Estes", "6:15 PM", "Lake Estes", "https://maps.app.goo.gl/qfCoaTQHuodc1oHGA", true, "", "bike")
        ]
      }
    ]
  },
  {
    id: "oct25",
    date: "2026-10-25",
    label: "Sun, Oct 25",
    title: "Day 5: Bear Lake Trail, then Home",
    stay: { name: "YMCA of the Rockies, Estes Park", link: AIRBNB_2_LINK },
    sections: [
      {
        label: "",
        split: true,
        shared: [
          stop("oct25-start-day", "Leave Airbnb, start the day", "6:45 AM", "Airbnb", AIRBNB_2_LINK, false),
          stop("oct25-bear-nymph-lake", "Bear Lake → Nymph Lake (hike together)", "7:15 AM", "Bear Lake Trailhead", "https://maps.app.goo.gl/TyWiM3g2LLiyNL549", true, "https://www.alltrails.com/explore/map/custom-route-bear-lake-loop-4b4a37f?p=-1&sh=bx29ua&utm_medium=map_share&utm_source=alltrails_virality", "hike")
        ],
        hikers: [
          stop("oct25-hikers-dream-emerald-haiyaha", "Dream Lake → Emerald Lake → Lake Haiyaha (continue hike)", "8:15 AM", "Lake Haiyaha", "", true, "https://www.alltrails.com/explore/map/custom-route-54e9b59?p=-1&sh=bx29ua&utm_medium=map_share&utm_source=alltrails_virality", "hike"),
          stop("oct25-hikers-lunch", "Lunch (back near Bear Lake Trailhead)", "12:00 PM", "Bear Lake Trailhead", "", false),
          stop("oct25-hikers-drive-airport", "Drive to Denver Airport", "12:45 PM", "Denver Airport", "", false),
          stop("oct25-hikers-car-return", "Car Return", "2:30 PM", "Denver Airport", "", false)
        ],
        casual: [
          stop("oct25-casual-boulder-denver", "Explore Boulder & Denver Downtown", "8:15 AM", "Boulder", "https://maps.app.goo.gl/Tyw95BGp8J3rWYYf8"),
          stop("oct25-casual-drive-airport", "Drive to Denver Airport", "1:15 PM", "Denver Airport", "", false),
          stop("oct25-casual-car-return", "Car Return", "2:00 PM", "Denver Airport", "", false)
        ]
      }
    ]
  }
];

const SHEN_STAY_LINK = "https://maps.app.goo.gl/pQ26o39G4NoSg4rP8"; // 250 Conicville Blvd, Mount Jackson, VA 22842
const SHEN_OLD_RAG_PARKING_LINK = "https://maps.app.goo.gl/DELreLbHtx47722M9";
const SHEN_OLD_RAG_ALLTRAILS = "https://www.alltrails.com/trail/us/virginia/old-rag-mountain-loop-trail?p=-1&sh=bx29ua&utm_medium=trail_share&utm_source=alltrails_virality";
const SHEN_TUNNEL_PARKING_LINK = "https://maps.app.goo.gl/B4g54ttFpaHncmRP7";
const SHEN_PASS_MOUNTAIN_LINK = "https://maps.app.goo.gl/oUWKM7iqhJ4EKKBFA";
const SHEN_HOGBACK_LINK = "https://maps.app.goo.gl/f4T7v5EdRPUXdcKA9";
const SHEN_SIGNAL_KNOB_LINK = "https://maps.app.goo.gl/WoMpwf46Xvg8kKKZ9";
const SHEN_DICKEY_RIDGE_LINK = "https://maps.app.goo.gl/ryaKrsa1v7PnHej9A";

const SHENANDOAH_DAYS = [
  {
    id: "shen-oct3",
    date: "2026-10-03",
    label: "Sat, Oct 3",
    title: "Day 1: Skyline Drive",
    stay: { name: "Stay", link: SHEN_STAY_LINK },
    nextDayWake: "Wake by 4:30 AM",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("shen-oct3-leave-philly", "Leave Philadelphia", "7:00 AM", "Home", "", false),
          stop("shen-oct3-lunch", "Lunch in Front Royal", "12:00 PM", "Front Royal", "", false),
          stop("shen-oct3-dickey-ridge", "Dickey Ridge Visitor Center (passport stamp)", "1:00 PM", "Dickey Ridge Visitor Center", SHEN_DICKEY_RIDGE_LINK),
          stop("shen-oct3-signal-knob", "Signal Knob Overlook", "1:35 PM", "Signal Knob Overlook", SHEN_SIGNAL_KNOB_LINK),
          stop("shen-oct3-hogback", "Hogback Overlook", "2:10 PM", "Hogback Overlook", SHEN_HOGBACK_LINK),
          stop("shen-oct3-pass-mountain", "Pass Mountain Overlook", "3:00 PM", "Pass Mountain Overlook", SHEN_PASS_MOUNTAIN_LINK),
          stop("shen-oct3-tunnel-parking", "Tunnel Parking Overlook", "3:20 PM", "Tunnel Parking Overlook", SHEN_TUNNEL_PARKING_LINK),
          stop("shen-oct3-arrive", "Arrive at Stay", "5:30 PM", "Stay", SHEN_STAY_LINK, false)
        ]
      }
    ]
  },
  {
    id: "shen-oct4",
    date: "2026-10-04",
    label: "Sun, Oct 4",
    title: "Day 2: Old Rag Mountain",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("shen-oct4-breakfast", "Wake up & breakfast", "4:30 AM", "Stay", SHEN_STAY_LINK, false),
          stop("shen-oct4-leave", "Check out & leave Mount Jackson", "5:00 AM", "Stay", SHEN_STAY_LINK, false),
          stop("shen-oct4-parking", "Arrive at Old Rag parking", "6:20 AM", "Old Rag Mountain Parking", SHEN_OLD_RAG_PARKING_LINK, false),
          stop("shen-oct4-old-rag-hike", "Old Rag Circuit hike", "7:00 AM", "Old Rag Mountain Trailhead", SHEN_OLD_RAG_PARKING_LINK, true, SHEN_OLD_RAG_ALLTRAILS, "hike"),
          stop("shen-oct4-summit", "Summit (food, photos, rest)", "10:30 AM", "Old Rag Summit", "", true, "", "hike"),
          stop("shen-oct4-leave-for-philly", "Leave for Philadelphia (~5hr drive)", "3:30 PM", "Home", "", false)
        ]
      }
    ]
  }
];

const TRIPS = [
  {
    id: "colorado",
    name: "Colorado Trip",
    subtitle: "Oct 20-25, 2026",
    tripStart: "2026-10-20T00:00:00",
    tripEnd: "2026-10-25T23:59:59",
    days: COLORADO_DAYS
  },
  {
    id: "shenandoah",
    name: "Shenandoah Trip",
    subtitle: "Oct 3-4, 2026",
    tripStart: "2026-10-03T00:00:00",
    tripEnd: "2026-10-04T23:59:59",
    days: SHENANDOAH_DAYS
  }
];

// ---- State ------------------------------------------------------------

const STORAGE_KEY_COMPLETED = "coTrip.completedStops";
const STORAGE_KEY_GROUP = "coTrip.group";
const STORAGE_KEY_DAY_COMPLETE = "coTrip.completedDays";
const STORAGE_KEY_THEME = "coTrip.theme";
const STORAGE_KEY_RATINGS = "coTrip.ratings";
const STORAGE_KEY_TRIP = "coTrip.selectedTrip";

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLETED);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(set) {
  localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify([...set]));
}

function loadCompletedDays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DAY_COMPLETE);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompletedDays(set) {
  localStorage.setItem(STORAGE_KEY_DAY_COMPLETE, JSON.stringify([...set]));
}

function loadGroup() {
  const raw = localStorage.getItem(STORAGE_KEY_GROUP);
  return raw === "casual" ? "casual" : "hikers";
}

function saveGroup(group) {
  localStorage.setItem(STORAGE_KEY_GROUP, group);
}

function loadTheme() {
  const stored = localStorage.getItem(STORAGE_KEY_THEME);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY_THEME, theme);
}

function loadRatings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATINGS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRatings(ratings) {
  localStorage.setItem(STORAGE_KEY_RATINGS, JSON.stringify(ratings));
}

function loadSelectedTrip() {
  const raw = localStorage.getItem(STORAGE_KEY_TRIP);
  return TRIPS.some(t => t.id === raw) ? raw : TRIPS[0].id;
}

function saveSelectedTrip(tripId) {
  localStorage.setItem(STORAGE_KEY_TRIP, tripId);
}

function getCurrentTrip() {
  return TRIPS.find(t => t.id === currentTripId) || TRIPS[0];
}

let completedStops = loadCompleted();
let completedDays = loadCompletedDays();
let currentGroup = loadGroup();
let currentTheme = loadTheme();
let ratings = loadRatings();
let currentTripId = loadSelectedTrip();
applyTheme(currentTheme);

function isTripLive() {
  const trip = getCurrentTrip();
  const now = new Date();
  return now >= new Date(trip.tripStart) && now <= new Date(trip.tripEnd);
}

function todayDayId() {
  if (!isTripLive()) return null;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  const day = getCurrentTrip().days.find(dd => {
    const dt = new Date(dd.date + "T00:00:00");
    return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d;
  });
  return day ? day.id : null;
}

// ---- Rendering ----------------------------------------------------------

function el(tag, className, attrs) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

const STAR_PATH = "M12 2 L14.9 8.6 L22 9.3 L16.7 14.1 L18.2 21 L12 17.3 L5.8 21 L7.3 14.1 L2 9.3 L9.1 8.6 Z";

function makeStarSvg(cls) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  if (cls) svg.setAttribute("class", cls);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", STAR_PATH);
  svg.appendChild(path);
  return svg;
}

// A row of 5 independent stars - each one is either fully filled or fully
// empty, decided per-star (rating is a whole number 0-5). No overlapping
// layers or width-clipping, so there's nothing that can misalign.
function renderStarRow(rating, opts) {
  opts = opts || {};
  const starSize = opts.size || 16;
  const row = el("span", "star-row" + (opts.interactive ? " star-row-interactive" : ""), {
    style: `width:${starSize * 5}px;height:${starSize}px;`
  });

  for (let i = 1; i <= 5; i++) {
    row.appendChild(makeStarSvg(i <= rating ? "star-fg-icon" : "star-bg-icon"));
  }

  if (opts.interactive) {
    for (let i = 1; i <= 5; i++) {
      const hit = el("button", "star-hit", {
        type: "button",
        style: `left:${(i - 1) * 20}%;width:20%;`,
        "aria-label": `Rate ${i} out of 5`
      });
      hit.addEventListener("click", () => opts.onPick(i));
      row.appendChild(hit);
    }
  }

  return row;
}

// Compact preview badge shown on exploring stops.
function renderRatingGauge(stopId, name) {
  const info = ratings[stopId] || {};
  const val = info.rating || 0;
  const btn = el("button", "rating-gauge" + (val ? "" : " is-unrated"), {
    type: "button",
    "aria-label": val ? `Rated ${val} of 5. Tap to change.` : "Rate this place"
  });
  btn.appendChild(renderStarRow(val, { size: 14 }));
  if (val) {
    const label = el("span", "rating-gauge-value");
    label.textContent = val;
    btn.appendChild(label);
  }
  btn.addEventListener("click", ev => {
    ev.stopPropagation();
    openRatingModal(stopId, name);
  });
  return btn;
}

function renderStop(stopData) {
  const li = el("li", "stop");
  li.dataset.stopId = stopData.id;
  const done = completedStops.has(stopData.id);
  if (done) li.classList.add("is-done");

  const track = el("div", "stop-track");
  const lineTop = el("span", "track-line track-line-top");
  const check = el("span", "stop-check");
  check.textContent = "✓";
  const lineBottom = el("span", "track-line track-line-bottom");
  track.appendChild(lineTop);
  track.appendChild(check);
  track.appendChild(lineBottom);
  li.appendChild(track);

  const body = el("div", "stop-body");

  const name = el("p", "stop-name");
  if (stopData.isExploring) {
    const iconText = stopData.activityType in ACTIVITY_ICONS ? ACTIVITY_ICONS[stopData.activityType] : ACTIVITY_ICONS.driveStop;
    if (iconText) {
      const icon = el("span", "stop-activity-icon", { "aria-hidden": "true" });
      icon.textContent = iconText;
      name.appendChild(icon);
    }
  }
  name.appendChild(document.createTextNode(stopData.name));
  body.appendChild(name);

  const meta = el("div", "stop-meta");

  const time = el("span", "stop-time");
  time.textContent = stopData.time;
  meta.appendChild(time);

  const loc = el("span", "stop-location" + (stopData.locationLink ? "" : " is-placeholder"));
  if (stopData.locationLink) {
    const a = el("a", null, { href: stopData.locationLink, target: "_blank", rel: "noopener noreferrer" });
    a.textContent = stopData.locationName || "Map";
    a.addEventListener("click", ev => {
      ev.stopPropagation();
      // Installed PWAs (standalone mode) often ignore target="_blank" and
      // navigate the app itself away from the itinerary, so force a real
      // new-window open, which reliably hands off to Maps / the browser.
      ev.preventDefault();
      window.open(stopData.locationLink, "_blank", "noopener,noreferrer");
    });
    loc.appendChild(a);
  } else {
    loc.textContent = stopData.locationName || "Location TBD";
  }
  meta.appendChild(loc);

  if (stopData.allTrailsLink) {
    const at = el("span", "stop-alltrails");
    const a = el("a", null, { href: stopData.allTrailsLink, target: "_blank", rel: "noopener noreferrer" });
    a.textContent = "AllTrails";
    a.addEventListener("click", ev => {
      ev.stopPropagation();
      ev.preventDefault();
      window.open(stopData.allTrailsLink, "_blank", "noopener,noreferrer");
    });
    at.appendChild(a);
    meta.appendChild(at);
  }

  body.appendChild(meta);
  li.appendChild(body);

  if (stopData.isExploring) {
    li.appendChild(renderRatingGauge(stopData.id, stopData.name));
  }

  li.addEventListener("click", () => toggleStop(stopData.id));

  return li;
}

function renderGroupToggleEl() {
  const wrap = el("div", "group-toggle day-group-toggle", { role: "group", "aria-label": "Group view" });
  const hikersBtn = el("button", "group-btn", { type: "button", "data-group": "hikers" });
  hikersBtn.textContent = "Hikers";
  const casualBtn = el("button", "group-btn", { type: "button", "data-group": "casual" });
  casualBtn.textContent = "Casual";
  wrap.appendChild(hikersBtn);
  wrap.appendChild(casualBtn);
  return wrap;
}

function renderStopList(stops) {
  const ul = el("ul", "stop-list");
  stops.forEach(s => ul.appendChild(renderStop(s)));
  return ul;
}

function renderDay(day, todayId) {
  const section = el("section", "day", { id: day.id });
  if (day.id === todayId) section.classList.add("is-today");

  const header = el("div", "day-header");
  const titleWrap = el("div");
  const h2 = el("h2", "day-title");
  h2.textContent = day.title && day.title.byGroup ? day.title.byGroup[currentGroup] : day.title;
  if (day.id === todayId) {
    const pill = el("span", "today-pill");
    pill.textContent = "Today";
    h2.appendChild(pill);
  }
  titleWrap.appendChild(h2);
  const dateLine = el("p", "day-label");
  dateLine.textContent = day.label;
  titleWrap.appendChild(dateLine);
  header.appendChild(titleWrap);
  section.appendChild(header);

  const stay = day.stay && day.stay.byGroup ? day.stay.byGroup[currentGroup] : day.stay;
  if (stay) {
    const stayRow = el("div", "day-stay");
    const stayIcon = el("span", "day-stay-icon");
    stayIcon.textContent = "⌂";
    stayRow.appendChild(stayIcon);
    if (stay.link) {
      const a = el("a", null, { href: stay.link, target: "_blank", rel: "noopener noreferrer" });
      a.textContent = stay.name;
      a.addEventListener("click", ev => {
        ev.stopPropagation();
        ev.preventDefault();
        window.open(stay.link, "_blank", "noopener,noreferrer");
      });
      stayRow.appendChild(a);
    } else {
      const span = el("span");
      span.textContent = stay.name;
      stayRow.appendChild(span);
    }
    section.appendChild(stayRow);
  }

  const hasSplit = day.sections.some(sec => sec.split);
  if (hasSplit) {
    section.appendChild(renderGroupToggleEl());
  }

  day.sections.forEach(sec => {
    if (sec.label) {
      const secLabel = el("p", "section-label");
      secLabel.textContent = sec.label;
      section.appendChild(secLabel);
    }

    if (sec.split) {
      const note = el("div", "split-note");
      note.textContent = `Split: showing ${currentGroup === "hikers" ? "Hikers" : "Casual"} path`;
      section.appendChild(note);

      if (sec.shared && sec.shared.length) {
        section.appendChild(renderStopList(sec.shared));
      }
      const pathStops = currentGroup === "hikers" ? sec.hikers : sec.casual;
      section.appendChild(renderStopList(pathStops));
    } else {
      section.appendChild(renderStopList(sec.activities));
    }
  });

  // whole-day complete toggle
  const row = el("div", "day-complete-row");
  const label = el("span", "day-complete-label");
  label.textContent = "Mark whole day";
  row.appendChild(label);
  const btn = el("button", "day-complete-btn", { type: "button" });
  const dayDone = completedDays.has(day.id);
  if (dayDone) btn.classList.add("is-done");
  btn.textContent = dayDone ? "Day complete" : "Mark day complete";
  btn.addEventListener("click", () => toggleDayComplete(day.id));
  row.appendChild(btn);
  section.appendChild(row);

  if (day.nextDayWake) {
    const wakeRow = el("div", "day-wake-row");
    const wakeIcon = el("span", "day-wake-icon");
    wakeIcon.textContent = "⏰";
    wakeRow.appendChild(wakeIcon);
    const wakeText = el("span");
    wakeText.textContent = day.nextDayWake;
    wakeRow.appendChild(wakeText);
    section.appendChild(wakeRow);
  }

  return section;
}

function allStopIdsForDay(day) {
  const ids = [];
  day.sections.forEach(sec => {
    if (sec.split) {
      if (sec.shared) sec.shared.forEach(s => ids.push(s.id));
      sec.hikers.forEach(s => ids.push(s.id));
      sec.casual.forEach(s => ids.push(s.id));
    } else {
      sec.activities.forEach(s => ids.push(s.id));
    }
  });
  return ids;
}

function toggleStop(stopId) {
  if (completedStops.has(stopId)) {
    completedStops.delete(stopId);
  } else {
    completedStops.add(stopId);
  }
  saveCompleted(completedStops);
  renderAll();
}

function toggleDayComplete(dayId) {
  const day = getCurrentTrip().days.find(d => d.id === dayId);
  const ids = allStopIdsForDay(day);
  const nowDone = !completedDays.has(dayId);

  if (nowDone) {
    completedDays.add(dayId);
    ids.forEach(id => completedStops.add(id));
  } else {
    completedDays.delete(dayId);
    ids.forEach(id => completedStops.delete(id));
  }
  saveCompletedDays(completedDays);
  saveCompleted(completedStops);
  renderAll();
}

function renderDateTabs(todayId) {
  const nav = document.getElementById("dateTabs");
  nav.innerHTML = "";
  getCurrentTrip().days.forEach(day => {
    const btn = el("button", "date-tab", { type: "button", "data-day-id": day.id, "aria-label": day.label });
    btn.textContent = String(Number(day.date.split("-")[2]));
    if (day.id === todayId) {
      btn.classList.add("is-today");
      const dot = el("span", "today-dot");
      btn.appendChild(dot);
    }
    btn.addEventListener("click", () => {
      document.getElementById(day.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(day.id);
    });
    nav.appendChild(btn);
  });
}

function setActiveTab(dayId) {
  document.querySelectorAll(".date-tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.dayId === dayId);
  });
}

function renderGroupToggle() {
  document.querySelectorAll(".group-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.group === currentGroup);
  });
}

function renderThemeToggle() {
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.themeChoice === currentTheme);
  });
}

function renderTripSelect() {
  const trip = getCurrentTrip();
  document.getElementById("appTitle").textContent = trip.name;
  document.getElementById("appSubtitle").textContent = trip.subtitle;
  document.querySelectorAll(".trip-select-option").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.tripId === trip.id);
  });
}

function renderAll() {
  const todayId = todayDayId();
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";
  getCurrentTrip().days.forEach(day => daysContainer.appendChild(renderDay(day, todayId)));
  renderDateTabs(todayId);
  renderGroupToggle();
  renderThemeToggle();
  renderTripSelect();
  if (todayId) setActiveTab(todayId);
}

// ---- Rating modal ---------------------------------------------------------

let modalStopId = null;
let modalSelectedRating = 0;

function openRatingModal(stopId, name) {
  modalStopId = stopId;
  const info = ratings[stopId] || {};
  modalSelectedRating = info.rating || 0;
  document.getElementById("ratingModalTitle").textContent = name;
  document.getElementById("ratingModalComment").value = info.comment || "";
  renderModalStars();
  document.getElementById("ratingModalOverlay").classList.add("is-open");
}

function closeRatingModal() {
  document.getElementById("ratingModalOverlay").classList.remove("is-open");
  modalStopId = null;
}

function renderModalStars() {
  const starsWrap = document.getElementById("ratingModalStars");
  starsWrap.innerHTML = "";
  starsWrap.appendChild(renderStarRow(modalSelectedRating, {
    size: 32,
    interactive: true,
    onPick: val => {
      modalSelectedRating = val;
      renderModalStars();
    }
  }));
  document.getElementById("ratingModalValue").textContent =
    modalSelectedRating ? `${modalSelectedRating} / 5` : "Not rated yet";
}

function saveModalRating() {
  if (!modalStopId) return;
  const comment = document.getElementById("ratingModalComment").value.trim();
  if (modalSelectedRating || comment) {
    ratings[modalStopId] = { rating: modalSelectedRating || null, comment };
  } else {
    delete ratings[modalStopId];
  }
  saveRatings(ratings);
  closeRatingModal();
  renderAll();
}

document.getElementById("ratingModalClose").addEventListener("click", closeRatingModal);
document.getElementById("ratingModalOverlay").addEventListener("click", ev => {
  if (ev.target.id === "ratingModalOverlay") closeRatingModal();
});
document.getElementById("ratingModalClear").addEventListener("click", () => {
  modalSelectedRating = 0;
  renderModalStars();
});
document.getElementById("ratingModalSave").addEventListener("click", saveModalRating);
document.addEventListener("keydown", ev => {
  if (ev.key === "Escape") closeRatingModal();
});

// ---- Events -------------------------------------------------------------

document.getElementById("days").addEventListener("click", ev => {
  const btn = ev.target.closest(".group-btn");
  if (!btn) return;
  currentGroup = btn.dataset.group;
  saveGroup(currentGroup);
  renderAll();
});

document.getElementById("themeToggle").addEventListener("click", ev => {
  const btn = ev.target.closest(".theme-btn");
  if (!btn) return;
  currentTheme = btn.dataset.themeChoice;
  applyTheme(currentTheme);
  saveTheme(currentTheme);
  renderThemeToggle();
});

document.getElementById("tripSelectTrigger").addEventListener("click", ev => {
  ev.stopPropagation();
  const wrap = document.getElementById("tripSelectWrap");
  const willOpen = !wrap.classList.contains("is-open");
  wrap.classList.toggle("is-open", willOpen);
  document.getElementById("tripSelectTrigger").setAttribute("aria-expanded", String(willOpen));
});

document.getElementById("tripSelectMenu").addEventListener("click", ev => {
  const btn = ev.target.closest(".trip-select-option");
  if (!btn) return;
  currentTripId = btn.dataset.tripId;
  saveSelectedTrip(currentTripId);
  document.getElementById("tripSelectWrap").classList.remove("is-open");
  document.getElementById("tripSelectTrigger").setAttribute("aria-expanded", "false");
  renderAll();
});

document.addEventListener("click", ev => {
  const wrap = document.getElementById("tripSelectWrap");
  if (wrap.classList.contains("is-open") && !wrap.contains(ev.target)) {
    wrap.classList.remove("is-open");
    document.getElementById("tripSelectTrigger").setAttribute("aria-expanded", "false");
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all progress? This clears completed stops and days on this device.")) return;
  completedStops = new Set();
  completedDays = new Set();
  saveCompleted(completedStops);
  saveCompletedDays(completedDays);
  renderAll();
});

// ---- Init -----------------------------------------------------------------

renderAll();

if (isTripLive()) {
  const todayId = todayDayId();
  if (todayId) {
    setTimeout(() => {
      document.getElementById(todayId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
