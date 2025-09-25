import React from "react";
import { DASHBOARD_TEXT } from "@/constants/textConstants";
import { CART } from "@/utils/CartText_utils";
import TestimonialCard from "./TestimonialCard";

const Testimonials: React.FC = () => {
  return (
    <div className="w-full border  ">
      <h2 className="text-lg sm:text-xl  ml-[-20px]   md:text-2xl font-bold  mb-4 text-center md:text-left">
        {DASHBOARD_TEXT.DASHBOARD_CART}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
        {CART.map((item) => (
          <TestimonialCard
            key={item.id}
            textTop={item.textTop}
            textBottom={item.textBottom}
            Btn={item.Btn}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;