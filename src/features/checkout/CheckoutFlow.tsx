import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { goToNextStep, goToStep } from "../../redux/checkoutSlice";
import LoginStep from "./Steps/LoginStep";
import AddressStep from "./Steps/AddressStep";
import OrderSummaryStep from "./Steps/OrderSummaryStep";
import PriceDetails from "@/features/Cart/PriceDetails";

const steps = [
  "Login / Signup",
  "Delivery Address",
  "Order Summary",
];

const CheckoutFlow: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  // Cart data for price details
  const reduxItems = useSelector((s: RootState) => s.cart?.items);
  const persistedItems = (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  const items =
    reduxItems && reduxItems.length > 0 ? reduxItems : persistedItems;

  const itemCount = (items || []).reduce(
    (sum: number, i: any) => sum + (i.quantity || 0),
    0
  );
  const totalPrice = (items || []).reduce(
    (sum: number, i: any) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );

  const nextStep = () => dispatch(goToNextStep());
  const navigateToStep = (stepNum: number) => {
    if (stepNum < currentStep) dispatch(goToStep(stepNum));
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6">
      {/* Sidebar - stepper */}
      <div className="flex flex-wrap md:flex-col gap-2 md:col-span-3">
        {steps.map((title, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = index + 1 < currentStep;
          return (
            <div
              key={index}
              className={`
                flex items-center justify-start
                w-full
                px-2 py-2 sm:px-3 sm:py-2 rounded border cursor-pointer transition-colors
                text-sm sm:text-base
                ${
                  isActive
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : isCompleted
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700"
                }
              `}
              onClick={() => navigateToStep(index + 1)}
            >
              <span className="mr-2 font-semibold">{index + 1}.</span>
              <span className="font-medium">{title}</span>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="w-full md:col-span-6 flex flex-col gap-6 bg-white rounded-lg p-4 shadow-sm">
        {currentStep === 1 && <LoginStep isActive onNext={nextStep} />}
        {currentStep === 2 && <AddressStep isActive onNext={nextStep} />}
        {currentStep === 3 && <OrderSummaryStep isActive />}
      </div>

      {/* Price details */}
      <aside className="md:col-span-3">
        <div className="sticky top-4">
          <PriceDetails
            itemCount={itemCount}
            totalPrice={totalPrice}
            platformFee={7}
          />
        </div>
      </aside>
    </div>
  );
};

export default CheckoutFlow;
