import React, { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import type { ProductListProps, Product } from "@/types/productTypes";
import { MESSAGES, BUTTON_TEXTS } from "@/constants/searchpagelayout";

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [products]);

  if (loading)
    return (
      <p className="text-center py-8 text-gray-500 text-sm sm:text-base">
        {MESSAGES.LOADING}
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 py-8 text-sm sm:text-base">
        {error}
      </p>
    );
  if (!products || products.length === 0)
    return (
      <p className="text-center py-8 text-gray-500 text-sm sm:text-base">
        {MESSAGES.NO_PRODUCTS}
      </p>
    );

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-5 md:p-6">
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        style={{ gridAutoRows: "1fr" }}
      >
        {products.map((product: Product) => {
          const ratingNumber = product.rating ? Number(product.rating) : 0;

          return (
            <div
              key={`${product.itemName ?? "no-name"}-${
                product.sellerName ?? "no-seller"
              }`}
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { supplier: product },
                })
              }
              className="bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-200 flex flex-col h-full p-3 sm:p-4"
            >
              <div className="relative h-36 sm:h-40 md:h-48 w-full bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName ?? MESSAGES.UNNAMED_PRODUCT}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                    {MESSAGES.NO_IMAGE}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col mt-3">
                <h3
                  className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-900 leading-tight h-12 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.itemName ?? MESSAGES.UNNAMED_PRODUCT}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">
                  {product.location ?? MESSAGES.UNKNOWN_LOCATION}
                </p>

                <div className="mt-2">
                  <p className="text-blue-600 font-bold text-sm sm:text-base md:text-lg">
                    {formatCurrency(product.price)}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {product.quantity ? `/${product.quantity}` : ""}
                    </span>
                  </p>
                </div>

                <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm md:text-base font-semibold py-2 sm:py-2.5 rounded-md mt-auto">
                  {BUTTON_TEXTS.CONTACT_SUPPLIER}
                </button>
              </div>

              <div className="border-t mt-3 pt-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[13px] sm:text-[15px] font-semibold text-gray-900 truncate">
                    {product.sellerName ?? MESSAGES.UNKNOWN_SELLER}
                  </p>
                  <div className="flex items-center text-gray-700 text-[12px] sm:text-[13px] mt-0.5">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {product.location ?? MESSAGES.UNKNOWN_LOCATION}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end ml-2">
                  {product.rating ? (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < ratingNumber
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-xs sm:text-sm font-semibold text-gray-900">
                        {ratingNumber.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-gray-400">
                      {MESSAGES.NO_RATING}
                    </div>
                  )}

                  <div className="flex items-center text-green-700 text-[12px] sm:text-sm mt-1">
                    <Phone size={14} className="mr-1" />
                    <span className="font-semibold">
                      {BUTTON_TEXTS.VIEW_NUMBER}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
