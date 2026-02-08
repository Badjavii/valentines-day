import { decrypt } from './cipher.js';
import { SessionManager } from './session.js';

SessionManager.loadFromStorage();

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

});
