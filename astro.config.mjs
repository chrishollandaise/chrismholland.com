import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://chrismholland.com",
  output: "server",
  integrations: [db(), sitemap()]
});