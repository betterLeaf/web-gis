import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: () => import("../components/HelloWorld.vue"),
  },

  {
    path: "/openlayers",
    name: "openlayers",
    redirect: "/openlayers/echarts",
    // component: () => import("../views/echarts.vue"),
    children: [
      {
        path: "/openlayers/echarts",
        name: "echarts",
        component: () => import("../views/echarts.vue"),
      },
      {
        path: "/openlayers/echartsline",
        name: "echartsline",
        component: () => import("../views/echartsLine.vue"),
      },
      {
        path: "/openlayers/echartsline2",
        name: "echartsline2",
        component: () => import("../views/echartsLine2.vue"),
      },
      {
        path: "/openlayers/area",
        name: "area",
        component: () => import("../views/area.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
