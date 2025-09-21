import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Guesthouse.css'; // Import the new CSS file

export default function Guesthouse() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms'); // This assumes your backend has this public endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleBookNow = (roomId) => {
    navigate('/reservations', { state: { bookingType: 'Room' } });
  };

  if (loading) return <div className="guesthouse-page"><p>Loading guesthouse rooms...</p></div>;
  if (error) return <div className="guesthouse-page"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="guesthouse-page">
      <h2 className="guesthouse-header">Sweet Crestview Guesthouse</h2>
      <p className="guesthouse-subheader">Our rooms are designed for ultimate comfort and relaxation.</p>

      <div className="rooms-container">
        {rooms.length > 0 ? (
          rooms.map(room => (
            <div key={room._id} className="room-card">
              <img src={`/${room.image}`} alt={room.name} className="room-image" />
              <div className="room-content">
                <div>
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-description">{room.description}</p>
                </div>
                <div className="price-booking">
                  <span className="room-price">MK{room.price} / night</span>
                  <button onClick={() => handleBookNow(room._id)} className="book-button">Book Room</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-rooms-message">No rooms are currently available. Please check back later.</p>
        )}
      </div>
    </div>
  );
}