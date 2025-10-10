import ProfileCard from "./ProfileCard";
import { ContactInfoCard } from "./ContactInfoCard";
import { CompanyInfoCard } from "./CompanyInfoCard";
import { BankAccountDetailsCard } from "./BankAccountDetailsCard";
import { profileData } from "../../../utils/profileData";
import Footer from "@/components/common/Footer";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <ProfileCard {...profileData.profile} />
      <ContactInfoCard {...profileData.contact} />
      <CompanyInfoCard />
      <BankAccountDetailsCard {...profileData.bank} />
      <Footer/>
    </div>
  );
};

export default ProfilePage;
