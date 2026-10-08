# Hermans Dreamteam - PPD project

### Developers: Nathan, Lyam, Luuk & Elmar

## Walcheren Student Guide

Een web-app waarmee nieuwe internationale studenten Vlissingen en Middelburg leren kennen
en ontdekken wat er voor studenten te doen is. De app zelf is in het Engels.

### Functies

- **Home**: introductie van beide steden en een paar willekeurige tips
- **Explore**: alle plekken, te filteren op stad, categorie, zoekterm en "gratis"; plekken opslaan met ❤️ (blijft bewaard in de browser)
- **Eigen plekken toevoegen**: via "Add your own place" op Explore, met optioneel een locatie op de kaart
- **Map**: interactieve kaart met alle plekken
- **Events**: jaarlijkse evenementen, gesorteerd vanaf de huidige maand
- **Eigen events toevoegen**: via "Add your own event" op Events

Zelf toegevoegde plekken en events worden alleen in de eigen browser opgeslagen (`localStorage`).
Andere gebruikers zien ze dus niet, en ze verdwijnen als je de browsergegevens wist.
- **Tips**: praktische tips (fiets, OV, inschrijven gemeente, ...) en Nederlandse basiszinnen
- **Quiz**: test je kennis over Walcheren

### Tech stack

Gewoon HTML, CSS en JavaScript, zonder framework en zonder build-stap.
De kaart gebruikt [Leaflet](https://leafletjs.com/) via een CDN.

```
index.html      alle pagina's (secties die getoond/verborgen worden)
css/style.css   opmaak (mobiel: navigatiebalk onderaan)
js/data.js      ALLE inhoud: plekken, events, tips, quizvragen
js/app.js       logica: navigatie, filters, kaart, quiz
```

### Starten

Open `index.html` in je browser (dubbelklikken). Een internetverbinding is nodig voor de kaart.

Of gebruik de **Live Server**-extensie in VS Code: rechtermuisklik op `index.html` → *Open with Live Server*.

### Inhoud toevoegen

Alles staat in [js/data.js](js/data.js). Een nieuwe plek toevoegen = een object toevoegen aan `PLACES`:

```js
{
  id: "unieke-id",
  name: "Naam van de plek",
  city: "vlissingen",          // vlissingen | middelburg | around
  category: "goingout",        // zie CATEGORIES
  price: "free",               // free | € | €€
  coords: [51.4433, 3.5740],   // rechtsklik in Google Maps → coördinaten kopiëren
  description: "Korte beschrijving.",
  tip: "Optionele tip voor studenten.",
},
```

> Let op: de coördinaten zijn bij benadering en evenementdata verschillen per jaar.
> Controleer de inhoud voordat je de app echt aan studenten geeft.
