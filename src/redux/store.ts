// import { configureStore } from "@reduxjs/toolkit";
// import dashBoardSlice from "./dashBoardSlice";
// import productReducer from "./productSlice";

// const store = configureStore({
//   reducer: {
//     dashboard:dashBoardSlice,
//     products: productReducer,
//   },
// });
// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import dashBoardSlice from "./dashBoardSlice";
import productReducer from "./productSlice";
 
const store = configureStore({
  reducer: {
    toggle:dashBoardSlice,
    products: productReducer,
  },
});
export default store;
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;