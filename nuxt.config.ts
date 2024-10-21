// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            appHost: process.env.APP_HOST
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            link: [],
            script: []
        }
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    css: ['~/assets/sass/app.scss'],
    modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/icon']
})
