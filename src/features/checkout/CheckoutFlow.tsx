import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { goToNextStep, goToStep } from "../../redux/checkoutSlice";
import LoginStep from "./Steps/LoginStep";
import AddressStep from "./Steps/AddressStep";
import OrderSummaryStep from "./Steps/OrderSummaryStep";
import PaymentStep from "./Steps/PaymentStep";

const steps = [
  "Login / Signup",
  "Delivery Address",
  "Order Summary",
  "Payment",
];

const CheckoutFlow: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const nextStep = () => dispatch(goToNextStep());
  const navigateToStep = (stepNum: number) => {
    if (stepNum < currentStep) dispatch(goToStep(stepNum));
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-12 gap-6">
      {/* Sidebar - stepper */}
      <div className="col-span-3 flex flex-col gap-2">
        {steps.map((title, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = index + 1 < currentStep;
          return (
            <div
              key={index}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                isActive
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : isCompleted
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
              onClick={() => navigateToStep(index + 1)}
            >
              <span className="mr-2 font-semibold">{index + 1}</span>
              <span className="font-medium">{title}</span>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="col-span-6 flex flex-col gap-6">
        {currentStep === 1 && <LoginStep isActive onNext={nextStep} />}
        {currentStep === 2 && <AddressStep isActive onNext={nextStep} />}
        {currentStep === 3 && <OrderSummaryStep isActive onNext={nextStep} />}
        {currentStep === 4 && <PaymentStep isActive />}
      </div>

      {/* Price details - right column */}
      <aside className="col-span-3">
        <div className="bg-white rounded shadow p-4 border">
          <h3 className="text-gray-600 text-sm font-semibold mb-3">PRICE DETAILS</h3>
          <div className="flex justify-between text-sm py-2">
            <span>Price (1 item)</span>
            <span>₹499</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span>Platform Fee</span>
            <span>₹7</span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between font-semibold py-2">
            <span>Total Payable</span>
            <span>₹506</span>
          </div>
          <p className="text-green-600 text-xs mt-2">Your Total Savings on this order ₹3,143</p>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutFlow;
