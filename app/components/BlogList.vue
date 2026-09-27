<template>
  <section class="blog-list">
    <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
  </section>
</template>
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

<style scoped>
.blog-list {
  display: grid;
  gap: 1rem;
}
</style>

