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
  Section,
} from "@/types/productTypes";
import {
  BUTTON_TEXTS,
  MESSAGES,
  SECTION_TITLES,
} from "@/constants/searchpagelayout";

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

    const locationOptions = Array.from(
      new Set(
        allProducts.map((p) => p.location).filter((v): v is string => !!v)
      )
    );

    // First, clear all filters that are not in the URL
    urlKeys.forEach((key) => {
      const raw = searchParams.get(key);
      if (!raw && filters[key]) {
        // URL parameter is not present but filter exists, clear it
        dispatch(setFilter({ key, value: "" }));
      }
    });

    // Then, set filters from URL parameters
    urlKeys.forEach((key) => {
      const raw = searchParams.get(key);
      if (!raw) return;

      // URL decode the parameter value
      let value = decodeURIComponent(raw);

      if (key === "location") {
        // If URL provides only city (e.g., "Hyderabad"), normalize to a full option like "Hyderabad - Abids"
        if (!raw.includes(" - ")) {
          const matched = locationOptions.find((opt) => opt.startsWith(raw));
          if (matched) value = matched;
        }
      }

      if (filters[key] !== value) dispatch(setFilter({ key, value }));
    });
  }, [allProducts, searchParams, dispatch, filters]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const sidebarSections = useMemo(() => {
    if (!allProducts.length) return [];
    const hasAnyParams = Array.from(searchParams.keys()).length > 0;

    const sections: Section[] = [
      {
        title: SECTION_TITLES.PRICE,
        options: [
          "₹50 and Below",
          "₹50 - ₹100",
          "₹100 - ₹500",
          "₹500 and Above",
        ],
        key: "priceRange" as FilterKeys,
      },
      {
        title: SECTION_TITLES.SELLERS,
        options: Array.from(
          new Set(
            allProducts.map((p) => p.sellerName).filter((v): v is string => !!v)
          )
        ),
        key: "seller" as FilterKeys,
      },
      {
        title: SECTION_TITLES.LOCATION,
        options: Array.from(
          new Set(
            allProducts.map((p) => p.location).filter((v): v is string => !!v)
          )
        ),
        key: "location" as FilterKeys,
      },
    ];

    // Show Categories only when on base /products (no query params)
    if (!hasAnyParams) {
      sections.push({
        title: "Categories",
        options: Array.from(
          new Set(
            allProducts.map((p) => p.itemName).filter((v): v is string => !!v)
          )
        ),
        key: "category" as FilterKeys,
      });
    }

    return sections;
  }, [allProducts, searchParams]);

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
    if (loading) return <p className="p-2 text-sm">{MESSAGES.LOADING}</p>;
    if (error) return <p className="p-2 text-red-500 text-sm">{error}</p>;

    return (
      <>
        {sidebarSections.map((section) => (
          <div key={section.title} className="mb-4 pt-2">
            <p
              className="font-semibold mb-2 flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded"
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
              <ul className="rounded-md overflow-hidden shadow-sm bg-white">
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
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 text-sm"
          >
            {BUTTON_TEXTS.CLEAR_FILTERS}
          </button>
        )}
      </>
    );
  };

  return (
    <>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 p-3 rounded-full bg-gray-50 shadow-lg z-50"
      >
        <FunnelPlus size={24} />
      </button> */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed right-4 p-3 rounded-full bg-blue-400 shadow-lg z-50 "
      >
        <FunnelPlus size={24} />
      </button>

      <div className="hidden md:block w-full bg-gray-50 rounded-md h-full max-h-full overflow-y-auto p-2">
        {renderSidebarContent()}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-25 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-[4rem] w-64 h-[calc(100%-4rem)] bg-white shadow-lg z-50 p-4 overflow-y-auto"
            >
              <button
                onClick={closeDrawer}
                className="mb-4 flex items-center space-x-2 text-gray-700"
              >
                <X className="w-6 h-6" />
                <span>{BUTTON_TEXTS.CLOSE}</span>
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
