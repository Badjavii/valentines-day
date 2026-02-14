export class MusicPlayer {
  constructor(playlist) {
    this.audio = document.getElementById('mainAudio');
    this.trackTitle = document.getElementById('trackTitle');
    this.trackArtist = document.getElementById('trackArtist');
    this.progress = document.getElementById('playerProgress');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.playlist = playlist;
    this.currentIndex = Math.floor(Math.random() * this.playlist.length);
    this.init();
  }

  init() {
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.prevBtn.addEventListener('click', () => this.prevTrack());

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.progress.addEventListener('input', () => this.seek());

    this.audio.addEventListener('loadedmetadata', () => {
      this.progress.max = 100;
    });

    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.loadTrack(this.currentIndex);

    this.play();
  }

  loadTrack(index) {
    const track = this.playlist[index];
    this.audio.src = `./assets/audios/${track.path}`;
    this.trackTitle.innerText = track.title;
    this.trackArtist.innerText = track.author;
    this.progress.value = 0;
  }

  play() {
    this.audio.play().then(() => {
      this.playPauseBtn.innerText = "⏸";
    }).catch(error => {
      console.log("Autoplay bloqueado o error de carga:", error);
      this.playPauseBtn.innerText = "▶";
    });
  }

  pause() {
    this.audio.pause();
    this.playPauseBtn.innerText = "▶";
  }

  togglePlay() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();  
    }
  }

  nextTrack() {
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentIndex);
    this.play();
  }

  prevTrack() {
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadTrack(this.currentIndex);
    this.play();
  }

  updateProgress() {
    if (this.audio.duration) {
      const value = (this.audio.currentTime / this.audio.duration) * 100;
      this.progress.value = value;
    }
  }

  seek() {
    const time = (this.progress.value / 100) * this.audio.duration;
    this.audio.currentTime = time;
  }
}
