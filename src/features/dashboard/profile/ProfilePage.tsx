import ProfileCard from "./ProfileCard"
import { ContactInfoCard } from "./ContactInfoCard"
import { CompanyInfoCard } from "./CompanyInfoCard"
import { BankAccountDetailsCard } from "./BankAccountDetailsCard"
import { profileData } from "../../../utils/profileData";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <ProfileCard {...profileData.profile} />
      <ContactInfoCard {...profileData.contact} />
      <CompanyInfoCard {...profileData.company} />
      <BankAccountDetailsCard {...profileData.bank} />
    </div>
  );
};

export default ProfilePage;
