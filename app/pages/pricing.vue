<script setup lang="ts">
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
