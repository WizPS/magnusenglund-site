# Projektregler

## Vue och Nuxt

- Använd alltid Vue Composition API med `<script setup>`.
- Använd inte Options API eller `export default` i Vue-komponenter.
- TypeScript är förbjudet i projektets egna källfiler. Använd JavaScript och `<script setup>` utan `lang`-attribut. Skapa inte `.ts`, `.tsx`, `.mts`, `.cts` eller deklarationsfiler i projektet.
- Alla skapade eller ändrade kodfiler ska ha filnamnet som kommentar på första raden:
  - Vue/HTML: `<!-- filename.vue -->`
  - JavaScript: `// filename.js` eller `// filename.mjs`
- Ordningen i varje `.vue`-fil ska vara:
  1. `<template>`
  2. `<script setup>`
  3. `<style scoped>`
- Stilar som bara hör till en komponent eller sida ska ligga i dess `<style scoped>`-block, inte i `app/assets/css/main.css`.
- `main.css` ska endast innehålla verkligt globala regler, till exempel CSS-variabler, grundläggande reset, typografi och `body`-regler.
- När scoped CSS behöver styra ett internt PrimeVue-element ska `:deep(...)` användas.
- Befintliga avvikelser från dessa regler ska rättas när filerna berörs; de ska inte användas som mall för nya ändringar.
- Bygg inte in extra bakåtkompatibilitet, adapterlager eller parallella kodvägar vid ändringar. Föredra en tydlig och ren ändring framför att bevara gammalt beteende genom ytterligare lager; om ett gammalt API eller beteende inte längre gäller ska det tas bort tydligt.
- Återanvänd inte kod mekaniskt eller överdrivet. Håll implementationer korta, konsisa och fokuserade på det aktuella behovet.
- PrimeVue ska alltid användas för knappar och motsvarande gränssnittskomponenter när en passande komponent finns.
- Använd PrimeVues standardtema och standard-CSS först. Skapa egen CSS endast när standardutseendet inte räcker för ett tydligt användarbehov.
- Lokal CSS ska hållas till ett minimum. Undvik att återskapa PrimeVue-komponenters layout, färger, states eller interaktion med egen CSS.

## Verifiering

- Utvecklaren kör själv `npm run dev` och ser direkt i den aktiva utvecklingsmiljön om appen inte kompilerar.
- Starta inte om devservern om det inte behövs för den aktuella ändringen eller uttryckligen efterfrågas.
- Kör inte `npm run build`, `npm run generate` eller andra produktions-/paketeringskommandon om utvecklaren inte uttryckligen ber om det.
- Skapa inte tester, testfiler eller testinfrastruktur som inte uttryckligen efterfrågas. Utvecklaren testar kontinuerligt själv.
- Behåll befintligt beteende och responsivitet vid refaktorering.
