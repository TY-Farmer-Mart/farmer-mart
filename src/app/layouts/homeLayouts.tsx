import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Footer from "@/components/common/Footer";
import {
  Home,
  User,
  Settings,
  LogOut,
  TextAlignJustify,
  X,
} from "lucide-react";
import { menuItem } from "@/types/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "@/redux/dashBoardSlice";

const HomeLayout: React.FC = () => {
  const toggle = useSelector(state => state);
  const dispatch = useDispatch();
  const menuItems: menuItem[] = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/" },
  ];
  return (
    <div className="h-screen">
      <div className="flex relative">
        <button
          className="sm:hidden absolute top-2 left-2 z-20"
          onClick={() => dispatch(toggleSideBar())}
        >
          {toggle ? <X /> : <TextAlignJustify />}
        </button>

        <div
          className={`absolute sm:relative transition-all duration-500 ease-in-out
            ${
              toggle
                ? "translate-x-0 opacity-100 z-10"
                : "-translate-x-full opacity-0 sm:opacity-100 sm:translate-x-0"
            }
          `}
        >
          <Sidebar
            name="Jabagond Umashankar Muragyappa"
            address="Gulbarga"
            menuItem={menuItems}
            help="Need Help? 9823191415"
            mobile={9823191415}
            imageIcon="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          />
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto rounded-bl-2xl mb-4 bg-gray-200">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      {
        <div className="pb-4">
          <Footer />
        </div>
      }
    </div>
  );
};

export default HomeLayout;
