import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";

interface Props {
  isActive?: boolean; // defaults to true when used via route
}

const OrderSummaryStep: React.FC<Props> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reduxItems = useSelector((s: RootState) => s.cart?.items);
  const persistedItems = (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();
  const items = (reduxItems && reduxItems.length > 0) ? reduxItems : persistedItems;
  const itemsTotal = (items || []).reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  const PLATFORM_FEE = 7;
  const DISCOUNT = 25;
  const COUPONS = 10;
  const totalAmount = itemsTotal - DISCOUNT - COUPONS + PLATFORM_FEE;

  if (!isActive) return null;

  const proceed = () => {
    navigate("/paymentpage");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{t("CART.orderSummary")}</h2>
      
      {/* Products List */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          {t("CART.cartItems")} ({items.length})
        </h3>
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item.cartId}
              className="flex items-start bg-white p-4 shadow rounded-lg gap-4 border"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover rounded border bg-white"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-base text-gray-900">{item.itemName}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("CART.seller")} <span className="font-medium text-gray-700">{item.sellerName}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{t("CART.deliveryBy")} Sun Oct 12</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <h3 className="font-semibold mb-4 text-gray-700">{t("CART.priceDetails")}</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t("CART.price")} ({items.length} {t("CART.items")})</span>
            <span>₹{itemsTotal}</span>
          </div>
          
          <div className="flex justify-between text-sm text-green-600">
            <span>{t("CART.discount")}</span>
            <span>- ₹{DISCOUNT}</span>
          </div>
          
          <div className="flex justify-between text-sm text-green-600">
            <span>{t("CART.couponsForYou")}</span>
            <span>- ₹{COUPONS}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>{t("CART.platformFee")}</span>
            <span>₹{PLATFORM_FEE}</span>
          </div>
          
          <div className="border-t pt-2 mt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>{t("CART.totalAmount")}</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
        
        <p className="text-green-600 mt-3 text-sm">
          {t("CART.youWillSave", { amount: DISCOUNT + COUPONS })}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="addToCart"
          size="lg"
          className="flex-1 max-w-[150px] py-3"
          onClick={() => navigate(-1)}
        >
          {t("CART.back")}
        </Button>
        
        <Button
          variant="buyNow"
          size="lg"
          className="flex-1 max-w-[200px] py-3"
          onClick={proceed}
        >
          {t("CART.placeOrder")}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryStep;
