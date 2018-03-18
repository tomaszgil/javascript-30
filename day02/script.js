'use strict';

class App {
  constructor() {
    this.clock = new Clock();
  }

  run() {
    this.clock.start();
  }
}

class Clock {
  constructor() {
    this.int = null;
    this.clock = document.getElementsByClassName('clock')[0];
    this.hourHand = document.getElementsByClassName('hand-hour')[0];
    this.minuteHand = document.getElementsByClassName('hand-minute')[0];
    this.secondHand = document.getElementsByClassName('hand-second')[0];

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("visibilitychange", this.toggleClock.bind(this));
  }

  toggleClock() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  static getCurrentTime() {
    const now = {};
    const time = new Date();
    now.hours = time.getHours();
    now.minutes = time.getMinutes();
    now.seconds = time.getSeconds();

    return now;
  }

  applyDate() {
    const now = Clock.getCurrentTime();
    const hour = (now.hours % 12 / 12) + (now.minutes / (12 * 60)) + (now.seconds / (12 * 60 * 60));
    const minute = (now.minutes / 60) + (now.seconds / (60 * 60));
    const second = now.seconds / 60;

    Clock.rotateHand(this.hourHand, Clock.calculateDegree(hour));
    Clock.rotateHand(this.minuteHand, Clock.calculateDegree(minute));
    Clock.rotateHand(this.secondHand, Clock.calculateDegree(second), -90);
  }

  static calculateDegree(fraction) {
    return fraction * 360 - 90;
  }

  static rotateHand(element, degree, threshold) {
    if (threshold && degree === threshold) {
      element.classList.add('no-transition');
    } else {
      element.classList.remove('no-transition');
    }

    element.style.transform = `rotate(${degree}deg)`;
  }

  start() {
    this.applyDate();
    this.clock.classList.add('initialized');
    this.int = setInterval(this.applyDate.bind(this), 1000);
  }

  pause() {
    window.clearInterval(this.int);
  }

  resume() {
    this.start();
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
