import React, { useState } from "react";
import { CheckCircle, Building2, Package, UserPlus } from "lucide-react";
import SellerBusinessDetails from "./SellerBusinessDetails";
import SellerProductDetails from "./SellerProductDetails";

const SellerNav: React.FC = () => {
  const [step, setStep] = useState<number>(2); // 1=Create Account, 2=Business, 3=Product

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      {/* 🔹 Step Navigation Bar */}
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {/* Step 1 - Create Account */}
        <div
          className={`flex flex-col items-center transition ${
            step > 1 ? "text-teal-600" : "text-gray-400"
          }`}
        >
          <UserPlus
            size={26}
            className={`${
              step > 1 ? "text-teal-600" : "text-gray-400"
            } mb-1`}
          />
          <span
            className={`text-sm font-medium ${
              step === 1 ? "text-blue-700" : ""
            }`}
          >
            Create Account
          </span>
          {step > 1 && <CheckCircle size={14} className="text-teal-600 mt-1" />}
        </div>

        {/* Step 2 - Business Details */}
        <div
          className={`flex flex-col items-center transition ${
            step >= 2 ? "text-teal-600" : "text-gray-400"
          }`}
        >
          <Building2
            size={26}
            className={`${
              step >= 2 ? "text-teal-600" : "text-gray-400"
            } mb-1`}
          />
          <span
            className={`text-sm font-medium ${
              step === 2 ? "text-blue-700" : ""
            }`}
          >
            Business Details
          </span>
          {step > 2 && <CheckCircle size={14} className="text-teal-600 mt-1" />}
        </div>

        {/* Step 3 - Product Details */}
        <div
          className={`flex flex-col items-center transition ${
            step === 3 ? "text-blue-700" : "text-gray-400"
          }`}
        >
          <Package
            size={26}
            className={`${
              step === 3 ? "text-blue-700" : "text-gray-400"
            } mb-1`}
          />
          <span className="text-sm font-medium">Product Details</span>
        </div>
      </div>

      {/* 🔸 Step Components */}
      <div className="w-full max-w-5xl">
        {step === 2 && <SellerBusinessDetails onNext={handleNext} />}
        {step === 3 && <SellerProductDetails />}
      </div>
    </section>
  );
};

export default SellerNav;
