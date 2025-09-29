
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import MoreForYouCard from "@/components/common/MoreForYouCard";
import DashboardCarousel from "@/components/DashboardCarousel";
import DashboardNav from "@/components/DashboardNav";
import { HEADING, SERVICES } from "@/constants/textConstants";
function Dashboard() {
  return (
    <>
      <DashboardNav />

      <DashboardCarousel />
      <div className="w-full px-2 sm:px-4 md:px-6 py-4">
        <UseCategory/>
        <Testimonials />
         <MoreForYouCard heading={HEADING.heading} services={SERVICES} />
        <Footer/>
      </div>
    
    </>
  );
}
export default Dashboard;
