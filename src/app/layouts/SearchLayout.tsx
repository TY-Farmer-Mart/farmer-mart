import React, { useRef, useState, useEffect } from "react";
import ProductList from "@/features/productList/ProductList";
import RequirementForm from "@/features/productList/RequirementForm";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { fetchProducts } from "@/redux/productSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import FilterSlideBar from "@/features/productList/FilterSlideBar";
import LocationSearch from "@/features/productList/LocationSearch";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
        <LocationSearch />

        <div className="flex-[8] flex w-full overflow-hidden">
          <aside className="w-1/5 border-2 p-4">
            <FilterSlideBar />
          </aside>
          <main
            ref={mainRef}
            className="w-4/5 border-2 h-full overflow-y-auto flex flex-col"
          >
            <ProductList products={items} loading={loading} error={error} />

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
