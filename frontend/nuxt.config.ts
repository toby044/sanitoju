// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  routeRules: {
    "/**": { swr: process.env.NODE_ENV === "production" ? 3600 : false },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxtjs/sanity",
    "@unocss/nuxt",
  ],
  css: ["~/assets/css/main.css"],

  vite: {
    optimizeDeps: {
      include: [
        "@vueuse/core",
        "@sanity/client",
        "@sanity/image-url",
        "@q42/sanity-plugin-page-tree/client",
      ],
    },
  },

  runtimeConfig: {
    sanityWebhookSecret: process.env.SANITY_WEBHOOK_SECRET ?? "",
  },

  sanity: {
    projectId: "u13uvw6c",
    dataset: "production",
    apiVersion: "2025-10-01",
    useCdn: true,
    typegen: {
      enabled: true,
      schemaTypesPath: "../sanity/schemaTypes",
      queryPaths: ["./app/**/*.{ts,tsx,vue}"],
    },
  },
});
