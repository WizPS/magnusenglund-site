// nitro.config.js
export default {
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
  },
  routeRules: {
    '/**': { prerender: true }
  }
}
