<template>
    <div class="left bg-base-200 w-56 h-[100vh] fixed z-50">
        <ul class="menu  rounded-box">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li v-for="(item, index) in routerArr" :key="index">
                <details>
                    <summary>{{ item.name }}</summary>
                    <ul>
                        <li v-for="(cItem, cIndex) in item.children" :key="cIndex"><router-link :to="cItem.path">{{
                cItem.name
            }}</router-link></li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
let routerArr = reactive([
    {
        name: "openlayers",
        children: [
            {
                name: "PM2.5",
                path: "/openlayers/echarts"
            },
            {
                name: "迁徙图",
                path: "/openlayers/echartsline"
            },
            {
                name: "china高亮",
                path: "/openlayers/area"
            },
            {
                name: "省份高亮",
                path: "/openlayers/province"
            },
            {
                name: "geojson",
                path: "/openlayers/geojson"
            },
            // {
            //     name: "地图轨迹",
            //     path: "/openlayers/path"
            // },
            {
                name: "出去玩（全国版）",
                path: "/openlayers/path-province"
            }
        ]
    },

    {
        name: "l7",
        children: [
            {
                name: "天气",
                path: "/l7/init"
            },
            {
                name: "line",
                path: "/l7/line"
            },
            {
                name: "windlayer",
                path: "/l7/windlayer"
            },
          {
            name: "综合案例",
            path: "/l7/example1"
          },
        ]
    },

    {
        name: "three",
        children: [
            {
                name: "Demo1",
                path: "/three/demo1"
            },
            {
                name: "phone",
                path: "/three/phone"
            },
        ]
    },
  {
    name: "cesium",
    children: [
      {
        name: "Demo1",
        path: "/cesium/demo1"
      },
    ]
  }
])
</script>