// All content of the app lives in this file.
// Want to add a place, event or tip? Just add an object to one of the lists below.
// Coordinates are [latitude, longitude].

const CITIES = {
  vlissingen: {
    name: "Vlissingen",
    english: "Flushing",
    tagline: "Port city by the sea",
    description:
      "Vlissingen is a lively harbour town where the Westerschelde meets the North Sea. " +
      "Walk the boulevard, watch huge ships sail by surprisingly close, and enjoy the beach " +
      "right next to the city centre. The main HZ University of Applied Sciences campus is here.",
    facts: ["~45,000 inhabitants", "Beach in the city centre", "Main HZ campus"],
    center: [51.4436, 3.5790],
  },
  middelburg: {
    name: "Middelburg",
    english: "Middelburg",
    tagline: "Historic capital of Zeeland",
    description:
      "Middelburg is the capital of the province of Zeeland. It has a medieval centre full of " +
      "monuments, canals and cosy squares, with the Abbey and its tower 'Lange Jan' at its heart. " +
      "University College Roosevelt (UCR) is located right in the old town.",
    facts: ["~50,000 inhabitants", "Capital of Zeeland", "Home of UCR"],
    center: [51.4990, 3.6110],
  },
  around: {
    name: "Around Walcheren",
    english: "Around Walcheren",
    tagline: "Day trips nearby",
    description: "Beaches, villages and nature within cycling distance.",
    facts: [],
    center: [51.52, 3.55],
  },
};

const CATEGORIES = {
  sights:   { label: "Sights" },
  nature:   { label: "Beach & nature" },
  culture:  { label: "Culture & film" },
  goingout: { label: "Bars & cafés" },
  cheapeats:{ label: "Cheap eats" },
  supermarkets: { label: "Supermarkets" },
  museums:  { label: "Museums" },
  chill:    { label: "Chill spots" },
  study:    { label: "Study spots" },
  sports:   { label: "Sports & active" },
  practical:{ label: "Practical" },
};

// Real quotes from HZ students, taken from hz.nl.
const STORIES = [
  {
    name: "Saki",
    info: "Exchange student from Japan, Tourism Management",
    quote: "We spend a lot of time together. We hang out, we cook and we visit each other's rooms.",
    url: "https://hz.nl/en/studentstories/why-japanese-exchange-student-saki-loves-studying-in-netherlands-at-hz",
  },
  {
    name: "Ayden",
    info: "Exchange student from Thailand, International Business",
    quote: "It is very easy to make friends here. There is a strong international community where everyone knows each other.",
    url: "https://hz.nl/en/studentstories/exchange-student-ayden-enjoys-every-minute-at-hz",
  },
  {
    name: "Sullen",
    info: "HZ student blogger",
    quote: "It's small enough to get around easily by bike, but big enough to enjoy a lively student life.",
    url: "https://hz.nl/en/blogs/study-abroad/student-life-in-vlissingen",
  },
];

