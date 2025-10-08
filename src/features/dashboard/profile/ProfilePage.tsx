import ProfileCard from "../../../components/ProfilePageCard";
import { ContactInfoCard } from "../../../components/ProfilePageCard";
import { CompanyInformationCard } from "../../../components/ProfilePageCard";
import { BankAccountDetailsCard } from "../../../components/ProfilePageCard";
import { profileData } from "../../../utils/profileData";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <ProfileCard {...profileData.profile} />
      <ContactInfoCard {...profileData.contact} />
      <CompanyInformationCard {...profileData.company} />
      <BankAccountDetailsCard {...profileData.bank} />
    </div>
  );
};

export default ProfilePage;
