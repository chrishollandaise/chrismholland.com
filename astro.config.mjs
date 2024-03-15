import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://chrismholland.com",
  output: "server",
  integrations: [db(), sitemap(), expressiveCode(), mdx(), tailwind()]
});