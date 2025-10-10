import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

interface NetBankingProps {
  selectedBank: string;
  setSelectedBank: (bank: string) => void;
  totalPrice: number;
}

const NetBankingSection: React.FC<NetBankingProps> = ({
  selectedBank,
  setSelectedBank,
  totalPrice,
}) => {
  const banks = [
    { name: "State Bank of India", logo: "🏦" },
    { name: "HDFC Bank", logo: "🏛️" },
    { name: "ICICI Bank", logo: "🏦" },
    { name: "Kotak Mahindra Bank", logo: "🏛️" },
    { name: "Axis Bank", logo: "🏦" },
    { name: "Federal Bank", logo: "🏦" },
    { name: "Indian Overseas Bank", logo: "🏛️" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.NETBANKING_HEADER}</h2>
      <p className="text-gray-600 mb-3">{PAYMENT_TEXTS.NETBANKING_DESCRIPTION}</p>

      <div className="flex flex-col gap-3">
        {banks.map((bank, index) => (
          <div key={index}>
            <label
              className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                selectedBank === bank.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bank"
                  value={bank.name}
                  checked={selectedBank === bank.name}
                  onChange={() => setSelectedBank(bank.name)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-medium">{bank.name}</span>
              </div>
              <span className="text-2xl">{bank.logo}</span>
            </label>

            {selectedBank === bank.name && (
              <div className="mt-3">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 rounded-md">
                  {PAYMENT_TEXTS.NETBANKING_PAY_BUTTON(totalPrice)}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetBankingSection;
