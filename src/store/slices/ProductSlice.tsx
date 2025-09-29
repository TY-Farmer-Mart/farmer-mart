import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = { products: {} };
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default ProductSlice.reducer;
