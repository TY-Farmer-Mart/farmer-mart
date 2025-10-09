import { TbDeviceMobileStar } from "react-icons/tb";
import { RiMailStarLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";
import Modal from "@/components/common/modal/Modal";
import { Input } from "@/components/common/ui/Input";
import { ContactInfoProps } from "@/types/profileTypes";

export const ContactInfoCard: React.FC<ContactInfoProps> = ({
  mobile,
  email,
  address,
  altMobile,
  altEmail,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    mobile: mobile || "",
    email: email || "",
    address: address || "",
    altMobile: altMobile || "",
    altEmail: altEmail || "",
  });

  const [formData, setFormData] = useState(contactInfo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setFormData(contactInfo);
    setIsOpen(true);
  };

  const handleUpdate = () => {
    setContactInfo(formData);
    setIsOpen(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 p-2">
          {t("PROFILE.CONTACT_INFO")}
        </h2>
        <div
          onClick={handleEditClick}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit /> {t("PROFILE.EDIT_BTN")}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <TbDeviceMobileStar className="w-16 h-10 bg-gray-200 text-green-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-700">
                {t("PROFILE.PRIMARY_MOB")}
              </span>
              <span className="text-sm text-gray-600">
                {contactInfo.mobile}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <RiMailStarLine className="w-14 h-10 text-blue-300 bg-gray-200" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-700">
                {t("PROFILE.PRIMARY_MAIL")}
              </span>
              <span className="text-sm text-gray-600">{contactInfo.email}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <CiLocationOn className="w-7 h-8 bg-gray-200 text-green-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-700">
                {t("PROFILE.ADDRESS")}
              </span>
              <span className="text-sm text-gray-600">
                {contactInfo.address}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-10 p-5">
          {contactInfo.altMobile && (
            <div className="flex items-start gap-3">
              <div className="w-8 flex justify-center">
                <TbDeviceMobileStar className="w-16 h-11 text-blue-300 bg-gray-200" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-700">
                  {t("PROFILE.ALT_MOB")}
                </span>
                <span className="text-sm text-gray-600">
                  {contactInfo.altMobile}
                </span>
              </div>
            </div>
          )}
          {contactInfo.altEmail && (
            <div className="flex items-start gap-3">
              <div className="w-8 flex justify-center">
                <RiMailStarLine className="w-14 h-10 bg-gray-200 text-green-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-700">
                  {t("PROFILE.ALT_MAIL")}
                </span>
                <span className="text-sm text-gray-600">
                  {contactInfo.altEmail}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("PROFILE.CONTACT_INFO")}
        showClose={true}
        footer={
          <>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="secondary"
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleUpdate} className="w-full m-auto">
              {t("common.update")}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t("PROFILE.PRIMARY_MOB")}
            name="mobile"
            requiredIndicator={false}
            value={formData.mobile}
            onChange={handleChange}
            className="px-4 py-2"
          />

          <Input
            label={t("PROFILE.PRIMARY_MAIL")}
            name="email"
            type="email"
            requiredIndicator={false}
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2"
          />

          <Input
            label={t("PROFILE.ALT_MOB")}
            name="altMobile"
            requiredIndicator={false}
            value={formData.altMobile}
            onChange={handleChange}
            className="px-4 py-2"
          />

          <Input
            label={t("PROFILE.ALT_MAIL")}
            name="altEmail"
            type="email"
            requiredIndicator={false}
            value={formData.altEmail}
            onChange={handleChange}
            className="px-4 py-2"
          />

          <div className="sm:col-span-2">
            <Input
              label={t("PROFILE.ADDRESS")}
              name="address"
              requiredIndicator={false}
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-2"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
