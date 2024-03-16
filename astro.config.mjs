import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://chrismholland.com",
  output: "hybrid",
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  integrations: [db(), sitemap(), expressiveCode(), mdx(), tailwind()],
  adapter: cloudflare()
});