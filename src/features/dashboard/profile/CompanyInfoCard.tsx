import { MdBusiness, MdEdit, MdLanguage } from "react-icons/md";
import Modal from "@/components/common/modal/Modal";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { useState, useEffect } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuPanelTop } from "react-icons/lu";
import { getCompanies, updateCompany } from "@services/profile";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle, AiOutlineLink } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";

export const CompanyInfoCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    gstNumber: "",
    companyAddress: "",
    pan: "",
    facebook: "",
    instagram: "",
    googleBusiness: "",
  });

  const fetchCompanyData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser?.user?.id;

      if (!userId) return;

      const res = await getCompanies(userId);
      if (res && res.company) {
        const company = res.company;
        setFormData({
          companyName: company.companyName || "",
          companyType: company.companyType || "",
          gstNumber: company.gstNumber || "",
          companyAddress: company.address || "",
          pan: company.pan || "",
          facebook: company.facebook || "",
          instagram: company.instagram || "",
          googleBusiness: company.googleBusiness || "",
        });
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser?.user?.id;
      if (!userId) return;

      const payload = {
        id: userId,
        companyName: formData.companyName,
        companyType: formData.companyType,
        gstNumber: formData.gstNumber,
        address: formData.companyAddress,
        pan: formData.pan,
        facebook: formData.facebook,
        instagram: formData.instagram,
        googleBusiness: formData.googleBusiness,
      };

      console.log("Updating payload:", payload);

      await updateCompany(payload);
      await fetchCompanyData();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update company info:", error);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2">
          {PROFILE_PAGE_TXT.COMPANY_INFO}
        </h2>
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit />
          {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-12 lg:gap-18">
        <div className="flex flex-col items-start space-y-6 sm:space-y-8 p-2 sm:p-4 md:p-5">
          <div className="flex items-start gap-3">
            <MdBusiness className="w-8 h-8 text-green-500" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.COMPANY_NAME}
              </span>
              <span className="text-sm text-black">{formData.companyName}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IoNewspaperOutline className="w-8 h-8 text-blue-400" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.GST}
              </span>
              <span className="text-sm text-black">{formData.gstNumber}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AiOutlineLink className="w-6 h-6 text-blue-500" />
            <div className="flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-blue-950 w-5 h-5" />
                  </a>
                  <span className="text-sm text-black">
                    {PROFILE_PAGE_TXT.FB}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSquareInstagram className="text-pink-500 w-5 h-5" />
                  </a>
                  <span className="text-sm text-black">
                    {PROFILE_PAGE_TXT.IG}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://google.com/business"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillGoogleCircle className="text-blue-800 w-5 h-5" />
                  </a>
                  <span className="text-sm text-black">
                    {PROFILE_PAGE_TXT.GL_BUSINESS}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <MdLanguage className="w-7 h-8 text-blue-500" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.WEBSITE}
              </span>
              <span className="text-sm text-black text-left">
                {formData.companyAddress}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LuPanelTop className="w-6 h-6 text-green-400" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.PAN}
              </span>
              <span className="text-sm text-black">{formData.pan}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Company Info"
        showClose={true}
        footer={
          <>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="w-full m-auto">
              Update
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <Input
            label={PROFILE_PAGE_TXT.COMPANY_NAME}
            name="companyName"
            placeholder={PROFILE_PAGE_TXT.COMPANY_NAME}
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Input
            label={PROFILE_PAGE_TXT.GST}
            name="gstNumber"
            placeholder={PROFILE_PAGE_TXT.GST}
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.gstNumber}
            onChange={handleChange}
          />
          <Input
            label={PROFILE_PAGE_TXT.WEBSITE}
            name="companyAddress"
            placeholder={PROFILE_PAGE_TXT.WEBSITE}
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.companyAddress}
            onChange={handleChange}
          />
          <Input
            label={PROFILE_PAGE_TXT.PAN}
            name="pan"
            placeholder={PROFILE_PAGE_TXT.PAN}
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.pan}
            onChange={handleChange}
          />
          <Input
            label="Facebook Link"
            name="facebook"
            placeholder="Enter Facebook link"
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.facebook}
            onChange={handleChange}
          />
          <Input
            label="Instagram Link"
            name="instagram"
            placeholder="Enter Instagram link"
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.instagram}
            onChange={handleChange}
          />
          <Input
            label="Google Business Link"
            name="googleBusiness"
            placeholder="Enter Google link"
            requiredIndicator={false}
            className="px-4 py-2"
            value={formData.googleBusiness}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
};
