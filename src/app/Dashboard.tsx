import { SERVICES } from "@constants/textConstants";
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import MoreForYouCard from "@/components/common/MoreForYouCard";
import DashboardCarousel from "@/components/DashboardCarousel";
import DashboardNav from "@/components/DashboardNav";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <DashboardNav />
      <DashboardCarousel />
      <UseCategory />
      <Testimonials />
      <MoreForYouCard heading={t("HEADING.heading")} services={SERVICES} />
      <Footer />
    </>
  );
}
export default Dashboard;
