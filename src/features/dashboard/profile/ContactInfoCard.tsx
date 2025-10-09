import { TbDeviceMobileStar } from "react-icons/tb";
import { RiMailStarLine } from "react-icons/ri";
import { ContactInfoProps } from "@/types/profileTypes";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

export const ContactInfoCard: React.FC<ContactInfoProps> = ({
  mobile,
  email,
  address,
  altMobile,
  altEmail,
  onEdit,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md  px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 p-2">
          {PROFILE_PAGE_TXT.CONTACT_INFO}
        </h2>
        <div
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col  items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <TbDeviceMobileStar className="w-16 h-10 bg-gray-200 text-green-400" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                {PROFILE_PAGE_TXT.PRIMARY_MOB}
              </span>
              <span className="text-sm text-gray-600">{mobile}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-8 flex justify-start">
              <RiMailStarLine className="w-14 h-10 text-blue-300 bg-gray-200 " />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                {PROFILE_PAGE_TXT.PRIMARY_MAIL}
              </span>
              <span className="text-sm text-gray-600">{email}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <CiLocationOn className="w-7 h-8 bg-gray-200 text-green-400 " />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700  text-left">
                {PROFILE_PAGE_TXT.ADDRESS}
              </span>
              <span className="text-sm text-gray-600">{address}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-10 p-5">
          {altMobile && (
            <div className="flex items-start gap-3">
              <div className="w-8 flex justify-center">
                <TbDeviceMobileStar className="w-16 h-11  text-blue-300 bg-gray-200" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  {PROFILE_PAGE_TXT.ALT_MOB}
                </span>
                <span className="text-sm text-gray-600">{mobile}</span>
              </div>
            </div>
          )}
          {altEmail && (
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-8 flex justify-center">
                <RiMailStarLine className="w-14 h-10 bg-gray-200 text-green-400 " />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  {PROFILE_PAGE_TXT.ALT_MAIL}
                </span>
                <span className="text-sm text-gray-600">{altEmail}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};