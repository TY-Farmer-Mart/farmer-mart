import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

interface Props {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

const PaymentOptions: React.FC<Props> = ({ selectedMethod, setSelectedMethod }) => {
  const options = [
    { key: "upi", label: PAYMENT_TEXTS.OPTION_UPI, icon: "📱" },
    { key: "card", label: PAYMENT_TEXTS.OPTION_CARD, icon: "💳" },
    { key: "emi", label: PAYMENT_TEXTS.OPTION_EMI, icon: "💰" },
    { key: "netbanking", label: PAYMENT_TEXTS.OPTION_NETBANKING, icon: "🏦" },
    { key: "gift", label: PAYMENT_TEXTS.OPTION_GIFT, icon: "🎁" },
    { key: "cod", label: PAYMENT_TEXTS.OPTION_COD, icon: "💵" },
  ];

  return (
    <div className="border rounded-xl bg-white shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold mb-2">{PAYMENT_TEXTS.OPTIONS_HEADER}</h2>
      {options.map((option) => (
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
