<template>
    <div id="map" ref="map" class="map">
    </div>
</template>

<script setup>
import "ol/ol.css";
import { ref, onMounted } from "vue";
import { View, Map } from 'ol';
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Circle as sCircle, Icon } from "ol/style";
import carImg from '@/assets/img/car.png'

const styles = Object.freeze({
    route: new Style({
        stroke: new Stroke({
            lineDash: [2, 6, 10],
            width: 4,
            color: [0, 255, 0, 1],
        }),
    }),
    marker: new Style({
        image: new sCircle({
            radius: 10,
            stroke: new Stroke({
                color: "#fff",
            }),
            fill: new Fill({
                color: "#3399CC",
            }),
        }),
    }),
    carMarker: new Style({
        image: new Icon({
            rotation: 0,
            src: carImg,
            imgSize: [20, 36],
        }),
    }),
})
let map = ref()
function initMap() {
    map.value = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                }),
            }),
            new VectorLayer({
                source: new VectorSource({ wrapX: false }),
                style: (feature) => {
                    return styles[feature.get("type")];
                },
            })
        ],
        view: new View({
            center: fromLonLat([108.945951, 34.465262]),
            zoom: 5
        })
    })
}

onMounted(() => {
    initMap()
})

</script>