<script setup lang="ts">
const siteUrl = 'https://magnusenglund.com'

const { data: latestPosts } = await useAsyncData('latest-blog-posts', () => {
  return queryCollection('blogg').order('date', 'DESC').limit(5).all()
})

useSeoMeta({
  title: 'Magnus Englund | Socialliberal politik i vardagen',
  description: 'Personlig politisk webbplats med idéer om skola, integration och socialliberal samhällsutveckling.',
  ogTitle: 'Magnus Englund | Socialliberal politik i vardagen',
  ogDescription: 'Läs om skolpolitik, integration och socialliberala perspektiv i bloggen.',
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
    <header class="page-intro">
      <h1>Magnus Englund</h1>
      <p>
        Socialliberal röst för ett öppet, ansvarstagande och framtidsinriktat Sverige.
        Här samlar jag texter om skolan, integrationen och hur vi stärker tilliten i samhället.
      </p>
      <NuxtLink to="/blogg" class="cta">Läs bloggen</NuxtLink>
    </header>

    <section>
      <h2>Senaste inlägg</h2>
      <BlogList :posts="latestPosts || []" />
    </section>
  </section>
</template>
