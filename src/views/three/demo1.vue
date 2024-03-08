<template>
    <div id="three"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'




function initScene() {

    let scene = new THREE.Scene()
    const width = window.innerWidth
    const height = window.innerHeight
    // 相机
    let camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
    camera.position.set(218, 162, 204)
    camera.lookAt(0, 0, 0)

    // 几何体
    let geometry = new THREE.BoxGeometry(50, 50, 50)
    let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    let mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 平行光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(400, 200, 300)
    scene.add(directionalLight)

    let directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(-400, -200, -300)
    scene.add(directionalLight2)

    // 环境光
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // 坐标辅助
    let axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)


    //创建一个WebGL渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.render(scene, camera)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
        renderer.render(scene, camera)
    })
    document.getElementById('three').appendChild(renderer.domElement)
}
onMounted(() => {
    initScene()
})

</script>
