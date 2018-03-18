'use strict';

class App {
  constructor() {
    this.cities = [];
    this.searchInput = document.querySelector('.search');
    this.suggestions = document.querySelector('.suggestions');

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => {
        this.cities = data;
      });
  }

  findMatches(key) {
    const reg = new RegExp(key, 'gi');
    return this.cities.filter(place => {
      return place.city.match(reg) || place.state.match(reg)
    });
  }

  updateList() {
    const value = this.searchInput.value;
    const matched = this.findMatches(value);
    const html = matched.map(place => this.buildPlace(place, value)).join('');
    this.suggestions.innerHTML = html;
  }

  buildPlace(place, value) {
    const reg =  new RegExp(value, 'gi');
    const city = place.city.replace(reg, `<span class="hl">${value}</span>`);
    const state = place.state.replace(reg, `<span class="hl">${value}</span>`);
    return `
        <li>
          <span class="name">${city}, ${state}</span>
          <span class="population">${place.population}</span>
        </li>
      `;
  }

  run() {
    this.searchInput.addEventListener('input', this.updateList.bind(this));
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
