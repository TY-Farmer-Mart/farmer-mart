import { ROUTES } from "@/constants/routeConstants";

import { lazy } from "react";

const RegisterPage = lazy(() => import("../../features/auth/RegisterPage"));
const Loginpage = lazy(() => import("@/features/auth/Loginpage"));

export const authRoutes = [
  {
    path: `${ROUTES.AUTH}/${ROUTES.LOGIN}`,
    element: <Loginpage />,
  },
  {
    path: `${ROUTES.AUTH}/${ROUTES.REGISTER}`,
    element: <RegisterPage />,
  },
];
