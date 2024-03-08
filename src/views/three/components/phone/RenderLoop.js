import { scene } from './scene'
import { renderer, camera } from './RendererCamera.js'

function render() {
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();

export default renderer