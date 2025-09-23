import { ROUTES } from "@/constants/routeConstants";
import { lazy } from "react";

const Loginpage = lazy(() => import("@/features/auth/Loginpage"));
const Register = lazy(() => import("../../features/auth/Register"));

export const authRoutes = [
  {
    path: `${ROUTES.AUTH}/${ROUTES.LOGIN}`,
    element: <Loginpage />,
  },
  {
    path: `${ROUTES.AUTH}/${ROUTES.REGISTER}`,
    element: <Register />,
  },
];
