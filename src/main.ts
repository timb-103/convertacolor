import "./assets/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";

const head = createHead();

/** @description redirect for old urls */
const hash = window.location.hash;
if (hash.startsWith("#/hex/")) {
  const hexValue = hash.split("/")[2];
  const queryString = `?hex=${hexValue}`;
  window.location.replace(`/${queryString}`);
}

createApp(App).use(router).use(head).mount("#app");
