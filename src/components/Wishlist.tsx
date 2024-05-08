

import {   FaHeart } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WishlistItem } from './types'; // Import WishlistItem interface from types.ts
import './Wishlist.css'; // Import CSS file for Wishlist component styling

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const wishlistResponse = await axios.get<WishlistItem[]>('http://localhost:8089/wishlist');
        setWishlistItems(wishlistResponse.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []);

  const removeFromWishlist = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:8089/wishlist/${itemId}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      console.log(`Removed item with ID ${itemId} from wishlist`);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is currently empty.</p>
      ) : (
        <div className="wishlist-container">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.thumbnail} alt={item.title} className="wishlist-thumbnail" />
              <div className="wishlist-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
               
                <p>Brand: {item.brand}</p>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                {item.discountPercentage && (
                  <p>Discount: {item.discountPercentage}%</p>
                )}
               
              </div>
              <button className='rev' onClick={() => removeFromWishlist(item.id)}>x</button>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
