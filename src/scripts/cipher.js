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
