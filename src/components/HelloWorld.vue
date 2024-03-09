<script setup>
import { ref, onMounted } from "vue"
import 'ol/ol.css'; // 引入OpenLayers样式表
import { Feature, Map, View } from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { Point, LineString, Polygon } from "ol/geom";
import {Cluster, OSM, Vector as VectorSource} from 'ol/source';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  Icon
} from 'ol/style';

import qidian from '@/assets/img/qidian.png'
import zhongdian from '@/assets/img/zhongdian.png'


console.log(qidian)

const map = ref(null) // 存放地图实例

function initMap() {
  // 地图实例
  map.value = new Map({
    target: 'map',                         // 对应页面里 id 为 map 的元素
    layers: [                              // 图层
      new TileLayer({                      // 使用瓦片渲染方法
        source: new OSM()                  // 图层数据源
      }),
      lineVectorLayer,
      clusters
    ],
    view: new View({                       // 地图视图
      projection: "EPSG:4326",             // 坐标系，有EPSG:4326和EPSG:3857
      center: [113.78,34.76],     // 郑州坐标
      minZoom: 4,                          // 地图缩放最小级别
      zoom: 11                            // 地图缩放级别（打开页面时默认级别）
    })
  })

  map.value
        .getView()
        .fit(new Polygon([coordinates2]), {
          padding: [200, 200, 200, 400],
        }); //
}


const coordinates = [
  [113.69,34.80],
  [113.65,34.71],
  [113.59,34.74],
  [113.56,34.82]
]

const features = new Array(coordinates.length)
for(let i = 0; i < coordinates.length; i++) {
  features[i] = new Feature(new Point(coordinates[i]))
}
const source = new VectorSource({
  features
})

const clusterSource = new Cluster({
  source
})

const styleCache = {}

const clusters = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 20,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

let lineVectorLayer = null
let coordinates2= [
  [113.85,34.70],
  [113.92,34.70],
  [113.92,34.72],
  [113.82,34.74]
]
function createTrack() {
  const routeFeature = new Feature({
    type: 'route',
    geometry: new LineString(coordinates2)
  })
  const startMaker = new Feature({
    type: "startMarker",
    geometry: new Point(coordinates2[0])
  })

  const endMaker = new Feature({
    type: "endMarker",
    geometry: new Point(coordinates2[coordinates2.length - 1])
  })

  const styles = {
    route: new Style({
      stroke: new Stroke({
        width: 5,
        color: "red"
      })
    }),
    startMarker: new Style({
      image: new Icon({
        src: qidian,
        // size: [80, 80],
        anchor: [0.5, 1.1],
      }),
    }),
    endMarker: new Style({
      image: new Icon({
        src: zhongdian,
        anchor: [0.5, 1.1]
      })
    })
  }

  lineVectorLayer =  new VectorLayer({
    source: new VectorSource({
      features: [routeFeature, startMaker, endMaker]
    }),
    style: feature => styles[feature.get('type')]
  })
}


onMounted(() => {
  createTrack()
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
