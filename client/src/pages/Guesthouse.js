import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Guesthouse() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Absolute backend URL via environment variable
  const API_BASE = process.env.REACT_APP_API_URL || 'https://crest-view-backend.onrender.com';

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/rooms`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [API_BASE]);

  const handleBookNow = (roomId) => {
    navigate('/reservations', { state: { bookingType: 'Room', roomId } });
  };

  if (loading) return (
    <div className="px-5 py-12 bg-gray-100 min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading guesthouse rooms...</p>
    </div>
  );

  if (error) return (
    <div className="px-5 py-12 bg-gray-100 min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-lg">Error: {error}</p>
    </div>
  );

  return (
    <div className="px-5 py-12 bg-gray-100 min-h-screen">
      <h2 className="text-center mb-2 text-4xl font-bold">Sweet Crestview Guesthouse</h2>
      <p className="text-center mb-8 text-gray-600 text-lg">
        Our rooms are designed for ultimate comfort and relaxation.
      </p>

      <div className="flex flex-col gap-7 max-w-[900px] mx-auto">
        {rooms.length > 0 ? rooms.map(room => (
          <div key={room._id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`${API_BASE}/${room.image}`} // load images from backend
              alt={room.name}
              className="w-full md:w-[300px] h-[200px] md:h-[200px] object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="mb-2 text-2xl font-semibold">{room.name}</h3>
                <p className="text-gray-500 mb-4">{room.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 text-lg font-bold">MK{room.price} / night</span>
                <button
                  className="px-5 py-2 bg-yellow-400 text-gray-800 rounded font-bold cursor-pointer"
                  onClick={() => handleBookNow(room._id)}
                >
                  Book Room
                </button>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-600 mt-4">No rooms are currently available. Please check back later.</p>
        )}
      </div>
    </div>
  );
    }
