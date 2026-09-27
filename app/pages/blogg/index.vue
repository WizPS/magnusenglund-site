<!-- index.vue -->
<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Frihet · ansvar · idédebatt</p>
      <h1>Blogg</h1>
      <p>
        Här blandas personliga erfarenheter med politiska analyser om liberalism, skola, försvar,
        värdeskapande och samhällsengagemang. Ibland varvas texterna också med musik, när en låt
        eller en text bär på en särskild personlig eller samhällelig betydelse. Inläggen är sorterade
        med senaste först.
      </p>
    </header>

    <BlogList :posts="posts || []" />
  </section>
</template>
<script setup>

const siteUrl = 'https://magnusenglund.com'

const { data: posts } = await useAsyncData('all-blog-posts', () => {
  return queryCollection('blogg').order('date', 'DESC').all()
})

useSeoMeta({
  title: 'Blogg | Magnus Englund',
  description: 'Texter av Magnus Englund om frihet, liberalism, skola, försvar, värdeskapande och samhällsengagemang.',
  ogTitle: 'Blogg | Magnus Englund',
  ogDescription: 'Läs Magnus Englunds texter om frihet, ansvar, liberalism och ett värdefullare samhälle.',
  ogType: 'website',
  ogUrl: siteUrl + '/blogg',
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/blogg' }]
})
</script>

<style scoped>
.page-intro {
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>

