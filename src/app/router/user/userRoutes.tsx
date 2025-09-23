import Dashboard from "@/app/Dashboard";

const UserRoutes = [
  { path: "/dashboard", element: <Dashboard/> },
  { path: "/profile", element: <h1>Profile Page</h1> },
  { path: "/settings", element: <h1>Settings Page</h1> },
];

export default UserRoutes;
