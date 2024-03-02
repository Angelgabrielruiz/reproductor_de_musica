export { AudioView };


class AudioView {
  constructor(audio) {
    this.audio = audio;
    this.titleElement = document.querySelector("h1");
    this.playButton = document.getElementById("play");
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
    this.currentTimeElement = document.getElementById("current_time");
    this.currentAudioElement = document.getElementById("current_audio");
    this.progressContainer = document.querySelector(".progress_container");
    this.progressElement = document.getElementById("progress");
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setProgress(progressPercent) {
    this.progressElement.style.width = `${progressPercent}%`;
  }

  setCurrentTime(time) {
    this.currentAudioElement.textContent = time;
  }

  bindTogglePlay(handler) {
    this.playButton.addEventListener("click", handler);
  }

  bindChangeSong(handler) {
    this.prevButton.addEventListener("click", () => handler(-1));
    this.nextButton.addEventListener("click", () => handler(1));
  }

  bindUpdateProgressBar(handler) {
    this.audio.addEventListener("timeupdate", handler);
  }

  bindSetProgress(handler) {
    this.progressContainer.addEventListener("click", handler);
  }
}


