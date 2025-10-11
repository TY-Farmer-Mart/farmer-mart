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
import {
  FILTER_BUTTON_TEXT,
  OBSERVER_OPTIONS,
  CLASSNAMES,
} from "@/constants/searchpagelayout";

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
      { root: mainRef.current, threshold: OBSERVER_OPTIONS.THRESHOLD }
    );
    observer.observe(productListEndRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 flex flex-col border border-gray-200">
        <div className={CLASSNAMES.LOCATION_SEARCH_CONTAINER}>
          <LocationSearch />
          <div className="flex justify-end sm:justify-start mt-3 md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={CLASSNAMES.FILTER_BUTTON}
            >
              {isFilterOpen ? FILTER_BUTTON_TEXT.HIDE : FILTER_BUTTON_TEXT.SHOW}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <aside
            className={`${isFilterOpen ? "block" : "hidden"} md:block ${
              CLASSNAMES.FILTER_SIDEBAR
            }`}
          >
            <FilterSlideBar loading={loading} error={error} />
          </aside>

          <main ref={mainRef} className={CLASSNAMES.MAIN_CONTAINER}>
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
