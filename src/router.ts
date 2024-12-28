import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Home from "./pages/index.vue";
import HexToRgb from "./pages/hex-to-rgb.vue";
import NotFound from "./pages/404.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/hex-to-rgb", component: HexToRgb },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
