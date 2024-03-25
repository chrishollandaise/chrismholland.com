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
  site: 'https://chrismholland.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
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
