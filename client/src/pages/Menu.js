import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css"; // Import the new CSS file

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleReserveClick = () => {
    navigate("/reservations", { state: { bookingType: "Restaurant" } });
  };

  return (
    <div className="menu-container">
      <h2 className="menu-header">Discover Our Menu</h2>
      <p className="menu-subheader">Explore Our Categories</p>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-button ${selectedCategory === cat ? "active" : "inactive"}`}
          >
            {cat}
          </button>
        ))}
        <button onClick={handleReserveClick} className="reserve-button">
          Book Now
        </button>
      </div>

      {/* Menu Items */}
      <div className="menu-items-grid">
        {filteredItems.map((item) => (
          <div key={item._id} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="menu-item-image"
            />
            <div className="menu-item-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="menu-item-price">
              <div className="price-line"></div>
              <span>MK{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}