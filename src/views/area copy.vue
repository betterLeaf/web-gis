<template>
    <div id="Map" ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature } from "ol";
import { Style, Stroke, Fill } from "ol/style";
import { Polygon, MultiPolygon } from "ol/geom";
import { defaults as defaultControls, OverviewMap } from "ol/control";
import { fromLonLat } from "ol/proj";

import areaGeo from "../assets/china.json";
export default {
    data() {
        return {
            map: null,
            areaLayer: null,
        };
    },
    methods: {
        /**
         * 初始化地图
         */
        initMap() {
            this.map = new Map({
                target: "Map",
                controls: defaultControls({
                    zoom: true,
                }).extend([]),
                layers: [
                    new TileLayer(
                        {
                            source: new XYZ({
                                url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                            }),
                        },
                        { zoomOffset: 1 }
                    ),
                ],
                view: new View({
                    center: fromLonLat([108.522097, 37.272848]),
                    zoom: 4.7,
                    maxZoom: 19,
                    minZoom: 4,
                }),
            });
        },
        /**
         * 设置区域
         */
        addArea(geo = []) {
            if (geo.length == 0) return false;
            let areaFeature = null;
            // 设置图层
            this.c = new VectorLayer({
                source: new VectorSource({
                    features: []
                })
            });
            // 添加图层
            this.map.addLayer(this.areaLayer);
            geo.forEach(g => {
                let lineData = g.features[0];
                if (lineData.geometry.type == "MultiPolygon") {
                    areaFeature = new Feature({
                        geometry: new MultiPolygon(
                            lineData.geometry.coordinates
                        ).transform("EPSG:4326", "EPSG:3857")
                    });
                } else if (lineData.geometry.type == "Polygon") {
                    areaFeature = new Feature({
                        geometry: new Polygon(
                            lineData.geometry.coordinates
                        ).transform("EPSG:4326", "EPSG:3857")
                    });
                }
            });
            areaFeature.setStyle(
                new Style({
                    fill: new Fill({ color: "#4e98f444" }),
                    stroke: new Stroke({
                        width: 3,
                        color: [71, 137, 227, 1]
                    })
                })
            );
            this.areaLayer.getSource().addFeatures([areaFeature]);
        },
    },
    mounted() {
        this.initMap(); //初始化地图方法
        this.addArea(areaGeo); //添加区域图层方法
    },
};
</script>

<style>
.map {
    width: 100%;
    height: 100vh;
}
</style>
