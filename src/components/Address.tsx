import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Address, Product } from './types';
import './Address.css';
import { FaShoppingCart } from 'react-icons/fa';
import OldAddress from './OldAddress';
const AddressForm: React.FC = () => {
  const initialFormData: Address = {
    id: '', // Provide a default value or leave it empty
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    street: '',
    state: '',
    alternatePhone: '',
  };


  const [formData, setFormData] = useState<Address>(initialFormData);
  const [submittedAddresses, setSubmittedAddresses] = useState<Address[]>([]);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Handle form submission logic here (e.g., submitting the address)
      const response = await axios.post<Address>('http://localhost:8089/address', formData);
      console.log('Address submitted successfully:', response.data);

      // Update submittedAddresses state with the new address
      setSubmittedAddresses([...submittedAddresses, formData]);

      // Clear form data
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleEditAddress = (index: number) => {
    const selectedAddress = submittedAddresses[index];
    setFormData(selectedAddress);
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = submittedAddresses.filter((_, i) => i !== index);
    setSubmittedAddresses(updatedAddresses);
  };


  return (
    <>
      <div className="path">
        <h3><FaShoppingCart /> Cart </h3>------------------<h3 className='g'>Address</h3> ------------------<h3>Pay</h3>
      </div>
      <div className="container">




        <div className="leftPane">






          <div className="address-container">
            <h2 className="form-title">Enter Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="addressLine1">Address Line 1:</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />

              <button type="submit" className="form-button">
                Submit Address
              </button>
            </form>
            {/* Display submitted addresses */}
            
          </div>
        </div>
        <div className="rightPane">
          {/* <h2 className="cart-header">
            <FaShoppingCart /> Cart Details
          </h2> */}
          <div className="cart-container">


            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">Price: ${item.price}</p>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                </div>

              ))}
              <div className="cart-summary">
                <p>Total Items: {cartItems.length}</p>
                <div className="summary-item total-price">
                  <p>Total Price: ${cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)}</p>

                </div>

              </div>
              <div className="submitted-addresses">
              {submittedAddresses.map((address, index) => (
  <div className="address-item" key={index}>
    <p>
      <strong>Address ID:</strong> {address.id}
    </p>
    <p>
      <strong>Name:</strong> {address.firstName} {address.lastName}
    </p>
    <p>
      <strong>Address:</strong> {address.addressLine1}, {address.city}, {address.country}, {address.postalCode}
    </p>
    <p>
      <strong>Contact:</strong> {address.phone}, {address.email}
    </p>
    {/* Additional address details */}
    <div className="address-buttons">
      <button onClick={() => handleEditAddress(index)}>Edit Address</button>
      <button onClick={() => handleRemoveAddress(index)}>Remove Address</button>
      <Link to="/payment" className="proceed-to-payment-btn">
        Proceed to Pay
      </Link>
    </div>
  </div>
))}
            </div>
              <OldAddress />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
