import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import { squooshImageService } from 'astro/config'
import compress from 'astro-compress'

export default defineConfig({
  site: import.meta.env.PROD
    ? 'https://chrismholland.com'
    : 'http://localhost:4321',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  redirects: {
    project: '/tags/project'
  },
  integrations: [
    sitemap(),
    expressiveCode(),
    mdx(),
    icon({
      include: {
        mdi: [
          'twitter',
          'github',
          'linkedin',
          'discord',
          'tags',
          'close',
          'hamburger-menu',
          'arrow-left-thin',
          'magnify',
          'rss'
        ]
      }
    }),
    tailwind(),
    partytown({ debug: false }),
    compress()
  ],
  markdown: {
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  },
  image: {
    service: squooshImageService()
  }
})
