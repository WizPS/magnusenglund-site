<script setup lang="ts">
type CommentItem = {
  id?: string
  name: string
  text: string
  createdAt: string
  pagePath?: string
}

const props = withDefaults(defineProps<{
  pagePath?: string
  title?: string
  intro?: string
}>(), {
  title: 'Vad tänker du?',
  intro: 'Skriv gärna en kommentar. Ange det namn du själv vill visa. Kommentaren publiceras direkt.'
})

const route = useRoute()
const comments = ref<CommentItem[]>([])
const commentName = ref('')
const commentText = ref('')
const commentsLoading = ref(true)
const commentSubmitting = ref(false)
const commentsMessage = ref('')
const currentPagePath = computed(() => props.pagePath || route.path)

const formatCommentDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('sv-SE', { dateStyle: 'medium' }).format(date)
}

const loadComments = async () => {
  commentsLoading.value = true
  commentsMessage.value = ''

  try {
    const result = await $fetch<{ comments: CommentItem[] }>('/api/comments', {
      query: { page: currentPagePath.value }
    })
    comments.value = result.comments || []
  } catch {
    commentsMessage.value = 'Kommentarerna kunde inte läsas in just nu.'
  } finally {
    commentsLoading.value = false
  }
}

const submitComment = async () => {
  commentsMessage.value = ''
  const name = commentName.value.trim()
  const text = commentText.value.trim()

  if (!name || !text) {
    commentsMessage.value = 'Fyll i både namn och kommentar.'
    return
  }

  commentSubmitting.value = true
  try {
    const result = await $fetch<{ comment: CommentItem }>('/api/comments', {
      method: 'POST',
      body: { name, text, page: currentPagePath.value }
    })
    comments.value = [result.comment, ...comments.value]
    commentName.value = ''
    commentText.value = ''
    commentsMessage.value = 'Tack för din kommentar.'
  } catch {
    commentsMessage.value = 'Kommentaren kunde inte sparas just nu. Försök igen.'
  } finally {
    commentSubmitting.value = false
  }
}

onMounted(loadComments)
watch(currentPagePath, loadComments)
</script>

<template>
  <section class="comments-section" aria-labelledby="comments-heading">
    <p class="eyebrow">Din kommentar</p>
    <h2 id="comments-heading">{{ props.title }}</h2>
    <p class="comments-intro">{{ props.intro }}</p>

    <form class="comment-form" @submit.prevent="submitComment">
      <label for="comment-name">Namn</label>
      <input id="comment-name" v-model="commentName" name="name" maxlength="80" autocomplete="name" required>

      <label for="comment-text">Kommentar</label>
      <textarea id="comment-text" v-model="commentText" name="comment" maxlength="2000" rows="5" required />

      <button type="submit" :disabled="commentSubmitting">
        {{ commentSubmitting ? 'Sparar…' : 'Publicera kommentar' }}
      </button>
    </form>

    <p v-if="commentsMessage" class="comments-message" aria-live="polite">{{ commentsMessage }}</p>
    <p v-if="commentsLoading" class="comments-muted">Läser in kommentarer…</p>
    <p v-else-if="!comments.length" class="comments-muted">Det finns ännu inga kommentarer.</p>
    <div v-else class="comments-list" aria-label="Publicerade kommentarer">
      <article v-for="comment in comments" :key="comment.id || `${comment.createdAt}-${comment.name}`" class="comment-card">
        <div class="comment-meta">
          <strong>{{ comment.name }}</strong>
          <time :datetime="comment.createdAt">{{ formatCommentDate(comment.createdAt) }}</time>
        </div>
        <p>{{ comment.text }}</p>
      </article>
    </div>
  </section>
</template>
