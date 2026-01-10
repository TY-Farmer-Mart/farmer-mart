import sellergraph from "@/assets/images/seller_graph.png";
import sellercost from "@/assets/images/seller_zerocost.png";
import sellerbusiness from "@/assets/images/seller_manage_business.png";
import { IoIosCreate } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FiBox } from "react-icons/fi";
import { SELLER_PAGE_TXT } from "@/constants/textConstants";
const SellerPage = () => {
  return (
    <>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-32 xl:gap-72">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black-700 mb-2 md:mb-3 text-left">
          {SELLER_PAGE_TXT.HEADING1_TXT}
        </h2>
        <h1 className="hidden sm:block text-lg sm:text-xl md:text-2xl font-semibold text-black-700 mb-2 md:mb-3 text-left">
         {SELLER_PAGE_TXT.HEADING2_TXT}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full  ">
        <div className="w-full md:basis-1/3 bg-gray-50 h-auto md:h-72 flex flex-col items-stretch justify-between ">
          <div className="flex items-start gap-3 p-5">
            <div className="w-8 flex justify-start">
              <img src={sellergraph} alt="" className="w-20 h-10 mt-2" />
            </div>

            <div className="flex flex-col  gap-2 ml-2 ">
              <span className="text-lg font-medium text-blue-600 text-left">
                {SELLER_PAGE_TXT.ICON1_TITLE}
              </span>
              <span className="text-sm text-black-900  text-left">
                {SELLER_PAGE_TXT.ICON1_DES}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-5">
            <div className="w-8 flex justify-start">
              <img src={sellercost} alt="" className="w-20 h-10 mt-2" />
            </div>

            <div className="flex flex-col  gap-2 ml-2 ">
              <span className="text-lg font-medium text-blue-600 text-left">
                {SELLER_PAGE_TXT.ICON2_TITLE}
              </span>
              <span className="text-sm text-black-900  text-left">
                {SELLER_PAGE_TXT.ICON2_DES}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-5">
            <div className="w-8 flex justify-start">
              <img src={sellerbusiness} alt="" className="w-20 h-10 mt-2" />
            </div>

            <div className="flex flex-col  gap-2 ml-2 ">
              <span className="text-lg font-medium text-blue-600 text-left">
                {SELLER_PAGE_TXT.ICON3_TITLE}
              </span>
              <span className="text-sm text-black-900  text-left">
                {SELLER_PAGE_TXT.ICON3_DES}
              </span>
            </div>
          </div>
        </div>
        <h1 className="sm:hidden text-lg sm:text-xl md:text-2xl font-semibold text-black-700 mb-2 md:mb-3 text-left">
         {SELLER_PAGE_TXT.HEADING2_TXT}
        </h1>
        <div className="w-full md:basis-2/3 bg-gray-50 h-auto flex flex-col md:flex-row  bg-[url('src/assets/images/seller_page_bg.jpg')] bg-cover bg-center ">
          <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4  min-w-0">
            <div className="w-10 flex justify-start relative">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                  <IoIosCreate className="w-8 h-8 text-blue-600" />

                  <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px]  ml-1">
                    1
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col  gap-2  ">
              <span className="text-lg font-medium text-blue-600 text-center">
                {SELLER_PAGE_TXT.ICON4_TITLE}
              </span>
              <span className="text-sm text-black-900  text-center">
                {SELLER_PAGE_TXT.ICON4_DES}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4 min-w-0">
            <div className="w-10 flex justify-start   relative ">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                  <ImLocation2 className="w-8 h-8 text-blue-600" />

                  <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px] shadow ml-1">
                    2
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-2  ">
              <span className="text-lg font-medium text-blue-600 text-center">
                {SELLER_PAGE_TXT.ICON5_TITLE}
              </span>
              <span className="text-sm text-black-900  text-center">
                {SELLER_PAGE_TXT.ICON5_DES}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-5 min-w-0">
            <div className="w-14 flex justify-start  relative ">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                  <FiBox className="w-8 h-8 text-blue-600" />

                  <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px] shadow ml-1">
                    3
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-2  ">
              <span className="text-lg font-medium text-blue-600 text-center ">
                {SELLER_PAGE_TXT.ICON6_TITLE}
              </span>
              <span className="text-sm text-black-900 text-center  ">
                {SELLER_PAGE_TXT.ICON6_DES}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellerPage;
