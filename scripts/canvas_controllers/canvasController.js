import CanvasElement from "../models/canvasElement.js";
export default class Canvas {
  elements = [];
  constructor() {
    this.canvas = document.getElementById("playground");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
    });
    this.ctx = this.canvas.getContext("2d");
  }

  drawCircle(xpos, ypos, deviation) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "gray";
    this.ctx.arc(xpos, ypos, deviation, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  effectPopulator(x = null, y = null) {
    if (x && y) {
      const deviation = Math.random() * 30 + 1;
      this.elements.push(new CanvasElement(x, y, deviation + 50));
      this.drawCircle(x, y, 50 + deviation);
    }
  }

  onMouseMoveDraw() {
    window.addEventListener("mousemove", (e) => {
      this.effectController(e.x, e.y);
    });
  }

  drawLines() {
    let valid;
    this.elements.forEach((element) => {
      valid = this.elements.filter(
        (e) =>
          Math.sqrt(
            (element.xpos - e.xpos) ** 2 + (element.ypos - e.ypos) ** 2
          ) <= 200
      );

      if (valid) {
        valid.forEach((v) => {
          this.ctx.beginPath();
          this.ctx.lineWidth = 2;
          this.ctx.moveTo(element.xpos, element.ypos);
          this.ctx.lineTo(v.xpos, v.ypos);
          this.ctx.stroke();
        });
      }
    });
  }

  effectController(x = null, y = null) {
    this.effectPopulator(x, y);
    this.drawLines();
    this.elements.forEach((element, index) => {
      if (element.radius > 2) {
        element.xpos += element.speedX;
        element.ypos += element.speedY;
        element.radius -= element.shrink;
        this.drawCircle(element.xpos, element.ypos, element.radius);
      } else {
        this.elements.splice(index, 1);
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.effectController();
  }
}
