export interface Product {
  id?: number | string;
  cartId?: string;
  itemName: string;
  price?: number | string;
  quantity?: number;
  imageUrl?: string;
  location?: string;
  sellerName: string;
  verified?: boolean;
  memberYears?: string;
  rating?: number | string;
  responseRate?: string;
}

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface Supplier {
  sellerName?: string;
  location?: string;
  verified?: boolean;
  memberYears?: string;
  rating?: number | string;
  responseRate?: string;
  products?: Product[];
}

export interface SupplierStats {
  roundedRating: number;
  reviewCount: number;
}

export interface ParsedQuantity {
  amount: number | null;
  unit: string | null;
  label: string;
}
