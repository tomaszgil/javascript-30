'use strict';

class App {
  constructor() {
    this.player = document.querySelector('.player');
  }

  run() {
    new VideoPlayer(this.player);
  }
}

class VideoPlayer {
  constructor(player) {
    this.player = player;
    this.video = this.player.querySelector('.viewer');
    this.progress = this.player.querySelector('.progress');
    this.progressBar = this.player.querySelector('.progress__filled');
    this.playButton = this.player.querySelector('.toggle');
    this.sliders = this.player.querySelectorAll('.player__slider');
    this.skipButtons = this.player.querySelectorAll('.player__button[data-skip]');
    this.characters = {
      play: '&#9658;',
      pause: '&#10074;&#10074;'
    };

    this.mousedownOnProgress = false;
    this.bindEvents();
  }

  bindEvents() {
    this.video.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('timeupdate', this.updateProgressBar.bind(this));
    this.video.addEventListener('ended', this.updateButton.bind(this));
    this.video.addEventListener('play', this.updateButton.bind(this));
    this.video.addEventListener('pause', this.updateButton.bind(this));
    this.playButton.addEventListener('click', this.togglePlay.bind(this));
    this.progress.addEventListener('click', this.setCurrentTime.bind(this));
    this.progress.addEventListener('mousemove', (e) => this.mousedownOnProgress && this.setCurrentTime(e));
    this.progress.addEventListener('mousedown', () => this.mousedownOnProgress = true);
    this.progress.addEventListener('mouseup', () => this.mousedownOnProgress = false);
    Array.from(this.sliders).forEach(slider => slider.addEventListener('change', this.slide.bind(this)));
    Array.from(this.skipButtons).forEach(button => button.addEventListener('click', this.skip.bind(this)));
  }

  updateProgressBar() {
    const width = 100 * this.video.currentTime / this.video.duration;
    this.progressBar.style.width = `${width}%`;
    this.progressBar.style.flexBasis = `${width}%`;
  }

  togglePlay() {
    if (!this.video.paused && !this.video.ended) {
      this.video.pause();
    } else if (this.video.paused) {
      this.video.play();
    } else if (this.video.ended) {
      this.video.currentTime = 0;
      this.video.play();
      this.playButton.innerHTML = this.characters.pause;
    }
  }

  updateButton() {
    if (!this.video.paused && !this.video.ended) {
      this.playButton.innerHTML = this.characters.pause;
    } else {
      this.playButton.innerHTML = this.characters.play;
    }
  }

  setCurrentTime(e) {
    this.video.currentTime = this.video.duration * e.offsetX / this.progress.offsetWidth;
  }

  slide(e) {
    const element = e.currentTarget;
    this.video[element.name] = element.value;
  }

  skip(e) {
    const element = e.currentTarget;
    const value = parseInt(element.dataset.skip);
    let time = Math.max(0, this.video.currentTime + value);
    time = Math.min(time, this.video.duration);
    this.video.currentTime = time;
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
