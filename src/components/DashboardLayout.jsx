import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#FEFEFF] pb-80">
      <div className="relative w-full h-screen">
        <Sidebar />
        <main className="absolute right-0 w-[calc(100%-80px)] md:w-[calc(100%-260px)] min-h-screen">
          <Navbar />
          <div className="px-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
