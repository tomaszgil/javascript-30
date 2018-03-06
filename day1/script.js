'use strict';

class App {
  config = {
    set: [
      {
        letter: 'A',
        name: 'CLAP',
      },
      {
        letter: 'S',
        name: 'HIHAT',
      },
      {
        letter: 'D',
        name: 'KICK',
      },
      {
        letter: 'F',
        name: 'OPENHAT',
      },
      {
        letter: 'G',
        name: 'BOOM',
      },
      {
        letter: 'H',
        name: 'RIDE',
      },
      {
        letter: 'J',
        name: 'SNARE',
      },
      {
        letter: 'K',
        name: 'TOM',
      },
      {
        letter: 'L',
        name: 'KICK',
      }
    ]
  };

  static run() {
    const elements = document.getElementsByClassName('drum-list-item');
    const buttons = elements.map(
      (el, i) => new Button(App.config.set[i].letter, App.config.set[i].name, elements[i])
    );

    console.log(buttons);
  }
}

class Button {
  constructor(letter, name, element) {
    this.letter = letter;
    this.name = name;

    build();
  }

  build() {

  }

  onClick() {

  }

}

App.run();
