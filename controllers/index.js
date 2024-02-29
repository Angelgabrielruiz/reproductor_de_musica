import { LinkedList} from "../models/modelo.js";
import { AudioView } from "../view/vista.js";

class AudioController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Atar eventos del DOM a los métodos del controlador
    this.view.bindTogglePlay(this.togglePlay.bind(this));
    this.view.bindChangeSong(this.changeSong.bind(this));
    this.view.bindUpdateProgressBar(this.updateProgressBar.bind(this));
    this.view.bindSetProgress(this.setProgress.bind(this));

    // Cargar las canciones al iniciar
    this.loadAudio(this.model.playlist.getCurrentSong());
  }

  loadAudio(song) {
    this.model.audio.src = `audio/${song}.mp3`; // Carga la canción en el reproductor de audio
    this.view.setTitle(song); // Actualiza el título de la canción en la interfaz de usuario
    this.updateProgressBar(); // Actualiza la barra de progreso
  }

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

  setProgress(event) {
    const { clientWidth } = this.view.progressContainer;
    const clickPosition = event.offsetX;
    this.model.audio.currentTime = (clickPosition / clientWidth) * this.model.audio.duration;
  }

  formatTime(time) {
    const totalSeconds = Math.round(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// Crear una lista enlazada para almacenar las canciones
const playlist = new LinkedList();
playlist.add("going-up");
playlist.add("inspiring-ambient");
playlist.add("technology");
playlist.add("Souvenir");

// Crear instancia del modelo y pasar la lista enlazada
const audioElement = document.querySelector("audio");
const model = { audio: audioElement, playlist };
const view = new AudioView(audioElement);

// Crear instancia del controlador y pasar el modelo y la vista
const controller = new AudioController(model, view);

