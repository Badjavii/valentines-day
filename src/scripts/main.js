import { decrypt } from './cipher.js';
import { SessionManager } from './session.js';
import { MusicPlayer } from './player.js';

SessionManager.loadFromStorage();

const playlist = [
  { title: "Can't Help Falling in Love", author: 'Boyce Avenue', path: '00-song.mp3'},
  { title: 'Cristina', author: 'Sebastian Yatra', path: '01-song.mp3'},
  { title: 'Muchachita Linda', author: 'Juan Luis Guerra 4.40', path: '02-song.mp3'},
  { title: 'En Medio de Ésta Fé', author: 'Ricardo Andrade', path: '03-song.mp3'},
  { title: 'La Cosa Mas Bella', author: 'Eros Ramazzotti', path: '04-song.mp3'},
  { title: 'Tú con Él', author: 'Rauw Alejandro', path: '05-song.mp3'},
  { title: 'BAILE INoLVIDABLE', author: 'Bad Bunny', path: '06-song.mp3'},
];

// This function is to get the decrypted text
async function getDecryptedLetter(shift) {
  const year = SessionManager.getYear();
  
  const response = await fetch(`./assets/docs/${year}.md`);
  if (!response.ok) { throw new Error("Carta no encontrada."); }

  const encryptedLetter = await response.text();
  const decryptedLetter = decrypt(encryptedLetter, shift);

  return decryptedLetter;
}

 // ==Main==
document.addEventListener("DOMContentLoaded", async () => {
  const player = new MusicPlayer(playlist);
  const menuBtn = document.getElementById('menuBtn');
  const menuNotice = document.getElementById('menu'); 
  const loadingNotice = document.getElementById('loadingNotice');
  const letterContainer = document.getElementById('letter');
  const denegationNotice = document.getElementById('denegationNotice');
  const denegationBtn = document.getElementById('denegationBtn');

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

});
