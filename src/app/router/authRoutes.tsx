import { ROUTES } from "@/constants/routeConstants";
import LoginPage from "@/features/auth/LoginPage";

import { lazy } from "react";

const RegisterPage = lazy(() => import("../../features/auth/RegisterPage"));

export const authRoutes = [
  {
    path: `${ROUTES.AUTH}/${ROUTES.LOGIN}`,
    element: <LoginPage />,
  },
  {
    path: `${ROUTES.AUTH}/${ROUTES.REGISTER}`,
    element: <RegisterPage />,
  },
];
