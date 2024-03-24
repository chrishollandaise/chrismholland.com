/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const { scopedPreflightStyles } = require('tailwindcss-scoped-preflight')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  corePlugins: {
    preflight: false
  },
  plugins: [
    scopedPreflightStyles({
      cssSelector: '.twp'
    }),
    require('autoprefixer')
  ],
  important: true,
  theme: {
    colors: { 'bahunya-gold': '#e3bc5e', ...colors },
    screens: { xs: { max: '520px' }, ...defaultTheme.screens }
  }
}
