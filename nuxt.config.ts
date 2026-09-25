// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://magnusenglund.com',
    name: 'Magnus Englund'
  },
  nitro: {
    preset: 'static',
    devProxy: {
      '/api': {
        target: 'http://localhost:7071',
        changeOrigin: true
      }
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/blogg',
        '/om-magnus',
        '/pricing',
        '/engagemang',
        '/valet-2026',
        '/analys/val-2026'
      ]
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:7071',
          changeOrigin: true
        }
      }
    }
  },
  routeRules: {
    '/**': { prerender: true }
  }
})
