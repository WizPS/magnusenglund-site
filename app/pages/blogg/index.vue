<script setup lang="ts">
type BlogPost = {
  title: string
  description: string
  date: string
  slug: string
}

const siteUrl = 'https://magnusenglund.com'

const { data: posts } = await useAsyncData<BlogPost[]>('all-blog-posts', () => {
  return queryCollection('blogg').order('date', 'DESC').all() as Promise<BlogPost[]>
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

<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Frihet · ansvar · idédebatt</p>
      <h1>Blogg</h1>
      <p>
        Här blandas personliga erfarenheter med politiska analyser om liberalism, skola, försvar,
        värdeskapande och samhällsengagemang. Inläggen är sorterade med senaste först.
      </p>
    </header>

    <BlogList :posts="posts || []" />
  </section>
</template>
