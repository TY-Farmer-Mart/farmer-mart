export interface Product {
  itemName: string;
  price?: number | string;
  quantity?: string;
  imageUrl: string;
  location?: string;
}

export interface ApiProduct {
  sellerName?: string;
  location?: string;
  verified?: boolean;
  memberYears?: string;
  rating?: number | string;
  responseRate?: string;
  itemName?: string;
  price?: number | string;
  quantity?: string;
  imageUrl?: string;
  products?: Product[];
}

//   itemName: string;
//   price?: number | string;
//   quantity?: string;
//   imageUrl: string;
// }

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
