import type { MarkdownInstance } from 'astro'

export const filterDrafts = (
  posts: Array<MarkdownInstance<Record<string, any>>>
): Array<MarkdownInstance<Record<string, any>>> => {
  if (!import.meta.env.DEV) {
    return posts.filter((post) => !post.frontmatter.draft)
  } else {
    return posts
  }
}

export const toTitleCase = (str: string) =>
  str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

export const renderDate = (date: Date, full: boolean = true) => {
  if (full) {
    return date.toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } else {
    return date.toLocaleDateString('en')
  }
}

export const getAllUniqueTags = (allPosts: any) => {
  const uniqueTags = [
    ...new Set(allPosts.map((post: any) => post.data.tags).flat())
  ]
  return uniqueTags
}

export const byTime = (a: any, b: any, desc: boolean = true): number => {
  if (desc) {
    return b.data.pubDate.getTime() - a.data.pubDate.getTime()
  } else {
    return a.data.pubDate.getTime() - b.data.pubDate.getTime()
  }
}
