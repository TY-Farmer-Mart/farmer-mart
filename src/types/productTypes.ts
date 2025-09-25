export interface Product {
  id: number;
  itemName: string;
  price?: number | string;
  quantity?: string;
  imageUrl: string;
  sellerName?: string;
  location?: string;
  verified?: boolean;
  memberYears?: string;
  rating?: number;
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
