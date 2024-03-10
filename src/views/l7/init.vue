<template>
    <div id="map"></div>
</template>

<script setup >
import { onMounted } from 'vue';
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';



function initMap() {
    const scene = new Scene({
    id: 'map',
    map: new GaodeMap({
        key: 'a114656f0750b37158933a8b71fa53e9',
        style: "dark",
        center: [114.36,35.93],
        pitch: 90,
    })
})
}

onMounted(() => {
    initMap()
})
</script>