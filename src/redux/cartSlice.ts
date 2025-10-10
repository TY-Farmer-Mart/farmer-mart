import { CardProduct } from "@/types/cartType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");

const initialState: { items: CardProduct[] } = {
  items: storedCart ? JSON.parse(storedCart) : [],
};

const saveCart = (items: CardProduct[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CardProduct>) => {
      state.items.push({
        ...action.payload,
        cartId: `${action.payload.id}-${action.payload.sellerName.replace(
          /\s+/g,
          "-"
        )}-${Date.now()}`,
      });

      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.cartId !== action.payload);
      saveCart(state.items);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.cartId === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.cartId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.cartId !== action.payload);
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
