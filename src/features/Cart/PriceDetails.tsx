import { PriceDetailsProps } from "@/types/cartType";

export default function PriceDetails({
  itemCount,
  totalPrice,
  discount = 0,
  coupons = 0,
  platformFee = 0,
}: PriceDetailsProps) {
  const totalAmount = totalPrice - discount - coupons + platformFee;
  const totalSavings = discount + coupons;

  return (
    <div className="bg-white p-4 shadow rounded sticky top-6">
      <h2 className="font-semibold mb-3 text-gray-500 text-lg">
        PRICE DETAILS
      </h2>

      <div className="flex justify-between mb-2 text-sm">
        <span>Price ({itemCount} items)</span>
        <span>₹{itemCount > 0 ? totalPrice : 0}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-green-600">
        <span>Discount</span>
        <span>- ₹{discount}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-green-600">
        <span>Coupons for you</span>
        <span>- ₹{coupons}</span>
      </div>

      <div className="flex justify-between mb-2 text-sm">
        <span>Platform Fee</span>
        <span>₹{platformFee}</span>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
        <span>Total Amount</span>
        <span>₹{itemCount > 0 ? totalAmount : 0}</span>
      </div>

      <p className="text-green-600 mt-2 text-sm">
        {itemCount > 0
          ? `You will save ₹${totalSavings} on this order`
          : `No savings available`}
      </p>
    </div>
  );
}
