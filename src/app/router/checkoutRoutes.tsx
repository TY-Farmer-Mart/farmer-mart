import OrderSummaryStep from "../../features/checkout/Steps/OrderSummaryStep";
import PaymentStep from "../../features/checkout/Steps/PaymentStep";

export const CheckoutRoutes = [
  {
    path: "",
    children: [
      { path: "summary", element: <OrderSummaryStep /> },
      { path: "payment", element: <PaymentStep /> },
    ],
  },
];
