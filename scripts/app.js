import Canvas from "./canvas_controllers/canvasController.js";

function init() {
  const canvasObj = new Canvas();

  function animate() {
    canvasObj.animate();
    requestAnimationFrame(animate);
  }

  canvasObj.onMouseMoveDraw();

  animate();
}

init();
