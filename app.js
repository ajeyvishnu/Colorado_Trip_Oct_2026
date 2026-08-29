// ---- Data model -----------------------------------------------------
// Each stop: { id, name, time, locationName, locationLink }
// time: rough placeholder label ("Morning"/"Afternoon"/"All day") - swap for exact times later.
// locationLink: placeholder for now ("" or "#") - drop in real Google Maps links later.

function stop(id, name, time, locationName, locationLink) {
  return { id, name, time, locationName: locationName || "", locationLink: locationLink || "" };
}

const TRIP_DAYS = [
  {
    id: "oct20",
    date: "2026-10-20",
    label: "Tue, Oct 20",
    title: "Day 0: Arrival Day",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("oct20-landing", "Landing (Ajay, Rahul)", "3:00 PM", "Denver Airport", ""),
          stop("oct20-rental-car", "Take a Rental car", "Afternoon", "Denver Airport", ""),
          stop("oct20-explore-boulder", "Explore Boulder", "Afternoon", "Boulder", "https://maps.app.goo.gl/Tyw95BGp8J3rWYYf8"),
          stop("oct20-drive-airbnb", "Drive to Airbnb", "Evening", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct20-pickup-gang", "Pick up the gang", "11:30 PM", "Denver Airport", ""),
          stop("oct20-2nd-car", "Take the 2nd car", "Late Night", "Denver Airport", ""),
          stop("oct20-return-airbnb", "Return to Airbnb", "Late Night", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16")
        ]
      }
    ]
  },
  {
    id: "oct21",
    date: "2026-10-21",
    label: "Wed, Oct 21",
    title: "Day 1: Wedding Day",
    sections: [
      {
        label: "Haldi",
        split: false,
        activities: [
          stop("oct21-haldi", "Haldi", "Morning", "Venue", "https://maps.app.goo.gl/7H2eSvn9tnEezfoE9"),
          stop("oct21-haldi-outfit-change", "Outfit change", "Morning", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16")
        ]
      },
      {
        label: "Wedding",
        split: false,
        activities: [
          stop("oct21-wedding", "Wedding", "Afternoon", "Venue", "https://maps.app.goo.gl/7H2eSvn9tnEezfoE9"),
          stop("oct21-wedding-outfit-change", "Outfit change", "Afternoon", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16")
        ]
      },
      {
        label: "Reception",
        split: false,
        activities: [
          stop("oct21-reception", "Reception", "Evening", "Venue", "https://maps.app.goo.gl/7H2eSvn9tnEezfoE9"),
          stop("oct21-reception-drive-airbnb", "Drive to Airbnb", "Night", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16")
        ]
      }
    ]
  },
  {
    id: "oct22",
    date: "2026-10-22",
    label: "Thu, Oct 22",
    title: "Day 2: Pikes Peak & Garden of the Gods",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("oct22-start-day", "Leave Airbnb, start the day", "8:00 AM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct22-pikes-peak", "Pikes Peak", "10:15 AM", "Pikes Peak", "https://maps.app.goo.gl/JzDto3tDcCocqqPm6"),
          stop("oct22-manitou-springs", "Manitou Springs (Lunch)", "1:00 PM", "Manitou Springs", "https://maps.app.goo.gl/Fk17Ky97cXtn4KHGA"),
          stop("oct22-garden-of-gods", "Garden of the Gods", "2:45 PM", "Garden of the Gods", "https://maps.app.goo.gl/8HSc3iTex7KmHmYx7"),
          stop("oct22-drive-estes", "Drive to Estes Park", "5:00 PM", "Estes Park", "https://maps.app.goo.gl/KByAYrgDgfoPtFGG6")
        ]
      }
    ]
  },
  {
    id: "oct23",
    date: "2026-10-23",
    label: "Fri, Oct 23",
    title: "Day 3: Rocky Mountain NP & Trail Ridge Road",
    sections: [
      {
        label: "",
        split: false,
        activities: [
          stop("oct23-start-day", "Leave Airbnb, start the day", "8:00 AM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct23-beaver-meadows-vc", "Beaver Meadows Visitor Center", "8:15 AM", "Beaver Meadows Visitor Center", "https://maps.app.goo.gl/ggdNA88GvpvA6ZBo9"),
          stop("oct23-sprague-lake", "Sprague Lake", "8:55 AM", "Sprague Lake", "https://maps.app.goo.gl/8DmmvoWUeDumeNoKA"),
          stop("oct23-moraine-discovery", "Moraine Park Discovery Center", "10:10 AM", "Moraine Park Discovery Center", "https://maps.app.goo.gl/1Vx295rv6fMjhfaUA"),
          stop("oct23-moraine-views", "Moraine Park Views", "11:00 AM", "Moraine Park", "https://maps.app.goo.gl/T63yMKbeHpLMkYzR6"),
          stop("oct23-alpine-visitor-center", "Trail Ridge Road: Alpine Visitor Center (Lunch, ~2hr15min)", "12:30 PM", "Alpine Visitor Center", "https://maps.app.goo.gl/exYEPaG3ML6cArCa7"),
          stop("oct23-holzwarth", "Trail Ridge Road: Holzwarth Historic Site (if time permits & roads open)", "2:45 PM", "Holzwarth Historic Site", "https://maps.app.goo.gl/gXnVXRgE3KQ8h6qm8"),
          stop("oct23-mountain-shop", "Back to Estes Park Mountain Shop (Closes 8 PM)", "6:00 PM", "Estes Park Mountain Shop", "https://maps.app.goo.gl/qfCoaTQHuodc1oHGA"),
          stop("oct23-bike-lake-estes", "Bike ride at Lake Estes", "6:15 PM", "Lake Estes", "https://maps.app.goo.gl/qfCoaTQHuodc1oHGA")
        ]
      }
    ]
  },
  {
    id: "oct24",
    date: "2026-10-24",
    label: "Sat, Oct 24",
    title: "Day 4: Chasm Lake Hike or Casual Loop",
    sections: [
      {
        label: "",
        split: true,
        hikers: [
          stop("oct24-hikers-start-day", "Leave Airbnb, start the day", "5:00 AM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct24-hikers-chasm-lake", "Chasm Lake hike", "5:30 AM", "Chasm Lake Trailhead", "https://maps.app.goo.gl/mh9U4Ms78ngKqVHR9"),
          stop("oct24-hikers-lunch", "Lunch", "12:30 PM", "", "")
        ],
        casual: [
          stop("oct24-casual-start-day", "Leave Airbnb, start the day", "8:30 AM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct24-casual-alluvial-fan", "Alluvial Fan", "9:00 AM", "Alluvial Fan", "https://maps.app.goo.gl/9nqcwJ1WXaJkHJb4A"),
          stop("oct24-casual-horseshoe-park", "Horseshoe Park", "9:55 AM", "Horseshoe Park", "https://maps.app.goo.gl/nKG9vtoVquJSYofz6"),
          stop("oct24-casual-lily-lake", "Lily Lake", "11:10 AM", "Lily Lake", "https://maps.app.goo.gl/oFmrvamhYbkjEv9a7"),
          stop("oct24-casual-lunch", "Lunch", "12:30 PM", "", "")
        ]
      },
      {
        label: "",
        split: false,
        activities: [
          stop("oct24-devils-gulch-road", "Drive through Devils Gulch Road", "2:00 PM", "Devils Gulch Road", ""),
          stop("oct24-glen-haven", "Visit Glen Haven", "2:15 PM", "Glen Haven", "https://maps.app.goo.gl/e7Q4ws9XbaPB8qrd8"),
          stop("oct24-explore-estes", "Explore Estes Park Town", "3:15 PM", "Estes Park", "https://maps.app.goo.gl/KByAYrgDgfoPtFGG6"),
          stop("oct24-back-airbnb", "Back to Airbnb", "7:00 PM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16")
        ]
      }
    ]
  },
  {
    id: "oct25",
    date: "2026-10-25",
    label: "Sun, Oct 25",
    title: "Day 5: Bear Lake Trail, then Home",
    sections: [
      {
        label: "",
        split: true,
        shared: [
          stop("oct25-start-day", "Leave Airbnb, start the day", "6:45 AM", "Airbnb", "https://maps.app.goo.gl/PKsRBwgyDYeyE2J16"),
          stop("oct25-bear-nymph-lake", "Bear Lake → Nymph Lake (hike together)", "7:15 AM", "Bear Lake Trailhead", "https://maps.app.goo.gl/TyWiM3g2LLiyNL549")
        ],
        hikers: [
          stop("oct25-hikers-dream-emerald-haiyaha", "Dream Lake → Emerald Lake → Lake Haiyaha (continue hike)", "8:15 AM", "Lake Haiyaha", ""),
          stop("oct25-hikers-lunch", "Lunch (back near Bear Lake Trailhead)", "12:00 PM", "Bear Lake Trailhead", ""),
          stop("oct25-hikers-drive-airport", "Drive to Denver Airport", "12:45 PM", "Denver Airport", ""),
          stop("oct25-hikers-car-return", "Car Return", "2:30 PM", "Denver Airport", "")
        ],
        casual: [
          stop("oct25-casual-boulder-denver", "Boulder & Denver Downtown (explore)", "8:15 AM", "Boulder", "https://maps.app.goo.gl/Tyw95BGp8J3rWYYf8"),
          stop("oct25-casual-drive-airport", "Drive to Denver Airport", "1:15 PM", "Denver Airport", ""),
          stop("oct25-casual-car-return", "Car Return", "2:00 PM", "Denver Airport", "")
        ]
      }
    ]
  }
];

