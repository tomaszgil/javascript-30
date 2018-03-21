'use strict';

class App {
  run() {
    const area = document.querySelector('.hero');
    const element = area.querySelector('.hero > h1');
    new DynamicShadow(element, area);
  }
}

class DynamicShadow {
  constructor(element, area, maxOffset = 20) {
    this.element = element;
    this.area = area;
    this.maxOffset = maxOffset;

    this.bindEvents();
  }

  bindEvents() {
    this.area.addEventListener('mousemove', this.shadow.bind(this));
  }

  shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = this.area;
    let { offsetX: x, offsetY: y } = e;
    if (e.target !== e.currentTarget) {
      x += e.target.offsetLeft;
      y += e.target.offsetTop;
    }
    const xOffset = Math.round((x / width * 2 * this.maxOffset) - this.maxOffset) * -1;
    const yOffset = Math.round((y / height * 2 * this.maxOffset) - this.maxOffset) * -1;
    this.element.style.textShadow = `${xOffset}px ${yOffset}px 0 rgba(0, 0, 0, 0.3)`;
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
