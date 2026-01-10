import React from "react";
import { MapPin, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/productTypes";
interface SimilarProductsProps {
  products: Product[];
  currentProductName: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
  currentProductName,
}) => {
  const navigate = useNavigate();

  if (!products?.length) {
    return <div className="p-6">No similar products found.</div>;
  }

  const orderedProducts = [
    ...products.filter((p) => p.itemName === currentProductName),
    ...products.filter((p) => p.itemName !== currentProductName),
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{ gridAutoRows: "1fr" }}
      >
        {orderedProducts.map((product) => {
          const rating = Number(product.rating) || 0;

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
              className="bg-white shadow rounded-lg border border-gray-200 flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-44 md:h-48 bg-gray-100 flex-shrink-0">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName ?? "Product"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col p-4 pt-3">
                <div
                  className="text-[20px] font-medium text-gray-900 h-12 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.itemName ?? "Unnamed Product"}
                </div>

                <div className="mt-1 mb-2">
                  <div className="text-gray-900 text-[20px] font-semibold tracking-tight">
                    {formatCurrency(product.price)}
                    {product.quantity && (
                      <span className="text-sm font-medium text-gray-600 ml-1">
                        /{product.quantity}
                      </span>
                    )}
                  </div>
                </div>

                <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-md shadow-sm mt-auto">
                  Contact Supplier
                </button>
              </div>

              <div className="border-t" />

              <div className="px-4 py-3 flex items-center justify-between min-h-[64px]">
                <div className="min-w-0">
                  <div className="text-[16px] font-semibold text-gray-900 truncate">
                    {product.sellerName ?? "Unknown Seller"}
                  </div>
                  <div className="flex items-center text-gray-700 text-[13px] mt-0.5">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {product.location ?? "Unknown Location"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center ml-3">
                  {rating ? (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < rating ? "text-yellow-500" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No Rating</div>
                  )}

                  <div className="flex items-center text-green-700 text-sm mt-2">
                    <Phone size={14} className="mr-1" />
                    <span className="font-semibold">View Number</span>
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

export default SimilarProducts;
