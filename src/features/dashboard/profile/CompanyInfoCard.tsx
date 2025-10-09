import { MdBusiness, MdEdit, MdLanguage } from "react-icons/md";

import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle, AiOutlineLink } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { CompanyInfoProps } from "@/types/profileTypes";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuPanelTop } from "react-icons/lu";

export const CompanyInfoCard: React.FC<CompanyInfoProps> = ({
  companyName,

  gstNumber,
  companyAddress,
  ownerName,
  onEdit,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2  ">
          {PROFILE_PAGE_TXT.COMPANY_INFO}
        </h2>
        <div
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit />
          {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-12 lg:gap-18">
        <div className="flex flex-col items-start space-y-6 sm:space-y-8 p-2 sm:p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdBusiness className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.COMPANY_NAME}
              </span>
              <span className="text-sm text-black">{companyName}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <IoNewspaperOutline className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.GST}
              </span>
              <span className="text-sm text-black">{gstNumber}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 flex justify-start">
                <AiOutlineLink className="w-6 h-6 text-blue-500" />
              </div>

              <div className="flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <FaFacebook className="text-blue-950 w-5 h-5" />
                    <span className="text-sm text-black">
                      {PROFILE_PAGE_TXT.FB}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaSquareInstagram className="text-pink-500 w-5 h-5 " />
                    <span className="text-sm text-black">
                      {PROFILE_PAGE_TXT.IG}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AiFillGoogleCircle className="text-blue-800  w-5 h-5" />
                    <span className="text-sm text-black">
                      {PROFILE_PAGE_TXT.GL_BUSINESS}
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
              <MdLanguage className="w-7 h-8 text-blue-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.WEBSITE}
              </span>
              <span className="text-sm text-black">{companyAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <LuPanelTop className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {PROFILE_PAGE_TXT.PAN}
              </span>
              <span className="text-sm text-black">{ownerName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
