import { Button } from "@/components/common/ui/Button";
import FarmerMartLanding from "@/features/market/MoreforyouSection/FarmerMartLanding";
import MoreForYou from "@/features/market/MoreforyouSection/MoreForYou";
import CategoryList from "@/features/market/ProductsCategory/CategoryList";
import { useNavigate } from "react-router-dom";
import Header from '@/components/common/Header'
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header></Header>
      
      <main className="flex flex-col items-center justify-center text-center flex-1 p-8">
        <h2 className="text-4xl font-extrabold text-green-800 mb-4">
          Empowering Farmers to Sell Their Products Online 🚜
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          FarmerMart is a one-stop e-commerce platform for farmers, vendors, and
          consumers. Farmers can showcase their fresh produce, connect directly
          with customers, and increase their income without middlemen.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800"
        >
          Explore Products
        </button>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white shadow-inner">
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-green-700">
            🌱 Sell Fresh Produce
          </h3>
          <p className="text-gray-600 mt-2">
            Farmers can list vegetables, fruits, and grains directly for sale.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-green-700">
            🤝 Connect with Vendors
          </h3>
          <p className="text-gray-600 mt-2">
            Vendors can buy bulk products directly from farmers at fair prices.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md">
          <h3 className="text-xl font-semibold text-green-700">
            📦 Doorstep Delivery
          </h3>
          <p className="text-gray-600 mt-2">
            Customers get farm-fresh products delivered directly to their homes.
          </p>
        </div>
      </section> */}
      <CategoryList />
      <MoreForYou />
      <FarmerMartLanding />

      <footer className="text-center p-4 bg-green-100 text-gray-600">
        © {new Date().getFullYear()} FarmerMart. All rights reserved.
      </footer>
    </div>
  );
}
