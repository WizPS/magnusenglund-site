import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blogg: defineCollection({
      type: 'page',
      source: 'blogg/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        slug: z.string()
      })
    })
  }
})
