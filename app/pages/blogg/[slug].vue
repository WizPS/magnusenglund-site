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
<script setup lang="ts">
type BlogPost = {
  title: string
  description: string
  date: string
  slug: string
}

const route = useRoute()
const siteUrl = 'https://magnusenglund.com'
const slug = route.params.slug as string

const { data: post } = await useAsyncData<BlogPost | null>(`blog-post-${slug}`, () => {
  return queryCollection('blogg').where('slug', '=', slug).first() as Promise<BlogPost | null>
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

<style scoped>
.page-intro {
  margin-bottom: 1.5rem;
}

.blog-post-meta {
  margin-bottom: 1.25rem;
  color: var(--muted);
}

.blog-post-content {
  max-width: 760px;
}

.blog-post-content img {
  display: block;
  width: 100%;
  height: auto;
  margin: 1.5rem 0 2rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgb(26 42 26 / 10%);
}

.video-embed {
  position: relative;
  aspect-ratio: 16 / 9;
  margin: 1.5rem 0 2rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #17251b;
  box-shadow: 0 8px 24px rgb(26 42 26 / 10%);
}

.video-embed iframe {
  display: block;
  width: 100%;
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

