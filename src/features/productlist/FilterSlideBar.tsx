import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; 
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";
import { SidebarSection } from "@/types/sidebarTypes";
const sidebarData: SidebarSection[] = [
  {
    type: "text",
    title: "Price",
    options: [
      "₹2,000 and Below",
      "₹2,001-₹9,000",
      "₹9,001-₹50,000",
      "₹50,001 and Above",
    ],
    showRange: true,
  },
  {
    type: "filter",
    title: "Filters",
    options: ["Bengaluru-based Suppliers"],
  },
  {
    type: "text",
    title: "Usage/Application",
    options: ["Industrial", "Garage"],
  },
  {
    type: "text",
    title: "Business Type",
    options: ["Manufacturer", "Exporter", "Wholesaler", "Retailer"],
  },
  {
    type: "text",
    title: "Related Category",
    options: [
      {
        label: "Agriculture Production Services",
        image:
          "https://3.imimg.com/data3/FN/KW/GLADMIN-171253/agriculture-production-services-125x125.jpg",
      },
      {
        label: "Vermicompost",
        image:
          "	https://3.imimg.com/data3/CT/UA/GLADMIN-2728/vermicompost-125x125.jpg",
      },
      {
        label: "Organic Fertilizers and Manure",
        image:
          "https://5.imimg.com/data5/GLADMIN/Default/2022/6/XM/YY/PN/92368/organic-fertilizers-and-manure-125x125.jpg"
      },
      {
        label: "Agricultural Pesticides",
        image:
          "https://3.imimg.com/data3/FU/EW/GLADMIN-3179/agricultural-pesticides-125x125.jpg",
      },
      {
        label: "Press Mud",
        image:
          "https://3.imimg.com/data3/YU/RG/GLADMIN-69082/press-mud-125x125.jpg",
      },
      {
        label: "Green Manure",
        image:"https://3.imimg.com/data3/SR/OL/MY-2/green-manure-125x125.jpg",
      },
    ],
  },
  {
    type: "text",
    title: "Recommended Searches",
    options: ["agriculture", "agriculture seating"],
  },
];


const FilterSlideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden p-2">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 border rounded-md bg-white shadow"
        >
          <Menu size={24} />
        </button>
      </div>

      <aside className="hidden sm:flex w-60 bg-white border rounded-md border-gray-200 flex-col h-screen  overflow-y-auto">
        {sidebarData.map((section) =>
          section.type === "text" ? (
            <TextDropdown
              key={section.title}
              title={section.title}
              options={section.options}
              showRange={section.showRange}
            />
          ) : (
            <FilterDropdown
              key={section.title}
              title={section.title}
              options={section.options}
            />
          )
        )}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 left-0 w-full h-full bg-white border-r border-gray-200 z-50 flex flex-col p-4 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-4 self-end p-2 border rounded-md bg-gray-100"
              >
                <X size={20} />
              </button>

              {sidebarData.map((section) =>
                section.type === "text" ? (
                  <TextDropdown
                    key={section.title}
                    title={section.title}
                    options={section.options}
                    showRange={section.showRange}
                  />
                ) : (
                  <FilterDropdown
                    key={section.title}
                    title={section.title}
                    options={section.options}
                  />
                )
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSlideBar;
