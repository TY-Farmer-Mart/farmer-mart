import FilterSlideBar from "@/features/productlist/FilterSlideBar";
import ProductList from "@/features/productlist/ProductList";
import RequirementForm from "@/features/productlist/RequirementForm";
import { SidebarSection } from "@/types/sidebarTypes";
import React, { useRef, useState, useEffect } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { fetchProducts } from "@/redux/productSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
          "https://5.imimg.com/data5/GLADMIN/Default/2022/6/XM/YY/PN/92368/organic-fertilizers-and-manure-125x125.jpg",
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
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

          <aside className="w-1/5 border-2 p-4">
            <FilterSlideBar />

          <aside className="w-1/5 border-2 p-1">
            <FilterSlideBar sidebarData={sidebarData} />

          </aside>
          <main
            ref={mainRef}
            className="w-4/5 border-2 h-full overflow-y-auto flex flex-col"
          >

            <ProductList products={items} loading={loading} error={error} />

            <ProductList />



            <div ref={productListEndRef} className="h-4" />

            {showForm && <RequirementForm />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchLayout;
