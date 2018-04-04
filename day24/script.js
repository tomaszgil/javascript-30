'use strict';

class App {
  constructor() {
    this.breakpoint = document.querySelector('header').offsetHeight;
    this.nav = document.querySelector('nav#main');
    this.logo = document.querySelector('li.logo');
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('scroll', Events.debounce(this.handleScroll.bind(this), 100));
  }

  handleScroll() {
    if (window.scrollY > this.breakpoint) {
      this.logo.classList.add('visible');
      this.nav.classList.add('sticky');
    } else {
      this.logo.classList.remove('visible');
      this.nav.classList.remove('sticky');
    }
  }
}


class Events {
  static debounce(fn, time = 20) {
    let timeout;

    return function() {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }
}

window.onload = () => {
  new App();
};