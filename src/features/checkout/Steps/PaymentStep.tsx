import React from "react";

interface Props {
  isActive?: boolean; // defaults to true when rendered directly via route
}

const PaymentStep: React.FC<Props> = ({ isActive = true }) => {
  if (!isActive) return null;

  return (
    <div className="p-6 bg-white rounded shadow border">
      <h2 className="text-base font-semibold mb-4 text-gray-700">Payment</h2>
      <p>Select your preferred payment method and complete the order.</p>

      <div className="flex flex-col gap-3 mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Pay with Card
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Pay with UPI
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded">
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
