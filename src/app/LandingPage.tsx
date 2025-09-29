import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Banner from "@/features/market/Banner/Banner";
import FarmerMartLanding from "@/features/market/MoreforyouSection/FarmerMartLanding";
import MoreForYou from "@/features/market/MoreforyouSection/MoreForYou";
import CategoryList from "@/features/market/ProductsCategory/CategoryList";
import TopCities from "@/features/market/supplierForCities/TopCities";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      <CategoryList />
      <TopCities />
      <MoreForYou />
      <FarmerMartLanding />
      <Footer />
    </div>
  );
}
