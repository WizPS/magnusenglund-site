<script setup lang="ts">
defineProps<{
  post: {
    title: string
    description: string
    date: string
    slug: string
  }
}>()

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <article class="blog-card">
    <p class="blog-card-date">{{ formatDate(post.date) }}</p>
    <h2 class="blog-card-title">
      <NuxtLink :to="`/blogg/${post.slug}`">{{ post.title }}</NuxtLink>
    </h2>
    <p class="blog-card-description">{{ post.description }}</p>
  </article>
</template>
