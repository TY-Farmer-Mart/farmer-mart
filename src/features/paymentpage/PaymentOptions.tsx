import React from "react";

interface Props {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

const PaymentOptions: React.FC<Props> = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold mb-2">Payment Options</h2>
      {[
        { key: "upi", label: "UPI", icon: "📱" },
        { key: "card", label: "Credit / Debit / ATM Card", icon: "💳" },
        { key: "emi", label: "EMI", icon: "💰" },
        { key: "netbanking", label: "Net Banking", icon: "🏦" },
        { key: "gift", label: "Gift Card", icon: "🎁" },
        { key: "cod", label: "Cash on Delivery", icon: "💵" },
      ].map((option) => (
        <div
          key={option.key}
          onClick={() => setSelectedMethod(option.key)}
          className={`border rounded-md flex items-center gap-3 p-3 cursor-pointer transition-all ${
            selectedMethod === option.key
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <span className="text-xl">{option.icon}</span>
          <h1 className="font-medium">{option.label}</h1>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptions;
