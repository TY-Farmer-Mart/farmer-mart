import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Button } from "@/components/common/ui/Button";
import { useNavigate } from "react-router-dom";
import CartItemList from "@/features/Cart/CartItemList";
import PriceDetails from "@/features/Cart/PriceDetails";
import DeliveryLocation from "@/features/Cart/DeliveryLocation";
import { useTranslation } from "react-i18next";

export default function AddToCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (cartId: string) => {
    setCheckedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  useEffect(() => {
    setCheckedItems((prev) =>
      prev.filter((id) => cartItems.some((c) => c.cartId === id))
    );
  }, [cartItems]);

  const checkedCartItems = cartItems.filter((item) =>
    checkedItems.includes(item.cartId!)
  );

  const totalPrice = checkedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
            <div className="text-blue-600 border-b-2 border-blue-600 pb-2 font-semibold">
              {t("CART.cartItems")}({cartItems.length})
            </div>
          </div>
          <DeliveryLocation />
          <CartItemList
            items={cartItems}
            checkedItems={checkedItems}
            onCheckboxChange={handleCheckboxChange}
            onIncrement={(id) => dispatch(incrementQuantity(id))}
            onDecrement={(id) => dispatch(decrementQuantity(id))}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
          {cartItems.length > 0 && (
            <div className="bg-white p-4 flex  justify-between items-center gap-4">
              <Button
                variant="addToCart"
                size="lg"
                className="flex-1 max-w-[150px] py-2"
                onClick={() => navigate(-1)}
              >
                {t("CART.back")}
              </Button>

              <Button
                variant="buyNow"
                size="lg"
                className="flex-1 max-w-[180px]"
                onClick={() => navigate("/checkout")}
              >
                {t("CART.placeOrder")}
              </Button>
            </div>
          )}
        </div>
        <aside className="w-full lg:w-80 mt-6 lg:mt-0">
          <PriceDetails
            itemCount={checkedItems.length}
            totalPrice={totalPrice}
          />
        </aside>
      </div>
    </div>
  );
}
