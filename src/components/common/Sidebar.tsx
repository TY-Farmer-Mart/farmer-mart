import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SidebarData } from "@/types/sideBar";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const Sidebar = React.forwardRef<HTMLDivElement, SidebarData>(
  ({ name, mobile, menuItem, help, imageIcon, ...props }, ref) => {
    const firstLatterOfName = name?.split("")[0];

    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("i18nextLng");
      i18n.changeLanguage("en");
      navigate("/");
    };

    return (
      <aside
        ref={ref}
        className="w-74 sm:w-64 bg-blue-900 flex flex-col h-full"
        {...props}
      >
        <div className="p-2 flex flex-col items-center border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
            {firstLatterOfName}
          </div>
          <h2 className="mt-2 font-semibold text-white text-center">{name}</h2>
          <p className="text-sm text-gray-300">{mobile}</p>
        </div>

        <ul className="flex-1 mt-4">
          {menuItem.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 mt-2 rounded-s-3xl text-white hover:bg-gray-100 transition-colors
                  ${isActive
                    ? "bg-white font-bold rounded-s-3xl !text-blue-900"
                    : ""
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-gray-200 text-sm items-center justify-between text-white">
          <Button className="!bg-blue-900 w-full" onClick={handleLogout}>
            {t("LOGOUT")}
          </Button>
          <div className="flex gap-4 mt-2">
            <span>{help}</span>
            <a
              href={`https://wa.me/91${mobile}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={imageIcon} alt="WhatsApp" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
