import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "@/types/sideBar";

const Sidebar = React.forwardRef<HTMLDivElement, SidebarData>(
  ({ name, mobile, address, menuItem, help, imageIcon, ...props }, ref) => {
    const firstLatterOfName = name?.split("")[0];

    return (
      <aside
        ref={ref}
        className="w-74 sm:w-64 bg-white border rounded-lg border-gray-200 flex flex-col h-screen"
        {...props}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
            {firstLatterOfName}
          </div>
          <h2 className="mt-2 font-semibold text-center">{name}</h2>
          <p className="text-sm text-gray-500">{mobile}</p>
          <p className="text-sm text-gray-400">{address}</p>
        </div>

        <ul className="flex-1 mt-4">
          {menuItem.map(item => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 rounded-s-3xl text-gray-700 hover:bg-gray-100 transition-colors
                  ${
                    isActive
                      ? "bg-blue-100 font-semibold text-blue-600 rounded-s-3xl"
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

        <div className="p-4 border-t border-gray-200 text-sm flex items-center justify-between">
          <span>{help}</span>
          <a
            href={`https://wa.me/91${mobile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imageIcon} alt="WhatsApp" className="w-6 h-6" />
          </a>
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
