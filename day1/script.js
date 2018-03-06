'use strict';

class App {
  constructor() {
    this.buttons = [];
    this.config = {
      soundDir: './sounds/',
      set: [
        {
          letter: 'A',
          name: 'CLAP',
          filename: 'clap.wav'
        },
        {
          letter: 'S',
          name: 'HIHAT',
          filename: 'hihat.wav'
        },
        {
          letter: 'D',
          name: 'KICK',
          filename: 'kick.wav'
        },
        {
          letter: 'F',
          name: 'OPENHAT',
          filename: 'openhat.wav'
        },
        {
          letter: 'G',
          name: 'BOOM',
          filename: 'boom.wav'
        },
        {
          letter: 'H',
          name: 'RIDE',
          filename: 'ride.wav'
        },
        {
          letter: 'J',
          name: 'SNARE',
          filename: 'snare.wav'
        },
        {
          letter: 'K',
          name: 'TOM',
          filename: 'tom.wav'
        },
        {
          letter: 'L',
          name: 'TINK',
          filename: 'tink.wav'
        }
      ]
    };
  }

  run() {
    const elements = document.getElementsByClassName('drum-list-item');
    const audio = this.loadAudioFiles();

    this.buttons = Array.from(elements).map(
      (el, i) => new Button(
        this.config.set[i].letter,
        this.config.set[i].name,
        audio[i],
        elements[i]
      )
    );
    this.keyToButtonMap = this.buildKeyMap(this.buttons);

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('keydown', this.onKeyPress.bind(this), false);
    document.addEventListener('keyup', this.onKeyRelease.bind(this), false);
  }

  buildKeyMap(buttons) {
    const map = buttons.map((el) => {
      return {[el.letter]: el};
    });

    return Object.assign({}, ...map);
  }

  onKeyPress(e) {
    const button = this.keyToButtonMap[e.key.toUpperCase()];
    if (button) {
      button.handleUserActionStart();
    }
  }

  onKeyRelease(e) {
    const button = this.keyToButtonMap[e.key.toUpperCase()];
    if (button) {
      button.handleUserActionEnd();
    }
  }

  loadAudioFiles() {
    return this.config.set.map(el => new Audio(this.config.soundDir + el.filename));
  }
}

class Button {
  constructor(letter, name, audio, element) {
    this.letter = letter;
    this.name = name;
    this.audio = audio;
    this.element = element;

    this.build();
    this.bindEvents();
  }

  build() {
    this.element.children[0].innerHTML = this.letter;
    this.element.children[1].innerHTML = this.name;
  }

  bindEvents() {
    this.element.addEventListener('mousedown', this.handleUserActionStart.bind(this), false);
    this.element.addEventListener('mouseup', this.handleUserActionEnd.bind(this), false);
  }

  handleUserActionStart() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.element.classList.add('playing');
  }

  handleUserActionEnd() {
    this.element.classList.remove('playing');
  }
}

const app = new App();
app.run();
