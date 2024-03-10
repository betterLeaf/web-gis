<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Scene, LineLayer, WindLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import { gd_token } from '@/utils/config'
const data = {
  "type": "FeatureCollection",
  "features": [
    {
      type: "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [113.73242, 34.805939]
          , [113.737611, 34.805139]
          , [113.74741, 34.80402]
          , [113.759934, 34.801676]
          , [113.763308, 34.806525]
          , [113.763406, 34.807937]
          , [113.76214, 34.809775]
          , [113.754548, 34.814783]
          , [113.745398, 34.820643]
          , [113.738844, 34.823679]
          , [113.727164, 34.824798]
          , [113.713472, 34.824958]
          , [113.712397, 34.824889]
          , [113.711064, 34.824624]
          , [113.709642, 34.823999]
          , [113.708455, 34.823]
          , [113.707762, 34.822081]
          , [113.707591, 34.820053]
          , [113.707825, 34.819211]
          , [113.708368, 34.818225]
          , [113.713029, 34.813678]
          , [113.716446, 34.810204]
        ]
      }
    }
  ]

}
let scene
function initMap() {
  scene = new Scene({
    id: 'map',
    map: new GaodeMap({
      style: "dark",
      center: [113.73324, 34.812923],
      pitch: 45,
      zoom: 13,
      token: gd_token
    })
  })

  scene.on('loaded', () => {
    addLineLayer()
    add3DLineLayer()
    addAriLineLayer()
    // addWindLayer()
  });
}
function addWindLayer() {
  /* 5、风场 */
const windLayer = new WindLayer({
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
}
function addAriLineLayer() {
  let data = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [[113.726409, 34.772612], [113.588072, 34.775062]]
        }
      }
    ]
  }
  scene.addImage(
    'plane',
    'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg'
  );


  const arc_laryer = new LineLayer({
    blend: "normal"
  })
    .source(data)
    .shape('arc')
    .size(2)
    .color('#ff2d51')
  scene.addLayer(arc_laryer)
  const planeLineLayer = new LineLayer({
    blend: 'normal',
    name: "飞机"
  })
    .source(data)
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

function add3DLineLayer() {
  let data = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [[113.726409, 34.772612], [113.806079, 34.793648]]
        }
      }
    ]
  }

  const layer = new LineLayer({ blend: 'normal' })
    .source(data)
    .shape('arc3d')
    .size(2)
    .color('#ff2d51')
    .animate({
      trailLength: 1, // 流线长度
      interval: 0.5, // 实现流线的间隔,分两段执行完流线
      duration: 4, // 每段轨迹执行的时间

    })
  scene.addLayer(layer)
}

function addLineLayer() {
  const layer = new LineLayer()
    .source(data)
    .shape('line')
    .size(2)
    .color('#ff2d51')
    .animate({
      trailLength: 1, // 流线长度
      interval: 0.3, // 实现流线的间隔,分两段执行完流线
      duration: 4, // 每段轨迹执行的时间

    })
  scene.addLayer(layer)
}

onMounted(() => {
  initMap()
})

</script>