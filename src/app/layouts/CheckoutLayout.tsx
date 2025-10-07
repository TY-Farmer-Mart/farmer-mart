import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CheckoutFlow from "@/features/checkout/CheckoutFlow";

const CheckoutLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <CheckoutFlow />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
