'use strict';

class App {
  constructor() {
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.container = document.querySelector('.words');
    this.paragraph = document.createElement('p');
    this.container.appendChild(this.paragraph);

    this.bindEvents();
    this.createNewParagraph();
    this.recognition.start();
  }

  bindEvents() {
    this.recognition.addEventListener('result', this.processResult.bind(this));
    this.recognition.addEventListener('end', this.recognition.start);
  }

  createNewParagraph() {
    this.paragraph = document.createElement('p');
    this.container.appendChild(this.paragraph);
  }

  processResult(e) {
    this.paragraph.textContent = Array.from(e.results)
      .map(el => el[0].transcript)
      .join('');

    if (e.results[0].isFinal) {
      this.createNewParagraph();
    }
  }
}

window.onload = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  new App();
};