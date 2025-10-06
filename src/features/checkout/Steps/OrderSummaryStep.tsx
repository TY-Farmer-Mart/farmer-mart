import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  isActive?: boolean; // defaults to true when used via route
  onNext?: () => void;
}

const OrderSummaryStep: React.FC<Props> = ({ isActive = true, onNext }) => {
  const navigate = useNavigate();
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

  if (!isActive) return null;

  const proceed = () => {
    if (onNext) return onNext();
    navigate("/checkout/payment");
  };

  return (
    <div className="p-6">
      <h2 className="text-base font-semibold mb-3 text-gray-700">Order Summary</h2>
      <div className="bg-white p-4 rounded shadow border mb-4">
        <p>Items Total: ₹{itemsTotal}</p>
        <p>Platform Fee: ₹{PLATFORM_FEE}</p>
        <p className="font-bold">Total: ₹{itemsTotal + PLATFORM_FEE}</p>
      </div>

      <button
        onClick={proceed}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummaryStep;
