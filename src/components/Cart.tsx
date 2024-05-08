import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from './types';
import { Link } from 'react-router-dom';
import './Cart.css';
import { FaShoppingCart } from 'react-icons/fa';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await axios.get<Product[]>('http://localhost:8089/cart');
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      await axios.put(`http://localhost:8089/cart/${productId}`, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8089/cart/${productId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  return (
    <>


<div className='path'> <h3 className='g'><FaShoppingCart /> Cart</h3> ------------------<h3 >Address</h3> ------------------<h3> pay</h3></div>


<div className="parent-container">
  <div className="child left">
   
  <div className="cart-items">
    
    <h2 className="cart-header">
      <FaShoppingCart /> Cart 
    </h2>
    <ul className="cart-list">
    {cartItems.map((item) => (
<li key={item.id} className="cart-item">
<img src={item.thumbnail} alt={item.title} />
<div className="cart-item-details">
  <h3 className="cart-item-title">{item.title}</h3>
  <p className="cart-item-description">{item.description}</p>
  <p className="cart-item-price">Price: ${item.price}</p>
  <div className="cart-item-quantity">
    <button
      onClick={() => updateQuantity(item.id, (item.quantity ?? 0) + 1)} // Use optional chaining and nullish coalescing
      className="quantity-btn-add"
    >
      +
    </button>
    <span>{item.quantity ?? 1}</span> {/* Use nullish coalescing to provide a default value */}
    <button
      onClick={() =>
        item.quantity && item.quantity > 1
          ? updateQuantity(item.id, item.quantity - 1)
          : removeFromCart(item.id)
      }
      className="quantity-btn-rem"
    >
      -
    </button>
  </div>
  <button onClick={() => removeFromCart(item.id)} className="remove-from-cart-btn">
   x
  </button>
</div>
</li>
))}

    </ul>
  </div>
  </div>
  <div className="child right">
   
    
  <div className="cart-summary">
       <h2>Summary</h2>
      
       <div className="summary-item">
      
         <p>Discount:</p><p>20%</p>
       
       </div>
       <div className="summary-item">
         <p>Total MRP:</p><p>$0</p>
        
       </div>
       <div className="summary-item">
         <p>Platform Fee:</p><p>$0</p>
       
       </div>
       <div className="summary-item">
         <p>Shipping Fee:</p><p>$0</p>
        
       </div>
       <div className="summary-item total-price">
         <p>Total Price:</p><p> ${cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)}</p>
        
       </div>
    
       <Link to="/address" className="proceed-to-checkout-btn">
         Proceed to Checkout
       </Link>
     </div>
  </div>
</div>

    
    </>
   
  );
};

export default Cart;
