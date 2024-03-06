import { fromLonLat } from "ol/proj";

export default function useMapMove() {
  const MOVE_NUM = 50000 * 30;

  // 左移动
  function moveToLeft(map) {
    var view = map.getView();
    var mapCenter = view.getCenter();
    mapCenter[0] += MOVE_NUM;
    view.animate({
      center: mapCenter,
    });
    map.render();
  }

  // 向右移动地图
  function moveToRight(map) {
    console.log(map);
    var view = map.getView();
    var mapCenter = view.getCenter();
    mapCenter[0] -= MOVE_NUM;
    view.animate({
      center: mapCenter,
    });
    map.render();
  }

  // 向上移动地图
  function moveToUp(map) {
    var view = map.getView();
    var mapCenter = view.getCenter();
    // 让地图中心的y值减少，即可使得地图向上移动，减少的值根据效果可自由设定
    mapCenter[1] -= MOVE_NUM;
    view.animate({
      center: mapCenter,
    });
    map.render();
  }

  // 向下移动地图
  function moveToDown(map) {
    var view = map.getView();
    var mapCenter = view.getCenter();
    // 让地图中心的y值增加，即可使得地图向下移动，增加的值根据效果可自由设定
    mapCenter[1] += MOVE_NUM;
    view.animate({
      center: mapCenter,
    });
    map.render();
  }

  // 移动到成都

  // 放大地图
  function moveToIn(map) {
    var view = map.getView();
    // 让地图的zoom增加1，从而实现地图放大
    view.setZoom(view.getZoom() + 1);
  }

  // 缩小地图
  function moveToOut(map) {
    var view = map.getView();
    // 让地图的zoom减小1，从而实现地图缩小
    view.setZoom(view.getZoom() - 1);
  }

  function moveToChengDu(map) {
    var view = map.getView();
    // 设置地图中心为成都的坐标，即可让地图移动到成都
    view.setZoom(12);
    view.setCenter(fromLonLat([104.07, 30.67]));
    map.render();
  }

  function moveToHome(map) {
    var view = map.getView();
    // 设置地图中心为成都的坐标，即可让地图移动到成都
    view.setZoom(12);
    view.setCenter(fromLonLat([114.36, 35.93]));
    map.render();
  }
  function moveToInit(map) {
    var view = map.getView();
    view.setZoom(4);
    view.setCenter(fromLonLat([108.522097, 37.272848]));
    map.render();
  }
  return {
    moveToLeft,
    moveToRight,
    moveToUp,
    moveToDown,
    moveToChengDu,
    moveToIn,
    moveToOut,
    moveToInit,
    moveToHome,
  };
}
