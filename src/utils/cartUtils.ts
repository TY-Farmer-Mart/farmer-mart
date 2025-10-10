import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import type { CartItem } from "@/types/checkoutTypes";

export const getCartData = () => {
  const reduxItems = useSelector((state: RootState) => state.cart?.items ?? []);
  
  const persistedItems = (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  const items: CartItem[] = (reduxItems.length > 0
    ? reduxItems
    : persistedItems) as CartItem[];

  const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const itemsTotal = items.reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );

  return { items, itemCount, itemsTotal };
};
