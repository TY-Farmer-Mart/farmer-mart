import { configureStore } from "@reduxjs/toolkit";
import dashBoardSlice from "./dashBoardSlice";
import productsReducer from "./productSlice";

const store = configureStore({
  reducer: {
    dashboard: dashBoardSlice,
    products: productsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
