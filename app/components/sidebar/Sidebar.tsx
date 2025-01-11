import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import DashboardLinks from "../dashboardLinks/DashboardLinks";

const Sidebar = () => {
  return (
    <nav className="hidden md:flex flex-col gap-4 bg-muted/60 h-screen border-r border-gray-200">
      {/* logo */}
      <div className="flex items-center justify-center gap-3 p-5 mb-4 border-b border-gray-200 h-16">
        <Image src={Logo} alt="logo" width={35} height={35} />
        <h1 className="text-2xl font-bold">
          Invoice <span className="text-blue-500">Platform</span>
        </h1>
      </div>
      {/* dashboard links */}
      <DashboardLinks />
    </nav>
  );
};

export default Sidebar;
