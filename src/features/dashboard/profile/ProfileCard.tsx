import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { LuCalendarCheck } from "react-icons/lu";
import { RiStarSmileLine } from "react-icons/ri";
import { ProfileCardProps } from "@/types/profileTypes";
import { getUserProfile } from "@/services/profile";

const ProfileCard: React.FC<Partial<ProfileCardProps>> = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState<ProfileCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = storedUser?.user?.id;

        if (!userId) {
          setError(t("PROFILE.USER_ID_REQUIRED"));
          setLoading(false);
          return;
        }

        const data = await getUserProfile(userId);
        setProfile(data.user);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          err.message ||
          t("PROFILE.FAILED_FETCH")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [t]);

  if (loading) return <p>{t("PROFILE.LOADING_PROFILE")}...</p>;
  if (error)
    return (
      <p className="text-red-500">
        {t("PROFILE.ERROR")}: {error}
      </p>
    );

  const {
    name = "Unknown User",
    createdAt = "N/A",
    rating = 0,
    address = "N/A",
  } = profile || {};

  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <div className="relative flex flex-col md:flex-row flex-wrap items-center md:items-center justify-center md:justify-between bg-green-50 border rounded-lg shadow-md p-4 sm:p-6 md:p-8 gap-6 w-full text-center md:text-left">
      <div className="flex flex-col sm:flex-row items-center md:items-center justify-center md:justify-start text-center md:text-left gap-4">
        <IoPersonCircleSharp className="w-24 h-24 text-black" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-black">{name}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-black mt-1">
            <CiLocationOn className="w-7 h-6" />
            <div className="flex items-center gap-2 text-black mt-1">
              <span>{address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <LuCalendarCheck className="w-8 h-8 text-green-300" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {t("PROFILE.MEMBER")}
          </span>
          <span className="text-left font-bold">{memberSince}</span>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left gap-4 md:mr-10">
        <div className="flex items-center gap-2 flex-wrap">
          <RiStarSmileLine className="w-8 h-8 text-blue-300" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
