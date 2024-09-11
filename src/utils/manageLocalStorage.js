import { decryptData, encryptData } from "./shield";

export const saveToLocalStorage = (key, data) => {
  const state = encryptData(JSON.stringify(data));
  localStorage.setItem(key, state);
};

export const loadFromLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(decryptData(localStorage.getItem(key)) || null);
  } else return undefined;
};
