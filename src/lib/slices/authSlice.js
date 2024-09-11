import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/manageLocalStorage";
import { CREDENTIALS } from "../../utils/dataKeys";

const localData = loadFromLocalStorage(CREDENTIALS) || {};

const initialState = {
  token: localData?.token || null,
  username: localData?.username || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCredentials: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      saveToLocalStorage(CREDENTIALS, action.payload);
    },
    logout: (state) => {
      state.token = null;
      saveToLocalStorage(CREDENTIALS, {});
    },
  },
});

export const { saveCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
