import Dashboard from "@/app/Dashboard";
import ProfilePage from "@/features/dashboard/profile/ProfilePage";

const UserRoutes = [
  { path: "/dashboard", element: <Dashboard/> },
  { path: "/profile", element: <ProfilePage/> },
  { path: "/settings", element: <h1>Settings Page</h1> },
];

export default UserRoutes;
