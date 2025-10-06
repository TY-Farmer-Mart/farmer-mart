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
    product?: string;
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

const categoryOfProduct = (itemName?: string) => {
  if (!itemName) return "";
  const vegetables = ["Onion", "Chilli", "Tomato"];
  const fruits = ["Apple", "Banana"];
  if (vegetables.includes(itemName)) return "vegetables";
  if (fruits.includes(itemName)) return "fruits";
  return "";
};

const applyFilters = (
  products: Product[],
  filters: ProductsState["filters"]
) => {
  return products.filter((p) => {
    const f = filters;
    const price = Number(p.price) || 0;

    if (f.priceRange) {
      switch (f.priceRange) {
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

    if (f.seller && p.sellerName !== f.seller) return false;
    if (f.location && p.location !== f.location) return false;
    if (f.category && categoryOfProduct(p.itemName) !== f.category)
      return false;
    if (
      f.product &&
      !p.itemName?.toLowerCase().includes(f.product.toLowerCase())
    )
      return false;

    return true;
  });
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        key: keyof ProductsState["filters"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (state.filters[key] === value) delete state.filters[key];
      else state.filters[key] = value;

      state.filteredProducts = applyFilters(state.allProducts, state.filters);
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
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.allProducts = action.payload;
          state.filteredProducts = applyFilters(
            state.allProducts,
            state.filters
          );
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
