import { decrypt } from './cipher.js';
import { SessionManager } from './session.js';

SessionManager.loadFromStorage();

/*
const playlist = ['01-song.mp3'];
let currentTrackIndex = 0;
*/

// This function is to get the decrypted text
async function getDecryptedLetter(shift) {
  const year = SessionManager.getYear();
  
  const response = await fetch(`./assets/docs/${year}.md`);
  if (!response.ok) { throw new Error("Carta no encontrada."); }

  const encryptedLetter = await response.text();
  const decryptedLetter = decrypt(encryptedLetter, shift);

  return decryptedLetter;
}

/*
function loadTrack(index) {
  const audio = document.getElementById('mainAudio');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const fileName = playlist[index];
  const path = `./assets/audios/${fileName}`;

  audio.src = path;

  if (window.jsmediatags) {
    window.jsmediatags.read(path, {
      onSuccess: function(tag) {
        trackTitle.innerText = tag.tags.title || fileName;
        trackArtist.innerText = tag.tags.artist || "Unknown Artist";
      },
      onError: function() {
        trackTitle.innerText = fileName;
        trackArtist.innerText = "Abyss Audio";
      }
    });
  }
}
*/

 // ==Main==
document.addEventListener("DOMContentLoaded", async () => {
  /*
  try {
    loadTrack(currentTrackIndex);
  } catch (error) {
    console.error("Error al cargar audio inicial:", error);
  }
  */

  const menuBtn = document.getElementById('menuBtn');
  const menuNotice = document.getElementById('menu'); 
  const loadingNotice = document.getElementById('loadingNotice');
  const letterContainer = document.getElementById('letter');
  const denegationNotice = document.getElementById('denegationNotice');
  const denegationBtn = document.getElementById('denegationBtn');
  /*
  const playPauseBtn = document.getElementById('playPauseBtn');
  const audio = document.getElementById('mainAudio');
  const progress = document.getElementById('playerProgress');
  */

  const shift = SessionManager.getShift();

  if (!shift || isNaN(shift)) {
    loadingNotice.style.display = 'none';
    denegationNotice.style.display = 'block';
    
    if (denegationBtn) {
      denegationBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
      })
    }

    return;
  }

  try {
    const originalLetter = await getDecryptedLetter(shift);
    letterContainer.innerHTML = marked.parse(originalLetter);

    setTimeout(() => {
      loadingNotice.style.display = 'none';
      letterContainer.style.display = 'block';
    }, 2000);
  } catch (error) {
    console.error("Error cargando la carta:", error);
    loadingNotice.innerHTML = "<label>Hubo un error cargando el mensaje. Intentalo de nuevo.</label>";
  }

  // loadTrack(currentTrackIndex);

  menuBtn.addEventListener('click', () => {
    const isHidden = (window.getComputedStyle(menuNotice).display === 'none');

    if (isHidden) {
      menuNotice.style.display = 'block';
      letterContainer.classList.add('blurBg');
    } else {
      menuNotice.style.display = 'none';
      letterContainer.classList.remove('blurBg');
    }
  });

  /*
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerText = "⏸";
    } else {
      audio.pause();
      playPauseBtn.innerText = "▶";
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.innerText = "⏸";
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;\
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.innerText = "⏸";
  });

  audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value || 0;
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
  */

});
