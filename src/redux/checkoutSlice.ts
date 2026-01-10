import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Address, CartItem } from "@/types/checkoutTypes";

const STORAGE_KEY = "checkout";

function loadPersistedCheckout(): Partial<CheckoutState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      addresses: Array.isArray(parsed.addresses) ? parsed.addresses : [],
      selectedAddressId:
        typeof parsed.selectedAddressId === "string"
          ? parsed.selectedAddressId
          : undefined,
    } as Partial<CheckoutState>;
  } catch {
    return {};
  }
}

function persistCheckout(state: CheckoutState) {
  try {
    const toPersist = {
      addresses: state.addresses,
      selectedAddressId: state.selectedAddressId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  } catch {
    // ignore write errors
  }
}


export interface CheckoutState {
  currentStep: number;
  addresses: Address[];
  selectedAddressId?: string;
  selectedItems: CartItem[];
}


const persisted = loadPersistedCheckout();

const initialState: CheckoutState = {
  currentStep: 1,
  addresses: persisted.addresses || [],
  selectedAddressId: persisted.selectedAddressId,
  selectedItems: [],
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
      const index = state.addresses.findIndex(
        (a) => a.id === action.payload.id
      );
      if (index >= 0) {
        state.addresses[index] = {
          ...state.addresses[index],
          ...action.payload,
        };
      } else {
        state.addresses.push(action.payload);
      }
      persistCheckout(state);
    },
    selectAddress: (state, action: PayloadAction<string>) => {
      state.selectedAddressId = action.payload;
      persistCheckout(state);
    },
    resetCheckout: (state) => {
      state.currentStep = 1;
      state.selectedAddressId = undefined;
      state.selectedItems = [];
    },
    setSelectedItems: (state, action: PayloadAction<CartItem[]>) => {
      state.selectedItems = action.payload;
    },
  },
});

export const {
  goToNextStep,
  goToPreviousStep,
  goToStep,
  addAddress,
  selectAddress,
  resetCheckout,
  setSelectedItems,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
