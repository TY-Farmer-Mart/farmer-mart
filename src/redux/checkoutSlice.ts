// src/redux/checkoutSlice.ts
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
  currentStep: number; // 1=Login, 2=Address, 3=Summary, 4=Payment
  addresses: Address[];
  selectedAddressId?: string;
}

const initialState: CheckoutState = {
  currentStep: 1,
  addresses: [],
  selectedAddressId: undefined,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    goToNextStep: (state) => {
      if (state.currentStep < 4) state.currentStep += 1;
    },
    goToPreviousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    goToStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= 4)
        state.currentStep = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index >= 0) {
        state.addresses[index] = { ...state.addresses[index], ...action.payload };
      } else {
        state.addresses.push(action.payload);
      }
    },
    selectAddress: (state, action: PayloadAction<string>) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const {
  goToNextStep,
  goToPreviousStep,
  goToStep,
  addAddress,
  selectAddress,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
