import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import PublicLayout from "./PublicLayout";

// Public pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Guesthouse from "./pages/Guesthouse";

// Admin pages
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/pages/AddProduct";
import AddRoom from "./admin/pages/AddRoom";
import ListProducts from "./admin/pages/ListProducts";
import ListRooms from "./admin/pages/ListRooms";
import AdminReservations from "./admin/pages/Reservations";
import Login from "./admin/pages/Login";
import EditProduct from "./admin/pages/EditProduct";
import EditRoom from "./admin/pages/EditRoom";

// Auth
import { AuthProvider } from "./admin/AuthContext";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC WEBSITE ROUTES */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="contact" element={<Contact />} />
            <Route path="guesthouse" element={<Guesthouse />} />
          </Route>

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<Login />} />

          {/* PROTECTED ADMIN AREA */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route index element={<ListProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="list-products" element={<ListProducts />} />
              <Route path="list-rooms" element={<ListRooms />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="edit-room/:id" element={<EditRoom />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
