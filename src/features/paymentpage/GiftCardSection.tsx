import React from "react";

const GiftCardSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Gift Card</h2>
    <input
      type="text"
      placeholder="Enter Gift Card Number"
      className="border p-2 w-full rounded-md mb-3"
    />
    <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Redeem</button>
  </div>
);

export default GiftCardSection;
