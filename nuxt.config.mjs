// nuxt.config.js
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
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:7071',
          changeOrigin: true
        }
      }
    }
  }
})
