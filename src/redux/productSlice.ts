import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/productTypes";

interface ProductsState {
  allProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:7000/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data: Record<string, { list?: Product[] }> = await res.json();
    return Object.values(data).flatMap((cat) => cat.list ?? []);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
