import type { CardProduct } from "@/types/cartType";
export type CartItem = CardProduct;

export interface PriceDetails {
  items: CartItem[];
  itemsTotal: number;
  discount: number;
  coupons: number;
  platformFee: number;
  totalAmount: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  address: string;
  locality?: string;
  city?: string;
  state?: string;
  landmark?: string;
  altPhone?: string;
  addressType: "home" | "work";
}

export type AddressFormValues = Omit<Address, "id">;

export interface StateOption {
  name: string;
  isoCode: string;
}

export interface CityOption {
  name: string;
}

export interface StoredUser {
  token?: string;
  message?: string;
  user?: {
    email?: string;
    [key: string]: unknown;
  };
  email?: string;
}

export interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: unknown;
}

export interface StepProps {
  isActive?: boolean;
  onNext?: () => void;
}
