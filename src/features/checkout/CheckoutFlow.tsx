import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { goToNextStep, goToStep } from "@/redux/checkoutSlice";
import LoginStep from "./Steps/LoginStep";
import AddressStep from "./Steps/AddressStep";
import OrderSummaryStep from "./Steps/OrderSummaryStep";
import PriceDetails from "@/features/Cart/PriceDetails";

const steps = ["Login / Signup", "Delivery Address", "Order Summary"];

interface CartItem {
  cartId: string;
  itemName: string;
  sellerName: string;
  imageUrl: string;
  price: number;
  quantity: number;
  [key: string]: unknown;
}

const CheckoutFlow: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const reduxItems: CartItem[] = useSelector(
    (state: RootState) => state.cart?.items ?? []
  );

  const persistedItems: CartItem[] = (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  })();

  const items: CartItem[] = reduxItems.length > 0 ? reduxItems : persistedItems;

  const itemCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const itemsTotal = items.reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );

  const PLATFORM_FEE = 7;
  const DISCOUNT = 25;
  const COUPONS = 10;
  const totalAmount = itemsTotal - DISCOUNT - COUPONS + PLATFORM_FEE;

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

      <div className="w-full md:col-span-6 flex flex-col gap-6 bg-white rounded-lg p-4 shadow-sm">
        {currentStep === 1 && <LoginStep isActive onNext={nextStep} />}
        {currentStep === 2 && <AddressStep isActive onNext={nextStep} />}
        {currentStep === 3 && (
          <OrderSummaryStep
            isActive
            priceDetails={{
              items,
              itemsTotal,
              discount: DISCOUNT,
              coupons: COUPONS,
              platformFee: PLATFORM_FEE,
              totalAmount,
            }}
          />
        )}
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
