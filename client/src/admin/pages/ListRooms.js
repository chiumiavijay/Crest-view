import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './ListRooms.css'; // Import the new CSS file

export default function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/admin/rooms'); // Use Axios
        setRooms(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await axios.delete(`/api/admin/rooms/${id}`); // Use Axios
        if (response.status === 200) {
          setRooms(rooms.filter(room => room._id !== id));
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert(err.message);
      }
    }
  };

  if (loading) return <p className="loading-text">Loading rooms...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="list-rooms-container">
      <h2 style={{ marginBottom: '20px' }}>Guesthouse Rooms List</h2>

      {/* Desktop Table View */}
      {rooms.length > 0 ? (
        <table className="room-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td>
                  {/* Correct image path */}
                  <img src={`/uploads/${room.image}`} alt={room.name} className="room-image" />
                </td>
                <td>{room.name}</td>
                <td>MK{room.price}</td>
                <td>
                  {/* Use the Link component for navigation */}
                  <Link to={`/admin/edit-room/${room._id}`} className="action-button button-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(room._id)} className="action-button button-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-rooms-message">No rooms found. Add one using the "Add Room" link.</p>
      )}

      {/* Mobile Card View */}
      {rooms.length > 0 && rooms.map(room => (
        <div key={room._id} className="room-card">
          <div className="card-item">
            <span className="card-label">Image:</span>
            {/* Correct image path */}
            <img src={`/uploads/${room.image}`} alt={room.name} className="room-image" />
          </div>
          <div className="card-item">
            <span className="card-label">Name:</span>
            <span>{room.name}</span>
          </div>
          <div className="card-item">
            <span className="card-label">Price:</span>
            <span>MK{room.price}</span>
          </div>
          <div className="card-actions">
            {/* Use the Link component for navigation */}
            <Link to={`/admin/edit-room/${room._id}`} className="action-button button-edit">
              Edit
            </Link>
            <button onClick={() => handleDelete(room._id)} className="action-button button-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}