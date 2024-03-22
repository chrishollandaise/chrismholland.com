import { z, defineCollection } from 'astro:content'

const blogSchema = z.object({
  title: z.string().max(60, 'Keep title under 60 characters'),
  description: z.string().max(160, 'Keep description under 160 characters'),
  pubDate: z.date(),
  draft: z.boolean(),
  // take care of any duplicate tags here
  tags: z.array(z.string()).transform((arr) => Array.from(new Set(arr)))
})

export type BlogSchema = z.infer<typeof blogSchema>

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema
})

export const collections = {
  blog: blogCollection
}
