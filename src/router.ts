import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Home from "./pages/index.vue";
import HexToRgb from "./pages/hex-to-rgb.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/hex-to-rgb", component: HexToRgb },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
