import React, { useState } from 'react';
import './AddRoom.css'; // Import the new CSS file

export default function AddRoom() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Adding room...');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);

    try {
      const response = await fetch('/api/admin/rooms', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Room added successfully!');
        setFormData({ name: '', description: '', price: '', image: null });
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to add room:', error);
      setMessage('Failed to add room. Please try again.');
    }
  };

  return (
    <div className="add-room-container">
      <h2 className="form-title">Add New Guesthouse Room</h2>
      <form onSubmit={handleSubmit} className="add-room-form">
        <div className="form-group">
          <label className="form-label">Room Name/Number</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price (MK per night)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Room Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-file-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Room</button>
      </form>
      {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
}