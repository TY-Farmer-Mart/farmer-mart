import { ROUTES } from "@/constants/routeConstants";
import { lazy } from "react";

const Login = lazy(() => import("../../features/auth/Login"));
const Register = lazy(() => import("../../features/auth/Register"));

export const authRoutes = [
  {
    path: `${ROUTES.AUTH}/${ROUTES.LOGIN}`,
    element: <Login />,
  },
  {
    path: `${ROUTES.AUTH}/${ROUTES.REGISTER}`,
    element: <Register />,
  },
];
