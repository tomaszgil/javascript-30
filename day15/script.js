'use strict';

class App {
  run() {
    new DynamicList();
  }
}

class DynamicList {
  constructor() {
    this.itemsList = document.querySelector('.plates');
    this.addItems = document.querySelector('.add-items');
    this.itemNameInput = this.addItems.querySelector('input[name=item]');
    this.items = JSON.parse(localStorage.getItem('tapas')) || [];

    this.bindEvents();
    this.populateList();
  }

  bindEvents() {
    this.addItems.addEventListener('submit', this.handleAddingItem.bind(this));
    this.itemsList.addEventListener('click', this.onItemSelect.bind(this));
  }

  handleAddingItem(e) {
    e.preventDefault();
    const tapas = {
      text: this.itemNameInput.value,
      selected: false
    };
    this.items.push(tapas);
    this.populateList();
    this.save();
    this.addItems.reset();
  }

  populateList() {
    this.itemsList.innerHTML = this.items.map((item, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item-${i}" ${item.selected ? 'checked' : ''} />
          <label for="item-${i}">${item.text}</label>
        </li>
      `;
    }).join('');
  }

  onItemSelect(e) {
    if (!e.target.matches('input')) return;
    const index = e.target.dataset.index;
    this.items[index] = Object.assign({}, this.items[index], { selected: !this.items[index].selected });
    this.save();
  }

  save() {
    localStorage.setItem('tapas', JSON.stringify(this.items));
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
