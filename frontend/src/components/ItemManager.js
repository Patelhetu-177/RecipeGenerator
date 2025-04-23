import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemManager.css';

const ItemManager = ({ onAddItemToBasket }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get('https://recipegenerator-gzj1.onrender.com/api/items');
      setItems(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Error fetching items');
    } finally {
      setLoading(false); // Set loading to false after fetching (success or error)
    }
  };

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      setError('Item name cannot be empty');
      return;
    }

    try {
      await axios.post('https://recipegenerator-gzj1.onrender.com/api/items/add', { item: newItem });
      fetchItems();
      setNewItem('');
      setError('');
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.response?.data?.message || 'Error adding item');
    }
  };

  return (
    <div className="item-manager">
      <h2>Item Manager</h2>
      <div className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item._id} onClick={() => onAddItemToBasket(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemManager;