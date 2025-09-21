import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Footer from "@/components/common/Footer";

const HomeLayout: React.FC = () => {
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex">
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 overflow-y-auto rounded-bl-2xl mb-4">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
