// src/components/Products.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from './types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:8089/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <p>View our list of products here.</p>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
