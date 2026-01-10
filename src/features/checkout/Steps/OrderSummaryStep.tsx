import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";
import { PLATFORM_FEE, DISCOUNT, COUPONS } from "@/constants/priceConstant";
import type { PriceDetails, StepProps } from "@/types/checkoutTypes";
import { getCartData } from "@/utils/cartUtils";

const OrderSummaryStep: React.FC<StepProps> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, itemsTotal } = getCartData();

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

      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
        <Button
          variant="addToCart"
          size="lg"
          className="w-36 py-3 px-6 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={goBack}
        >
          {t("CART.back")}
        </Button>

        <Button
          variant="buyNow"
          size="lg"
          className="w-36 py-3 px-6 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={proceed}
        >
          {t("CART.placeOrder")}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryStep;
