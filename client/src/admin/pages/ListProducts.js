import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ListProducts.css';

export default function ListProducts() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the hook

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/admin/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/menu/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMenuItems(menuItems.filter(item => item._id !== id));
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert(err.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`); // Function to navigate to the edit page
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="list-products-container">
      <h2 style={{ marginBottom: '20px' }}>Menu Items List</h2>

      {/* Desktop Table View */}
      {menuItems.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item._id}>
                <td>
                  <img src={`/uploads/${item.image}`} alt={item.name} className="product-image" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>MK{item.price}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="action-button button-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="action-button button-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-items-message">No menu items found. Add one using the "Add Product" link.</p>
      )}

      {/* Mobile Card View */}
      {menuItems.length > 0 && menuItems.map(item => (
        <div key={item._id} className="product-card">
          <div className="card-item">
            <span className="card-label">Image:</span>
            <img src={`/uploads/${item.image}`} alt={item.name} className="product-image" />
          </div>
          <div className="card-item">
            <span className="card-label">Name:</span>
            <span>{item.name}</span>
          </div>
          <div className="card-item">
            <span className="card-label">Category:</span>
            <span>{item.category}</span>
          </div>
          <div className="card-item">
            <span className="card-label">Price:</span>
            <span>MK{item.price}</span>
          </div>
          <div className="card-actions">
            <button
              onClick={() => handleEdit(item._id)}
              className="action-button button-edit">
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="action-button button-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}