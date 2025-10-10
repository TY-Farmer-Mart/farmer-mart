import React from "react";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";

interface CardProps {
  cardInput: { number: string; expiry: string; cvv: string };
  setCardInput: React.Dispatch<React.SetStateAction<{ number: string; expiry: string; cvv: string }>>;
  savedCards: string[];
  setSavedCards: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCard: string;
  setSelectedCard: (v: string) => void;
  errors: { card?: string };
  setErrors: React.Dispatch<React.SetStateAction<{ upi?: string; card?: string }>>;
  totalPrice: number;
}

const CardSection: React.FC<CardProps> = ({
  cardInput,
  setCardInput,
  savedCards,
  setSavedCards,
  selectedCard,
  setSelectedCard,
  errors,
  setErrors,
  totalPrice,
}) => {
  const validateCard = (card: { number: string; expiry: string; cvv: string }): boolean => {
    if (!/^\d{16}$/.test(card.number)) {
      setErrors({ card: PAYMENT_TEXTS.ERROR_CARD_NUMBER });
      return false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      setErrors({ card: PAYMENT_TEXTS.ERROR_CARD_EXPIRY });
      return false;
    } else if (!/^\d{3}$/.test(card.cvv)) {
      setErrors({ card: PAYMENT_TEXTS.ERROR_CARD_CVV });
      return false;
    }
    setErrors({});
    return true;
  };

  const saveCard = () => {
    if (validateCard(cardInput)) {
      if (cardInput.number.trim() && !savedCards.includes(cardInput.number)) {
        setSavedCards([...savedCards, cardInput.number]);
        setCardInput({ number: "", expiry: "", cvv: "" });
      }
    }
  };

  const removeSaved = (value: string) => {
    setSavedCards(savedCards.filter((num) => num !== value));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.CARD_HEADER}</h2>

      <input
        type="text"
        value={cardInput.number}
        onChange={(e) => setCardInput({ ...cardInput, number: e.target.value })}
        placeholder={PAYMENT_TEXTS.CARD_NUMBER_PLACEHOLDER}
        className="border p-2 w-full rounded-md mb-1"
      />
      <div className="grid grid-cols-2 gap-2 mb-1">
        <input
          type="text"
          value={cardInput.expiry}
          onChange={(e) => setCardInput({ ...cardInput, expiry: e.target.value })}
          placeholder={PAYMENT_TEXTS.CARD_EXPIRY_PLACEHOLDER}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={cardInput.cvv}
          onChange={(e) => setCardInput({ ...cardInput, cvv: e.target.value })}
          placeholder={PAYMENT_TEXTS.CARD_CVV_PLACEHOLDER}
          className="border p-2 rounded-md"
        />
      </div>
      {errors.card && <p className="text-red-500 text-sm mb-2">{errors.card}</p>}

      <button
        onClick={saveCard}
        className="bg-blue-600 text-white px-5 py-2 mt-2 rounded-md hover:bg-blue-700"
      >
        {PAYMENT_TEXTS.SAVE_CARD_BUTTON}
      </button>

      {savedCards.length > 0 && (
        <div className="mt-5">
          <h3 className="font-semibold mb-2">{PAYMENT_TEXTS.SAVED_CARDS_HEADER}</h3>
          <div className="space-y-2">
            {savedCards.map((card) => (
              <div
                key={card}
                className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                  selectedCard === card ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <span>**** **** **** {card.slice(-4)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSaved(card);
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  {PAYMENT_TEXTS.REMOVE_BUTTON}
                </button>
              </div>
            ))}
          </div>

          {selectedCard && (
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 mt-3 rounded-md">
              {PAYMENT_TEXTS.PAY_BUTTON(totalPrice)}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardSection;
