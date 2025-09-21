import React, { useState } from 'react';
import './AddProduct.css'; // Import the new CSS file

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
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
    setMessage('Adding product...');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Product added successfully!');
        setFormData({
          name: '',
          category: '',
          description: '',
          price: '',
          image: null,
        });
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label className="form-label">Product Name</label>
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
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Main, Dessert, Beverage"
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
          <label className="form-label">Price (MK)</label>
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
          <label className="form-label">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-file-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
      {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
}