export interface Product {
  id?: string | number;
  itemName: string;
  price?: number | string;
  quantity?: string;
  imageUrl?: string;
  sellerName?: string;
  location?: string;
  rating?: number | string;
  verified?: boolean;
  memberYears?: string;
  responseRate?: string;
}

export interface Supplier {
  sellerName: string;
  location?: string;
  rating?: number | string;
  verified?: boolean;
  memberYears?: string;
  responseRate?: string;
  products: Product[];
}

export interface ApiProduct {
  id?: string | number;
  itemName?: string;
  price?: number | string;
  quantity?: string;
  imageUrl?: string;
  sellerName?: string;
  location?: string;
  rating?: number | string;
  verified?: boolean;
  memberYears?: string;
  responseRate?: string;
  products?: Product[];
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}
