export default class CanvasElement {
  constructor(xpos, ypos, radius) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;

    this.speedY = Math.random() * 10 - 5;
    this.speedX = Math.random() * 10 - 5;
    this.shrink = Math.random() * 1 + 1;
  }
}
