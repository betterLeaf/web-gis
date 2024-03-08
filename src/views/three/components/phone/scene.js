import * as THREE from 'three';
import model from './model.js'

const scene = new THREE.Scene();
scene.add(model);

// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// 坐标轴
const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper)


export{
    scene
}