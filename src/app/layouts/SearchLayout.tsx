import React, { useEffect, useRef, useState } from "react";
import ProductList from "@/features/productlist/ProductList";
import RequirementForm from "@/features/productlist/RequirementForm";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import FilterSlideBar from "@/features/productlist/filterSlideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { RootState } from "@/store";
import LocationSearch from "@/features/productlist/LocationSearch";

const SearchLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [showForm, setShowForm] = useState(false);
  const productListEndRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!mainRef.current || !productListEndRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowForm(entry.isIntersecting);
      },
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
          <aside className="lg:w-1/5 lg:p-1 ">
            <FilterSlideBar
              products={filteredProducts}
              loading={loading}
              error={error}
            />
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
