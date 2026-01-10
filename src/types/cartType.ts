export interface PriceDetailsProps {
  itemCount: number;
  totalPrice: number;
  discount?: number;
  coupons?: number;
  platformFee?: number;
}

export interface CardProduct {
  id: string;
  cartId?: string;
  itemName: string;
  price: number;
  imageUrl: string;
  quantity: number;
  sellerName: string;
  location: string;
}

export interface CartItemListProps {
  items: CardProduct[];
  checkedItems: string[];
  onCheckboxChange: (cartId: string) => void;
  onIncrement: (cartId: string) => void;
  onDecrement: (cartId: string) => void;
  onRemove: (cartId: string) => void;
}

export interface Address {
  name: string;
  details: string;
}