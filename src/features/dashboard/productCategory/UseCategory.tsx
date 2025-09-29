import React from "react";

import { Farming_Equipment_Category_data } from "@/utils/products";
import ProductCategory from "@/components/common/ui/Reusablecard";

const UseCategory = () => {
  const sections = Farming_Equipment_Category_data.categories;

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <ProductCategory
          key={index}
          title={section.leftCard.title}
          description={section.leftCard.description}
          image={section.leftCard.image}
          categories={section.categories}
        />
      ))}
    </div>
  );
};

export default UseCategory;
