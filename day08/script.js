'use strict';

class App {
  constructor() {
    this.canvas = new Canvas();
  }

  run() {

  }
}

class Canvas {
  constructor() {
    this.canvas = document.querySelector('#draw');
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.x = 0;
    this.y = 0;
    this.hue = 0;
    this.lineWidth = 10;

    this.settings();
    this.bindEvents();
  }

  settings() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.lineWidth;
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
    this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
  }

  startDrawing(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.isDrawing = true;
  }

  draw(e) {
    if (!this.isDrawing) return;

    const distance = Calc.distance(this.x, this.y, e.offsetX, e.offsetY);
    if (distance < 10 && this.lineWidth < 50) {
      this.lineWidth++;
    } else if (distance > 20 && this.lineWidth > 5) {
      this.lineWidth--;
    }

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();

    this.x = e.offsetX;
    this.y = e.offsetY;
    this.hue++;
    this.hue %= 360;
  }
}

class Calc {
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
