<script setup>
import { onMounted, ref } from "vue";
import { Scene, MapTheme, PointLayer, Popup } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
import { gd_token } from '@/utils/config'
import data from './hz.json'
let scene = null


const weather_icon = [
  {
    type: "0-天晴",
    url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*kzTMQqS2QdUAAAAAAAAAAABkARQnAQ"
  }, {
    type: "1-多云",
    url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*jH1XRb7F7hMAAAAAAAAAAABkARQnAQ"
  },
  {
    type: "2-小雨",
    url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*DccRTI6ZRLoAAAAAAAAAAABkARQnAQ"
  }
]

function initMap(params) {
  scene = new Scene({
    id: "map",
    map: new GaodeMap({
      center: [120.19382669582967, 30.258134],
      pitch: 0,
      style: "dark",
      zoom: 10,
      token: gd_token
    }),
    logoVisible: false,
  });

  weather_icon.forEach(item => {
    scene.addImage(
      Number(item.type.split("-")[0]),
      item.url
    );
  })


  scene.on("loaded", () => {
    addPointLayer()
    addWeatherLayer()
    addMapTheme()
  })
}
// 添加天气layers
function addWeatherLayer() {
  const pointlayer = new PointLayer({})
    .source(data)
    .shape('w', w => w)
    .size(15)
    .style({
      offsets: [0, 30]
    })
  scene.addLayer(pointlayer)
}
// 添加点动画空间
function addPointLayer() {
  const pointLayer = new PointLayer({})
    .source(data)
    .shape('circle')
    .color('#006CFF')
    .size("height", h => h * 3)
    .style({
      opacity: 1,
      strokeWidth: 3
    })
    .active(true)
    .animate(true)

  pointLayer.on('click', e => {
    const { name } = e.feature.properties
    const popup = new Popup({ closeButton: false })
      .setLngLat(e.lngLat)
      .setHTML(`<p>${name}</p>`)
    scene.addPopup(popup)
  })
  scene.addLayer(pointLayer)
}
// 底图切换控件
function addMapTheme() {
  scene.addControl(new MapTheme({}));
}
onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100vh;
  width: 100vw;
}
</style>