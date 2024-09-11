import { configureStore } from "@reduxjs/toolkit";
import reducer from "../slices/index";

const store = configureStore({
  reducer,
});

export default store;
