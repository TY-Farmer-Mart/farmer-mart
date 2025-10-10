import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import { Home, User, Settings, TextAlignJustify, X, ShoppingCart } from "lucide-react";
import { menuItem } from "@/types/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "@/redux/dashBoardSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "@/redux/store";
import Navbar from "@/components/common/Navbar";

const HomeLayout: React.FC = () => {
  const toggle = useSelector((state: RootState) => state.toggle);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const menuItems: menuItem[] = [
    { name: t("menu.dashboard"), icon: <Home size={20} />, path: "/dashboard" },
    { name: t("menu.profile"), icon: <User size={20} />, path: "/profile" },
    { name: t("Cart"), icon: <ShoppingCart size={20} />, path: "/addtocart" },
    {
      name: t("menu.settings"),
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* <Navbar />
      <div className="flex relative h-screen"> */}
      <div className="flex flex-col h-screen">
        <Navbar />
        <button
          className="sm:hidden absolute top-20 left-2 z-20"
          onClick={() => dispatch(toggleSideBar())}
        >
          {toggle ? <X /> : <TextAlignJustify />}
        </button>
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`absolute sm:relative transition-all duration-500 ease-in-out
            ${toggle
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
          <main
            className="flex-1 overflow-y-scroll scrollbar-none rounded-bl-2xl mb-4 h-screen bg-gray-100"
            onClick={() => dispatch(toggleSideBar())}
          >
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
