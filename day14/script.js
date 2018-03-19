'use strict';

class App {
  constructor() {
    this.workout = new Workout();
  }

  run() {
    this.workout.do();
  }
}

class Workout {
  do() {
    // start with strings, numbers and booleans
    let num1 = 1;
    let num2 = num1;
    console.log(num1, num2);
    num1 = 3;
    console.log(num1, num2);

    // Let's say we have an array
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    const playersRefCopy = players;
    console.log(players);
    playersRefCopy[1] = 'John';
    console.log(players);

    const playersCopy = Object.assign([], players)
    const playersCopy2 = [...players]
    playersCopy[1] = 'Albert';
    playersCopy2[1] = 'Albert';
    console.log(players);

    const person = {
      name: 'Wes Bos',
      age: 80
    };

    const cap = Object.assign({}, person, { name: 'Dude' })
    console.log(person, cap);
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
