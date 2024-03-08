// 引入Three.js
import * as THREE from "three";
// 引入Three.js扩展库
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点

var renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xffffff, 1); //设置背景颜色
var controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; //禁止右键拖拽
// 缩放范围限制
controls.minDistance = 200; //相机距离观察目标点极小距离——模型最大状态
controls.maxDistance = 500; //相机距离观察目标点极大距离——模型最小状态

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

export { renderer, camera };
