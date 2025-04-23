import CryptoJS from 'crypto-js';

const SECRET_KEY = '2f5bcb9f8a745dca3b59d1f9c7e529b8b64862d9987e890ba18d7d3774f97b9e';  // Tu clave secreta

// Encriptar
export const encriptar = (texto: string) => {
  const ciphertext = CryptoJS.AES.encrypt(texto, SECRET_KEY).toString();
  return ciphertext;
};

// Desencriptar
export const desencriptar = (textoEncriptado: string) => {
  const bytes = CryptoJS.AES.decrypt(textoEncriptado, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
