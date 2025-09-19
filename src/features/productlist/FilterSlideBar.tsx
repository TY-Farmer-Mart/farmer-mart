import React from "react";
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";

const sidebarData = [
  {
    type: "text", 
    title: "Price",
    options: [
      "₹2,000 and Below",
      "₹2,001-₹9,000",
      "₹9,001-₹50,000",
      "₹50,001 and Above"
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
      "Agriculture Production Services",
      "Agricultural Pesticides",
      "Organic Fertilizers and Manure",
      "Bio Fertilizers",
      "Vesicular Arbuscular Mycorrhiza",
      "Fertilizer",

    ],
  },
  {
    type: "text",
    title: "Recommended Searches",
    options: ["agriculture", "agriculture seating"],
  },




];

const FilterSlideBar: React.FC = () => {
  return (
<aside className="w-64 bg-white border rounded-md border-gray-200 flex flex-col h-screen">
  {sidebarData.map((section) => {
    if (section.type === "text") {
      return (
       <TextDropdown
  key={section.title}
  title={section.title}
  options={section.options}
  showRange={section.showRange} 
/>
      );
    } else if (section.type === "filter") {
      return (
        <FilterDropdown
          key={section.title}
          title={section.title}
          options={section.options}
        />
      );
    }
    return null;
  })}
</aside>

  );
};

export default FilterSlideBar;
