<template>
    <div id="three">

    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import renderer from './components/phone/RenderLoop.js'

onMounted(() => {
    document.getElementById('three').appendChild(renderer.domElement)
})
</script>