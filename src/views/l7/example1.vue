

<template>
  <div id="map"></div>
  <div role="alert" class="alert alert-error fixed top-10 left-[25%] z-10 w-1/4 cursor-pointer">
    <span @click="flyPoint" class="text-white">紧急通知：郑州飞行俄罗斯的航班因大雨延误</span>
  </div>
  <div class="fixed  top-10 left-[60%] z-10" >
    <button class="btn " @click="reset">复位</button>
  </div>
</template>


<script setup>
import  { onMounted } from "vue";
import {Scene, MapTheme, PointLayer, LineLayer, WindLayer, LayerSwitch, GeometryLayer} from "@antv/l7";
import { GaodeMap} from "@antv/l7-maps";
import {gd_token } from '@/utils/config'
import { weather_icon } from '@/assets/l7_data/weather-icon.js'
import fly_end from "@/assets/l7_data/fly_end.json";
import fly_path from "@/assets/l7_data/fly_path.json";
import world_country from "@/assets/l7_data/world_country.json";

let scene
let init_center = [10, 40], init_zoom = 2, rain_center=[105.318756, 61.52401]
function initMap() {
  scene = new Scene({
    id: "map",
    map: new GaodeMap({
      center:init_center,
      zoom: init_zoom,
      pitch: 30,
      token: gd_token,
      style: "darkblue"
    })
  })

  scene.on('loaded', () => {
    addColumnLayer()
    addMapTheme()
    addWeatherIcon()
    addFlyPath()
    addWind()
    addWordLine()
    addRainPoint()


    setTimeout(() => {
      const layerSwitch = new LayerSwitch({
        layers: scene.getLayers()
      });
      scene.addControl(layerSwitch);
    }, 1000)

    // scene.on('zoomchange', e => {
    //   let currentZoom = scene.getZoom()
    //   let windLayrs = scene.getLayerByName("风场")
    //   if(currentZoom > 4) {
    //     windLayrs.hide()
    //   } else {
    //     windLayrs.show()
    //   }
    // })
  })
}
function  addRainPoint() {
    let rain = 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*w2SFSZJp4nIAAAAAAAAAAAAAARQnAQ'
    const layer = new GeometryLayer({
      name: "暴雨点"
    })
        .shape('sprite')
        .size(10)
        .style({
          opacity: 0.3,
          mapTexture: rain, // rain
          center: rain_center,
          spriteCount: 12000,
          spriteRadius: 10,
          spriteTop: 2500000,
          spriteUpdate: 20000,
          spriteScale: 0.6
        });
    scene.addLayer(layer);
}
function reset() {
  scene.setZoomAndCenter(init_zoom, init_center)
}

function flyPoint() {
  scene.setZoomAndCenter(4, rain_center)
}

let wordLayer
function addWordLine() {
  wordLayer = new LineLayer({name: "地图边界线"})
      .source(world_country)
      .color('#4cfc9d')
      .size(1)
      .style({
        opacity: 0.4
      })
  scene.addLayer(wordLayer)
}
function toggleWind(type) {
  if(type !== 'on' ) {
    scene.showLayer(windLayer)
  } else {
    scene.hideLayer(windLayer)
  }
}
let windLayer
// 添加风场
function addWind() {
  /* 5、风场 */
  windLayer = new WindLayer({
    name: "风场"
  })
      .source(
          'https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*wcU8S5xMEDYAAAAAAAAAAAAAARQnAQ',
          {
            parser: {
              type: 'image',
              extent: [-180, -85, 180, 85]
            }
          }
      )
      .animate(true)
      .style({
        numParticles: 35535,
        fadeOpacity: 0.9,
        sizeScale: 1.3,
        rampColors: {
          0.0: '#3288bd',
          0.1: '#66c2a5',
          0.2: '#abdda4',
          0.3: '#e6f598',
          0.4: '#fee08b',
          0.5: '#fdae61',
          0.6: '#f46d43',
          1.0: '#d53e4f'
        }
      });
  scene.addLayer(windLayer);
  windLayer.hide()

}
// 添加航线
function  addFlyPath() {
  scene.addImage(
      'plane',
      'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg'
  );


  const flylaryer = new LineLayer({
    blend: "normal",
    name: "航线"

  })
    .source(fly_path)
    .shape('arc')
    .size(2)
    .color('#2dabff')
  scene.addLayer(flylaryer)



  const planeLineLayer = new LineLayer({
    blend: 'normal',
    name: "飞机"
  })
    .source(fly_path)
    .color('#ff6b34')
    .texture('plane')
    .shape('arc')
    .size(15)
    .animate({
      duration: 1,
      interval: 0.2,
      trailLength: 0.05
    })
    .style({
      textureBlend: 'replace',
      lineTexture: true, // 开启线的贴图功能
      iconStep: 10, // 设置贴图纹理的间距
    });
  scene.addLayer(planeLineLayer);
}
// 添加天气图标
function addWeatherIcon() {
  weather_icon.forEach(item => {
    scene.addImage(
        Number(item.type.split("-")[0]),
        item.url
    )
  })

  const weatherLayer = new PointLayer({
    name: "天气图层"
  })
      .source(fly_end)
      .shape('weather', function (w) {
        return w;
      })
      .size(15)
      .style({
        offsets: [0, 30]
      })
  scene.addLayer(weatherLayer);
}

// 添加柱状图
function addColumnLayer() {
  const columnLayer = new PointLayer({
    //可以设置图层的堆叠顺序
    zIndex: 6,
    name: "柱状图"
  })
      .source(fly_end)
      .color('name', ['#739DFF', '#61FCBF', '#FFDE74', '#FF896F'])
      .shape('name', [
        'cylinder',
        'triangleColumn',
        'squareColumn'
      ])
      .size([4, 100])
      .active(true)
      .animate(true)
  scene.addLayer(columnLayer);
}

// 添加主题切换
function  addMapTheme() {
  scene.addControl(new MapTheme({}));
}
onMounted(() => {
  initMap()
})
</script>


<style scoped>

</style>