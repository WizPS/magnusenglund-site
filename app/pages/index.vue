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

<style scoped>
.home-hero {
  max-width: 760px;
  padding: 2.5rem 0 2rem;
}

.home-hero h1 {
  max-width: 12ch;
  margin-bottom: 1rem;
  font-size: clamp(2.4rem, 7vw, 4.4rem);
}

.home-hero > p:not(.eyebrow) {
  max-width: 66ch;
  font-size: 1.15rem;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cta {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  font-weight: 600;
}

.cta-secondary {
  background: color-mix(in srgb, var(--card) 70%, transparent);
}

.home-actions .cta {
  margin-top: 0.5rem;
}

.home-pillars,
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

.info-card .eyebrow {
  margin-bottom: 0.25rem;
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

.text-link {
  display: inline-block;
  margin-top: 1rem;
  font-weight: 700;
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
  .home-pillars,
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>

