import { createBrowserRouter } from "react-router-dom";
 import LandingPage from "../LandingPage";
import { useRoleRoutes } from "./useRoleRoutes";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../../components/common/PageNotFound";
import { authRoutes } from "@/app/router/authRoutes";
import { ROUTES } from "@/constants/routeConstants";
import PublicLayout from "../layouts/PublicLayout";


export const useAppRouter = () => {
  const roleRoutes = useRoleRoutes();

    return createBrowserRouter([
        { index: true, element: <LandingPage/> },
        {
            path: ROUTES.AUTH,
            element: <PublicLayout />,
            children: [...authRoutes],
        },
        {
            element: <ProtectedRoute />,
            children: roleRoutes,
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ]);
};
