import { AUTH_TEXT } from "@/constants/textConstants";
import { AuthLayoutProps } from "@/types/authTypes";
import farmerLogo from "@assets/images/farmerLogo.png";
import farmerBg from "@assets/images/farmerBg.png";
import React from "react";

export const AuthWrapper: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="hidden md:flex relative md:w-[90%] lg:w-[50%] min-h-screen overflow-hidden">
        <img
          src={farmerBg}
          alt="Farmer Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black-900 bg-opacity-30 z-10" />

        <svg
          className="absolute top-0 -right-11 lg:-right-6 h-full z-20"
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q200,400 0,800 L200,800 L200,0 Z" fill="white" />
        </svg>

        <div className="absolute inset-0 z-30 flex flex-col justify-between pl-6 lg:px-12 py-8 text-white">
          <div>
            <div className="flex items-center space-x-3">
              <img
                src={farmerLogo}
                alt="Farmer Mart Logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold ">Farmer Mart</h1>
            </div>

            <div className="w-[60%] pt-5">
              <h2 className="text-2xl lg:text-3xl font-bold py-2">
                {AUTH_TEXT.AUTH_HEADER}{" "}
                <span className="italic font-normal">
                  {AUTH_TEXT.AUTH_SUBHEADING}
                </span>
                {AUTH_TEXT.AUTH_ENDING}
              </h2>
            </div>
          </div>

          <p className="mb-5 max-w-md font-normal text-sm lg:text-xl leading-[1.5rem] whitespace-pre-line">
            {AUTH_TEXT.AUTH_FOOTER}
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-[50%] justify-center items-center px-6  lg:px-6  bg-white z-20 relative">
        <div className="w-full max-w-sm lg:max-w-md space-y-6 py-12">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
