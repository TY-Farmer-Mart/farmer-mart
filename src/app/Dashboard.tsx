
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import DashboardCarousel from "@/components/DashboardCarousel";
import DashboardNav from "@/components/DashboardNav";
function Dashboard() {
  return (
    <>
      <DashboardNav />

      <DashboardCarousel />
      <div className="w-full px-2 sm:px-4 md:px-6 py-4">
        {/* Testimonials Section */}
        <UseCategory/>
        <Testimonials />
        <Footer/>
      </div>
    
    </>
  );
}
export default Dashboard;
