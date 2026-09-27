<!-- BlogCard.vue -->
<template>
  <article class="blog-card">
    <NuxtLink v-if="post.image" :to="`/blogg/${post.slug}`" class="blog-card-image-link">
      <img :src="post.image" :alt="post.title" class="blog-card-image">
    </NuxtLink>
    <p class="blog-card-date">{{ formatDate(post.date) }}</p>
    <h2 class="blog-card-title">
      <NuxtLink :to="`/blogg/${post.slug}`">{{ post.title }}</NuxtLink>
    </h2>
    <p class="blog-card-description">{{ post.description }}</p>
  </article>
</template>
<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
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
.blog-card {
  padding: 1rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card);
}

.blog-card-date {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.blog-card-image-link {
  display: block;
  margin: -1rem -1.1rem 1rem;
}

.blog-card-image {
  display: block;
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.blog-card-title {
  margin: 0.3rem 0;
  font-size: 1.3rem;
}

.blog-card-description {
  margin: 0;
  color: var(--muted);
}
</style>

