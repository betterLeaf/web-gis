import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/three",
    name: "three",
    redirect: "/three/demo1",
    children: [
      {
        path: "/three/demo1",
        name: "three-demo1",
        component: () => import("../views/three/demo1.vue"),
      },
      {
        path: "/three/phone",
        name: "three-phone",
        component: () => import("../views/three/phone.vue"),
      }
    ]
  },


  {
    path: "/l7",
    name: "l7",
    redirect: "/l7/init",
    children: [
      {
        path: "/l7/init",
        name: "l7-init",
        component: () => import("../views/l7/init.vue"),
      },
      {
        path: "/l7/line",
        name: "l7-line",
        component: () => import("../views/l7/line.vue"),
      },
      {
        path: "/l7/windlayer",
        name: "l7-windlayer",
        component: () => import("../views/l7/windlayer.vue"),
      },
      {
        path: "/l7/example1",
        name: "l7-example1",
        component: () => import("../views/l7/example1.vue"),
      },

    ]
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
      // {
      //   path: "/openlayers/path",
      //   name: "path",
      //   component: () => import("../views/path.vue"),
      // },
      {
        path: "/openlayers/path-province",
        name: "path",
        component: () => import("../views/openlayers/pathProvince.vue"),
      },
      
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
