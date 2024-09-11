import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAuth: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setOpenAuth: (state, action) => {
      state.openAuth = action.payload;
    },
  },
});

export const { setOpenAuth } = headerSlice.actions;
export default headerSlice.reducer;
