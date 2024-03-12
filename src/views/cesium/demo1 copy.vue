<template>
  <div id="cesiumContainer" class="w-full h-screen"></div>
</template>

<script setup>
import * as Cesium from 'cesium'

import {onMounted} from "vue";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYTJjZjgyYS04MzA0LTQ0NDUtOWJkMy1jNjg4ZmM5OTBiMjYiLCJpZCI6MTk4OTk3LCJpYXQiOjE3MDkyNzg4MDB9.SGSpyGwHOcOeOSToCgitx-jD86_p7bjrgT2FbXuHW4U';


// 高德在线地图网址
const maps = {
  // 1.影像图
  1: 'https://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&style=6',
// 2.道路纯图
  2: 'https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x=54658&y=26799&z=16&scl=1&ltype=2',
// 3.道路简图
  3: 'http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&size=1&scale=1&style=7',
// 4.道路详图
  4: 'http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8',
// 5.纯道路图
  5: 'http://wprd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
// 6.纯地标图
  6: 'https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x=54658&y=26799&z=16&scl=1&ltype=4',
// 7.路网注记图
  7: 'http://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8',
  8 : "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",  //高德矢量图
  9: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}", // 高德影像图
  10: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8", // 高德标记图
}

onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    timeline: false,
    sceneModePicker: false,
    selectionIndicator: false,
    infoBox: false,
    navigationHelpButton: false
  })
  // const Imagelayer = new Cesium.UrlTemplateImageryProvider({
  //   url: maps[1],
  //   minimumLevel: 3,
  //   maximumLevel: 18
  // })
  // viewer.imageryLayers.addImageryProvider(Imagelayer)


  const maplayer = new Cesium.UrlTemplateImageryProvider({
    url: maps[8],
    minimumLevel: 3,
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(maplayer)
  viewer.camera.flyTo({
  // viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(113.718164,34.752192,1000),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch:Cesium.Math.toRadians(-90),
      roll: 0.0
    }
  })
})
</script>

<style scoped>

</style>