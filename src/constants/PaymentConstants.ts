const PAYMENT_TEXTS = {
  HEADER: "Complete Payment",
  PRICE_SUMMARY: "Price Summary",
  ITEMS_TOTAL: "Items Total",
  DISCOUNT: "Discount",
  COUPONS: "Coupons",
  PLATFORM_FEE: "Platform Fee",
  TOTAL_PAYABLE: "Total Payable",
  NO_PRICE_DETAILS: "No price details available.",

  CARD_HEADER: "Pay using Credit / Debit Card",
  CARD_NUMBER_PLACEHOLDER: "Card Number",
  CARD_EXPIRY_PLACEHOLDER: "Expiry (MM/YY)",
  CARD_CVV_PLACEHOLDER: "CVV",
  SAVE_CARD_BUTTON: "Save Card",
  SAVED_CARDS_HEADER: "Saved Cards",
  REMOVE_BUTTON: "Remove",
  PAY_BUTTON: (amount: number) => `Pay ₹${amount}`,
  ERROR_CARD_NUMBER: "Card number must be 16 digits.",
  ERROR_CARD_EXPIRY: "Enter valid expiry in MM/YY format.",
  ERROR_CARD_CVV: "CVV must be 3 digits.",

  COD_HEADER: "Cash on Delivery",
  COD_DESCRIPTION:
    "You can pay the amount in cash when your order is delivered.",
  COD_PLACE_ORDER: "Place Order",
  COD_MODAL_TITLE: "Order Placed!",
  COD_MODAL_DESC:
    "Your order with Cash on Delivery has been successfully placed.",
  COD_MODAL_CLOSE: "Close",

  EMI_HEADER: "EMI Options",
  EMI_DESCRIPTION: "Get easy EMI on major banks and credit cards.",
  EMI_VIEW_PLANS: "View EMI Plans",

  GIFT_HEADER: "Gift Card",
  GIFT_PLACEHOLDER: "Enter Gift Card Number",
  GIFT_REDEEM_BUTTON: "Redeem",

  NETBANKING_HEADER: "Net Banking",
  NETBANKING_DESCRIPTION: "Choose your preferred bank to complete payment.",
  NETBANKING_PAY_BUTTON: (amount: number) => `Pay Now ₹${amount}`,

  OPTIONS_HEADER: "Payment Options",
  OPTION_UPI: "UPI",
  OPTION_CARD: "Credit / Debit / ATM Card",
  OPTION_EMI: "EMI",
  OPTION_NETBANKING: "Net Banking",
  OPTION_GIFT: "Gift Card",
  OPTION_COD: "Cash on Delivery",

  UPI_HEADER: "Pay via UPI",
  UPI_PLACEHOLDER: "Enter UPI ID (example: name@upi)",
  UPI_SAVE_BUTTON: "Save UPI",
  UPI_SAVED_HEADER: "Saved UPI IDs",
  UPI_ERROR_EMPTY: "UPI ID cannot be empty.",
  UPI_ERROR_INVALID: "Enter a valid UPI ID (e.g., name@bank)",
  UPI_PAY_BUTTON: (amount: number) => `Pay ₹${amount}`,
};
export default PAYMENT_TEXTS;