const PLACES = [
  // ---------- New: supermarkets, cheap eats, bars, museums, chill spots (locations from OpenStreetMap) ----------
  { id: "ah-vlissingen", name: "Albert Heijn Vlissingen centre", city: "vlissingen", category: "supermarkets", price: "€", coords: [51.44562, 3.57345], description: "Supermarket in the city centre, Aagje Dekenstraat 16.", tip: "House brand products are much cheaper than A-brands." },
  { id: "lidl-vlissingen", name: "Lidl Vlissingen", city: "vlissingen", category: "supermarkets", price: "€", coords: [51.45278, 3.58569], description: "Budget supermarket at Mercuriusweg 16, a short walk from HZ Edisonweg. Jumbo is right next door." },
  { id: "ah-middelburg", name: "Albert Heijn Middelburg", city: "middelburg", category: "supermarkets", price: "€", coords: [51.49628, 3.60763], description: "Supermarket at Pottenbakkerssingel 2, close to HZ Het Groene Woud." },
  { id: "lidl-middelburg", name: "Lidl Middelburg", city: "middelburg", category: "supermarkets", price: "€", coords: [51.48584, 3.61828], description: "Budget supermarket at Johan van Reigersbergstraat 3, with a Jumbo next door." },
  { id: "henks-viskraam", name: "Henk's Viskraam", city: "vlissingen", category: "cheapeats", price: "€", coords: [51.44071, 3.57475], description: "Fish stand on the De Ruyterplein. Grab some kibbeling and eat it on the boulevard." },
  { id: "de-horizon", name: "De Horizon", city: "vlissingen", category: "cheapeats", price: "€", coords: [51.44281, 3.57661], description: "Snack bar at Walstraat 19 with kebab, fries and kibbeling." },
  { id: "smoske-vlissingen", name: "'t Smoske", city: "vlissingen", category: "cheapeats", price: "€", coords: [51.44865, 3.58865], description: "Sandwich shop at Prins Hendrikweg 6, a few minutes from HZ Edisonweg." },
  { id: "frites-markt", name: "Frites Snacks", city: "middelburg", category: "cheapeats", price: "€", coords: [51.49812, 3.61206], description: "Fries on the Markt, Markt 34." },
  { id: "popeye", name: "Popeye", city: "vlissingen", category: "goingout", price: "€", coords: [51.44121, 3.57513], description: "Pub at Nieuwendijk 7, next to Bellamypark. Popular with HZ students." },
  { id: "concurrent", name: "De Concurrent", city: "vlissingen", category: "goingout", price: "€", coords: [51.44163, 3.57426], description: "Pub right on Bellamypark (number 22)." },
  { id: "seventy-seven", name: "Café Seventy-Seven", city: "middelburg", category: "goingout", price: "€", coords: [51.49834, 3.61053], description: "Café on the Markt (number 77), one of the most popular bars among students in Middelburg." },
  { id: "plein1940", name: "Plein 1940", city: "middelburg", category: "goingout", price: "€€", coords: [51.4978, 3.6108], description: "Square next to the Markt with several bars, such as Bar Gaudi and De Vliegende Hollander." },
  { id: "mercuur", name: "Museum ship Mercuur", city: "vlissingen", category: "museums", price: "€", coords: [51.44414, 3.57844], description: "Former navy minesweeper you can visit, Dok van Perry 43." },
  { id: "sjakies", name: "Sjakie's Chocolate Museum", city: "middelburg", category: "museums", price: "€", coords: [51.49854, 3.60882], description: "Small museum about chocolate, from bean to bar. Vlasmarkt 51." },
  { id: "abdijplein", name: "Abdijplein", city: "middelburg", category: "chill", price: "free", coords: [51.5005, 3.61472], description: "Quiet square inside the Abbey complex. Nice for sitting in the sun between classes." },

  // ---------- Vlissingen ----------
  {
    id: "boulevard",
    name: "Boulevard de Ruyter & Evertsen",
    city: "vlissingen",
    category: "nature",
    price: "free",
    coords: [51.4412, 3.5660],
    description:
      "The seaside boulevard of Vlissingen. Great for a walk, a run or watching the sunset " +
      "while giant container ships pass on their way to Antwerp.",
    tip: "Come at sunset with some friends and snacks. It's free and beautiful.",
  },
  {
    id: "nollestrand",
    name: "Nolle beach (Nollestrand)",
    city: "vlissingen",
    category: "nature",
    price: "free",
    coords: [51.4432, 3.5480],
    description:
      "Wide sandy beach at the western end of the boulevard, with the Nolledijk dunes behind it. " +
      "Popular with students in summer.",
    tip: "Bring a windbreaker. Even on sunny days the sea breeze can be strong.",
  },
  {
    id: "deruyter",
    name: "Statue of Michiel de Ruyter",
    city: "vlissingen",
    category: "sights",
    price: "free",
    coords: [51.4422, 3.5722],
    description:
      "Statue of the famous 17th-century Dutch admiral Michiel de Ruyter, who was born in " +
      "Vlissingen. He looks out over the sea from the boulevard.",
    tip: "A classic first photo spot to send home.",
  },
  {
    id: "gevangentoren",
    name: "Gevangentoren (Prison Tower)",
    city: "vlissingen",
    category: "sights",
    price: "free",
    coords: [51.4419, 3.5735],
    description:
      "A 15th-century tower on the boulevard, one of the oldest buildings in town. " +
      "It was once part of the city walls and later used as a prison.",
  },
  {
    id: "oranjemolen",
    name: "Oranjemolen windmill",
    city: "vlissingen",
    category: "sights",
    price: "free",
    coords: [51.4418, 3.5628],
    description: "A historic windmill along the boulevard. Very Dutch, very photogenic.",
  },
  {
    id: "muzeeum",
    name: "MuZEEum",
    city: "vlissingen",
    category: "culture",
    price: "€",
    coords: [51.4440, 3.5755],
    description:
      "Maritime museum about the sea, ships and the history of Vlissingen and Zeeland.",
    tip: "Ask for student discount at the desk.",
  },
  {
    id: "bellamypark",
    name: "Bellamypark",
    city: "vlissingen",
    category: "goingout",
    price: "€€",
    coords: [51.4433, 3.5740],
    description:
      "Green square in the old centre surrounded by bars, restaurants and terraces. " +
      "The place to be for drinks and a night out in Vlissingen.",
    tip: "Many bars have special student nights. Ask around during introduction week.",
  },
  {
    id: "cinecity",
    name: "CineCity Vlissingen",
    city: "vlissingen",
    category: "culture",
    price: "€€",
    coords: [51.4470, 3.5815],
    description: "Big cinema with the latest blockbusters, often in original language with Dutch subtitles.",
    tip: "Films are usually shown in English with Dutch subtitles, no dubbing!",
  },
  {
    id: "hz",
    name: "HZ University of Applied Sciences",
    city: "vlissingen",
    category: "study",
    price: "free",
    coords: [51.4500, 3.5855],
    description:
      "Main campus of HZ. Besides classes you'll find study spaces, a library and the canteen here.",
    tip: "Find quiet study places in the library area during exam weeks, they fill up fast.",
  },
  {
    id: "station-vlissingen",
    name: "Vlissingen train station",
    city: "vlissingen",
    category: "practical",
    price: "free",
    coords: [51.4447, 3.5965],
    description:
      "The very last station of the Dutch railway line. Trains go via Middelburg towards " +
      "Goes, Roosendaal, Rotterdam and Amsterdam.",
    tip: "You can pay by tapping your bank card at the gates (OVpay).",
  },
  {
    id: "ferry",
    name: "Fast ferry to Breskens",
    city: "vlissingen",
    category: "practical",
    price: "€",
    coords: [51.4430, 3.5975],
    description:
      "Passenger and bicycle ferry across the Westerschelde to Breskens, next to the train station. " +
      "The crossing takes about 20 minutes.",
    tip: "Take your bike and cycle to the beaches of Zeeuws-Vlaanderen or even to Belgium.",
  },

  // ---------- Middelburg ----------
  {
    id: "markt",
    name: "Markt & City Hall",
    city: "middelburg",
    category: "sights",
    price: "free",
    coords: [51.4988, 3.6105],
    description:
      "The central square of Middelburg with its spectacular Gothic city hall (Stadhuis). " +
      "Surrounded by cafés and terraces.",
    tip: "Every Thursday there is a big weekly market here. Great for cheap fruit, cheese and fish.",
  },
  {
    id: "abdij",
    name: "Abbey & Lange Jan tower",
    city: "middelburg",
    category: "sights",
    price: "free",
    coords: [51.5003, 3.6125],
    description:
      "Huge medieval abbey complex in the heart of the city. The tower, 'Lange Jan' (Long John), " +
      "is about 90 metres tall and visible from far around.",
    tip: "In summer you can climb Lange Jan for a view over the whole of Walcheren.",
  },
  {
    id: "zeeuwsmuseum",
    name: "Zeeuws Museum",
    city: "middelburg",
    category: "culture",
    price: "€",
    coords: [51.5006, 3.6132],
    description:
      "Museum inside the Abbey about the history, art and traditional costumes of Zeeland.",
  },
  {
    id: "vleeshal",
    name: "De Vleeshal",
    city: "middelburg",
    category: "culture",
    price: "free",
    coords: [51.4990, 3.6100],
    description: "Contemporary art space located in the former meat hall under the city hall.",
  },
  {
    id: "cinema-middelburg",
    name: "Cinema Middelburg",
    city: "middelburg",
    category: "culture",
    price: "€",
    coords: [51.4972, 3.6090],
    description: "Cosy art-house cinema with international films and documentaries.",
  },
  {
    id: "molenwater",
    name: "Molenwater park",
    city: "middelburg",
    category: "nature",
    price: "free",
    coords: [51.5025, 3.6065],
    description:
      "Green park near the old town with a pond and a windmill. Perfect for a picnic or reading outside.",
  },
  {
    id: "singels",
    name: "Canals & old city walls (Singels)",
    city: "middelburg",
    category: "sports",
    price: "free",
    coords: [51.5040, 3.6150],
    description:
      "The star-shaped canal ring around the old town. The path along it is a popular running route " +
      "of a few kilometres.",
    tip: "In a cold winter people sometimes skate on the canals!",
  },
  {
    id: "markt-terraces",
    name: "Terraces around the Markt",
    city: "middelburg",
    category: "goingout",
    price: "€€",
    coords: [51.4985, 3.6115],
    description:
      "The streets around the Markt are full of cafés and bars. On sunny days everyone sits outside.",
  },
  {
    id: "ucr",
    name: "University College Roosevelt",
    city: "middelburg",
    category: "study",
    price: "free",
    coords: [51.5010, 3.6115],
    description:
      "International liberal arts & sciences college located in historic buildings around the Abbey.",
  },
  {
    id: "zb",
    name: "Zeeuwse Bibliotheek (ZB library)",
    city: "middelburg",
    category: "study",
    price: "free",
    coords: [51.4962, 3.6110],
    description:
      "The big provincial library near the station, with lots of study places and free Wi-Fi.",
    tip: "A good escape when your room is too noisy to study.",
  },
  {
    id: "station-middelburg",
    name: "Middelburg train station",
    city: "middelburg",
    category: "practical",
    price: "free",
    coords: [51.4953, 3.6168],
    description:
      "Just a few minutes by train from Vlissingen. From here the old centre is a 5-minute walk.",
  },

  // ---------- Around Walcheren ----------
  {
    id: "kanaal",
    name: "Canal bike route Vlissingen to Middelburg",
    city: "around",
    category: "sports",
    price: "free",
    coords: [51.4720, 3.6120],
    description:
      "The 'Kanaal door Walcheren' connects both cities. The cycle path next to it takes you " +
      "from Vlissingen to Middelburg in about 20 to 25 minutes.",
    tip: "Get a (second-hand) bike as soon as possible. It's how everyone gets around here.",
  },
  {
    id: "domburg",
    name: "Domburg beach",
    city: "around",
    category: "nature",
    price: "free",
    coords: [51.5650, 3.4970],
    description:
      "Popular seaside village with a wide beach and dunes. One of the best surf spots of Zeeland.",
    tip: "Cycle there through the dunes (about 1 hour from Middelburg) or take the bus.",
  },
  {
    id: "zoutelande",
    name: "Zoutelande",
    city: "around",
    category: "nature",
    price: "free",
    coords: [51.5005, 3.4840],
    description: "Cosy beach village between Vlissingen and Domburg, famous for its high dunes.",
  },
  {
    id: "veere",
    name: "Veere",
    city: "around",
    category: "sights",
    price: "free",
    coords: [51.5470, 3.6670],
    description:
      "Tiny, picture-perfect historic harbour town on the Veerse Meer lake. A great bike trip from Middelburg.",
  },
];

