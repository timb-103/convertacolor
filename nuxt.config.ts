export default defineNuxtConfig({
  ssr: false,
  // ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          id: "favicon",
          href: "/favicon.ico",
          type: "image/x-icon",
        },
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/images/apple-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/images/apple-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/images/apple-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/images/apple-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/images/apple-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/images/apple-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/images/apple-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/images/apple-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/apple-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/images/android-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/images/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/images/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/images/favicon-16x16.png",
        },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#ffffff" },
        {
          name: "msapplication-TileImage",
          content: "/images/ms-icon-144x144.png",
        },
        { name: "theme-color", content: "#ffffff" },
      ],
      bodyAttrs: {
        id: "root_body",
      },
    },
  },
  spaLoadingTemplate: "spa-loading-template.html",
  css: ["@/assets/css/global.css"],
  modules: ["@nuxtjs/plausible", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    viewer: false,
  },
  nitro: {
    routeRules: {
      "/": { ssr: true },
    },
    prerender: {
      ignore: ["/manifest.json"],
    },
  },
  typescript: {
    typeCheck: "build",
  },
  runtimeConfig: {},
  routeRules: {},
  compatibilityDate: "2024-09-23",
});
