import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let model = new THREE.Group()
let loader = new GLTFLoader()

// 加载环境贴图
let textureCube = new THREE.CubeTextureLoader()
    .setPath('/phoneModel/envMap/')
    .load([`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`])

loader.load("/phoneModel/手机.glb", gltf => {//gltf加载成功后返回一个对象
    model.add(gltf.scene)
    let mesh = gltf.scene.getObjectByName('手机')
    let texLoader = new THREE.TextureLoader()  
    
    mesh.material = new THREE.MeshStandardMaterial({
        metalness: 1.0,
        roughness: 1.0,

        map: texLoader.load('/phoneModel/basecolor.png'), // 颜色贴图
        roughnessMap: texLoader.load('/phoneModel/roughness.png'), // 粗糙度贴图
        metalnessMap: texLoader.load('/phoneModel/metallic.png'), // 金属度贴图
        alphaMap: texLoader.load('/phoneModel/opacity.png'), // 透明度贴图
        normalMap: texLoader.load('/phoneModel/normal.png'), // 法线贴图

        transparent: true,
        envMap: textureCube,
        envMapIntensity: 0.5,

        
    })
    mesh.material.map.flipY = false;
    mesh.material.normalMap.flipY = false;
    mesh.material.metalnessMap.flipY = false;
    mesh.material.roughnessMap.flipY = false;
    mesh.material.alphaMap.flipY = false;
})

export default model