# Projektregler

## Vue och Nuxt

- Använd alltid Vue Composition API med `<script setup>`.
- Använd inte Options API eller `export default` i Vue-komponenter.
- TypeScript är inte projektstandard. Använd `<script setup>` utan `lang="ts"` om inte den befintliga filen redan använder TypeScript eller uppgiften uttryckligen kräver det.
- Alla skapade eller ändrade kodfiler ska ha filnamnet som kommentar på första raden:
  - Vue/HTML: `<!-- filename.vue -->`
  - JavaScript: `// filename.js`
  - TypeScript: `// filename.ts`
- Ordningen i varje `.vue`-fil ska vara:
  1. `<template>`
  2. `<script setup>`
  3. `<style scoped>`
- Stilar som bara hör till en komponent eller sida ska ligga i dess `<style scoped>`-block, inte i `app/assets/css/main.css`.
- `main.css` ska endast innehålla verkligt globala regler, till exempel CSS-variabler, grundläggande reset, typografi och `body`-regler.
- När scoped CSS behöver styra ett internt PrimeVue-element ska `:deep(...)` användas.
- Befintliga avvikelser från dessa regler ska rättas när filerna berörs; de ska inte användas som mall för nya ändringar.

## Verifiering

- Kör `npm run dev` för löpande utveckling.
- Starta om devservern efter ändringar i beroenden, `nuxt.config.ts` eller miljövariabler.
- Kör `npm run build` inför publicering, efter större konfigurationsändringar eller när produktionsbygget behöver verifieras.
- Behåll befintligt beteende och responsivitet vid refaktorering.
