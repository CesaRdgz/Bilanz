import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.ENCRYPTION_KEY;

// Encriptar
export const encriptar = (texto: string) => {
  const ciphertext = CryptoJS.AES.encrypt(texto, SECRET_KEY).toString();
  return ciphertext;
};

// Desencriptar
export const desencriptar = (textoEncriptado: string) => {
  const bytes = CryptoJS.AES.decrypt(textoEncriptado, SECRET_KEY);
  const origianlText = bytes.toString(CryptoJS.enc.Utf8);
  return origianlText;
};
