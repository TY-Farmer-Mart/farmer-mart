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
    <div>
      <Navbar />
      <div className="h-screen flex flex-col">
        <LocationSearch />
        <div className="flex-[8] flex w-full overflow-hidden">
          <aside className="lg:w-1/5 lg:p-1">
            <FilterSlideBar loading={loading} error={error} />
          </aside>
          <main
            ref={mainRef}
            className="w-full lg:w-4/5 border-2 h-full overflow-y-auto flex flex-col"
          >
            <ProductList
              products={filteredProducts}
              loading={loading}
              error={error}
            />
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
