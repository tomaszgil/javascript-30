'use strict';

class App {
  constructor() {
    this.triggers = document.querySelectorAll('a');
    this.highlight = this.buildHighlight();
    this.bindEvents();
  }

  bindEvents() {
    this.triggers.forEach(t => t.addEventListener('mouseenter', this.highlightLink.bind(this)));
  }

  highlightLink(e) {
    const element = e.currentTarget;
    const position = element.getBoundingClientRect();
    this.highlight.style.top = `${position.top + window.scrollY}px`;
    this.highlight.style.left = `${position.left + window.scrollX}px`;
    this.highlight.style.width = `${position.width}px`;
    this.highlight.style.height = `${position.height}px`;
  }

  buildHighlight() {
    const highlight = document.createElement('span');
    highlight.classList.add('highlight');
    document.body.append(highlight);

    return highlight;
  }
}

window.onload = () => {
  new App();
};