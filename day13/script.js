'use strict';

class App {
  constructor() {
    this.images = document.querySelectorAll('.slide-in');
  }

  run() {
    new SlidingImages(this.images);
  }
}

class SlidingImages {
  constructor(images) {
    this.images = images;
    this.activeClass = 'active';
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('scroll', Events.debounce(this.onScroll.bind(this), 100));
  }

  onScroll(e) {
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + window.innerHeight;
    Array.from(this.images).forEach(img => {
      const slideIn = viewportBottom - img.height / 2;
      const slideOut = img.offsetTop + img.height;
      const isHalfShown = slideIn > img.offsetTop;
      const isScrolledPassed = viewportTop > slideOut;

      if (isHalfShown && !isScrolledPassed) {
        img.classList.add(this.activeClass);
      } else if (isScrolledPassed) {
        img.classList.remove(this.activeClass)
      }
    });
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
  const app = new App();
  app.run();
};
