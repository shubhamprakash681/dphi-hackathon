import { configureStore } from "@reduxjs/toolkit";
import myReducers from "./reducers/index";

const store = configureStore({
  reducer: {
    myReducers,
  },
});

export default store;
