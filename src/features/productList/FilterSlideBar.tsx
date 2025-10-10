import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FunnelPlus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilters } from "@/redux/productSlice";
import type { RootState, AppDispatch } from "@/redux/store";
import { useSearchParams } from "react-router-dom";
import type {
  Filters,
  FilterKeys,
  FilterSlideBarProps,
} from "@/types/productTypes";

const FilterSlideBar: React.FC<FilterSlideBarProps> = ({ loading, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const filters = useSelector(
    (state: RootState) => state.products.filters
  ) as Filters;

  useEffect(() => {
    if (!allProducts.length) return;

    const urlKeys: FilterKeys[] = [
      "priceRange",
      "seller",
      "location",
      "category",
      "product",
    ];
    urlKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value && filters[key] !== value) dispatch(setFilter({ key, value }));
    });
  }, [allProducts, searchParams, dispatch, filters]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  type Section = {
    title: string;
    options: string[];
    key: FilterKeys;
  };

  const sidebarSections: Section[] = useMemo(() => {
    if (!allProducts.length) return [];

    return [
      {
        title: "Price",
        options: [
          "₹50 and Below",
          "₹50 - ₹100",
          "₹100 - ₹500",
          "₹500 and Above",
        ],
        key: "priceRange",
      },
      {
        title: "Sellers",
        options: Array.from(
          new Set(
            allProducts.map((p) => p.sellerName).filter((v): v is string => !!v)
          )
        ),
        key: "seller",
      },
      {
        title: "Location",
        options: Array.from(
          new Set(
            allProducts.map((p) => p.location).filter((v): v is string => !!v)
          )
        ),
        key: "location",
      },
      {
        title: "Categories",
        options: Array.from(
          new Set(
            allProducts.map((p) => p.itemName).filter((v): v is string => !!v)
          )
        ),
        key: "category",
      },
    ];
  }, [allProducts]);

  const handleSelect = (key: FilterKeys, value: string) => {
    dispatch(setFilter({ key, value }));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  const toggleDropdown = (key: FilterKeys) => {
    setOpenDropdowns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderSidebarContent = () => {
    if (loading) return <p className="p-2">Loading filters...</p>;
    if (error) return <p className="p-2 text-red-500">{error}</p>;

    return (
      <>
        {sidebarSections.map((section) => (
          <div key={section.title} className="mb-4  pt-5 pl-2">
            <p
              className="font-semibold mb-2 flex justify-between items-center cursor-pointer bg-slate-400 p-2"
              onClick={() => toggleDropdown(section.key)}
            >
              {section.title}
              <span
                className={`transform transition-transform duration-200 ${
                  openDropdowns.includes(section.key) ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </p>
            {openDropdowns.includes(section.key) && (
              <ul className="  rounded-md overflow-hidden shadow-sm">
                {section.options.map((option) => (
                  <li
                    key={option}
                    className={`cursor-pointer px-3 py-2 text-sm rounded-md ${
                      filters[section.key] === option
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(section.key, option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {Object.values(filters).some((val) => val) && (
          <button
            onClick={() => {
              dispatch(clearFilters());
              setSearchParams({});
            }}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden absolute top-36 mt-4 left-72 p-2  rounded-md bg-gray-50 shadow"
      >
        <FunnelPlus size={20} />
      </button>
      <div className="hidden lg:block w-60 bg-gray-50   rounded-md flex-col h-full max-h-full overflow-y-auto">
        {renderSidebarContent()}
      </div>

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
