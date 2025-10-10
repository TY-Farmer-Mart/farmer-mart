import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import PaymentOptions from "./PaymentOptions";
import UpiSection from "./UpiSection";
import CardSection from "./CardSection";
import EmiSection from "./EmiSection";
import NetBankingSection from "./NetBankingSection";
import GiftCardSection from "./GiftCardSection";
import CodSection from "./CodSection";
import type { PriceDetails } from "@/types/checkoutTypes";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

const PaymentLayout: React.FC = () => {
  const location = useLocation();
  const priceDetails = location.state as PriceDetails | undefined;
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [selectedBank, setSelectedBank] = useState("");
  const [upiInput, setUpiInput] = useState("");
  const [cardInput, setCardInput] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [savedUPIs, setSavedUPIs] = useState<string[]>([]);
  const [savedCards, setSavedCards] = useState<string[]>([]);
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [errors, setErrors] = useState<{ upi?: string; card?: string }>({});
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-5">
        <div
          className="flex items-center gap-3 py-4 border-b px-4 bg-white shadow-sm"
          onClick={handleGoBack}
        >
          <span className="text-3xl cursor-pointer flex items-center gap-2">
            &larr;{" "}
            <span className="text-2xl font-semibold">
              {PAYMENT_TEXTS.HEADER}
            </span>
          </span>
        </div>

        <div className="grid gap-4 border-t p-5 min-h-[80vh] grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1.2fr_1.3fr_1.4fr]">
          <PaymentOptions
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />

          <div className="border rounded-xl bg-white shadow-sm p-6 overflow-auto">
            {selectedMethod === "upi" && priceDetails && (
              <UpiSection
                upiInput={upiInput}
                setUpiInput={setUpiInput}
                savedUPIs={savedUPIs}
                setSavedUPIs={setSavedUPIs}
                selectedUPI={selectedUPI}
                setSelectedUPI={setSelectedUPI}
                errors={errors}
                setErrors={setErrors}
                totalPrice={priceDetails.totalAmount}
              />
            )}
            {selectedMethod === "card" && priceDetails && (
              <CardSection
                cardInput={cardInput}
                setCardInput={setCardInput}
                savedCards={savedCards}
                setSavedCards={setSavedCards}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                errors={errors}
                setErrors={setErrors}
                totalPrice={priceDetails.totalAmount}
              />
            )}
            {selectedMethod === "emi" && <EmiSection />}
            {selectedMethod === "netbanking" && (
              <NetBankingSection
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                totalPrice={priceDetails?.totalAmount ?? 0}
              />
            )}
            {selectedMethod === "gift" && <GiftCardSection />}
            {selectedMethod === "cod" && <CodSection />}
          </div>

          {priceDetails ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {PAYMENT_TEXTS.PRICE_SUMMARY}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex justify-between">
                  <span>{PAYMENT_TEXTS.ITEMS_TOTAL}:</span>
                  <span>₹{priceDetails.itemsTotal}</span>
                </p>
                <p className="flex justify-between text-green-600">
                  <span>{PAYMENT_TEXTS.DISCOUNT}:</span>
                  <span>-₹{priceDetails.discount}</span>
                </p>
                <p className="flex justify-between text-green-600">
                  <span>{PAYMENT_TEXTS.COUPONS}:</span>
                  <span>-₹{priceDetails.coupons}</span>
                </p>
                <p className="flex justify-between">
                  <span>{PAYMENT_TEXTS.PLATFORM_FEE}:</span>
                  <span>₹{priceDetails.platformFee}</span>
                </p>
                <div className="border-t pt-2 mt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>{PAYMENT_TEXTS.TOTAL_PAYABLE}:</span>
                  <span>₹{priceDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>{PAYMENT_TEXTS.NO_PRICE_DETAILS}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentLayout;
