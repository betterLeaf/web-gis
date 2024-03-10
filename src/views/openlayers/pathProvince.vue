<template>
    <div class="map" id="map" ref="map"></div>
</template>

<script setup>
import "ol/ol.css";
import { ref, onMounted, reactive } from "vue";
import { View, Map, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ }  from "ol/source";
import { Style, Fill, Stroke, Circle as sCircle, Icon } from "ol/style";
import { LineString, Point } from "ol/geom";
import car from "@/assets/img/car.png";
import { transform, fromLonLat } from "ol/proj";

let map = ref(null)
// 初始化地图
function initMap() {
    map.value = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new XYZ({
                    // url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                    url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                })
            })
        ],
        view: new View({
            // center: fromLonLat([98.522097, 37.272848]),
            center: fromLonLat([108.522097, 37.272848]),
            zoom: 4.9,
        })
    })

    map.value.once('postrender', e => {
        console.log('地图加载完成')
    })
}

// 绘制
async function open() {
    // 画轨迹线
    await drawLine()
    // 动画
    moveStart()
}
let routeLayer = null
function drawLine() {
    routeLayer = new VectorLayer({
        source: new VectorSource({
            features: []
        })
    })
    map.value.addLayer(routeLayer)

    let comDots = [], wireFeatures = {}
    coordinates.forEach(item => {
        comDots.push(item)
        wireFeatures = new Feature({
            geometry: new LineString(comDots)
        })

        wireFeatures.setStyle(
            new Style({
                stroke: new Stroke({
                    color: "rgb(21, 106, 158)",
                    width: 3
                })
            })
        )
        routeLayer.getSource().addFeature(wireFeatures)
    })
}
let featureMove = {}
let initData = {
    carPoints: []
}
function moveStart() {
    let dotsData = coordinates.map((item) => transform(item, "EPSG:3857", "EPSG:4326"));
    initData.carPoints = [...dotsData];

    featureMove = new Feature({
        geometry: new Point(initData.carPoints[0])
    })

    featureMove.setStyle(
        new Style({
            image: new Icon({
                src: car,
                scale: 0.85,
                anchor: [0.5, 0.5],
                rotation: countRotate(),
            })
        })
    )
    routeLayer.getSource().addFeature(featureMove)
    timeStart()
}

let timer = null
function timeStart() {
    timer = setInterval(() => {
        if (routeIndex + 1 >= initData.carPoints.length) {
            routeIndex = 0
            routeLayer.getSource().removeFeature(featureMove)
            clearInterval(timer)
            open()
            console.log(777)
            return
        }
        if (nextPoint() == initData.carPoints[routeIndex + 1]) {
            routeIndex++
            featureMove.getStyle().getImage().setRotation(countRotate())
        }

        featureMove
            .getGeometry()
            .setCoordinates(fromLonLat(initData.carPoints[routeIndex]));
    }, 10)
}



function nextPoint() {
    let p1 = map.value.getPixelFromCoordinate(
        fromLonLat(initData.carPoints[routeIndex])
    );
    let p2 = map.value.getPixelFromCoordinate(
        fromLonLat(initData.carPoints[routeIndex + 1])
    );
    let dx = p2[0] - p1[0];
    let dy = p2[1] - p1[1];
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= 1) {
        return initData.carPoints[routeIndex + 1];
    } else {
        let x = p1[0] + dx / distance;
        let y = p1[1] + dy / distance;
        let coor = transform(
            map.value.getCoordinateFromPixel([x, y]),
            "EPSG:3857",
            "EPSG:4326"
        );
        initData.carPoints[routeIndex] = coor; //这里会将前一个点重新赋值  要素利用这个坐标变化进行移动
        return initData.carPoints[routeIndex];
    }
}



let routeIndex = 0
function countRotate() {
    let i = routeIndex, j = i + 1
    if (j == initData.carPoints.length) {
        i--;
        j--
    }

    let p1 = initData.carPoints[i], p2 = initData.carPoints[j]
    return Math.atan2(p2[0] - p1[0], p2[1] - p1[1])
}

onMounted(() => {
    initMap()
    open()
})


let coordinates = [
    [91.118463,29.654471],
    [100.185245,36.952865],
    [109.282056,34.386299],
    [116.41,39.90], // 北京
    [116.41,39.90], // 保定
    [114.36,35.93], // 汤阴
    [118.80,32.06], // 南京
    [121.47,31.23], // 上海


    // [10836932.628965743, 4998172.218425438],
    // [10638182.82599503, 3781582.515392581],
    // [10897159.841987172, 3552719.105911153],
    // [11120000.530166456, 4986126.775821152],
    // [11360909.382252172, 4895785.956289009],
    // [11053750.595842887, 3420219.23726401],
    // [11294659.4479286, 3257605.7621061527],
    // [11565681.906525029, 4823513.300663294],
    // [11866817.971632171, 4757263.366339724],
    // [11535568.300014313, 3185333.1064804387],
    // [11812613.479912885, 3058855.959135439],
    // [12125794.987624314, 4721127.038526867],
    // [12402840.167522885, 4684990.710714009],
    // [12023408.725487886, 2926356.090488296],
    // [12300453.905386457, 2860106.1561647244],
    // [12643749.0196086, 4630786.218994724],
    // [12866589.707787886, 4510331.792951867],
    // [12547385.478774315, 2878174.3200711533],
    // [12932839.642111458, 2878174.3200711533],
    // [13113521.281175744, 3751468.908881867],
    // [13125566.723780029, 4739195.202433295],
    // [13691702.526181456, 5425785.43087758],
    // [13553179.936232172, 6112375.659321865],
    // [12920794.199507171, 5407717.266971151],
    // [12065567.774602886, 4974081.3332168665],
    // [12788294.330860028, 4895785.956289009],
].map(item => transform(item, "EPSG:4326", "EPSG:3857"))


</script>

<style lang="scss" scoped>
.map {
    width: 100vw;
    height: 100vh;
}
</style>