import React, { useRef, useState, useEffect } from "react";
import ProductList from "@/features/productList/ProductList";
import RequirementForm from "@/features/productList/RequirementForm";
import Footer from "@/components/common/Footer";
import FilterSlideBar from "@/features/productList/FilterSlideBar";
import Navbar from "@/components/common/Navbar";

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
        <aside className="w-1/5 border-2 p-4">
           <FilterSlideBar />
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
