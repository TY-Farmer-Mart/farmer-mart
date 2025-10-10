import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

const EmiSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.EMI_HEADER}</h2>
    <p className="text-gray-600 mb-3">{PAYMENT_TEXTS.EMI_DESCRIPTION}</p>
    <button className="border px-4 py-2 rounded-md hover:bg-gray-100">
      {PAYMENT_TEXTS.EMI_VIEW_PLANS}
    </button>
  </div>
);

export default EmiSection;
