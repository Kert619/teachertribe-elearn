// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE_URL,
    },
  },
  app: {
    head: {
      title: "Teacher Tribe - eLearn",
    },
  },
  modules: ["@pinia/nuxt", "@vee-validate/nuxt", "@nuxt/image"],
  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs: ["./stores"],
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      watch: { usePolling: true },
    },
  },
});