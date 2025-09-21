import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the new CSS file

export default function Home() {
  const navigate = useNavigate();

  const heroImage =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="home-hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <h1 className="home-title">SWEET CRESTVIEW</h1>
      <p className="home-slogan">WHERE LUXURY MEETS DINER</p>
      <div>
        <button
          onClick={() => navigate("/reservations", { state: { bookingType: "Restaurant" } })}
          className="home-button"
        >
          BOOK A TABLE
        </button>
        <button
          onClick={() => navigate("/reservations", { state: { bookingType: "Room" } })}
          className="home-button"
        >
          BOOK A ROOM
        </button>
      </div>
    </div>
  );
}