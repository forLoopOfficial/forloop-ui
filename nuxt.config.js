require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  env: {
    firebaseApiUrl: process.env.FIREBASE_API_URL,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET
  },
  /*
  ** Router config
  */
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'forloop Africa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'forLoop Africa' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css'
      }
    ],
    script: [
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyAcjFtRHmXguek060FhPql3KH_--AXoEjs'
      },
      { src: 'https://platform.twitter.com/widgets.js' }
    ]
  },
  // css: ['@/assets/sass/app.scss'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    vendor: [
      'axios',
      'firebase/app',
      'firebase/auth',
      'algoliasearch',
      'jquery',
      'bootstrap',
      'lodash'
    ],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: 'popper.js'
      })
    ]
  },
  plugins: [
    '~plugins/filters.js',
    '~plugins/bootstrap-setup.js',
    { src: '~plugins/firebase.js', ssr: false }
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/toast', 'bootstrap-vue/nuxt'],
  axios: {
    baseURL: process.env.API_URL,
    credentials: false
    // debug: true
  }
};
