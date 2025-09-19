import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Settings, LogOut } from "lucide-react";

const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/" },
];

const Sidebar: React.FC = () => {

    return (
        <aside className="w-64 bg-white border rounded-lg border-gray-200 flex flex-col h-screen">
            <div className="p-6 flex flex-col items-center border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
                    J
                </div>
                <h2 className="mt-2 font-semibold text-center">Jabagond Umashankar Muragyappa</h2>
                <p className="text-sm text-gray-500">9823191415</p>
                <p className="text-sm text-gray-400">Gulbarga</p>
            </div>

            <ul className="flex-1 mt-4">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors
                 ${isActive ? "bg-blue-100 font-semibold text-blue-600" : ""}`
                            }
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="p-4 border-t border-gray-200 text-sm flex items-center justify-between">
                <span>Need Help? 9823191415</span>
                <a href="https://wa.me/9823191415" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        className="w-6 h-6"
                    />
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
