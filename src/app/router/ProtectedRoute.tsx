import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const isAuthenticated = parsedUser?.token;

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />;
}
