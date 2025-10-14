import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store";
import {
  goToNextStep,
  goToStep,
  setSelectedItems,
  resetCheckout,
} from "@/redux/checkoutSlice";
import LoginStep from "./Steps/LoginStep";
import AddressStep from "./Steps/AddressStep";
import OrderSummaryStep from "./Steps/OrderSummaryStep";
import PriceDetails from "@/features/Cart/PriceDetails";
import { PLATFORM_FEE } from "@/constants/priceConstant";
import { getCartData } from "@/utils/cartUtils";

const steps = ["Login / Signup", "Delivery Address", "Order Summary"];

const CheckoutFlow: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );
  const selectedItems = useSelector(
    (state: RootState) => state.checkout.selectedItems
  );

  const fullCartData = getCartData();

  useEffect(() => {
    if (location.state?.fromCart && location.state?.selectedItems) {
      dispatch(resetCheckout());
      dispatch(setSelectedItems(location.state.selectedItems));
    }
  }, [location.state, dispatch]);

  const cartData =
    selectedItems.length > 0
      ? {
          items: selectedItems,
          itemCount: selectedItems.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          ),
          itemsTotal: selectedItems.reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
            0
          ),
        }
      : fullCartData;

  const { itemCount, itemsTotal } = cartData;

  const nextStep = () => dispatch(goToNextStep());
  const navigateToStep = (stepNum: number) => {
    if (stepNum < currentStep) dispatch(goToStep(stepNum));
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6">
      <div className="flex flex-wrap md:flex-col gap-2 md:col-span-3">
        {steps.map((title, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = stepNumber < currentStep;

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
              onClick={() => navigateToStep(stepNumber)}
            >
              <span className="mr-2 font-semibold">{stepNumber}.</span>
              <span className="font-medium">{title}</span>
            </div>
          );
        })}
      </div>

      <div className="w-full md:col-span-6 flex flex-col gap-6 bg-white rounded-lg p-4 shadow-sm min-h-[600px] overflow-hidden">
        <div className="flex-1 w-full">
          {currentStep === 1 && <LoginStep isActive onNext={nextStep} />}
          {currentStep === 2 && <AddressStep isActive onNext={nextStep} />}
          {currentStep === 3 && <OrderSummaryStep isActive />}
        </div>
      </div>

      <aside className="md:col-span-3">
        <div className="sticky top-4">
          <PriceDetails
            itemCount={itemCount}
            totalPrice={itemsTotal}
            platformFee={PLATFORM_FEE}
          />
        </div>
      </aside>
    </div>
  );
};

export default CheckoutFlow;
