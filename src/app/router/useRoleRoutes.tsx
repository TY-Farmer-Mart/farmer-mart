import type { RouteObject } from "react-router-dom";
import HomeLayout from "../layouts/homeLayouts";
import UserRoutes from "./user/userRoutes";
import SearchLayout from "../layouts/SearchLayout";
import { ROUTES } from "@/constants/routeConstants";
import CheckoutLayout from "../layouts/CheckoutLayout";
import CheckoutFlow from "../../features/checkout/CheckoutFlow";
import ProtectedRoute from "./ProtectedRoute";

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
        element: <ProtectedRoute />,
        children: [
          {
            element: <CheckoutLayout />,
            path: ROUTES.CHECKOUT_PAGE,
            children: [
              { index: true, element: <CheckoutFlow /> },
            ],
          },
        ],
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
