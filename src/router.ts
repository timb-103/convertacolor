import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Home from "./pages/index.vue";
import RgbToHex from "./pages/hex-to-rgb.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/rgb-to-hex", component: RgbToHex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