// Recurring events. Exact dates change every year, always check the official website!
const EVENTS = [
  {
    name: "Introduction week",
    when: "August / September",
    month: 8,
    city: "both",
    description:
      "Your school's introduction programme: the best way to make friends and discover the cities. Don't skip it!",
  },
  {
    name: "Zeeland Nazomerfestival",
    when: "Late August to early September",
    month: 8,
    city: "middelburg",
    description:
      "Late-summer arts festival with theatre, music and art at special locations across Walcheren.",
  },
  {
    name: "Film by the Sea",
    when: "September",
    month: 9,
    city: "vlissingen",
    description: "International film festival in Vlissingen with screenings, guests and events.",
  },
  {
    name: "Sinterklaas arrives",
    when: "Mid November",
    month: 11,
    city: "both",
    description:
      "Sinterklaas arrives by boat in the harbour. A very Dutch tradition: on 5 December people exchange gifts and poems.",
  },
  {
    name: "New Year's Eve",
    when: "31 December",
    month: 12,
    city: "both",
    description: "Fireworks everywhere, oliebollen (Dutch doughnuts) and parties all over town.",
  },
  {
    name: "King's Day (Koningsdag)",
    when: "27 April",
    month: 4,
    city: "both",
    description:
      "National holiday for the King's birthday. Wear orange, visit the street markets and enjoy the parties.",
  },
  {
    name: "Bevrijdingsfestival Zeeland",
    when: "5 May",
    month: 5,
    city: "vlissingen",
    description:
      "Free music festival in Vlissingen celebrating Liberation Day, with lots of Dutch artists.",
  },
  {
    name: "Ringrijden",
    when: "Summer",
    month: 7,
    city: "both",
    description:
      "Traditional Zeeland sport: riders on horseback try to spear a small ring at full gallop.",
  },
  {
    name: "Mussel season",
    when: "July to April",
    month: 7,
    city: "both",
    description:
      "Zeeland is famous for its mussels (Zeeuwse mosselen). Try them in a restaurant at least once!",
  },
  {
    name: "Weekly market Middelburg",
    when: "Every Thursday",
    month: 0,
    city: "middelburg",
    description: "Big market on the Markt with fresh food, cheese, fish and much more.",
  },
];

