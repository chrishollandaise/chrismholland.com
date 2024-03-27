// influenced by https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/pages/og-image/%5Bslug%5D.png.ts
import type { APIContext, InferGetStaticPropsType } from 'astro'
import satori, { type SatoriOptions } from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import { getCollection } from 'astro:content'
import { OG_BASE64 } from '../../util/general'
import { getFont } from '../../util/getFont'
import GithubSlugger from 'github-slugger'

const Inter = await getFont({
  family: 'IBM Plex Sans',
  weights: [700] as const
})

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Inter',
      data: Inter[700],
      weight: 700
    }
  ]
}

const markup = (title: string) =>
  html`<div
    style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-size: 72px; font-weight: 600;"
  >
    <img style="position: absolute;" src="${OG_BASE64}" />
    <div
      style="width: 65%; transform: translateX(31%); height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem; text-wrap: balance;"
    >
      ${title}
    </div>
    <div
      style="position: absolute; font-size: 40px; right: 0; bottom: 0; opacity: 0.3;"
    >
      chrismholland.com
    </div>
  </div>`

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export async function GET(context: APIContext) {
  const { title } = context.props as Props

  //@ts-ignore
  const svg = await satori(markup(title), ogOptions)
  const png = new Resvg(svg).render().asPng()
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts
    .filter(({ data }) => !data.ogImage)
    .map((post: any) => ({
      params: { slug: new GithubSlugger().slug(post.data.title) },
      props: {
        title: post.data.title
      }
    }))
}
