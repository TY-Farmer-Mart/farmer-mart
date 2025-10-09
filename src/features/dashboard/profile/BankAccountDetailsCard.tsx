import { BsBank2 } from "react-icons/bs";

import { BankAccountDetailsProps } from "@/types/profileTypes";
import { VscCodeOss } from "react-icons/vsc";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { MdEdit, MdOutlineAccountBox, MdSwitchAccount } from "react-icons/md";

export const BankAccountDetailsCard: React.FC<BankAccountDetailsProps> = ({
  bankName,
  accountNumber,
  ifscCode,
  accountType,
  onEdit,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 p-2">
          {PROFILE_PAGE_TXT.BANK_ACC}
        </h2>
        <div
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-8 sm:gap-16 lg:gap-64">
        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <VscCodeOss className="w-8 h-8 text-green-400 bg-gray-200 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700 text-left">
                {PROFILE_PAGE_TXT.IFSC}
              </span>
              <span className="text-sm text-gray-600">{ifscCode}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <BsBank2 className="w-8 h-8 text-blue-500 bg-gray-200 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700 text-left">
                {PROFILE_PAGE_TXT.BANK_NAME}
              </span>
              <span className="text-sm text-gray-600">{bankName}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-10 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdOutlineAccountBox className="w-8 h-8 text-blue-500 bg-gray-200 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                {PROFILE_PAGE_TXT.ACC_NUM}
              </span>
              <span className="text-sm text-gray-600 text-left">
                {accountNumber}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 flex justify-start">
              <MdSwitchAccount className="w-8 h-8 text-green-400 bg-gray-200 rounded-md p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                {PROFILE_PAGE_TXT.ACC_TYPE}
              </span>
              <span className="text-sm text-gray-600 text-left">
                {accountType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};