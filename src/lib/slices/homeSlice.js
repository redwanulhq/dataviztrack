import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../utils/manageLocalStorage";
import { CREDENTIALS } from "../../utils/dataKeys";

const localData = loadFromLocalStorage(CREDENTIALS) || {};

const initialState = {
  have_unsave: false,
  curr_view: localData?.token ? "list" : "fu",
  curr_data: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHaveUnsave: (state, action) => {
      state.have_unsave = action.payload;
    },
    setCurrView: (state, action) => {
      state.curr_view = action.payload;
    },
    setCurrData: (state, action) => {
      state.curr_data = action.payload;
    },
  },
});

export const { setHaveUnsave, setCurrView, setCurrData } = homeSlice.actions;
export default homeSlice.reducer;
