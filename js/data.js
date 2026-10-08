// All content of the app lives in this file.
// Want to add a place, event or tip? Just add an object to one of the lists below.
// Coordinates are approximate [latitude, longitude] — good enough for a city map.

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
  sights:   { label: "Sights",          icon: "🏛️", color: "#7b4fbf" },
  nature:   { label: "Beach & nature",  icon: "🏖️", color: "#1f9d8a" },
  culture:  { label: "Culture & film",  icon: "🎭", color: "#d1495b" },
  goingout: { label: "Food & going out", icon: "🍻", color: "#e08e0b" },
  study:    { label: "Study spots",     icon: "📚", color: "#2e6fd8" },
  sports:   { label: "Sports & active", icon: "🚴", color: "#3a9d3a" },
  practical:{ label: "Practical",       icon: "🧭", color: "#5b6573" },
};

const PLACES = [
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
    tip: "Come at sunset with some friends and snacks — it's free and beautiful.",
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
    tip: "Bring a windbreaker — even on sunny days the sea breeze can be strong.",
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
    description: "A historic windmill along the boulevard — very Dutch, very photogenic.",
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
    tip: "Many bars have special student nights — ask around during introduction week.",
  },
  {
    id: "cinecity",
    name: "CineCity Vlissingen",
    city: "vlissingen",
    category: "culture",
    price: "€€",
    coords: [51.4470, 3.5815],
    description: "Big cinema with the latest blockbusters, often in original language with Dutch subtitles.",
    tip: "Films are usually shown in English with Dutch subtitles — no dubbing!",
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
    tip: "Find quiet study places in the library area during exam weeks — they fill up fast.",
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
    tip: "Every Thursday there is a big weekly market here — great for cheap fruit, cheese and fish.",
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
    name: "Canal bike route Vlissingen–Middelburg",
    city: "around",
    category: "sports",
    price: "free",
    coords: [51.4720, 3.6120],
    description:
      "The 'Kanaal door Walcheren' connects both cities. The cycle path next to it takes you " +
      "from Vlissingen to Middelburg in about 20–25 minutes.",
    tip: "Get a (second-hand) bike as soon as possible — it's how everyone gets around here.",
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

// Recurring events. Exact dates change every year — always check the official website!
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
    when: "Late August – early September",
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
      "Sinterklaas arrives by boat in the harbour. A very Dutch tradition — on 5 December people exchange gifts and poems.",
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
    when: "July – April",
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
    icon: "🚲",
    title: "Get a bike",
    text:
      "Cycling is the fastest way to get around. Buy a second-hand bike (check Marktplaats or local bike shops) " +
      "and always use two locks.",
  },
  {
    icon: "🚆",
    title: "Trains & buses",
    text:
      "The train between Vlissingen and Middelburg takes only a few minutes. Tap in and out with your bank card " +
      "(OVpay) or an OV-chipkaart. Plan trips with the 9292 or NS app.",
  },
  {
    icon: "🏛️",
    title: "Register at the municipality",
    text:
      "Staying longer than 4 months? Register at the municipality (gemeente) where you live within 5 days of arrival. " +
      "You'll get a BSN number, which you need for work, a bank account and the doctor.",
  },
  {
    icon: "🩺",
    title: "Health & emergencies",
    text:
      "Emergency: call 112. Police (non-emergency): 0900-8844. Register with a GP (huisarts) near you. " +
      "If you get a job here, Dutch health insurance is mandatory.",
  },
  {
    icon: "💳",
    title: "Paying",
    text:
      "Many shops and cafés only accept cards ('pinnen'). Make sure you have a debit card that works in the Netherlands.",
  },
  {
    icon: "🌬️",
    title: "The weather",
    text:
      "It's windy by the sea! A good rain jacket is worth more than an umbrella — umbrellas don't survive the wind here.",
  },
  {
    icon: "💸",
    title: "Save money",
    text:
      "Shop at the Thursday market in Middelburg, use the Too Good To Go app, buy supermarket house brands and always ask for student discount.",
  },
  {
    icon: "🥐",
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
    explanation: "English sailors called it 'Flushing' — there's even a Flushing in New York named after it!",
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
