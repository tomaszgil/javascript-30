'use strict';

class App {
  constructor() {
    this.panels = document.querySelectorAll('.panel');
  }

  run() {
    this.panels.forEach(p => {
      p.addEventListener('click', this.toggleOpen.bind(this));
      p.addEventListener('transitionend', this.toggleActive.bind(this));
    });
  }

  toggleOpen(e) {
    const panel = e.currentTarget;
    panel.classList.toggle('open');
  }

  toggleActive(e) {
    const panel = e.currentTarget;
    if (e.propertyName.includes('flex')) {
      panel.classList.toggle('open-active');
    }
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
