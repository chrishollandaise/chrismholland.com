import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://chrismholland.com",
  output: "hybrid",
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  integrations: [db(), sitemap(), expressiveCode(), mdx(), icon({
    include: {
      "carbon": ["terminal", "keyboard"]
    }
  }), tailwind()],
  adapter: cloudflare()
});