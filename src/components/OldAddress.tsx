import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Address } from './types';
import { Link } from 'react-router-dom';
import './OldAddress.css';

const OldAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get<Address[]>('http://localhost:8089/address');
      setAddresses(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching addresses');
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = async (index: number, updatedAddress: Address) => {
    try {
      await axios.put(`http://localhost:8089/address/${addresses[index].id}`, updatedAddress);
      fetchAddresses();
      setEditingIndex(null);
    } catch (error) {
      setError('Error updating address');
    }
  };

 const handleDelete = async (id: string) => {
  try {
    await axios.delete(`http://localhost:8089/address/${id}`);
    // Remove the deleted address from the local state
    setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
  } catch (error) {
    setError('Error deleting address');
  }
};


  return (
    <div className="old-address">
      <h2 className="form-title">Old Addresses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : addresses.length > 0 ? (
        <div>
          {addresses.map((address, index) => (
            <div key={address.id} className="address-details">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={address.firstName}
                    onChange={(e) => setAddresses((prev) => {
                      const updatedAddresses = [...prev];
                      updatedAddresses[index].firstName = e.target.value;
                      return updatedAddresses;
                    })}
                  />
                  {/* Add similar input fields for other address fields */}
                  <button onClick={() => handleSave(index, addresses[index])}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {address.firstName} {address.lastName}</p>
                  <p><strong>Address:</strong> {address.addressLine1}, {address.city}, {address.country}, {address.postalCode}</p>
                  <p><strong>Contact:</strong> {address.phone}, {address.email}</p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(address.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses found.</p>
      )}
      <Link to="/payment" className="proceed-to-payment-btn">
        Proceed to Pay
      </Link>
    </div>
  );
};

export default OldAddress;
