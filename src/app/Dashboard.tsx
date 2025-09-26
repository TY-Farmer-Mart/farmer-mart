import CommonCarousel from "@/components/common/CommonCarousel";
import { products } from "../utils/json_util";
import { DASHBOARD_TEXT } from "@constants/textConstants";
import { SlideItem } from "@/types/carouselTypes";
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
function Dashboard() {
  return (
    <>
    <div className="overflow-auto no-scrollbar max-h-[100vh]">
      <CommonCarousel
        slides={products as SlideItem[]}
        autoPlay
        interval={5000}
        centerSlidePercentage={25}
        title={DASHBOARD_TEXT.DASHBOARD_CAROUSEL}
        buttonText={DASHBOARD_TEXT.CAROUSEL_BUTTON}
        onButtonClick={(slide) => console.log("Clicked", slide.name)}
      />
      <div className="w-full px-2 sm:px-4 md:px-6 py-4">
        {/* Testimonials Section */}
        <UseCategory/>
        <Testimonials />
        <Footer/>
      </div>
      </div>
    </>
  );
}
export default Dashboard;
