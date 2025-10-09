import { PriceDetailsProps } from "@/types/cartType";
import { useTranslation } from "react-i18next";

export default function PriceDetails({
  itemCount,
  totalPrice,
  discount = 25,
  coupons = 10,
  platformFee = 7,
}: PriceDetailsProps) {
  const { t } = useTranslation();
  const totalAmount = totalPrice - discount - coupons + platformFee;
  const totalSavings = discount + coupons;

  return (
    <div className="bg-white p-4 shadow rounded sticky top-6">
      <h2 className="font-semibold mb-3 text-gray-500 text-lg">
        {t("CART.priceDetails")}
      </h2>

      <div className="flex justify-between mb-2 text-sm">
        <span>
          {t("CART.price")} ({itemCount} {t("CART.items")})
        </span>
        <span>₹{itemCount > 0 ? totalPrice : 0}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-green-600">
        <span>{t("CART.discount")}</span>
        <span>- ₹{itemCount > 0 ? discount : 0}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-green-600">
        <span>{t("CART.couponsForYou")}</span>
        <span>- ₹{itemCount > 0 ? coupons : 0}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm">
        <span>{t("CART.platformFee")}</span>
        <span> ₹{itemCount > 0 ? platformFee : 0}</span>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
        <span>{t("CART.totalAmount")}</span>
        <span>₹{itemCount > 0 ? totalAmount : 0}</span>
      </div>

      <p className="text-green-600 mt-2 text-sm">
        {itemCount > 0
          ? t("CART.youWillSave", { amount: totalSavings })
          : t("CART.noSavings")}
      </p>
    </div>
  );
}
