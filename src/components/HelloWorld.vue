<script setup>
import { ref, onMounted } from "vue"
import 'ol/ol.css'; // 引入OpenLayers样式表
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = ref(null) // 存放地图实例

function initMap() {
  // 地图实例
  map.value = new Map({
    target: 'map',                         // 对应页面里 id 为 map 的元素
    layers: [                              // 图层
      new TileLayer({                      // 使用瓦片渲染方法
        source: new OSM()                  // 图层数据源
      })
    ],
    view: new View({                       // 地图视图
      projection: "EPSG:4326",             // 坐标系，有EPSG:4326和EPSG:3857
      center: [114.064839, 22.548857],     // 深圳坐标
      minZoom: 10,                          // 地图缩放最小级别
      zoom: 16                             // 地图缩放级别（打开页面时默认级别）
    })
  })
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
