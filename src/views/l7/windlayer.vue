<template>

    <div id="map"></div>
</template>

<script setup>

import { onMounted } from "vue";
import { Scene, GeometryLayer, PointLayer } from "@antv/l7";
import { GaodeMap } from '@antv/l7-maps'
import { gd_token } from '@/utils/config'
import fly_end from './fly_end.json'

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
    },
    {
        type: "3-中雨",
        url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*f-wyS7ad5p0AAAAAAAAAAABkARQnAQ"
    },
    {
        type: "4-大雨",
        url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*YaKSTr3L5i8AAAAAAAAAAABkARQnAQ"
    }
    ,
    {
        type: "5-雷阵雨",
        url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*LyuVRowl6nAAAAAAAAAAAABkARQnAQ"
    },
    {
        type: "6-中雪",
        url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*iQKoS6I-rO8AAAAAAAAAAABkARQnAQ"
    },
    {
        type: "7-大雪",
        url: "https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*9Q0QS4GdaYcAAAAAAAAAAABkARQnAQ"
    }
]

let scene
function initMap() {
    scene = new Scene({
        id: "map",
        map: new GaodeMap({
            center:[0, 40],
            style: 'dark',
            zoom: 2,
            token: gd_token,
            pitch: 30
        })
    })

    scene.on("loaded", () => {
        let rain = 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*w2SFSZJp4nIAAAAAAAAAAAAAARQnAQ'
        const layer = new GeometryLayer({
            name: "暴雨点"
        })
            .shape('sprite')
            .size(10)
            .style({
                opacity: 0.3,
                mapTexture: rain, // rain
                center: [113.73324, 34.812923],
                spriteCount: 120,
                spriteRadius: 10,
                spriteTop: 2500000,
                spriteUpdate: 20000,
                spriteScale: 0.6
            });
        scene.addLayer(layer);



        weather_icon.forEach(item => {
  scene.addImage(
    Number(item.type.split("-")[0]),
    item.url
  );
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
    })
}
onMounted(() => {
    initMap()
})
</script>