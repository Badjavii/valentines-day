const PASSWORD_STORED = "86052120";

function getShift(input) {
  const sum = input.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  return encrypt(sum.toString(), sum).charCodeAt(0);
}

function checkPassword() {
  const inputValue = document.getElementById('password').value;

  if (!/^\d+$/.test(inputValue)) {
    alert('La cédula solo lleva números. Intentalo de nuevo.');
    return;
  }

  const shift = getShift(inputValue);

  if (comparePassword(inputValue, shift)) {
    secureNotice.style.display = 'none';
    selectionNotice.style.display = 'block';
  } else {
    alert('Error de identidad: Intentalo de nuevo. Sino, este regalo no es para ti.');
  }
}

function comparePassword(input, shift) {
  return (encrypt(input, shift) === PASSWORD_STORED);
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkPassword();
});

/**
 * Encrypt text with a custom offset.
 * @param {string} message - Message to encrypt.
 * @param {number} shift - Displacement positions.
 */
export function encrypt(message, shift) {
  let result = "";
  const s = shift % 26;

    for (let i = 0; i < message.length; i++) {
        let code = message.charCodeAt(i);
        let char = message[i];

        // Upercase (65-90)
        if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + s) % 26) + 65);
        }
        // Lowercase (97-122)
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + s) % 26) + 97);
        }
        // Digits (48-57) 
        else if (code >= 48 && code <= 57) {
            char = String.fromCharCode(((code - 48 + shift) % 10) + 48);
        }

        result += char;
    }
    return result;
}

/**
 * Decrypt text by reversing the offset.
 */
export function decrypt(message, shift) {
    let result = "";
    const s = shift % 26;

    for (let i = 0; i < message.length; i++) {
        let code = message.charCodeAt(i);
        let char = message[i];

        // Upercase
        if (code >= 65 && code <= 90) {
            // Sumamos 26 para que al restar no de un número negativo antes del módulo
            char = String.fromCharCode(((code - 65 - s + 26) % 26) + 65);
        }
        // Lowercase
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 - s + 26) % 26) + 97);
        }
        // Digits
        else if (code >= 48 && code <= 57) {
            char = String.fromCharCode(((code - 48 - (shift % 10) + 10) % 10) + 48);
        }

        result += char;
    }
    return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('loginForm');
  const secureNotice = document.getElementById('secureNotice');
  const selectionNotice = document.getElementById('selectionNotice');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkPassword();
    })
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

async function leerArchivo(ruta) {
    try {
        const response = await fetch(ruta);
        if (!response.ok) {
            throw new Error("Error al leer el archivo");
        }
        const data = await response.text();
        return data.split('\n');
    } catch (error) {
        console.error("Error leyendo el archivo:", error);
        return [];
    }
}

