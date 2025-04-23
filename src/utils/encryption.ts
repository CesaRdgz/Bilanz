import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY

// Encriptar
export const encriptar = (texto: string) => {
  const ciphertext = CryptoJS.AES.encrypt(texto, SECRET_KEY).toString();
  return ciphertext;
};

// Desencriptar
export const desencriptar = (textoEncriptado: string) => {
  const bytes = CryptoJS.AES.decrypt(textoEncriptado, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
