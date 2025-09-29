
import type { RouteObject } from "react-router-dom";
import HomeLayout from "../layouts/homeLayouts";
import UserRoutes from "./user/userRoutes";
import SearchLayout from "../layouts/SearchLayout";
import { ROUTES } from "@/constants/routeConstants";

export const useRoleRoutes = (): RouteObject[] => {

    const role = "user"
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
        ];
    }
    return [
        {
            path: "*",
            element: <div>Unauthorized</div>,
        },
    ];
};