export {AudioController}

class AudioController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // guarda eventos, métodos del controlador
    this.view.bindTogglePlay(this.togglePlay.bind(this));
    this.view.bindChangeSong(this.changeSong.bind(this));
    this.view.bindUpdateProgressBar(this.updateProgressBar.bind(this));
    
    // Cargo las cancion en el inicio
    this.loadAudio(this.model.playlist.getCurrentSong());
  }

  loadAudio(song) {
    this.model.audio.src = `audio/${song}.mp3`; // cargo la cancion
    this.view.setTitle(song); // cambio el titulo
    this.updateProgressBar(); // la barra se actualixa tambien
  }

  // si le puse pausa o reproducir
  togglePlay() {
    if (this.model.audio.paused) {
      this.model.audio.play();
    } else {
      this.model.audio.pause();
    }
  }

  changeSong(direction) {
    const nextSong = direction === 1 ? this.model.playlist.getNextSong() : this.model.playlist.getPrevSong();
    if (nextSong) {
      this.loadAudio(nextSong);
    }
  }

  updateProgressBar() {
    const duration = this.model.audio.duration;
    const currentTime = this.model.audio.currentTime;
     const progressPercent = (currentTime / duration) * 100;
    this.view.setProgress(progressPercent);
    this.view.setCurrentTime(this.formatTime(currentTime));
  }


   formatTime(time) {
    const totalSeconds = Math.round(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  } 

}