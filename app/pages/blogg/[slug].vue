<!-- [slug].vue -->
<template>
  <article v-if="post">
    <header class="page-intro">
      <h1>{{ post.title }}</h1>
      <p class="blog-post-meta">Publicerad {{ formatDate(post.date) }}</p>
    </header>

    <div class="blog-post-content">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>
<script setup>

const route = useRoute()
const siteUrl = 'https://magnusenglund.com'
const slug = String(route.params.slug)

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

const formatDate = (value) => {
  return new Date(value).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.page-intro {
  margin-bottom: 1.5rem;
}

.blog-post-meta {
  margin-bottom: 1.25rem;
  color: var(--muted);
}

.blog-post-content {
  min-width: 0;
  max-width: 760px;
}

:deep(.blog-post-content img) {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: 1.5rem 0 2rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgb(26 42 26 / 10%);
}

:deep(.video-embed) {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  aspect-ratio: 16 / 9;
  margin: 1.5rem 0 2rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #17251b;
  box-shadow: 0 8px 24px rgb(26 42 26 / 10%);
}

:deep(.video-embed iframe) {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  border: 0;
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

