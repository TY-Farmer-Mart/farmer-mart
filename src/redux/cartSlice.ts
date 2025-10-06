import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
// Read cart from localStorage
const storedCart = localStorage.getItem("cart");
 
export interface Product {
  id: string;
  cartId?: string; // unique for each cart item
  itemName: string;
  price: number;
  imageUrl: string;
  quantity: number; // number of units in cart
  sellerName: string;
  location: string;
}
 
const initialState: { items: Product[] } = {
  items: storedCart ? JSON.parse(storedCart) : [],
};
 
const saveCart = (items: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};
 
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (i) => i.id === action.payload.id && i.sellerName === action.payload.sellerName
      );
 
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          cartId: `${action.payload.id}-${action.payload.sellerName.replace(/\s+/g, "-")}-${Date.now()}`,
        });
      }
 
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
  },
});
 
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
 
export default cartSlice.reducer;