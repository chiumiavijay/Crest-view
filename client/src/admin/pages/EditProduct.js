import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css'; // You can reuse the same styles

export default function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use a separate state for the preview image
  const [previewImage, setPreviewImage] = useState('');

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/admin/menu/${id}`);
        const data = response.data;
        setProductData({
          name: data.name,
          category: data.category,
          price: data.price,
          description: data.description,
          image: null, // We don't pre-populate the image file
        });
        setPreviewImage(`/uploads/${data.image}`); // Set the existing image for preview
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setProductData({ ...productData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    }

    try {
      await axios.put(`/api/admin/menu/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully!');
      navigate('/admin/list-products');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading product data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
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
            <img src={previewImage} alt="Product Preview" className="image-preview" />
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}