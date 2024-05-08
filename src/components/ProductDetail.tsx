import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from './types';
import './ProductDetail.css';
import Rating from './Rating';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8089/products/${productId}`);
        setProduct(response.data);
        setActiveImage(response.data.thumbnail);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:8089/address');
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchProduct();
    fetchAddresses();
  }, [productId]);

  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  const handleBuyNowClick = () => {
    setShowAddressForm(true);
  };

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/orders', {
        productId: productId,
        address: addresses[0], // Assuming the first address in the list is selected for shipping
        totalPrice: product?.price || 0,
      });
      console.log('Order placed successfully:', response.data);

      setShowAddressForm(false);
      setActiveImage(product?.thumbnail || '');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <div className="main-image-container">
          <img src={activeImage} alt={product.title} className="main-image" />
        </div>
        <div className="image-gallery">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${product.id} Image ${index + 1}`}
              className={`gallery-image ${image === activeImage ? 'active' : ''}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="product-details-container">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
       
        
        <p className="product-brand">Brand: {product.brand}
        <p className="product-category">Category: {product.category}</p>
        <p className="product-stock">Stock: {product.stock}</p>
        <p className="product-price">Price: ${product.price}</p>
        </p> <Rating rating={product.rating} /> {/* Use Rating component to display product rating */}
        
         
        {product.discountPercentage && <p className="product-discount">Discount: {product.discountPercentage}%</p>}
       
        <button className="buy-now-button" onClick={handleBuyNowClick}>Buy Now</button>

        {showAddressForm && (
          <div className="address-form-container">
            <h3 className="address-form-title">Shipping Address</h3>
            <form className="address-form" onSubmit={handlePlaceOrder}>
              <input type="text" className="input-field" placeholder="Enter full name" required />
              <input type="text" className="input-field" placeholder="Enter address" required />
              <input type="text" className="input-field" placeholder="Enter city" required />
              <input type="text" className="input-field" placeholder="Enter ZIP code" required />
              <button type="submit" className="place-order-button">Place Order</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
