<script setup lang="ts">
defineProps<{
  posts: Array<{
    title: string
    description: string
    date: string
    slug: string
  }>
}>()
</script>

<template>
  <section class="blog-list">
    <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
  </section>
</template>
