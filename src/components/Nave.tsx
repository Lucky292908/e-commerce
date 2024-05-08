import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Nave.css'; // Import CSS file for navigation styles
import { Product } from './types'; // Import the Product interface from types.ts
import { FaHome, FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import icons

interface NaveProps {}

const Nave: React.FC<NaveProps> = () => {
  // State for cart items and wishlist items
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // State to track active link
  const [activeLink, setActiveLink] = useState<string>('');

  // Fetch cart items from API on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8089/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []); // Run once on component mount

  // Fetch wishlist items from API on component mount
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8089/wishlist');
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []); // Run once on component mount

  // Use useEffect to refetch cart items when cartItems state changes
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8089/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartItems]); // Run whenever cartItems state changes

  // Use useEffect to refetch wishlist items when wishlistItems state changes
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8089/wishlist');
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, [wishlistItems]); // Run whenever wishlistItems state changes

  return (
    <div className="nav-container">
     <div className="logo">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBGQMHG0_N9HNWUXSD66AAfbKKzhymtVqV8hOieC8UJA&s" />
</div>
      <ul className="nav-list">
        {/* Home Link */}
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
            to="/"
            onClick={() => setActiveLink('home')}
          >
            <FaHome className="cart-icon" />
          </Link>
        </li>

        {/* Products Link */}
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'products' ? 'active' : ''}`}
            to="/products"
            onClick={() => setActiveLink('products')}
          >
            Products
          </Link>
        </li>

        {/* About Link */}
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
            to="/about"
            onClick={() => setActiveLink('about')}
          >
            About
          </Link>
        </li>

        {/* Address Link */}
        {/* <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'address' ? 'active' : ''}`}
            to="/address"
            onClick={() => setActiveLink('address')}
          >
            Address
          </Link>
        </li> */}

        {/* Wishlist Link */}
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'wishlist' ? 'active' : ''}`}
            to="/wishlist"
            onClick={() => setActiveLink('wishlist')}
          >
            <FaHeart className="cart-icon" />
            {wishlistItems.length > 0 && (
              <span className="item-count"> ({wishlistItems.length})</span>
            )}
          </Link>
        </li>

        {/* Cart Link */}
        <li className="nav-item cart-link">
          {cartItems.length > 0 && (
            <Link
              className={`nav-link ${activeLink === 'cart' ? 'active' : ''}`}
              to="/cart"
              onClick={() => setActiveLink('cart')}
            >
              <FaShoppingCart className="cart-icon" />
              <span className="cart-item-count"> ({cartItems.length})</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nave;
