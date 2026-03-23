<script setup lang="ts">
const route = useRoute()
const siteUrl = 'https://magnusenglund.com'
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-post-${slug}`, () => {
  return queryCollection('blogg').where('slug', '=', slug).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Inlägget hittades inte',
    fatal: true
  })
}

const canonical = `${siteUrl}/blogg/${slug}`

useSeoMeta({
  title: `${post.value.title} | Magnus Englund`,
  description: post.value.description,
  ogTitle: `${post.value.title} | Magnus Englund`,
  ogDescription: post.value.description,
  ogType: 'article',
  ogUrl: canonical,
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: canonical }]
})

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <article v-if="post">
    <header class="page-intro">
      <h1>{{ post.title }}</h1>
      <p class="blog-post-meta">Publicerad {{ formatDate(post.date) }}</p>
    </header>

    <ContentRenderer :value="post" />
  </article>
</template>
