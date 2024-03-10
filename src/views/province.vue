<template>
    <div id="map" ref="map"></div>
</template>

<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { Map, View } from "ol";
import areaGeo from "../assets/china2.json";
import Feature from "ol/Feature";
import { Polygon, MultiPolygon } from "ol/geom";
import { Style, Stroke, Fill } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export default {
    data() {
        return {
            map: null,
            colorList: [
                // 蓝色
                {
                    fillColor: "#4e98f444",
                    strokeColor: [71, 137, 227, 1],
                },
                // 红色
                {
                    fillColor: "#DF002944",
                    strokeColor: [223, 0, 41, 1],
                },
                // 橘色
                {
                    fillColor: "#EC870E44",
                    strokeColor: [236, 135, 14, 1],
                },
                // 黄色
                {
                    fillColor: "#F9F40044",
                    strokeColor: [249, 244, 0, 1],
                },
                // 绿色
                {
                    fillColor: "#5BBD2B44",
                    strokeColor: [91, 189, 43, 1],
                },
                // 青色
                {
                    fillColor: "#00B2BF44",
                    strokeColor: [0, 178, 191, 1],
                },
                // 紫色
                {
                    fillColor: "#635BA244",
                    strokeColor: [99, 91, 162, 1],
                },
            ],
        };
    },
    created() { },
    mounted() {
        this.initMap();
    },
    methods: {
        // 设置区域
        addArea(geo = []) {
            if (geo.length == 0) {
                return false;
            }
            let features = [];
            geo.forEach((g) => {
                let lightArr = [
                    g.features[12],
                    g.features[22],
                    g.features[30],
                    g.features[1],
                    g.features[4],
                    g.features[5],
                    g.features[16],
                ];
                lightArr.forEach((item, index) => {
                    let lineData3 = item;
                    let routeFeature3 = "";
                    if (lineData3.geometry.type == "MultiPolygon") {
                        routeFeature3 = new Feature({
                            geometry:
                                new MultiPolygon(lineData3.geometry.coordinates),
                        });
                    } else if (lineData3.geometry.type == "Polygon") {
                        routeFeature3 = new Feature({
                            geometry:
                                new Polygon(lineData3.geometry.coordinates),
                        });
                    }
                    routeFeature3.setStyle(
                        new Style({
                            fill: new Fill({
                                //填充颜色
                                color: this.colorList[index].fillColor,
                            }),
                            stroke: new Stroke({
                                //边界宽度
                                width: 3,
                                //边界颜色
                                color: this.colorList[index].strokeColor,
                            }),

                            // fill: new Fill({ color: "#4e98f444" }),
                            // stroke: new Stroke({
                            //     width: 3,
                            //     color: [71, 137, 227, 1]
                            // })
                        })
                    );
                    features.push(routeFeature3);
                });
            });
            // 设置图层
            let routeLayer = new VectorLayer({
                source: new VectorSource({
                    features: features,
                }),
            });
            // 添加图层
            this.map.addLayer(routeLayer);
        },
        // 初始化地图
        initMap() {
            this.map = new Map({
                target: "map", // 指向对象
                layers: [
                    // 图层
                    new TileLayer({
                        source: new XYZ({
                            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        }),

                    }),
                ],
                view: new View({
                    projection: "EPSG:4326",
                    center: [104.792207, 35.133476],
                    zoom: 5,
                }),
            });
            this.addArea(areaGeo);
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>