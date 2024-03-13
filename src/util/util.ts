import type { MarkdownInstance } from "astro"

export const filterDrafts = (posts: Array<MarkdownInstance<Record<string, any>>>): Array<MarkdownInstance<Record<string, any>>> => {
    if (!import.meta.env.DEV) {
        return posts.filter(post => !post.frontmatter.draft)
    } else {
        return posts
    }
}