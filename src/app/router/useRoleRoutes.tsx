import type { RouteObject } from "react-router-dom";
import HomeLayout from "../layouts/homeLayouts";
import UserRoutes from "./user/userRoutes";
import SearchLayout from "../layouts/SearchLayout";
import { ROUTES } from "@/constants/routeConstants";
import CartLayout from "../layouts/CartLayout";
import CheckoutLayout from "../../features/checkout/CheckoutLayout";
import ProductDetailsLayout from "../layouts/ProductDetailsLayout";
import PaymentLayout from "@/features/paymentpage/Mainpage";
// import PaymentLayout from "../../features/paymentpage/PaymentOptions";

export const useRoleRoutes = (): RouteObject[] => {
  const role = "user";
  if (role === "user") {
    return [
      {
        element: <HomeLayout />,
        children: UserRoutes,
      },
      {
        element: <SearchLayout />,
        path: ROUTES.SEARCH_PAGE,
      },
      {
        element: <ProductDetailsLayout />,
        path: ROUTES.PRODUCT_DETAILS_PAGE,
      },
      {
        element: <CartLayout />,
        path: ROUTES.ADD_TO_CART,
      },
      {
        element: <CheckoutLayout />,
        path: ROUTES.CHECKOUT,
      },
      {
        element: <PaymentLayout />,
        path: ROUTES.PAYMENT_PAGE,
      },
    ];
  }
  return [
    {
      path: "*",
      element: <div>Unauthorized</div>,
    },
  ];
};
