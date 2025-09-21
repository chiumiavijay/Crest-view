import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css'; // You can reuse the same styles

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Fetch the room data when the component mounts
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/admin/rooms/${id}`);
        const data = response.data;
        setRoomData({
          name: data.name,
          description: data.description,
          price: data.price,
          image: null,
        });
        setPreviewImage(`/uploads/${data.image}`);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setRoomData({ ...roomData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setRoomData({ ...roomData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in roomData) {
      if (roomData[key] !== null) {
        formData.append(key, roomData[key]);
      }
    }

    try {
      await axios.put(`/api/admin/rooms/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Room updated successfully!');
      navigate('/admin/list-rooms');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update room. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading room data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="add-product-container">
      <h2>Edit Room</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Room Name:</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={roomData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImage && (
            <img src={previewImage} alt="Room Preview" className="image-preview" />
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Room'}
        </button>
      </form>
    </div>
  );
}