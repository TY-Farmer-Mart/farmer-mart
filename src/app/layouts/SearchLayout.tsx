import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FilterSlideBar from "@/features/productList/FilterSlideBar";
import ProductList from "@/features/productList/ProductList";
import RequirementForm from "@/features/productList/RequirementForm";
import LocationSearch from "@/features/productList/LocationSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";

const SearchLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [showForm, setShowForm] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productListEndRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (!mainRef.current || !productListEndRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowForm(entry.isIntersecting),
      { root: mainRef.current, threshold: 1 }
    );
    observer.observe(productListEndRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col bg-gray-50 border border-gray-300">
        <div className="border-b bg-gray-50 p-2 md:p-4">
          <LocationSearch />
        </div>

        <div className="flex justify-end md:hidden p-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md shadow-md"
          >
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <aside
            className={`${
              isFilterOpen ? "block" : "hidden"
            } md:block md:w-1/4 lg:w-1/5 p-3 md:p-4  border-gray-200 bg-gray-50 md:relative absolute z-20 w-full `}
          >
            <FilterSlideBar loading={loading} error={error} />
          </aside>

          <main
            ref={mainRef}
            className="flex-1 h-full overflow-y-auto flex flex-col px-2 sm:px-4"
          >
            <ProductList
              products={filteredProducts}
              loading={loading}
              error={error}
            />

            <div ref={productListEndRef} className="h-4" />
            {showForm && (
              <div className="p-2 sm:p-4">
                <RequirementForm />
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchLayout;
