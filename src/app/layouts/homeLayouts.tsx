import React from "react";
import { Outlet, } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

const HomeLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />
            {/* Main content */}
            <main className="flex-1 overflow-y-auto rounded-bl-2xl mb-4">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HomeLayout;
