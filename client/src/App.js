import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Layout Component
import PublicLayout from "./PublicLayout";

// Client-side components
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Guesthouse from "./pages/Guesthouse";

// Admin-side components
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/pages/AddProduct";
import AddRoom from "./admin/pages/AddRoom";
import ListProducts from "./admin/pages/ListProducts";
import ListRooms from "./admin/pages/ListRooms";
import AdminReservations from "./admin/pages/Reservations";
import Login from "./admin/pages/Login";
import EditProduct from "./admin/pages/EditProduct";
import EditRoom from "./admin/pages/EditRoom"; // <-- Add this import

// Auth-related components
import { AuthProvider } from "./admin/AuthContext";
import ProtectedRoute from "./admin/ProtectedRoute";

// Replace with your actual public key
const publicVapidKey = "BMRP0hFM6K1TRHIpNV7UcrR2pvz7ina0jFPH1hxK-px7OVyophr49_CV_I7tCgTgja0rR5YJam7Bm73wK2vUrJw";

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to register the service worker and subscribe to push
async function subscribeUser() {
  if ("serviceWorker" in navigator) {
    try {
      const register = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
      console.log("Service Worker registered successfully.", register);

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      console.log("Push subscription received.", subscription);

      // Send the subscription to your backend
      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Subscription sent to backend.");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  } else {
    console.warn("Push notifications are not supported by your browser.");
  }
}

function App() {
  useEffect(() => {
    // subscribeUser();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="contact" element={<Contact />} />
            <Route path="guesthouse" element={<Guesthouse />} />
          </Route>

          {/* Admin Login Route (Public) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="" element={<Dashboard />}>
              <Route index element={<ListProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="list-products" element={<ListProducts />} />
              <Route path="list-rooms" element={<ListRooms />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="edit-room/:id" element={<EditRoom />} /> {/* <-- Add this route */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;