const TIPS = [
  {
    title: "Get a bike",
    text:
      "Cycling is the fastest way to get around. Buy a second-hand bike (check Marktplaats or local bike shops) " +
      "and always use two locks.",
  },
  {
    title: "Trains & buses",
    text:
      "The train between Vlissingen and Middelburg takes only a few minutes. Tap in and out with your bank card " +
      "(OVpay) or an OV-chipkaart. Plan trips with the 9292 or NS app.",
  },
  {
    title: "Register at the municipality",
    text:
      "Staying longer than 4 months? Register at the municipality (gemeente) where you live within 5 days of arrival. " +
      "You'll get a BSN number, which you need for work, a bank account and the doctor.",
  },
  {
    title: "Health & emergencies",
    text:
      "Emergency: call 112. Police (non-emergency): 0900-8844. Register with a GP (huisarts) near you. " +
      "If you get a job here, Dutch health insurance is mandatory.",
  },
  {
    title: "Paying",
    text:
      "Many shops and cafés only accept cards ('pinnen'). Make sure you have a debit card that works in the Netherlands.",
  },
  {
    title: "The weather",
    text:
      "It's windy by the sea! A good rain jacket is worth more than an umbrella. Umbrellas don't survive the wind here.",
  },
  {
    title: "Save money",
    text:
      "Shop at the Thursday market in Middelburg, use the Too Good To Go app, buy supermarket house brands and always ask for student discount.",
  },
  {
    title: "Taste Zeeland",
    text:
      "Try a 'Zeeuwse bolus' (sticky cinnamon pastry), fresh mussels and 'kibbeling' (fried fish) from a fish stand.",
  },
];

