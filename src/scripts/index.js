import { encrypt } from './cipher.js';
import { SessionManager } from './session.js';

const PASSWORD_STORED = "86052120";

// Function to switch the visibility of the notices
function switchNotice() {
  const secure = document.getElementById('secureNotice');
  const selection = document.getElementById('selectionNotice');

  if (secure.style.display === 'none') {
    secure.style.display = 'block';
    selection.style.display = 'none';
  } else {
    secure.style.display = 'none';
    selection.style.display = 'block';
  }
}

// Function to get secret key to unlock the content of letters
function getShift(input) {
  const sum = input.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  return encrypt(sum.toString(), sum).charCodeAt(0);
}

// Function to check if the password is correct
function checkPassword() {
  const inputValue = document.getElementById('password').value;

  if (!/^\d+$/.test(inputValue)) {
    alert('La cédula solo lleva números. Intentalo de nuevo.');
    return;
  }

  const shift = getShift(inputValue);

  if (encrypt(inputValue, shift) === PASSWORD_STORED) {
    SessionManager.setShift(shift);
    switchNotice();
  } else {
    alert('Error de identidad: Intentalo de nuevo. Sino, este regalo no es para ti.');
  }
}

// == Main ==
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('loginForm');
  const selectionForm = document.getElementById('selectionForm');
  
  if (SessionManager.isLogged()) {
    switchNotice();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkPassword();
    });
  }

  if (selectionForm) {
    selectionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      SessionManager.setYear(document.getElementById('year').value);
      window.location.href = './src/main.html';
    });
  }

    const audioElement = document.getElementById("test-audio");
    const muteButton = document.getElementById("mute-button");
    let isPaused = false;

    muteButton.addEventListener("click", function () {
        if (isPaused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        isPaused = !isPaused;
    });
});
