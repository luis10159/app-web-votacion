// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      inputStyle: 'filled',
    },
    components: {
      include: '*',
    },
    directives: {
      include: '*',
    }
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "/node_modules/primeflex/primeflex.css",
  ],

})
