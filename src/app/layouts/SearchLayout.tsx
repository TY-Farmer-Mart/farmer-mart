import React, { useRef, useState, useEffect } from "react";
import ProductList from "@/features/productList/ProductList";
import RequirementForm from "@/features/productList/RequirementForm";
import Footer from "@/components/common/Footer";
import FilterSlideBar from "@/features/productList/FilterSlideBar";
import Navbar from "@/components/common/Navbar";
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
          " https://3.imimg.com/data3/CT/UA/GLADMIN-2728/vermicompost-125x125.jpg",
      },
      {
        label: "Organic Fertilizers and Manure",
        image:
          "https://3.imimg.com/data3/CS/YS/GLADMIN-156355/vesicular-arbuscular-mycorrhiza-125x125.jpg"

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
        image: "https://3.imimg.com/data3/SR/OL/MY-2/green-manure-125x125.jpg",
      },
    ],
  },
  {
    type: "text",
    title: "Recommended Searches",
    options: ["agriculture", "agriculture seating"],
  },
];

const SearchLayout: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const productListEndRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef.current || !productListEndRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowForm(entry.isIntersecting);
      },
      {
        root: mainRef.current,
        threshold: 1,
      }
    );

    observer.observe(productListEndRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col">
        <header className="flex-[1] border-2 text-black flex items-center px-6 font-bold text-lg">
          Farmer Mart
        </header>

        <nav className="flex-[1] border-2 text-black flex items-center px-6 font-medium">
          📍 Location: Bangalore, India
        </nav>

        <div className="flex-[8] flex w-full overflow-hidden">
          <aside className="w-1/5 p-1">
            <FilterSlideBar sidebarData={sidebarData} />
          </aside>
          <main
            ref={mainRef}
            className="w-4/5 border-2 h-full overflow-y-auto flex flex-col"
          >
            <ProductList />

            <div ref={productListEndRef} className="h-4" />

            {showForm && <RequirementForm />}
          </main>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SearchLayout;