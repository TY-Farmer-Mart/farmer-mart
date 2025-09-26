import React from "react";

import { truncateText } from "@/utils/helpers";
import { ProductCardProps } from "@/types/dashboardType";



const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  img,
  subProducts,
}) => {
  return (
    <div className="p-1 flex flex-col gap-2 border rounded shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-base font-semibold text-gray-900">{productName}</h3>

      <div className="flex items-center justify-between gap-2">
        <img
          src={img}
          alt={`Item ${productId}`}
          className="w-16 h-16 object-cover rounded border"
        />
        <div className="grid grid-cols-1 gap-0 text-sm text-gray-800 font-medium">
          {subProducts.map((name, index) => (
            <div key={index} className="p-1" title={name}>
              {truncateText(name, 15)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
