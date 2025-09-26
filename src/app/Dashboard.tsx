import CommonCarousel from "@/components/common/CommonCarousel";
import { products } from "../utils/json_util";
import { SlideItem } from "@/types/carouselTypes";
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <div className="overflow-auto no-scrollbar max-h-[100vh]">
        <CommonCarousel
          slides={products as SlideItem[]}
          autoPlay
          interval={5000}
          centerSlidePercentage={25}
          title={t("DASHBOARD_TEXT.DASHBOARD_CAROUSEL")}
          buttonText={t("DASHBOARD_TEXT.CAROUSEL_BUTTON")}
          onButtonClick={(slide) => console.log("Clicked", slide.name)}
        />
        <div className="w-full px-2 sm:px-4 md:px-6 py-4">
          <UseCategory />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
