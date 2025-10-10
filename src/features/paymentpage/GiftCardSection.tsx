import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

const GiftCardSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.GIFT_HEADER}</h2>
    <input
      type="text"
      placeholder={PAYMENT_TEXTS.GIFT_PLACEHOLDER}
      className="border p-2 w-full rounded-md mb-3"
    />
    <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
      {PAYMENT_TEXTS.GIFT_REDEEM_BUTTON}
    </button>
  </div>
);

export default GiftCardSection;
