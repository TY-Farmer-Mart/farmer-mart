import { useMemo, useState } from "react";
import data from "./agri_products.json";
import {
  MapPin,
  CheckCircle,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { currencyFormatter } from "@/utils/helpers";
import { ParsedQuantity, Supplier, SupplierStats } from "@/types/productTypes";

function ProductList() {
  const suppliers: Supplier[] = useMemo(
    () => (Array.isArray(data) ? (data as Supplier[]) : []),
    []
  );

  const [activeBySupplier, setActiveBySupplier] = useState<number[]>(() =>
    suppliers.map(() => 0)
  );

  const supplierStats: SupplierStats[] = useMemo(
    () =>
      suppliers.map((supplier) => ({
        roundedRating: supplier?.rating
          ? Math.round(Number(supplier.rating))
          : 0,
        reviewCount: Math.floor(Math.random() * 100) + 20,
      })),
    [suppliers]
  );

  const parseQuantity = (quantityRaw?: string): ParsedQuantity => {
    if (!quantityRaw || typeof quantityRaw !== "string") {
      return { amount: null, unit: null, label: "" };
    }
    const trimmed = quantityRaw.trim();
    const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(\w+)/i);
    if (!match) {
      return { amount: null, unit: null, label: trimmed };
    }
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    return { amount: isNaN(amount) ? null : amount, unit, label: trimmed };
  };

  const setActive = (supplierIndex: number, nextIndex: number) => {
    setActiveBySupplier((prev) => {
      const copy = [...prev];
      const total = Array.isArray(suppliers[supplierIndex]?.products)
        ? suppliers[supplierIndex].products!.length
        : 0;
      if (total === 0) return prev;
      const normalized = ((nextIndex % total) + total) % total;
      copy[supplierIndex] = normalized;
      return copy;
    });
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suppliers.map((supplier, supplierIndex) => {
          const products = Array.isArray(supplier.products)
            ? supplier.products
            : [];
          const activeIndex = activeBySupplier[supplierIndex] ?? 0;
          const product = products[activeIndex];

          return (
            <div
              key={`${supplier.sellerName}-${supplierIndex}`}
              className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="relative">
                {product && (
                  <img
                    className="w-full h-48 object-cover"
                    src={product.imageUrl}
                    alt={product.itemName}
                  />
                )}

                {products.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 hover:bg-black/75 text-white p-2 rounded-full shadow-md backdrop-blur border border-white/30"
                      onClick={() => setActive(supplierIndex, activeIndex - 1)}
                      aria-label="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 hover:bg-black/75 text-white p-2 rounded-full shadow-md backdrop-blur border border-white/30"
                      onClick={() => setActive(supplierIndex, activeIndex + 1)}
                      aria-label="Next"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {products.length > 0 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                    {products.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-2.5 h-2.5 rounded-full ring-1 ring-white/50 transition-colors ${
                          i === activeIndex
                            ? "bg-white"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                        onClick={() => setActive(supplierIndex, i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {product && (
                <div className="px-4 pt-4 pb-2 text-[22px] leading-6 font-medium text-gray-900">
                  {product.itemName}
                </div>
              )}

              <div className="px-4 pb-2">
                {(() => {
                  const price = product?.price ? Number(product.price) : null;
                  const { amount, unit, label } = parseQuantity(
                    product?.quantity
                  );
                  const normalizedUnit =
                    unit === "kg" ||
                    unit === "l" ||
                    unit === "unit" ||
                    unit === "units"
                      ? unit
                      : null;
                  const perUnitSuffix = normalizedUnit
                    ? `/${normalizedUnit === "units" ? "unit" : normalizedUnit}`
                    : "";
                  const total =
                    price != null && amount != null ? price * amount : null;

                  return (
                    <>
                      <div className="text-gray-900 text-[22px] font-semibold tracking-tight">
                        {price != null
                          ? currencyFormatter.format(Math.round(price))
                          : "--"}
                        <span className="text-base font-medium text-gray-600 ml-1">
                          {perUnitSuffix || (label ? `/${label}` : "")}
                        </span>
                      </div>
                      {total != null && (
                        <div className="text-sm text-gray-600 mt-1">
                          for {label} ={" "}
                          <span className="font-semibold text-gray-900">
                            {currencyFormatter.format(Math.round(total))}
                          </span>
                        </div>
                      )}
                    </>
                  );
                })()}

                <button className="mt-3 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-md shadow-sm">
                  Contact Supplier
                </button>
              </div>

              <div className="border-t my-2" />

              <div className="px-4 text-[18px] font-semibold text-gray-900">
                {supplier.sellerName}
              </div>
              <div className="px-4 flex items-center text-gray-700 text-[15px] mt-1">
                <MapPin size={16} className="mr-1" />
                <span>{supplier.location}</span>
              </div>

              {supplier.verified && (
                <div className="px-4 mt-3 flex items-center gap-3 text-[13px]">
                  <span className="inline-flex items-center text-green-700">
                    <CheckCircle size={16} className="mr-1 text-green-600" />
                    <span className="font-medium">TrustSEAL Verified</span>
                  </span>
                  <span className="inline-flex items-center text-gray-700">
                    <span className="mr-1">•</span>
                    <span>Member: {supplier.memberYears || "13 yrs"}</span>
                  </span>
                </div>
              )}

              {supplier.rating && (
                <div className="px-4 mt-2 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < (supplierStats[supplierIndex]?.roundedRating ?? 0)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <div className="text-[18px] font-semibold text-gray-900">
                    {Number(supplier.rating).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">
                    ({supplierStats[supplierIndex]?.reviewCount ?? 0})
                  </div>
                </div>
              )}

              <div className="px-4 py-3">
                <div className="w-full flex items-center justify-between text-[18px]">
                  <span className="flex items-center text-green-700 font-semibold">
                    <Phone size={18} className="mr-2 text-green-700" />
                    View Mobile Number
                  </span>
                  {supplier.responseRate && (
                    <span className="text-gray-600 text-sm">
                      ({supplier.responseRate} Response Rate)
                    </span>
                  )}
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
