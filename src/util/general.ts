export const toTitleCase = (str: string) =>
  str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

export const renderDate = (date: Date, full: boolean = true) => {
  if (full) {
    return date.toLocaleDateString('en', {
      month: 'long',
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

export const filterDrafts = (post: any): boolean => {
  return import.meta.env.PROD ? (post.data.draft ? false : true) : true
}
