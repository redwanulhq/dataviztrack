import CryptoJS from "crypto-js";
import UNIVERSAL from "../config";

export const encryptData = (data) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(data),
    UNIVERSAL.ENCRYPTION_KEY
  ).toString();

export const decryptData = (data) => {
  try {
    const decryptedData = CryptoJS.AES.decrypt(
      data,
      UNIVERSAL.ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};
