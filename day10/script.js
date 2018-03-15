'use strict';

class App {
  constructor() {
    this.elements = document.querySelectorAll('input[type="checkbox"]');
  }

  run() {
    this.selectionModel = new SelectionModel([...this.elements]);
  }
}

class SelectionModel {
  constructor(elements) {
    this.elements = elements;
    this.bindEvents();
  }

  bindEvents() {
    this.elements.forEach(e => e.addEventListener('click', this.onInputClick.bind(this)));
  }

  onInputClick(e) {
    const element = e.currentTarget;

    if (e.shiftKey && this.lastChecked) {
      let start = this.elements.indexOf(this.lastChecked);
      let finish = this.elements.indexOf(element);
      [start, finish] = [start, finish].sort();
      const between = this.elements.slice(start + 1, finish);
      between.forEach(e => e.checked = true);
    }

    if (element.checked) {
      this.lastChecked = element;
    } else {
      this.lastChecked = undefined;
    }
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
