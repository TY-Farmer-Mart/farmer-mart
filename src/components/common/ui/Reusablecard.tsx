import React from "react";
import {ProductCategoryProps } from "@/types/dashboardType";
import { Button } from "./Button";
import { MARKET_CATEGORY_PRODUCT } from "@/constants/textConstants";
import { truncateText } from "@/utils/helpers";



const ProductCategory: React.FC<ProductCategoryProps> = ({
  title,
  description,
  image,
  categories,
}) => {
  return (
    <section className="w-full py-8 mt-6 border-t-4 border-t-blue-900 bg-green-50">
      <div className="max-w-screen-xl mx-auto px-4 space-y-6">
        <div className="text-left">
          <h2 className="text-xl md:text-3xl font-bold text-black-500 hover:text-blue-900 hover:underline decoration-blue-900 transition duration-200">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="relative h-64 md:h-[auto] bg-white rounded-lg overflow-hidden col-span-1 border shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end items-start p-4">
              <p className="text-white text-sm md:text-lg font-semibold leading-normal hover:underline">
                {description}
              </p>
              <Button variant="viewAll" className="mt-2">
                {MARKET_CATEGORY_PRODUCT.VIEWALL_BUTTON}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 col-span-1 lg:col-span-3">
            {categories.map((group, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-white transition-transform duration-300 hover:shadow-md hover:scale-[1.02] flex flex-col gap-3"
              >
                <h3 className="text-base md:text-md font-semibold text-black-500">
                  {group.title}
                </h3>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-24 h-24 rounded overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-wrap gap-0 flex-grow items-start overflow-hidden">
                    {group.items.map((item, i) => (
                      <span
                        key={i}
                        title={
                          typeof item === "string" ? item : item.toString()
                        }
                        className="px-2 py-0  text-gray-500 text-xs md:text-sm font-medium rounded-md hover:bg-blue-100 cursor-pointer truncate max-w-[120px]"
                      >
                        {truncateText(
                          typeof item === "string" ? item : item.toString(),
                          15
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
