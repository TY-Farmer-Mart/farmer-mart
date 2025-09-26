import { AuthLayoutProps } from "@/types/authTypes";
import farmerBg from "@assets/images/final_auth_wrapper_image.png";
import React from "react";
import FarmerLogo from "@assets/images/logo_farmer_mart_final.png";
import SmallFarmerLogo from '@assets/images/FarmerSmall.png'
export const AuthWrapper: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <div className="flex flex-col items-center justify-center md:relative min-h-screen w-full flex bg-green-900 md:bg-inherit">
            <div className="hidden md:block">
                <img
                    src={farmerBg}
                    alt="Farmer Background"
                    className="absolute inset-0 w-full h-full object-fill  -z-10"
                />
            </div>

            <div className="absolute left-[21%] top-[22%] transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                <img
                    src={FarmerLogo}
                    alt="Product Logo"
                    className="w-[200px] h-[100px] object-contain"
                />
            </div>

            <div className="md:hidden z-10">
                <img
                    src={SmallFarmerLogo}
                    alt="Product Logo"
                    className="w-[100px] h-[55px] object-contain"
                />
            </div>

            <div className="z-20 flex mt-2 w-full md:justify-end items-center px-3 lg:px-12 md:mt-0">
                <div className="w-full md:w-1/2 max-w-lg md:m-5 bg-white rounded-lg md:px-8 md:pt-1 px-3 mb-3">
                    {title && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                            {title}
                        </h2>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};
