import type { RouteObject } from "react-router-dom";
import HomeLayout from "../layouts/homeLayouts";
import UserRoutes from "./user/userRoutes";
import SearchLayout from "../layouts/SearchLayout";
import { ROUTES } from "@/constants/routeConstants";
import ProductListView from "@/features/productList/ProductListView";
import CartLayout from "../layouts/CartLayout";
import CheckoutLayout from "../layouts/CheckoutLayout";

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
        element: <ProductListView />,
        path: "/product/:id",
      },
      {
        element: <CartLayout />,
        path: ROUTES.ADD_TO_CART,
      },
      {
        element: <CheckoutLayout />,
        path: ROUTES.CHECKOUT,
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
