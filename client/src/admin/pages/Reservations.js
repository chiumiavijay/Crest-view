import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Reservations.css'; // Import the new CSS file

export default function Reservations() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to Socket.io
    const socket = io('http://localhost:5000');

    // Fetch initial bookings
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();

    // Listen for new bookings in real-time
    socket.on('newBooking', (newBooking) => {
      setBookings(prevBookings => [newBooking, ...prevBookings]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setBookings(bookings.map(booking =>
          booking._id === id ? { ...booking, status } : booking
        ));
      } else {
        throw new Error('Failed to update booking status');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert(err.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="admin-reservations-container">
      <h2 className="reservations-header">All Reservations</h2>
      {bookings.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.name}</td>
                  <td>{new Date(booking.date).toLocaleDateString()} at {booking.time}</td>
                  <td>
                    {booking.bookingType === 'Restaurant' && `${booking.guests} Guests`}
                    {booking.bookingType === 'Room' && `Rooms: ${booking.numberOfRooms} (${booking.bedType})`}
                  </td>
                  <td>
                    <span className={`status-text ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(booking._id, 'confirmed')} className="action-button button-confirm">Confirm</button>
                        <button onClick={() => handleStatusUpdate(booking._id, 'cancelled')} className="action-button button-cancel">Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          {bookings.map(booking => (
            <div key={booking._id} className="reservation-card">
              <div className="card-item">
                <span className="card-label">Name:</span>
                <span>{booking.name}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Date:</span>
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Time:</span>
                <span>{booking.time || 'N/A'}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Details:</span>
                <span>
                  {booking.bookingType === 'Restaurant' && `${booking.guests} Guests`}
                  {booking.bookingType === 'Room' && `Rooms: ${booking.numberOfRooms} (${booking.bedType})`}
                </span>
              </div>
              <div className="card-item">
                <span className="card-label">Status:</span>
                <span className={`status-text ${getStatusClass(booking.status)}`}>{booking.status}</span>
              </div>
              {booking.status === 'pending' && (
                <div className="card-item">
                  <span className="card-label">Actions:</span>
                  <div>
                    <button onClick={() => handleStatusUpdate(booking._id, 'confirmed')} className="action-button button-confirm">Confirm</button>
                    <button onClick={() => handleStatusUpdate(booking._id, 'cancelled')} className="action-button button-cancel">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}