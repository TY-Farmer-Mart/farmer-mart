import CommonCarousel from "@/components/common/CommonCarousel";
import { products } from "../utils/json_util";
import { DASHBOARD_TEXT, HEADING, SERVICES } from "@constants/textConstants";
import { SlideItem } from "@/types/carouselTypes";
import Testimonials from "@/components/common/Testimonials";
import MoreForYouCard from "@/components/common/MoreForYouCard";
function Dashboard() {
  return (
    <>
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
        <Testimonials />
      </div>

      <div>
       <MoreForYouCard heading={HEADING.heading} services={SERVICES} />
      </div>
    </>
  );
}
export default Dashboard;
