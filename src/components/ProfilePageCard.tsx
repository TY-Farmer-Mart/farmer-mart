import { IoNewspaperOutline, IoPersonCircleSharp } from "react-icons/io5";

import { CiLocationOn } from "react-icons/ci";
import { LuCalendarCheck, LuPanelTop } from "react-icons/lu";
import { RiStarSmileLine } from "react-icons/ri";
import { MdEdit, MdLanguage } from "react-icons/md";
import { ProfileCardProps } from "@/types/profileTypes";

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  location,
  memberSince,
  rating,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row flex-wrap  items-center md:items-center justify-center md:justify-between  bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 gap-6 w-full text-center md:text-left">
      <button className="absolute top-4 right-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
        <MdEdit /> Edit
      </button>
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
            Member since
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

import { TbDeviceMobileStar } from "react-icons/tb";
import { RiMailStarLine } from "react-icons/ri";
import { ContactInfoProps } from "@/types/profileTypes";

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
          Contact Information
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit /> Edit
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col  items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <TbDeviceMobileStar className="w-16 h-10 bg-gray-200 text-green-400" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                Primary Mobile:
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
                Primary Email:
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
                Address
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
                  Alternative Mobile
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
                  Alternative Email
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

//Company card
import { MdBusiness } from "react-icons/md";

import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle, AiOutlineLink } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { CompanyInfoProps } from "@/types/profileTypes";

export const CompanyInformationCard: React.FC<CompanyInfoProps> = ({
  companyName,

  gstNumber,
  companyAddress,
  ownerName,
  onEdit,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 p-2  ">
          Company Information
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit /> Edit
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-12 lg:gap-18">
        <div className="flex flex-col items-start space-y-6 sm:space-y-8 p-2 sm:p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdBusiness className="w-8 h-8 text-green-500 bg-gray-200" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700">
                Company Name:
              </span>
              <span className="text-sm text-gray-600">{companyName}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <IoNewspaperOutline className="w-8 h-8 text-blue-400 bg-gray-200" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700">GSTIN</span>
              <span className="text-sm text-gray-600">{gstNumber}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 flex justify-start">
                <AiOutlineLink className="w-6 h-6 text-blue-500 bg-gray-200" />
              </div>

              <div className="flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <FaFacebook className="text-blue-950 w-5 h-5" />
                    <span className="text-sm text-gray-600">Facebook</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaSquareInstagram className="text-pink-500 w-5 h-5 " />
                    <span className="text-sm text-gray-600">Instagram</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AiFillGoogleCircle className="text-blue-800  w-5 h-5" />
                    <span className="text-sm text-gray-600">
                      Google Business
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3 ">
            <div className="w-8 flex justify-start ">
              <MdLanguage className="w-7 h-8 text-blue-500 bg-gray-200" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700">
                Company Website
              </span>
              <span className="text-sm text-gray-600">{companyAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <LuPanelTop className="w-6 h-6 text-green-400 bg-gray-200" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-700">PAN</span>
              <span className="text-sm text-gray-600">{ownerName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
