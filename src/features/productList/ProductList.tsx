import  { useEffect, useState } from "react";
import { Supplier, ApiProduct } from "@/types/productTypes";
import {
  MapPin,
  CheckCircle,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { currencyFormatter } from "@/utils/helpers";

function ProductList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [activeBySupplier, setActiveBySupplier] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:7000/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const payload: Record<string, { list?: ApiProduct[] }> =
          await response.json();

        const allItems: ApiProduct[] = Object.values(payload ?? {}).flatMap(
          (category) => (Array.isArray(category?.list) ? category.list : [])
        );

        const normalizedSuppliers: Supplier[] = allItems.map((item, i) => ({
          sellerName: item.sellerName || `Supplier ${i + 1}`,
          location: item.location || "N/A",
          rating: item.rating,
          verified: item.verified,
          memberYears: item.memberYears,
          responseRate: item.responseRate,
          products: [
            {
              itemName: item.itemName || "Unnamed product",
              price: item.price,
              quantity: item.quantity,
              imageUrl: item.imageUrl || "",
            },
          ],
        }));

        setSuppliers(normalizedSuppliers);
        setActiveBySupplier(normalizedSuppliers.map(() => 0));
      } catch (err) {
        console.error(err);
        setSuppliers([]);
        setActiveBySupplier([]);
      }
    };

    fetchProducts();
  }, []);

  const setActive = (supplierIndex: number, nextIndex: number) => {
    setActiveBySupplier((prev) => {
      const copy = [...prev];
      const total = suppliers[supplierIndex]?.products?.length ?? 0;
      if (total === 0) return prev;
      const normalized = ((nextIndex % total) + total) % total;
      copy[supplierIndex] = normalized;
      return copy;
    });
  };

  const getRoundedRating = (rating?: number | string) =>
    rating ? Math.round(Number(rating)) : 0;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{ gridAutoRows: "1fr" }}
      >
        {suppliers.map((supplier, index) => {
          const products = supplier.products ?? [];
          const activeIndex = activeBySupplier[index] ?? 0;
          const product = products[activeIndex];
          const priceNumber =
            product?.price != null && !Number.isNaN(Number(product.price))
              ? Number(product.price)
              : null;

          return (
            <div
              key={`${supplier.sellerName}-${index}`}
              className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full"
            >
              <div className="relative h-44 md:h-48 w-full bg-gray-100 flex-shrink-0">
                {product?.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                {products.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 hover:bg-black/75 text-white p-2 rounded-full shadow-md"
                      onClick={() => setActive(index, activeIndex - 1)}
                      aria-label="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 hover:bg-black/75 text-white p-2 rounded-full shadow-md"
                      onClick={() => setActive(index, activeIndex + 1)}
                      aria-label="Next"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex-1 flex flex-col px-4 pt-3 pb-2">
                {product && (
                  <>
                    <div
                      className="text-[20px] leading-6 font-medium text-gray-900 h-12 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.itemName}
                    </div>

                    <div className="mt-1 mb-2">
                      <div className="text-gray-900 text-[20px] font-semibold tracking-tight">
                        {priceNumber != null
                          ? currencyFormatter.format(priceNumber)
                          : "--"}
                        <span className="text-sm font-medium text-gray-600 ml-1">
                          {product.quantity ? `/${product.quantity}` : ""}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-md shadow-sm mt-auto">
                      Contact Supplier
                    </button>
                  </>
                )}
              </div>

              <div className="border-t" />
              <div className="px-4 py-3 flex items-center justify-between min-h-[64px]">
                <div className="min-w-0">
                  <div className="text-[16px] font-semibold text-gray-900 truncate">
                    {supplier.sellerName}
                  </div>
                  <div className="flex items-center text-gray-700 text-[13px] mt-0.5">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {supplier.location || "N/A"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    {supplier.verified ? (
                      <span className="inline-flex items-center text-green-700">
                        <CheckCircle
                          size={12}
                          className="mr-1 text-green-600"
                        />
                        Verified
                      </span>
                    ) : (
                      <span className="text-gray-400">Not Verified</span>
                    )}
                    <span>
                      {supplier.memberYears ? `• ${supplier.memberYears}` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center ml-3">
                  {supplier.rating ? (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < getRoundedRating(supplier.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {Number(supplier.rating).toFixed(1)}
                      </div>
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
}

export default ProductList;
