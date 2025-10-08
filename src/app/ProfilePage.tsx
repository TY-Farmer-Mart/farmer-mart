import ProfileCard from "../components/ProfilePageCard";
import { ContactInfoCard } from "../components/ProfilePageCard";
import { CompanyInformationCard } from "../components/ProfilePageCard";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <ProfileCard
        name="Jabagond Umashankar"
        location="Bengaluru"
        memberSince="4 Years"
        rating="Rating"
      />
      <ContactInfoCard
        mobile="9876543210"
        email="abc@gmail.com"
        address="123 MG Road, Bengaluru"
        altMobile="8765432109"
        altEmail="alt@example.com"
      />

      <CompanyInformationCard
        companyName="Kira AgroTech Pvt Ltd"
        industryType="Agriculture Machinery"
        gstNumber="29ABCDE1234FZ1"
        companyAddress="123 MG Road, Bengaluru"
        ownerName="Umashankar"
      />
    </div>
  );
};

export default ProfilePage;
