// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://magnusenglund.com',
    name: 'Magnus Englund'
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blogg', '/om-magnus']
    }
  },
  routeRules: {
    '/**': { prerender: true }
  }
})
