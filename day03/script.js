'use strict';

class App {
  constructor() {
    this.formHandler = new FormHandler();
  }
}

class FormHandler {
  constructor() {
    this.spacingInput = document.getElementById('spacing');
    this.blurInput = document.getElementById('blur');
    this.colorInput = document.getElementById('color');

    this.bindEvents();
  }

  bindEvents() {
    this.spacingInput.addEventListener('change', FormHandler.update.bind(null, 'spacing'));
    this.blurInput.addEventListener('change', FormHandler.update.bind(null, 'blur'));
    this.colorInput.addEventListener('change', FormHandler.update.bind(null, 'color'));
  }

  static update(variable, event) {
    let value = event.target.value;
    if (variable !== 'color') {
      value += 'px';
    }

    document.documentElement.style.setProperty(`--${variable}`, value);
  }
}

window.onload = () => { new App(); };
