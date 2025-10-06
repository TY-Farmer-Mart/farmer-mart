import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const CheckoutLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {/* Main content takes remaining height between navbar and footer */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {/* Scroll within available viewport height (approx 80vh typical after header/footer) */}
        <div className="h-full max-h-[80vh] overflow-auto">
          {/* Render nested routes */}
          <Outlet />
          {/* Fallback for direct composition, if ever used */}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
