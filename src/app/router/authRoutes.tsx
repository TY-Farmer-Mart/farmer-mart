import { ROUTES } from "@/constants/routeConstants";

import { lazy } from "react";

const RegisterPage = lazy(() => import("../../features/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/features/auth/LoginPage"));

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
