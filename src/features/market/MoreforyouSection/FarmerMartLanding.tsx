import React, { useState } from "react";
import { Check } from "lucide-react";
import { LANDING_TEXT } from "@/constants/textConstants";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import accounting from "@assets/images/accounting.jpg";
import farmermartapp from "@assets/images/farmermartapp.jpg";
import logo from "@/assets/images/FarmerMartLogo.png";
import farmerlogo from "@/assets/images/image.png";

const FarmerMartLanding: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSendLink = () => {
    if (mobileNumber.length === 10) {
      alert(`${LANDING_TEXT.ALERT_PREFIX} ${mobileNumber}`);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div className="bg-gray-100 mt-2">
      <div className="bg-transparent ">
        <div className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img
              src={logo}
              alt="FarmerMart Logo"
              className="h-16 w-auto object-contain hidden md:block"
            />
            <img
              src={farmerlogo}
              alt="Farmer Logo Small"
              className="h-14 w-auto object-contain block md:hidden"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-start">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {LANDING_TEXT.HERO_TITLE}
            </h1>
            <p className="text-xl text-gray-600">
              {LANDING_TEXT.COMPANY_BADGE.TRUSTED_BY}{" "}
              <span className="text-red-500 font-bold">
                {LANDING_TEXT.COMPANY_BADGE.COUNT}
              </span>{" "}
              {LANDING_TEXT.COMPANY_BADGE.SMALL_BUSINESS}
            </p>

            <div className="space-y-4">
              {LANDING_TEXT.FEATURES.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-blue-600" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end ">
            <img
              src={accounting}
              alt="Accounting illustration"
              className="w-80 lg:w-96 h-auto rounded-xl mr-[3rem]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2  items-center">
          <div className="flex justify-start">
            <img
              src={farmermartapp}
              alt="Mobile App Screenshot"
              className="w-64 lg:w-80 h-auto rounded-[1.5rem]"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {LANDING_TEXT.GET_APP_TITLE}
              </h2>
              <p className="text-xl text-gray-600">
                {LANDING_TEXT.GET_APP_SUBTITLE}
              </p>
            </div>

            <div className="flex gap-3">
              <Input
                type="tel"
                placeholder={LANDING_TEXT.PLACEHOLDERS.MOBILE_NUMBER}
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and limit to 10 digits
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setMobileNumber(value);
                  }
                }}
                leftIcon={
                  <span className="text-gray-600 font-semibold">+91</span>
                }
                className="flex-1 h-14 rounded-xl border-gray-300 focus:ring-teal-500 "
              />

              <Button
                onClick={handleSendLink}
                variant="primary"
                className="h-14 px-8 rounded-xl bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
              >
                {LANDING_TEXT.BUTTONS.SEND_LINK}
              </Button>
            </div>

            <p className="text-gray-600">{LANDING_TEXT.DOWNLOAD_INFO}</p>

            <div className="flex space-x-4">
              <div className="bg-black-500 text-white px-6 py-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-colors">
                <div className="text-2xl">🍎</div>
                <div>
                  <div className="text-xs">
                    {LANDING_TEXT.STORE_LABELS.APP_STORE_TOP}
                  </div>
                  <div className="font-bold text-lg">
                    {LANDING_TEXT.STORE_LABELS.APP_STORE_BOTTOM}
                  </div>
                </div>
              </div>

              <div className="bg-black-500 text-white px-6 py-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-colors">
                <div className="text-2xl">📱</div>
                <div>
                  <div className="text-xs">
                    {LANDING_TEXT.STORE_LABELS.PLAY_STORE_TOP}
                  </div>
                  <div className="font-bold text-lg">
                    {LANDING_TEXT.STORE_LABELS.PLAY_STORE_BOTTOM}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerMartLanding;
