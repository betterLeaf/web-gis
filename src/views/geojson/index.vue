<template>
    <div id="map"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Map, View } from 'ol';
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke } from "ol/style";

let map = ref(null);
function initMap() {
    map.value = new Map({
        target: 'map',
        layers: [
         new   TileLayer({
            title: "高德地图",
            source: new XYZ({
                // url: "",
                url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                wrapX: false
            })
         })
        ],
        view:  new View({
            center: [114.30, 30.50],
            zoom: 4.7,
            maxZoom: 19,
            minZoom: 4,
            projection: "EPSG:4326"
        })
    })

    const source = new VectorSource({
        url: "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000",
        format: new GeoJSON()
    })

    const layer = new VectorLayer({
        source
    })
    const style = new Style({
        fill: new Fill({
            color: "rgba(50,50,50, 0.4)"
        }),
        stroke: new Stroke({
            color: '#333',
            width: 2
        })
    })
    layer.setStyle(style)

    const henan_source = new VectorSource({
        url: "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=410000",
        format: new GeoJSON()
    })

    const henan_layer = new VectorLayer({
        source: henan_source
    })
    const henan_style = new Style({
        fill: new Fill({
            color: "#333"
        }),
    })
    henan_layer.setStyle(henan_style)

    map.value.addLayer(layer)
    map.value.addLayer(henan_layer)
}
onMounted(() => {
    initMap()
})

</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>