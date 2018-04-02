'use strict';

class App {
  constructor() {
    this.voicesDropdown = document.querySelector('[name="voice"]');
    this.textarea = document.querySelector('[name="text"]');
    this.pitch = document.querySelector('[name="pitch"]');
    this.rate = document.querySelector('[name="rate"]');
    this.speakButton = document.querySelector('#speak');
    this.stopButton = document.querySelector('#stop');
    this.speaker = new Speaker();

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('speakerinitialized', this.buildDropdown.bind(this));
    this.speakButton.addEventListener('click', this.speak.bind(this));
    this.stopButton.addEventListener('click', this.stop.bind(this));
    this.voicesDropdown.addEventListener('change', this.setVoice.bind(this));
    this.pitch.addEventListener('change', this.setPitch.bind(this));
    this.rate.addEventListener('change', this.setRate.bind(this));
  }

  buildDropdown() {
    this.voicesDropdown.innerHTML = this.speaker.getVoices()
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join("");
  }

  setVoice(e) {
    const name = e.currentTarget.value;
    this.speaker.setVoice(name);
  }

  setPitch() {
    this.speaker.setPitch(this.pitch.value);
  }

  setRate() {
    this.speaker.setRate(this.rate.value);
  }

  speak() {
    this.speaker.speak(this.textarea.value);
  }

  stop() {
    this.speaker.stop();
  }
}

class Speaker {
  constructor() {
    this.voices = [];
    this.synthesis = window.speechSynthesis;
    this.msg = new SpeechSynthesisUtterance();

    this.bindEvents();
  }

  bindEvents() {
    this.synthesis.addEventListener('voiceschanged', this.populateVoices.bind(this));
  }

  populateVoices() {
    this.voices = this.synthesis.getVoices();

    const event = new Event('speakerinitialized');
    document.dispatchEvent(event);
  }

  speak(text) {
    this.msg.text = text;
    this.synthesis.speak(this.msg);
  }

  stop() {
    this.synthesis.cancel();
  }

  setVoice(name) {
    this.msg.voice = this.voices.find(voice => voice.name === name);
  }

  setPitch(value) {
    this.msg.pitch = value;
  }

  setRate(value) {
    this.msg.rate = value;
  }

  getVoices() {
    return this.voices;
  }
}

window.onload = () => {
  new App();
};