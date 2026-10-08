// ---------- State ----------
const state = {
  city: "all",
  category: "all",
  search: "",
  savedOnly: false,
  freeOnly: false,
  mapCity: "all",
  saved: new Set(readStorage("savedPlaces", [])),
  // Places and events the user added themselves.
  userContent: readStorage("userContent", { places: [], events: [] }),
};

let map = null;
const markers = {}; // place id -> Leaflet marker

let pickerMap = null;
let pickerMarker = null;
let pickedCoords = null;

// ---------- Browser storage ----------
function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage not available (e.g. private mode): changes only last until the page reloads.
  }
}

function allPlaces() {
  return [...PLACES, ...state.userContent.places];
}

function allEvents() {
  return [...EVENTS, ...state.userContent.events];
}

// ---------- Saved places ----------
function toggleSaved(id) {
  if (state.saved.has(id)) {
    state.saved.delete(id);
  } else {
    state.saved.add(id);
  }
  writeStorage("savedPlaces", [...state.saved]);
  renderExplore();
  renderHighlights();
}

// ---------- Helpers ----------
function el(id) {
  return document.getElementById(id);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function priceLabel(price) {
  return price === "free" ? "Free" : price;
}

function chip(label, active, onClick) {
  const button = document.createElement("button");
  button.className = "chip" + (active ? " active" : "");
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

// ---------- Router (switch pages with #hash in the URL) ----------
const PAGES = ["home", "explore", "map", "events", "tips", "quiz"];

function showPage() {
  const page = location.hash.replace("#", "") || "home";
  const current = PAGES.includes(page) ? page : "home";

  document.querySelectorAll(".page").forEach((section) => {
    section.classList.toggle("visible", section.id === "page-" + current);
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === current);
  });

  if (current === "map") {
    initMap();
    // Leaflet needs to recalculate its size once the map is visible.
    setTimeout(() => map.invalidateSize(), 0);
  }
  window.scrollTo(0, 0);
}

// ---------- Place card ----------
function placeCard(place) {
  const category = CATEGORIES[place.category];
  const city = CITIES[place.city];
  const isSaved = state.saved.has(place.id);

  const card = document.createElement("article");
  card.className = "place-card";
  card.style.setProperty("--accent", category.color);
  card.innerHTML = `
    <div class="place-top">
      <span class="badge" style="background:${category.color}">${category.icon} ${category.label}</span>
      <button class="save-btn" aria-label="Save place" title="Save to my list">${isSaved ? "❤️" : "🤍"}</button>
    </div>
    <h3>${escapeHtml(place.name)}</h3>
    <p class="place-meta">📍 ${city.name} · ${priceLabel(place.price)}${place.userAdded ? " · Added by you" : ""}</p>
    <p>${escapeHtml(place.description)}</p>
    ${place.tip ? `<p class="place-tip">💡 ${escapeHtml(place.tip)}</p>` : ""}
    <div class="card-actions">
      ${place.coords ? '<button class="btn btn-small map-btn">Show on map</button>' : ""}
      ${place.userAdded ? '<button class="btn btn-small btn-delete delete-btn">Delete</button>' : ""}
    </div>
  `;
  card.querySelector(".save-btn").addEventListener("click", () => toggleSaved(place.id));
  if (place.coords) {
    card.querySelector(".map-btn").addEventListener("click", () => showOnMap(place.id));
  }
  if (place.userAdded) {
    card.querySelector(".delete-btn").addEventListener("click", () => deletePlace(place.id));
  }
  return card;
}

// ---------- Home ----------
function renderHome() {
  const container = el("city-cards");
  container.innerHTML = "";

  ["vlissingen", "middelburg"].forEach((key) => {
    const city = CITIES[key];
    const count = allPlaces().filter((p) => p.city === key).length;
    const card = document.createElement("article");
    card.className = "city-card city-" + key;
    card.innerHTML = `
      <h3>${city.name}</h3>
      <p class="tagline">${city.tagline}</p>
      <p>${city.description}</p>
      <ul class="facts">${city.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="btn btn-primary">See ${count} places in ${city.name}</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      state.city = key;
      state.category = "all";
      renderExplore();
      location.hash = "explore";
    });
    container.appendChild(card);
  });

  renderHighlights();
}

function renderHighlights() {
  const container = el("highlights");
  if (!container.dataset.ids) {
    // Pick 3 random places once per visit.
    const shuffled = allPlaces().sort(() => Math.random() - 0.5);
    container.dataset.ids = shuffled.slice(0, 3).map((p) => p.id).join(",");
  }
  const ids = container.dataset.ids.split(",");
  container.innerHTML = "";
  // A picked place may have been deleted by the user in the meantime.
  allPlaces()
    .filter((p) => ids.includes(p.id))
    .forEach((place) => container.appendChild(placeCard(place)));
}

// ---------- Explore ----------
function renderFilters() {
  const cityFilter = el("city-filter");
  cityFilter.innerHTML = "";
  const cityOptions = { all: "All areas", vlissingen: "Vlissingen", middelburg: "Middelburg", around: "Around Walcheren" };
  Object.entries(cityOptions).forEach(([key, label]) => {
    cityFilter.appendChild(
      chip(label, state.city === key, () => {
        state.city = key;
        renderExplore();
      })
    );
  });

  const categoryFilter = el("category-filter");
  categoryFilter.innerHTML = "";
  categoryFilter.appendChild(
    chip("All categories", state.category === "all", () => {
      state.category = "all";
      renderExplore();
    })
  );
  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    categoryFilter.appendChild(
      chip(`${cat.icon} ${cat.label}`, state.category === key, () => {
        state.category = key;
        renderExplore();
      })
    );
  });
}

function filteredPlaces() {
  const search = state.search.toLowerCase();
  return allPlaces().filter((place) => {
    if (state.city !== "all" && place.city !== state.city) return false;
    if (state.category !== "all" && place.category !== state.category) return false;
    if (state.savedOnly && !state.saved.has(place.id)) return false;
    if (state.freeOnly && place.price !== "free") return false;
    if (search) {
      const text = (place.name + " " + place.description + " " + (place.tip || "")).toLowerCase();
      if (!text.includes(search)) return false;
    }
    return true;
  });
}

function renderExplore() {
  renderFilters();
  const places = filteredPlaces();
  const list = el("place-list");
  list.innerHTML = "";

  el("result-count").textContent =
    places.length === 1 ? "1 place found" : `${places.length} places found`;

  if (places.length === 0) {
    list.innerHTML = `<p class="empty">No places found. Try another filter${
      state.savedOnly ? " or save some places with the 🤍 button" : ""
    }.</p>`;
    return;
  }
  places.forEach((place) => list.appendChild(placeCard(place)));
}

// ---------- Map ----------
function initMap() {
  if (map) return;

  map = L.map("leaflet-map").setView([51.47, 3.59], 12);
  addTiles(map);
  allPlaces().forEach(addMarker);
  renderMapFilter();
}

function addTiles(leafletMap) {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(leafletMap);
}

function addMarker(place) {
  if (!map || !place.coords) return;

  const category = CATEGORIES[place.category];
  const icon = L.divIcon({
    className: "map-marker",
    html: `<span style="background:${category.color}">${category.icon}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
  markers[place.id] = L.marker(place.coords, { icon })
    .addTo(map)
    .bindPopup(
      `<strong>${escapeHtml(place.name)}</strong><br>` +
        `<small>${category.label} · ${priceLabel(place.price)}</small><br>` +
        escapeHtml(place.description)
    );
}

function renderMapFilter() {
  const container = el("map-filter");
  container.innerHTML = "";
  const options = { all: "Everything", vlissingen: "Vlissingen", middelburg: "Middelburg", around: "Around Walcheren" };
  Object.entries(options).forEach(([key, label]) => {
    container.appendChild(
      chip(label, state.mapCity === key, () => {
        state.mapCity = key;
        renderMapFilter();
        if (key === "all") {
          map.flyTo([51.47, 3.59], 12);
        } else {
          map.flyTo(CITIES[key].center, key === "around" ? 11 : 15);
        }
      })
    );
  });
}

function showOnMap(id) {
  location.hash = "map";
  initMap();
  const place = allPlaces().find((p) => p.id === id);
  setTimeout(() => {
    map.invalidateSize();
    map.setView(place.coords, 16);
    markers[id].openPopup();
  }, 50);
}

// ---------- Events ----------
function renderEvents() {
  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth() + 1;

  // Sort events so the upcoming ones come first. Weekly events (month 0) go on top.
  const monthsAway = (month) => (month === 0 ? -1 : (month - currentMonth + 12) % 12);
  const events = allEvents().sort((a, b) => monthsAway(a.month) - monthsAway(b.month));

  const list = el("event-list");
  list.innerHTML = "";
  events.forEach((event) => {
    const cityLabel = event.city === "both" ? "Vlissingen & Middelburg" : CITIES[event.city].name;
    const isNow = event.month === currentMonth;
    const item = document.createElement("article");
    item.className = "event" + (isNow ? " event-now" : "");
    item.innerHTML = `
      <div class="event-date">${event.month === 0 ? "Weekly" : monthNames[event.month]}</div>
      <div>
        <h3>${escapeHtml(event.name)} ${isNow ? '<span class="badge badge-now">This month</span>' : ""}</h3>
        <p class="place-meta">🗓️ ${event.when} · 📍 ${cityLabel}${event.userAdded ? " · Added by you" : ""}</p>
        <p>${escapeHtml(event.description)}</p>
        ${event.userAdded ? '<button class="btn btn-small btn-delete delete-btn">Delete</button>' : ""}
      </div>
    `;
    if (event.userAdded) {
      item.querySelector(".delete-btn").addEventListener("click", () => deleteEvent(event.id));
    }
    list.appendChild(item);
  });
}

// ---------- Adding your own places and events ----------
function initPickerMap() {
  if (pickerMap) return;

  pickerMap = L.map("picker-map").setView([51.47, 3.59], 12);
  addTiles(pickerMap);
  pickerMap.on("click", (e) => {
    pickedCoords = [e.latlng.lat, e.latlng.lng];
    if (pickerMarker) {
      pickerMarker.setLatLng(e.latlng);
    } else {
      pickerMarker = L.marker(e.latlng).addTo(pickerMap);
    }
    el("picker-status").textContent = "Location chosen. Click again to move it.";
  });
}

function resetPicker() {
  pickedCoords = null;
  if (pickerMarker) {
    pickerMarker.remove();
    pickerMarker = null;
  }
  el("picker-status").textContent = "No location chosen. The place will not appear on the map.";
}

function setupPlaceForm() {
  el("place-category").innerHTML = Object.entries(CATEGORIES)
    .map(([key, cat]) => `<option value="${key}">${cat.label}</option>`)
    .join("");

  // The picker map can only be drawn once the <details> is open and has a size.
  el("place-form-details").addEventListener("toggle", (e) => {
    if (!e.target.open) return;
    initPickerMap();
    pickerMap.invalidateSize();
  });

  el("place-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const description = data.get("description").trim();

    if (!name || !description) {
      el("place-form-message").textContent = "Please fill in a name and a description.";
      return;
    }

    const place = {
      id: "user-" + Date.now(),
      name,
      city: data.get("city"),
      category: data.get("category"),
      price: data.get("price"),
      coords: pickedCoords,
      description,
      tip: data.get("tip").trim(),
      userAdded: true,
    };
    state.userContent.places.push(place);
    writeStorage("userContent", state.userContent);

    addMarker(place);
    form.reset();
    resetPicker();
    el("place-form-message").textContent = `"${name}" was added.`;
    renderHome();
    renderExplore();
  });
}

function setupEventForm() {
  el("event-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const description = data.get("description").trim();
    const date = data.get("date");

    if (!name || !description || !date) {
      el("event-form-message").textContent = "Please fill in a name, a date and a description.";
      return;
    }

    // Add a time so the "YYYY-MM-DD" date is read as local time instead of UTC.
    const when = new Date(date + "T00:00").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    state.userContent.events.push({
      id: "user-" + Date.now(),
      name,
      when,
      month: Number(date.slice(5, 7)),
      city: data.get("city"),
      description,
      userAdded: true,
    });
    writeStorage("userContent", state.userContent);

    form.reset();
    el("event-form-message").textContent = `"${name}" was added.`;
    renderEvents();
  });
}

function deletePlace(id) {
  if (!confirm("Delete this place?")) return;

  state.userContent.places = state.userContent.places.filter((p) => p.id !== id);
  writeStorage("userContent", state.userContent);

  if (state.saved.has(id)) {
    state.saved.delete(id);
    writeStorage("savedPlaces", [...state.saved]);
  }
  if (markers[id]) {
    markers[id].remove();
    delete markers[id];
  }
  renderHome();
  renderExplore();
}

function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;

  state.userContent.events = state.userContent.events.filter((e) => e.id !== id);
  writeStorage("userContent", state.userContent);
  renderEvents();
}

