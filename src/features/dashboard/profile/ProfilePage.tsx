import ProfileCard from "./ProfileCard";
import { ContactInfoCard } from "./ContactInfoCard";
import { CompanyInfoCard } from "./CompanyInfoCard";
import { BankAccountDetailsCard } from "./BankAccountDetailsCard";
import Footer from "@/components/common/Footer";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <ProfileCard />
      <ContactInfoCard />
      <CompanyInfoCard />
      <BankAccountDetailsCard />
      <Footer />
    </div>
  );
};

export default ProfilePage;
