'use strict';

class App {
  constructor() {
    this.arrow = document.querySelector('.arrow');
    this.speed = document.querySelector('.speed-value');
    this.bindEvents();
  }

  bindEvents() {
    navigator.geolocation.watchPosition(this.processMoving.bind(this), this.onReject.bind(this));
  }

  processMoving(data) {
    this.speed.textContent = data.coords.speed;
    this.arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  }

  onReject(e) {
    console.error(e);
  }
}

window.onload = () => {
  new App();
};