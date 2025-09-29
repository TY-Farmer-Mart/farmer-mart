import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";
import { FunnelPlus, X } from "lucide-react";
import { Product } from "@/types/productTypes";
import { useDispatch } from "react-redux"; // <-- use plain useDispatch
import { setFilter } from "@/redux/productSlice";

interface FilterSlideBarProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const FilterSlideBar: React.FC<FilterSlideBarProps> = ({ products, loading, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch(); // <-- plain dispatch

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Build sidebar dynamically
  const sidebarSections = useMemo(() => {
    if (!products.length) return [];

    return [
      {
        type: "text",
        title: "Price",
        options: [
          "₹50 and Below",
          "₹50 - ₹100",
          "₹100 - ₹500",
          "₹500 and Above",
        ],
        key: "priceRange",
        showRange: true,
      },
      {
        type: "filter",
        title: "Sellers",
        options: Array.from(new Set(products.map((p) => p.sellerName).filter(Boolean))),
        key: "seller",
      },
      {
        type: "text",
        title: "Location",
        options: Array.from(new Set(products.map((p) => p.location).filter(Boolean))),
        key: "location",
      },
      {
        type: "text",
        title: "Categories",
        options: Array.from(new Set(products.map((p) => p.itemName).filter(Boolean))),
        key: "category",
      },
    ];
  }, [products]);

  const renderSidebarContent = () => {
    if (loading) return <p className="p-2">Loading filters...</p>;
    if (error) return <p className="p-2 text-red-500">{error}</p>;

    return sidebarSections.map((section) =>
      section.type === "text" ? (
        <TextDropdown
          key={section.title}
          title={section.title}
          options={section.options}
          showRange={section.showRange}
          onSelect={(value: string) =>
            dispatch(setFilter({ key: section.key as any, value }))
          }
        />
      ) : (
        <FilterDropdown
          key={section.title}
          title={section.title}
          options={section.options}
          onSelect={(value: string) =>
            dispatch(setFilter({ key: section.key as any, value }))
          }
        />
      )
    );
  };

  return (
    <>
      {/* mobile button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden absolute top-20 left-3 z-50 p-1 border rounded-md bg-white shadow"
      >
        <FunnelPlus size={18} />
      </button>

      {/* desktop */}
      <div className="hidden lg:block w-60 bg-white border border-gray-200 rounded-md flex-col h-full max-h-full overflow-y-auto">
        {renderSidebarContent()}
      </div>

      {/* mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-4 flex items-center space-x-2"
              >
                <X className="w-6 h-6" />
              </button>

              {renderSidebarContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSlideBar;
