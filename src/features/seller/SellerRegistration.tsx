import React, { useState } from "react";
import sellerImg from "@/assets/images/sellerImg.png";
import sellerGraph from "@/assets/images/seller_graph.png"
import ZeroCost from "@/assets/images/seller_zerocost.png"
import ManageBusiness from "@/assets/images/seller_manage_business.png"
import { Country } from "@/types/authTypes";
import { countries, SELLER_REGIST_ICON_TXT, SELLER_REGISTER_TXT } from "@/constants/textConstants";

const SellerRegistration: React.FC = () => {
const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Login with ${selectedCountry.code} ${mobile}`);
  };
  return (
<div className="flex flex-col bg-gray-100 md:flex-row items-center justify-center mt-2  h-full 
px-8 md:px-12 lg:px-24 py-10 w-full  gap-10 lg:gap-16">
  <div className="w-full md:w-1/2  flex justify-center">
    <div className=" rounded-2xl  shadow-sm w-full sm:w-3/4 md:w-96 h-64 lg:h-full lg:w-full sm:h-80 md:h-88 ">
      <img
        src={sellerImg}
        alt="Seller"
        className="w-full h-full  lg:object-cover rounded-2xl"
      />
    </div>
  </div>

  <div className="w-full md:w-1/2 flex flex-col gap-6  text-center md:text-left">
    <h2 className="text-md sm:text-2xl md:text-lg lg:text-3xl font-normal leading-snug">
      <span className="text-black font-bold">{SELLER_REGISTER_TXT.SELLER_HEADIND1}</span> {SELLER_REGISTER_TXT.SELLER_HEADING2} 
      <br className="hidden sm:block" /> {SELLER_REGISTER_TXT.SELLER_TEXT3}
    </h2>
    <p className="text-base lg:text-xl  sm:text-lg md:text-xl font-bold text-gray-700">
      {SELLER_REGISTER_TXT.SELLER_REGISTER_TITLE}
    </p>
   <form
  onSubmit={handleSubmit}
  className="flex flex-col sm:flex-row items-stretch rounded-lg shadow-md border border-blue-900
             w-full sm:w-[90%] md:w-full lg:w-[420px] bg-white sm:mx-auto lg:mx-0 overflow-visible"
>
  <div
    className="relative flex-shrink-0 w-full sm:w-28 md:w-24 rounded-md
               px-2 py-2 flex items-center justify-between gap-2 select-none cursor-pointer hover:bg-slate-100"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <div className="flex items-center gap-2">
      <img
        src={selectedCountry.flag}
        alt={selectedCountry.name}
        className="w-5 h-5 rounded-sm"
      />
      <span className="text-gray-800 font-semibold text-sm md:text-base">
        {selectedCountry.code}
      </span>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
        dropdownOpen ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
    {dropdownOpen && (
      <ul
        className="absolute left-0 top-[110%] w-48 bg-white border border-gray-200 
                 rounded-md shadow-lg z-[5] max-h-60 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {countries.map((country) => (
          <li
            key={country.code}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedCountry(country);
              setDropdownOpen(false);
            }}
          >
            <img
              src={country.flag}
              alt={country.name}
              className="w-8 h-5 rounded-sm"
            />
            <span className="text-gray-800 text-sm md:text-base">
              {country.name} ({country.code})
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
  <input
    type="tel"
    maxLength={10}
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    placeholder="Enter 10 digit mobile No"
    className="flex-1 min-w-36 px-3 py-3 text-gray-800 text-sm md:text-base focus:outline-none placeholder-gray-400
               border-t sm:border-t-0 sm:border-l border-gray-200 box-border"
    required
  />
  <button
    type="submit"
    className="flex-shrink-0 w-full sm:w-28 md:w-16 lg:w-28 bg-teal-600 hover:bg-teal-700 text-white font-semibold
               px-3 py-3 text-sm md:text-base flex items-center justify-center gap-2
               transition-all duration-200 hover:shadow-md active:scale-95 rounded-b-lg sm:rounded-b-none sm:rounded-r-md"
  >
   {SELLER_REGISTER_TXT.SELLER_LOGIN_BTN}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
    </svg>
  </button>
</form>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20 mt-6 xl:px-4 place-items-center">
 
  <div className="flex bg-white p-5  flex-col items-center md:items-start text-center md:text-left w-full sm:w-[180px] md:w-[200px]">
  <div className="flex  justify-center lg:justify-center w-full mb-3 md:justify-start">
      <img
        src={sellerGraph}
        alt="Grow Business"
        className="w-10 sm:w-12 lg:w-14"
      />
    </div>
    <h3 className="font-bold text-gray-900 text-sm lg:w-full lg:text-center sm:text-base lg:text-base">
      {SELLER_REGIST_ICON_TXT.ICON1_TITLE}
    </h3>
    <p className="text-gray-600 text-xs sm:text-sm lg:w-full lg:text-center lg:text-sm">
      {SELLER_REGIST_ICON_TXT.ICON1_DES}
    </p>
  </div>
  <div className="flex flex-col bg-white p-5  items-center md:items-start text-center md:text-left w-full sm:w-[180px] md:w-[200px] ">
    <div className="flex justify-center lg:justify-center w-full mb-3 md:justify-start">
      <img
        src={ZeroCost}
        alt="Zero Cost"
        className="w-10 sm:w-12 lg:w-14"
      />
    </div>
    <h3 className="font-bold text-gray-900 lg:w-full lg:text-center text-sm sm:text-base lg:text-base">
      {SELLER_REGIST_ICON_TXT.ICON2_TITLE}
    </h3>
    <p className="text-gray-600 text-xs sm:text-sm lg:w-full flex-shrink-0 lg:text-center lg:text-sm">
      {SELLER_REGIST_ICON_TXT.ICON2_DES1} <br/> {SELLER_REGIST_ICON_TXT.ICON2_DES2}
    </p>
  </div>
  <div className="flex flex-col bg-white items-center md:items-start text-center md:text-left lg:h-full md:py-5 md:px-3  lg:p-0 file: w-full sm:w-[180px] md:w-[200px]">
    <div className="flex justify-center  lg:justify-center w-full lg:mt-5  mb-3 md:justify-start">
      <img
        src={ManageBusiness}
        alt="Manage Business"
        className="w-10 sm:w-12 lg:w-14"
      />
    </div>
    <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:w-full lg:text-center lg:text-base">
      {SELLER_REGIST_ICON_TXT.ICON3_TITLE}
    </h3>
    <p className="text-gray-600 text-xs sm:text-sm lg:w-full lg:text-center lg:text-sm">
      {SELLER_REGIST_ICON_TXT.ICON3_DES}
    </p>
  </div>
</div>
  </div>
</div>
  );
};

export default SellerRegistration;