// ---- State ------------------------------------------------------------

const STORAGE_KEY_COMPLETED = "coTrip.completedStops";
const STORAGE_KEY_GROUP = "coTrip.group";
const STORAGE_KEY_DAY_COMPLETE = "coTrip.completedDays";
const STORAGE_KEY_THEME = "coTrip.theme";

const TRIP_START = new Date("2026-10-20T00:00:00");
const TRIP_END = new Date("2026-10-25T23:59:59");

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

let completedStops = loadCompleted();
let completedDays = loadCompletedDays();
let currentGroup = loadGroup();
let currentTheme = loadTheme();
applyTheme(currentTheme);

function isTripLive() {
  const now = new Date();
  return now >= TRIP_START && now <= TRIP_END;
}

function todayDayId() {
  if (!isTripLive()) return null;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  const day = TRIP_DAYS.find(dd => {
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

function renderStop(stopData) {
  const li = el("li", "stop");
  li.dataset.stopId = stopData.id;
  const done = completedStops.has(stopData.id);
  if (done) li.classList.add("is-done");

  const check = el("span", "stop-check");
  check.textContent = "✓";
  li.appendChild(check);

  const body = el("div", "stop-body");

  const name = el("p", "stop-name");
  name.textContent = stopData.name;
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

  body.appendChild(meta);
  li.appendChild(body);

  li.addEventListener("click", () => toggleStop(stopData.id));

  return li;
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
  h2.textContent = day.title;
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
  const day = TRIP_DAYS.find(d => d.id === dayId);
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
  TRIP_DAYS.forEach(day => {
    const btn = el("button", "date-tab", { type: "button", "data-day-id": day.id });
    btn.textContent = day.label.split(", ")[1] || day.label;
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
  const btnHikers = document.getElementById("btnHikers");
  const btnCasual = document.getElementById("btnCasual");
  btnHikers.classList.toggle("is-active", currentGroup === "hikers");
  btnCasual.classList.toggle("is-active", currentGroup === "casual");
}

function renderThemeToggle() {
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.themeChoice === currentTheme);
  });
}

function renderAll() {
  const todayId = todayDayId();
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";
  TRIP_DAYS.forEach(day => daysContainer.appendChild(renderDay(day, todayId)));
  renderDateTabs(todayId);
  renderGroupToggle();
  renderThemeToggle();
  if (todayId) setActiveTab(todayId);
}

// ---- Events -------------------------------------------------------------

document.getElementById("groupToggle").addEventListener("click", ev => {
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
