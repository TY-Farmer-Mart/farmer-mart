import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";

interface Props {
  isActive?: boolean;
}

interface CartItem {
  cartId: string;
  itemName: string;
  sellerName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  [key: string]: unknown;
}

interface PriceDetails {
  items: CartItem[];
  itemsTotal: number;
  discount: number;
  coupons: number;
  platformFee: number;
  totalAmount: number;
}

const OrderSummaryStep: React.FC<Props> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const reduxItems: CartItem[] = useSelector(
    (state: RootState) => state.cart?.items ?? []
  );

  const persistedItems: CartItem[] = (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  })();

  const items: CartItem[] = reduxItems.length > 0 ? reduxItems : persistedItems;

  const itemsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const PLATFORM_FEE = 7;
  const DISCOUNT = 25;
  const COUPONS = 10;
  const totalAmount = itemsTotal - DISCOUNT - COUPONS + PLATFORM_FEE;

  if (!isActive) return null;

  const goBack = () => navigate(-1);

  const proceed = () => {
    const priceDetails: PriceDetails = {
      items,
      itemsTotal,
      discount: DISCOUNT,
      coupons: COUPONS,
      platformFee: PLATFORM_FEE,
      totalAmount,
    };
    navigate("/paymentpage", { state: priceDetails });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow border">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {t("CART.orderSummary")}
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          {t("CART.cartItems")} ({items.length})
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 gap-4"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover border rounded bg-white"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">
                      {item.itemName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("CART.seller")}{" "}
                      <span className="font-medium text-gray-700">
                        {item.sellerName}
                      </span>
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("CART.deliveryBy")} Tue, Oct 14
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="font-semibold mb-4 text-gray-700">
          {t("CART.priceDetails")}
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>
              {t("CART.price")} ({items.length} {t("CART.items")})
            </span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>{t("CART.discount")}</span>
            <span>-₹{DISCOUNT}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>{t("CART.couponsForYou")}</span>
            <span>-₹{COUPONS}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("CART.platformFee")}</span>
            <span>₹{PLATFORM_FEE}</span>
          </div>
          <div className="border-t pt-2 mt-3 flex justify-between font-bold text-lg text-gray-900">
            <span>{t("CART.totalAmount")}</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <p className="text-green-600 mt-3 text-sm">
          {t("CART.youWillSave", { amount: DISCOUNT + COUPONS })}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t flex items-center justify-between">
        <Button
          variant="addToCart"
          size="lg"
          className="w-28 py-2"
          onClick={goBack}
        >
          {t("CART.back")}
        </Button>

        <Button
          variant="buyNow"
          size="lg"
          className="w-28 py-2"
          onClick={proceed}
        >
          {t("CART.placeOrder")}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryStep;
