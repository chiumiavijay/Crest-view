import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Reservations.css"; // Import the new CSS file

export default function Reservations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
    guests: 1,
    bookingType: location.state?.bookingType || "Restaurant",
    bedType: "",
    numberOfRooms: 1,
  });

  useEffect(() => {
    if (location.state?.bookingType) {
      setFormData((prev) => ({ ...prev, bookingType: location.state.bookingType }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = (name === "guests" || name === "numberOfRooms") ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Booking successful:", result);
      alert("Reservation submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to submit reservation:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="reservation-container">
      <h3 className="reservation-title">
        {formData.bookingType === "Room" ? "BOOK A GUESTHOUSE ROOM" : "RESERVE A TABLE"}
      </h3>
      <h2 className="reservation-subtitle">
        {formData.bookingType === "Room" ? "Stay With Us" : "Dine With Us"}
        <span> – Reserve Now</span>
      </h2>

      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              {formData.bookingType === "Room" ? "Check-in Date" : "Reservation Date"}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        {/* Conditional rendering for form fields based on booking type */}
        {formData.bookingType === "Restaurant" ? (
          <>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time" className="form-label">Time</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Time</option>
                  {[
                    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
                    "2:00 PM", "2:30 PM", "3:00 PM", "6:00 PM",
                    "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
                  ].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="guests" className="form-label">Guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  placeholder="Number of guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  required
                  className="form-input"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedType" className="form-label">Bed Type</label>
                <select
                  id="bedType"
                  name="bedType"
                  value={formData.bedType}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Bed Type</option>
                  <option value="single">Single Bed</option>
                  <option value="double">Double Bed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numberOfRooms" className="form-label">Number of Rooms</label>
                <input
                  type="number"
                  id="numberOfRooms"
                  name="numberOfRooms"
                  placeholder="Number of rooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  min="1"
                  required
                  className="form-input"
                />
              </div>
            </div>
          </>
        )}

        {/* Hidden booking type field to ensure it's always submitted */}
        <input type="hidden" name="bookingType" value={formData.bookingType} />

        <button type="submit" className="submit-button">
          Book Now
        </button>
      </form>
    </div>
  );
}