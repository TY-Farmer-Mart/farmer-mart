import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AddToCartPage from "@/features/Cart/AddToCart";
import React from "react";

const CartLayout = () => {
  return (
    <>
      <Navbar />
      <AddToCartPage />
      <Footer />
    </>
  );
};

export default CartLayout;
