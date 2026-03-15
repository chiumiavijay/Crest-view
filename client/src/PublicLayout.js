import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PublicLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default PublicLayout;
