import { IoPersonCircleSharp } from "react-icons/io5";

import { CiLocationOn } from "react-icons/ci";
import { LuCalendarCheck,} from "react-icons/lu";
import { RiStarSmileLine } from "react-icons/ri";
import { MdEdit} from "react-icons/md";
import { ProfileCardProps } from "@/types/profileTypes";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  location,
  memberSince,
  rating,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row flex-wrap  items-center md:items-center justify-center md:justify-between  bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 gap-6 w-full text-center md:text-left">
      <div className="absolute top-4 right-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
        <MdEdit />
        {PROFILE_PAGE_TXT.EDIT_BTN}
      </div>

      <div className="flex flex-col sm:flex-row items-center md:items-center justify-center md:justify-start text-center md:text-left gap-4">
        <IoPersonCircleSharp className="w-24 h-24 text-gray-500" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-black">{name}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mt-1">
            <CiLocationOn className="w-7 h-6" />
            <span className="font-medium text-gray-500  ">{location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <LuCalendarCheck className="w-8 h-8  text-green-300 bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">
            {PROFILE_PAGE_TXT.MEMBER}
          </span>
          <span className="text-left font-bold">{memberSince}</span>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left gap-4 md:mr-10">
        <div className="flex items-center gap-2 flex-wrap">
          <RiStarSmileLine className="w-6 h-8 text-blue-300 bg-gray-200" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;