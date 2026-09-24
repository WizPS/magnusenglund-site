<script setup lang="ts">
type BlogPost = {
  title: string
  description: string
  date: string
  slug: string
}

const siteUrl = 'https://magnusenglund.com'

const { data: latestPosts } = await useAsyncData<BlogPost[]>('latest-blog-posts', () => {
  return queryCollection('blogg').order('date', 'DESC').limit(5).all() as Promise<BlogPost[]>
})

useSeoMeta({
  title: 'Magnus Englund | Frihet, ansvar och värdeskapande',
  description: 'Magnus Englund om pricing, värdeskapande, samhällsengagemang och ett värdefullare Helsingborg.',
  ogTitle: 'Magnus Englund | Frihet, ansvar och värdeskapande',
  ogDescription: 'Lär känna Magnus Englund och läs om pricing, fria röster, samhällsengagemang och Helsingborg.',
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/' }]
})
</script>

<template>
  <section>
    <header class="home-hero">
      <p class="eyebrow">Frihet · ansvar · värdeskapande</p>
      <h1>Ett värdefullare Helsingborg – och ett rikare liv</h1>
      <p>
        Jag heter Magnus Englund. Här samlar jag tankar om hur människor, företag och samhälle
        kan skapa mer värde med de resurser vi faktiskt har – och om friheten, ansvaret och
        engagemanget som gör det möjligt.
      </p>
      <div class="home-actions">
        <NuxtLink to="/om-magnus" class="cta">Lär känna Magnus</NuxtLink>
        <NuxtLink to="/analys/val-2026" class="cta cta-secondary">Se valanalysen</NuxtLink>
      </div>
    </header>

    <section class="home-pillars" aria-label="Huvudområden">
      <NuxtLink to="/pricing" class="info-card">
        <p class="eyebrow">Yrke och idéer</p>
        <h2>Pricing &amp; värdeskapande</h2>
        <p>Om att förstå vad som faktiskt skapar värde – för kunden, invånaren och organisationen.</p>
      </NuxtLink>
      <NuxtLink to="/engagemang" class="info-card">
        <p class="eyebrow">Helsingborg</p>
        <h2>Engagemang</h2>
        <p>Om demokrati, ansvar, brottsofferstöd och ett samhälle som fungerar i vardagen.</p>
      </NuxtLink>
      <NuxtLink to="/valet-2026" class="info-card">
        <p class="eyebrow">Arkiv</p>
        <h2>Valet 2026</h2>
        <p>Bakgrunden till kandidaturen och tankarna om ett värdefullare Helsingborg.</p>
      </NuxtLink>
    </section>

    <section class="page-section">
      <h2>Senaste inlägg</h2>
      <BlogList :posts="latestPosts || []" />
      <NuxtLink to="/blogg" class="text-link">Läs alla texter →</NuxtLink>
    </section>
  </section>
</template>
