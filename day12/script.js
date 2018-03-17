'use strict';

class App {
  run() {
    new SequenceDetection([38, 38, 40, 40, 37, 39, 37, 39, 66]);
  }
}

class SequenceDetection {
  constructor(reference) {
    this.reference = reference;
    this.clicked = [];
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('keyup', this.getKey.bind(this))
  }

  getKey(e) {
    this.clicked.push(e.keyCode);
    if (this.clicked.length > this.reference.length) {
      this.clicked.shift();
    }

    console.log(this.clicked);

    if (this.clicked.equals(this.reference)) {
      this.handleDetected();
    }
  }

  handleDetected() {
    cornify_add();
    this.clicked = [];
  }
}

Object.defineProperty(Array.prototype, 'equals', {
  value(array) {
    console.log(this);
    if (!array instanceof Array)
      return false;

    if (this.length !== array.length)
      return false;

    for (let i = 0; i < this.length; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i]))
          return false;
      }
      else if (this[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }
});

window.onload = () => {
  const app = new App();
  app.run();
};
