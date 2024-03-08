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
        name: "echarts-line",
        component: () => import("../views/echartsLine.vue"),
      },
      {
        path: "/openlayers/echartsline2",
        name: "echarts-line2",
        component: () => import("../views/echartsLine2.vue"),
      },
      {
        path: "/openlayers/area",
        name: "area",
        component: () => import("../views/area.vue"),
      },
      {
        path: "/openlayers/geojson",
        name: "geojson",
        component: () => import("../views/geojson/index.vue"),
      },
      {
        path: "/openlayers/province",
        name: "province",
        component: () => import("../views/province.vue"),
      },
      {
        path: "/openlayers/path",
        name: "path",
        component: () => import("../views/path.vue"),
      },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
