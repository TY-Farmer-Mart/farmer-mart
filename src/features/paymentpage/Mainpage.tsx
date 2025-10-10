import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import PriceDetails from "@/features/Cart/PriceDetails";
import React, { useEffect, useState } from "react";
import PaymentOptions from "./PaymentOptions";
import UpiSection from "./UpiSection";
import CardSection from "./CardSection";
import EmiSection from "./EmiSection";
import NetBankingSection from "./NetBankingSection";
import GiftCardSection from "./GiftCardSection";
import CodSection from "./CodSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PaymentLayout: React.FC = () => {
      const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedMethod, setSelectedMethod] = useState("upi");
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
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
    
const checkedCartItems = cartItems.filter((item) =>
    checkedItems.includes(item.cartId!)
  );
  const totalPrice = checkedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
   useEffect(() => {
      setCheckedItems((prev) =>
        prev.filter((id) => cartItems.some((c) => c.cartId === id))
      );
    }, [cartItems]);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-5">
        <div className="flex items-center gap-3 py-4 border-b px-4 bg-white shadow-sm">
          <span className="text-3xl cursor-pointer flex items-center gap-2">
            &larr;{" "}
            <span className="text-2xl font-semibold">Complete Payment</span>
          </span>
        </div>

        <div className="grid gap-4 border-t p-5 min-h-[80vh] grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1.2fr_1.3fr_1.4fr]">
          <PaymentOptions selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />

          <div className="border rounded-xl bg-white shadow-sm p-6 overflow-auto">
            {selectedMethod === "upi" && (
              <UpiSection
                upiInput={upiInput}
                setUpiInput={setUpiInput}
                savedUPIs={savedUPIs}
                setSavedUPIs={setSavedUPIs}
                selectedUPI={selectedUPI}
                setSelectedUPI={setSelectedUPI}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {selectedMethod === "card" && (
              <CardSection
                cardInput={cardInput}
                setCardInput={setCardInput}
                savedCards={savedCards}
                setSavedCards={setSavedCards}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {selectedMethod === "emi" && <EmiSection />}
            {selectedMethod === "netbanking" && (
              <NetBankingSection selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
            )}
            {selectedMethod === "gift" && <GiftCardSection />}
            {selectedMethod === "cod" && <CodSection />}
          </div>

          <div className="border rounded-xl bg-white shadow-sm p-4 flex flex-col justify-between">
            <PriceDetails totalPrice={totalPrice}/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentLayout;