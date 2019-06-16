const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '教官ブートキャンプ！スプラトゥーン2 ブキおみくじ｜心の中の教官がバトルのお題を出してくれます',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'description', content: '心の中の教官がバトルのお題を出してくれるよ！（たまに地獄みたいな結果が出ます）' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:image', content: 'https://ikamikuji.inudog.me/img/ogp_tw.png' },
      { property: 'og:title', content: '教官ブートキャンプ！スプラトゥーン2 ブキおみくじ｜心の中の教官がバトルのお題を出してくれます' },
      { property: 'og:description', content: '心の中の教官がバトルのお題を出してくれるよ！（たまに地獄みたいな結果が出ます）' },
      { property: 'og:url', content: 'https://ikamikuji.inudog.me/' },
      { property: 'og:image', content: 'https://ikamikuji.inudog.me/img/ogp_fb.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/favicon/apple-touch-icon.png' },
      { rel: 'icon" type="image/png', sizes: '32x32', href: '/img/favicon/favicon-32x32.png' },
      { rel: 'icon" type="image/png', sizes: '16x16', href: '/img/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/img/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/img/favicon/safari-pinned-tab.svg" color="#5bbad5' },
      { rel: 'shortcut icon', href: '/img/favicon/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
   css: [
     '@/assets/css/_style.scss'
   ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/node_modules/gsap/all.js', ssr: false },
    { src: '@/plugins/Vue2TouchEvents.js' },
    { src: '@/plugins/firebase.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
   // your settings here
    scss: [
      '@/assets/css/_parts/_variables.scss',
      '@/assets/css/_parts/_function.scss',
    ],
    less: [],
    stylus: []
   },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
