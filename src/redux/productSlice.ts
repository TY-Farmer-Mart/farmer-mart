import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/productTypes";

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    priceRange?: string;
    seller?: string;
    location?: string;
    category?: string;
  };
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {},
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
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof ProductsState["filters"]; value: string }>
    ) => {
      const { key, value } = action.payload;

      if (state.filters[key] === value) {
        delete state.filters[key];
      } else {
        state.filters[key] = value;
      }

      state.filteredProducts = state.allProducts.filter((p) => {
        if (state.filters.priceRange) {
          const price = Number(p.price) || 0;
          switch (state.filters.priceRange) {
            case "₹50 and Below":
              if (price > 50) return false;
              break;
            case "₹50 - ₹100":
              if (price < 50 || price > 100) return false;
              break;
            case "₹100 - ₹500":
              if (price < 100 || price > 500) return false;
              break;
            case "₹500 and Above":
              if (price < 500) return false;
              break;
          }
        }

        if (state.filters.seller && p.sellerName !== state.filters.seller) return false;

        if (state.filters.location && p.location !== state.filters.location) return false;

        if (state.filters.category && p.itemName !== state.filters.category) return false;

        return true;
      });
    },

    clearFilters: (state) => {
      state.filters = {};
      state.filteredProducts = state.allProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
