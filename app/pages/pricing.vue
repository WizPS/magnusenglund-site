<!-- pricing.vue -->
<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Yrke och idéer</p>
      <h1>Pricing &amp; värdeskapande</h1>
      <p class="lead">
        Pricing handlar inte bara om att sätta ett pris. Det handlar om att förstå vilket värde
        som skapas, för vem det skapas och hur resurser kan användas så att värdet når fram.
      </p>
    </header>

    <div class="content-prose">
      <h2>Från kostnad till värde</h2>
      <p>
        Under större delen av mitt yrkesliv har jag arbetat med pricing, AI, värdeskapande och
        Value Management i internationella industribolag. Där blir en skillnad särskilt tydlig:
        kostnaden uppstår hos den som levererar, men värdet uppstår hos den som tar emot och
        använder det som levereras.
      </p>
      <p>
        Det förändrar frågorna man behöver ställa. Vad är viktigt för mottagaren? Vilken effekt
        vill vi skapa? Hur vet vi att vi faktiskt har skapat den? Och hur undviker vi att lägga
        tid och pengar på sådant som inte gör någon verklig skillnad?
      </p>

      <h2>En erfarenhet som går att ta med utanför näringslivet</h2>
      <p>
        En kommunal budget visar hur mycket pengar organisationen använder. Den visar inte i sig
        hur mycket kunskap, trygghet, frihet eller livskvalitet helsingborgaren får tillbaka.
        Därför behöver vi prata mer om resultat och mindre om organisationens storlek.
      </p>
      <p>
        Samma tänk kan användas i skolan, äldreomsorgen, socialtjänsten och stadsmiljön:
        identifiera vad som är viktigt, använd resurserna klokt och följ upp om de verkligen
        gör nytta. Målet är inte att alltid göra mer, utan att göra rätt saker bättre.
      </p>

      <aside class="callout">
        <h2>Min utgångspunkt</h2>
        <p>
          Helsingborg blir inte rikare för att kommunen omsätter mer pengar eller bygger en
          större organisation. Helsingborg blir rikare när människorna som bor här får ett
          enklare och rikare liv.
        </p>
      </aside>

      <h2>Vad kommer härnäst?</h2>
      <p>
        Jag kommer att fylla på med fler exempel från pricing och Value Management – bland annat
        hur man kan formulera värdeerbjudanden, mäta effekt och skilja på aktivitet och verkligt
        resultat. Det är frågor som är användbara både i företag och i samhällsdebatten.
      </p>
    </div>

    <section class="link-grid page-section" aria-label="Relaterat innehåll">
      <NuxtLink to="/om-magnus" class="info-card">
        <h2>Om Magnus</h2>
        <p>Bakgrunden mellan Radio Öresund, luftförsvar och värdeskapande.</p>
      </NuxtLink>
      <NuxtLink to="/engagemang" class="info-card">
        <h2>Engagemang</h2>
        <p>Hur tankarna om värde hänger ihop med Helsingborg och demokratin.</p>
      </NuxtLink>
      <NuxtLink to="/blogg" class="info-card">
        <h2>Fördjupa dig</h2>
        <p>Läs fler texter om värde, frihet och ansvar.</p>
      </NuxtLink>
    </section>
  </section>
</template>
<script setup>
const siteUrl = 'https://magnusenglund.com'

useSeoMeta({
  title: 'Pricing och värdeskapande | Magnus Englund',
  description: 'Tankar om pricing, Value Management och hur resurser kan omsättas i verkligt värde.',
  ogTitle: 'Pricing och värdeskapande | Magnus Englund',
  ogDescription: 'Om skillnaden mellan kostnad och värde – och varför mottagarens nytta är det viktiga.',
  ogType: 'website',
  ogUrl: siteUrl + '/pricing',
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/pricing' }]
})
</script>

<style scoped>
.page-intro {
  margin-bottom: 1.5rem;
}

.lead {
  font-size: 1.15rem;
}

.content-prose {
  max-width: 720px;
}

.content-prose h2 {
  margin-top: 2rem;
}

.content-prose h2:first-child {
  margin-top: 0;
}

.callout,
.archive-note {
  margin: 2rem 0;
  padding: 1.25rem 1.35rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  background: var(--bg-soft);
}

.callout h2 {
  margin-top: 0;
}

.callout p:last-child,
.archive-note p:last-child {
  margin-bottom: 0;
}

.archive-note strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 1.1rem;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.info-card {
  display: block;
  padding: 1.15rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  background: color-mix(in srgb, var(--card) 88%, transparent);
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}

.info-card:hover,
.info-card:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 8px 20px rgb(26 42 26 / 8%);
  text-decoration: none;
  transform: translateY(-2px);
}

.info-card h2,
.info-card h3 {
  margin-bottom: 0.4rem;
  font-size: 1.25rem;
}

.info-card p:last-child {
  margin-bottom: 0;
  color: var(--muted);
}

.page-section {
  margin-top: 2.75rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>

