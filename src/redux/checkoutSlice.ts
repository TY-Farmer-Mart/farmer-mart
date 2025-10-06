import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  locality?: string;
  city?: string;
  state?: string;
  landmark?: string;
  altPhone?: string;
  addressType?: "home" | "work";
}

interface CheckoutState {
  currentStep: number;
  selectedAddressId?: string;
  addresses: Address[];
}

const initialState: CheckoutState = {
  currentStep: 1,
  addresses: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    goToNextStep(state) {
      if (state.currentStep < 4) state.currentStep += 1;
    },
    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    addAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
      state.selectedAddressId = action.payload.id;
    },
    selectAddress(state, action: PayloadAction<string>) {
      state.selectedAddressId = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  goToNextStep,
  goToStep,
  addAddress,
  selectAddress,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
