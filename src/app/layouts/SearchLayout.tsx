import React, { useRef, useState, useEffect } from "react";
import ProductList from "@/features/productlist/ProductList";
import RequirementForm from "@/features/productlist/RequirementForm";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { SidebarSection } from "@/types/sidebarTypes";
import FilterSlideBar from "@/features/productlist/filterSlideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { RootState } from "@/redux/store";
import LocationSearch from "@/features/productList/LocationSearch";

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
          "https://3.imimg.com/data3/CS/YS/GLADMIN-156355/vesicular-arbuscular-mycorrhiza-125x125.jpg",
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
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

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
  console.log(allProducts);

  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col">
        <LocationSearch />

        <div className="flex-[8] flex w-full overflow-hidden">
          <aside className="lg:w-1/5 lg:p-1 relative">
            <FilterSlideBar sidebarData={sidebarData} />
          </aside>
          <main
            ref={mainRef}
            className="w-full lg:w-4/5 border-2 h-full overflow-y-auto flex flex-col"
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
