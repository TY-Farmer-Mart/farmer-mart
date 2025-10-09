import { configureStore } from "@reduxjs/toolkit";
import dashBoardSlice from "./dashBoardSlice";
import productReducer from "./productSlice";
import checkoutReducer from "./checkoutSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    toggle:  dashBoardSlice,
    products: productReducer,
    checkout: checkoutReducer,
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
