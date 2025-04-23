// frontend/src/components/Basket.js
import React from 'react';
import './Basket.css';

const Basket = ({ items }) => {
  const itemCount = items.length;
  const uniqueItems = [...new Set(items.map(item => item._id))].length;

  return (
    <div className="basket">
      <h2>Basket</h2>
      <p>Total Items: {itemCount}</p>
      <p>Unique Items: {uniqueItems}</p>
      {items.length === 0 ? (
        <p>Basket is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item._id}>{item.name}</li> /* Use item._id as the key */
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;