const PHRASES = [
  { nl: "Hoi / Doei", en: "Hi / Bye" },
  { nl: "Dank je wel", en: "Thank you" },
  { nl: "Mag ik pinnen?", en: "Can I pay by card?" },
  { nl: "Proost!", en: "Cheers!" },
  { nl: "Gezellig", en: "Cosy, fun, nice atmosphere (very Dutch word!)" },
  { nl: "Fiets", en: "Bicycle" },
  { nl: "Spreek je Engels?", en: "Do you speak English?" },
  { nl: "Lekker!", en: "Tasty! / Nice!" },
];

const QUIZ = [
  {
    question: "Vlissingen and Middelburg are both located on a former island. What is it called?",
    answers: ["Texel", "Walcheren", "Schouwen", "Tholen"],
    correct: 1,
    explanation: "Walcheren used to be an island; now it's connected to the mainland by dams.",
  },
  {
    question: "Which city is the capital of the province of Zeeland?",
    answers: ["Vlissingen", "Goes", "Middelburg", "Terneuzen"],
    correct: 2,
    explanation: "Middelburg is the capital of Zeeland.",
  },
  {
    question: "What is the nickname of the tall tower of the Middelburg Abbey?",
    answers: ["Lange Jan", "Dikke Piet", "Hoge Henk", "Grote Kees"],
    correct: 0,
    explanation: "'Lange Jan' means 'Long John'. It's about 90 metres tall.",
  },
  {
    question: "Which famous admiral was born in Vlissingen?",
    answers: ["Piet Hein", "Michiel de Ruyter", "Maarten Tromp", "Witte de With"],
    correct: 1,
    explanation: "Michiel de Ruyter's statue stands on the boulevard, looking out to sea.",
  },
  {
    question: "What was the old English name for Vlissingen?",
    answers: ["Fleetwood", "Flushing", "Flanders", "Fishing"],
    correct: 1,
    explanation: "English sailors called it 'Flushing'. There's even a Flushing in New York named after it!",
  },
  {
    question: "On which day is the big weekly market in Middelburg?",
    answers: ["Monday", "Wednesday", "Thursday", "Sunday"],
    correct: 2,
    explanation: "Every Thursday the Markt fills up with market stalls.",
  },
  {
    question: "Where does the fast ferry from Vlissingen take you?",
    answers: ["Breskens", "England", "Texel", "Antwerp"],
    correct: 0,
    explanation: "The ferry crosses the Westerschelde to Breskens in about 20 minutes.",
  },
  {
    question: "What number do you call in an emergency in the Netherlands?",
    answers: ["911", "999", "112", "110"],
    correct: 2,
    explanation: "112 works in the whole European Union.",
  },
];
