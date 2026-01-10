import { TbDeviceMobileStar } from "react-icons/tb";
import { RiMailStarLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/Button";
import Modal from "@/components/common/modal/Modal";
import { Input } from "@/components/common/ui/Input";
import { editUserProfile, getUserProfile } from "@/services/profile";
import { useTranslation } from "react-i18next";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  contact: string;
  alternateEmail: string;
  alternateContact: string;
  address?: string;
}

export const ContactInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<UserProfile>({
    _id: "",
    name: "",
    email: "",
    contact: "",
    alternateEmail: "",
    alternateContact: "",
    address: "",
  });

  const [formData, setFormData] = useState(user);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) throw new Error("User ID not found");
        const data = await getUserProfile(userId);
        setUser(data.user);
      } catch (err: any) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      if (!userId) throw new Error("User ID not found");
      setUpdating(true);
      setError(null);

      const payload = {
        id: userId,
        contact: formData.contact,
        email: formData.email,
        alternateContact: formData.alternateContact,
        alternateEmail: formData.alternateEmail,
        address: formData.address,
      };

      const res = await editUserProfile(payload);

      if (res.user) {
        setUser(res.user);
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>{t("PROFILE.CONTACT_INFO")}...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="relative bg-green-50 rounded-lg shadow-md px-5 py-6 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-5">
        <h2 className="text-lg font-semibold text-black p-2 ">
          {t("PROFILE.CONTACT_INFO")}
        </h2>
        <button
          onClick={handleEditClick}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit /> {t("PROFILE.EDIT_BTN")}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 p-3">
        <div className="flex flex-col space-y-6">
          <div className="flex items-start gap-3">
            <TbDeviceMobileStar className="w-8 h-8 text-green-500" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-black">
                {t("PROFILE.PRIMARY_MOB")}
              </p>
              <p className="text-sm text-black">{user.contact || " "}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RiMailStarLine className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-black">
                {t("PROFILE.PRIMARY_MAIL")}
              </p>
              <p className="text-sm text-black">{user.email || " "}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CiLocationOn className="w-6 h-6 text-green-500 mt-1" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-black">
                {t("PROFILE.ADDRESS")}
              </p>
              <p className="text-sm text-black">{user.address || " "}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-start gap-3">
            <TbDeviceMobileStar className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-black">
                {t("PROFILE.ALT_MOB")}
              </p>
              <p className="text-sm text-black">
                {user.alternateContact || " "}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RiMailStarLine className="w-6 h-6 text-green-500 mt-1" />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-black">
                {t("PROFILE.ALT_MAIL")}
              </p>
              <p className="text-sm text-black">{user.alternateEmail || " "}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("PROFILE.CONTACT_INFO")}
        showClose
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => setIsOpen(false)}
              className="flex-1"
              variant="secondary"
            >
              {t("COMMON.CANCEL")}
            </Button>
            <Button
              onClick={handleUpdate}
              className="flex-1"
              disabled={updating}
            >
              {updating ? t("COMMON.UPDATE") + "..." : t("COMMON.UPDATE")}
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t("PROFILE.PRIMARY_MOB")}
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            requiredIndicator={false}
            className="px-4 py-2"
          />
          <Input
            label={t("PROFILE.PRIMARY_MAIL")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            requiredIndicator={false}
            className="px-4 py-2"
          />
          <Input
            label={t("PROFILE.ALT_MOB")}
            name="alternateContact"
            value={formData.alternateContact}
            onChange={handleChange}
            requiredIndicator={false}
            className="px-4 py-2"
          />
          <Input
            label={t("PROFILE.ALT_MAIL")}
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail}
            onChange={handleChange}
            requiredIndicator={false}
            className="px-4 py-2"
          />
          <Input
            label={t("PROFILE.ADDRESS")}
            name="address"
            value={formData.address}
            onChange={handleChange}
            requiredIndicator={false}
            className="px-4 py-2 sm:col-span-2"
          />
        </div>
      </Modal>
    </div>
  );
};
