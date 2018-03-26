'use strict';

class App {
  run() {
    new PhotoBooth();
  }
}

class PhotoBooth {
  constructor() {
    const video = document.querySelector('.player');
    this.canvas = document.querySelector('.photo');
    this.ctx = this.canvas.getContext('2d');
    this.strip = document.querySelector('.strip');
    this.snap = {
      sound: document.querySelector('.snap'),
      button: document.querySelector('.snap-button')
    };

    this.vs = new VideoStreamer(video);
    this.bindEvents();
  }

  bindEvents() {
    this.vs.video.addEventListener('canplay', this.paintToCanvas.bind(this));
    this.snap.button.addEventListener('click', this.takePhoto.bind(this));
  }

  paintToCanvas() {
    const width = this.vs.video.videoWidth;
    const height = this.vs.video.videoHeight;
    this.canvas.width = width;
    this.canvas.height = height;

    setInterval(() => {
      this.ctx.drawImage(this.vs.video, 0, 0, width, height);

      const pixels = this.ctx.getImageData(0, 0, width, height);
      // const pixelsEffect = PhotoBooth.redEffect(pixels);
      // const pixelsEffect = PhotoBooth.rgbSplit(pixels);
      const pixelsEffect = PhotoBooth.greenScreen(pixels);
      this.ctx.putImageData(pixelsEffect, 0, 0);
    }, 10);
  }

  takePhoto() {
    this.snap.sound.currentTime = 0;
    this.snap.sound.play();

    const data = this.canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'booth_photo');
    link.innerHTML = `<img src="${data}"/>`;
    this.strip.insertBefore(link, this.strip.firstChild);
  }

  static redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i] += 100;
      pixels.data[i + 1] -= 50;
      pixels.data[i + 2] *= 0.5;
    }

    return pixels;
  }

  static rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i];
      pixels.data[i + 100] = pixels.data[i + 1];
      pixels.data[i - 150] = pixels.data[i + 2];
    }

    return pixels;
  }

  static greenScreen(pixels) {
    const levels = {};
    document.querySelectorAll('.rgb input').forEach(input => levels[input.name] = input.value);

    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];

      if (red >= levels.rmin && red <= levels.rmax &&
        green >= levels.gmin && green <= levels.gmax &&
        blue >= levels.bmin && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
      }
    }

    return pixels;
  }
}

class VideoStreamer {
  constructor(video) {
    this.video = video;
    this.init();
  }

  init() {
    if (VideoStreamer.hasGetUserMedia()) {
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          this.video.src = window.URL.createObjectURL(stream);
          this.video.play();
        })
        .catch(err => console.error(err));
    }
  }

  static hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
}

window.onload = () => {
  const app = new App();
  app.run();
};
