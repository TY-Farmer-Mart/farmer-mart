import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

interface UpiProps {
  upiInput: string;
  setUpiInput: (v: string) => void;
  savedUPIs: string[];
  setSavedUPIs: React.Dispatch<React.SetStateAction<string[]>>;
  selectedUPI: string;
  setSelectedUPI: (v: string) => void;
  errors: { upi?: string };
  setErrors: React.Dispatch<React.SetStateAction<{ upi?: string; card?: string }>>;
  totalPrice: number;
}

const UpiSection: React.FC<UpiProps> = ({
  upiInput,
  setUpiInput,
  savedUPIs,
  setSavedUPIs,
  selectedUPI,
  setSelectedUPI,
  errors,
  setErrors,
  totalPrice,
}) => {
  const validateUPI = (upi: string) => {
    if (!upi.trim()) {
      setErrors({ upi: PAYMENT_TEXTS.UPI_ERROR_EMPTY });
      return false;
    } else if (!/^[\w.\-_]{3,}@[\w]{3,}$/.test(upi)) {
      setErrors({ upi: PAYMENT_TEXTS.UPI_ERROR_INVALID });
      return false;
    }
    setErrors({});
    return true;
  };

  const saveUPI = () => {
    if (validateUPI(upiInput) && upiInput.trim() && !savedUPIs.includes(upiInput)) {
      setSavedUPIs([...savedUPIs, upiInput]);
      setUpiInput("");
    }
  };

  const removeSaved = (value: string) => setSavedUPIs(savedUPIs.filter((id) => id !== value));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.UPI_HEADER}</h2>

      <input
        type="text"
        value={upiInput}
        onChange={(e) => setUpiInput(e.target.value)}
        placeholder={PAYMENT_TEXTS.UPI_PLACEHOLDER}
        className="border p-2 w-full rounded-md mb-1 focus:ring-2 focus:ring-blue-400"
      />
      {errors.upi && <p className="text-red-500 text-sm mb-2">{errors.upi}</p>}

      <button
        onClick={saveUPI}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
      >
        {PAYMENT_TEXTS.UPI_SAVE_BUTTON}
      </button>

      {savedUPIs.length > 0 && (
        <div className="mt-5">
          <h3 className="font-semibold mb-2">{PAYMENT_TEXTS.UPI_SAVED_HEADER}</h3>
          <div className="space-y-2">
            {savedUPIs.map((upi) => (
              <div
                key={upi}
                className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                  selectedUPI === upi
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUPI(upi)}
              >
                <span>{upi}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSaved(upi);
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  {PAYMENT_TEXTS.REMOVE_BUTTON}
                </button>
              </div>
            ))}
          </div>

          {selectedUPI && (
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 mt-3 rounded-md">
              {PAYMENT_TEXTS.UPI_PAY_BUTTON(totalPrice)}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UpiSection;
