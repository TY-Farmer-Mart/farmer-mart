import { configureStore } from "@reduxjs/toolkit";
import dashBoardSlice from "./dashBoardSlice";

const store = configureStore({
  reducer: dashBoardSlice,
});

export default store;