// ---------- Tips ----------
function renderTips() {
  el("tip-list").innerHTML = TIPS.map(
    (tip) => `
      <article class="tip">
        <div class="tip-icon">${tip.icon}</div>
        <h3>${tip.title}</h3>
        <p>${tip.text}</p>
      </article>`
  ).join("");

  el("phrase-list").innerHTML = PHRASES.map(
    (phrase) => `
      <div class="phrase">
        <span class="nl">${phrase.nl}</span>
        <span class="en">${phrase.en}</span>
      </div>`
  ).join("");
}

// ---------- Quiz ----------
const quiz = { index: 0, score: 0, answered: false };

function renderQuiz() {
  const container = el("quiz");

  if (quiz.index >= QUIZ.length) {
    const percentage = quiz.score / QUIZ.length;
    let message = "Time to go exploring! 🚲";
    if (percentage === 1) message = "Perfect! You're a real Zeeuw already! 🏆";
    else if (percentage >= 0.6) message = "Nice job, you know your way around! 🎉";

    container.innerHTML = `
      <h2>You scored ${quiz.score} / ${QUIZ.length}</h2>
      <p>${message}</p>
      <button class="btn btn-primary" id="quiz-restart">Try again</button>
    `;
    el("quiz-restart").addEventListener("click", () => {
      quiz.index = 0;
      quiz.score = 0;
      renderQuiz();
    });
    return;
  }

  const q = QUIZ[quiz.index];
  quiz.answered = false;
  container.innerHTML = `
    <p class="muted">Question ${quiz.index + 1} of ${QUIZ.length} · Score: ${quiz.score}</p>
    <div class="progress"><div style="width:${(quiz.index / QUIZ.length) * 100}%"></div></div>
    <h2>${q.question}</h2>
    <div class="answers">
      ${q.answers.map((a, i) => `<button class="answer" data-index="${i}">${a}</button>`).join("")}
    </div>
    <p id="quiz-feedback" class="quiz-feedback"></p>
    <button class="btn btn-primary hidden" id="quiz-next">Next question</button>
  `;

  container.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => answerQuestion(Number(button.dataset.index)));
  });
  el("quiz-next").addEventListener("click", () => {
    quiz.index++;
    renderQuiz();
  });
}

function answerQuestion(choice) {
  if (quiz.answered) return;
  quiz.answered = true;

  const q = QUIZ[quiz.index];
  const correct = choice === q.correct;
  if (correct) quiz.score++;

  document.querySelectorAll(".answer").forEach((button, i) => {
    button.disabled = true;
    if (i === q.correct) button.classList.add("correct");
    else if (i === choice) button.classList.add("wrong");
  });

  el("quiz-feedback").textContent = (correct ? "✅ Correct! " : "❌ Not quite. ") + q.explanation;
  const next = el("quiz-next");
  next.textContent = quiz.index === QUIZ.length - 1 ? "See my score" : "Next question";
  next.classList.remove("hidden");
}

// ---------- Start ----------
el("search").addEventListener("input", (e) => {
  state.search = e.target.value;
  renderExplore();
});
el("saved-only").addEventListener("change", (e) => {
  state.savedOnly = e.target.checked;
  renderExplore();
});
el("free-only").addEventListener("change", (e) => {
  state.freeOnly = e.target.checked;
  renderExplore();
});

setupPlaceForm();
setupEventForm();

renderHome();
renderExplore();
renderEvents();
renderTips();
renderQuiz();

window.addEventListener("hashchange", showPage);
showPage();
