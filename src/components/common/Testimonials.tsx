import React from "react";
import { CART } from "@/utils/CartText_utils";
import TestimonialCard from "./TestimonialCard";
import { useTranslation } from "react-i18next";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl  md:text-2xl font-bold text-black-700 mb-4 text-center md:text-left">
        {t("DASHBOARD_TEXT.DASHBOARD_CART")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
