'use strict';

class App {
  run() {
    const list = document.querySelector('.videos')
    new VideoList(list);
  }
}

class VideoList {
  constructor(list) {
    this.list = list;
    this.listItems = this.list.querySelectorAll('li');

    this.countTime();
  }

  countTime() {
    const summarySeconds = Array.from(this.listItems).reduce((previous, current) => {
      const timeStr = current.dataset.time;
      const timeElements = timeStr.split(":").map(e => parseInt(e));
      return previous + this.getSeconds(timeElements);
    }, 0);

    const time = this.formatTime(summarySeconds);
    console.log(time);
  }

  getSeconds(elements) {
    const multiplierMap = [1, 60, 60, 24];
    let multiplier = 1;
    return elements
      .reverse()
      .reduce((previous, current, i) => {
        multiplier *= multiplierMap[i];
        return previous + (current * multiplier);
      }, 0);
  }

  formatTime(seconds) {
    let timeElements = [];
    const dividerMap = [60, 60, 24];

    dividerMap.forEach(currentDivider => {
      timeElements.push(seconds % currentDivider);
      seconds = Math.floor(seconds / currentDivider);
    });

    return timeElements.reverse().join(":");
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
