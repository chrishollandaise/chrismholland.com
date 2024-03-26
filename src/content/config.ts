import { z, defineCollection } from 'astro:content'

const blogSchema = z.object({
  title: z.string().max(60, 'Keep title under 60 characters'),
  description: z.string().max(160, 'Keep description under 160 characters'),
  pubDate: z.date(),
  draft: z.boolean(),
  // take care of any duplicate tags here
  tags: z.array(z.string()).transform((arr) => Array.from(new Set(arr))),
  ogImage: z.string().optional()
})

export type BlogSchema = z.infer<typeof blogSchema>

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema
})

const miscCollection = defineCollection({
  type: 'content'
})

export const collections = {
  blog: blogCollection,
  misc: miscCollection
}
