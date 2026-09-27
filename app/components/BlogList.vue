<!-- BlogList.vue -->
<template>
  <section class="blog-list">
    <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
  </section>
</template>
<script setup>
defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.blog-list {
  display: grid;
  gap: 1rem;
}
</style>

