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
  description: 'Alla blogginlägg av Magnus Englund om skola, integration och socialliberala reformer.',
  ogTitle: 'Blogg | Magnus Englund',
  ogDescription: 'Läs samtliga politiska blogginlägg av Magnus Englund.',
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
      <h1>Blogg</h1>
      <p>Här hittar du alla inlägg, sorterade med senaste först.</p>
    </header>

    <BlogList :posts="posts || []" />
  </section>
</template>
