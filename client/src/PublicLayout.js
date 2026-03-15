import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-3">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default PublicLayout;
