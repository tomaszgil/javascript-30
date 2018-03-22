'use strict';

class App {
  run() {
    const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
    new BandList(bands);
  }
}

class BandList {
  constructor(bands) {
    this.elements = bands;
    this.list = document.querySelector('#bands');

    this.sortElements();
    this.buildList();
  }

  removeArticles(str) {
    const articles = ['the', 'an', 'a'];
    const words = str
      .split(" ")
      .filter(word => articles.every(
        article => article !== word.toLowerCase()
      ));
    return words.join(" ");
  }

  sortElements() {
    this.elements.sort((a, b) => {
      const strippedA = this.removeArticles(a);
      const strippedB = this.removeArticles(b);
      return strippedA.localeCompare(strippedB);
    });
  }

  buildList() {
    this.list.innerHTML = this.elements.map(element => `<li>${element}</li>`).join("");
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
