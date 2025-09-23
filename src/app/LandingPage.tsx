import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/features/market/HeroSection/Hero";
import FarmerMartLanding from "@/features/market/MoreforyouSection/FarmerMartLanding";
import MoreForYou from "@/features/market/MoreforyouSection/MoreForYou";
import CategoryList from "@/features/market/ProductsCategory/CategoryList";

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header/>
      <Hero/>
      <CategoryList />
      <MoreForYou />
      <FarmerMartLanding />
       <Footer/>
    </div>
  );
}
