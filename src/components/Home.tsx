import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from './types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css';
import { Link } from 'react-router-dom';
import {  FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import icons
import Rating from './Rating';
// import { Fillters } from '../filters/Fillters';

import Slider from './Slider';
import Swipe from './swipe';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Number of products per page
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
 


  const images = [
    'https://helloyubo.com/wp-content/uploads/2022/10/creative_fashion-2.jpg',
    'https://helloyubo.com/wp-content/uploads/2022/09/IMG-20220913-WA0040.jpg',
    'https://landingi.com/wp-content/uploads/2020/05/cover_ecommerce1-960x504.webp',
    'https://www.asendiaoceania.com/hubfs/Asendia_Ecommerce_Calendar_2023.png',
    'https://www.giosg.com/hs-fs/hubfs/Interview%20Quote%20(2).jpg?width=1300&height=650&name=Interview%20Quote%20(2).jpg'
  ];
  
  useEffect(() => {
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const addToCart = async (product: Product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      toast.warning(`"${product.title}" is already in the Cart`);
    } else {
      try {
        const response = await axios.post('http://localhost:8089/cart', product);
        setCartItems([...cartItems, product]);
        toast.success(`Added "${product.title}" to Cart`);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  const addToWishlist = async (product: Product) => {
    if (wishlistItems.some((item) => item.id === product.id)) {
      toast.warning(`"${product.title}" is already in the Wishlist`);
    } else {
      try {
        const response = await axios.post('http://localhost:8089/wishlist', product);
        setWishlistItems([...wishlistItems, product]);
        toast.info(`Added "${product.title}" to Wishlist`);
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      }
    }
    
  };
  
  useEffect(() => {
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
 {/* <Swipe images={images} /> */}
<Slider />

    <div className="main-container">
      
    <div className="left-part">
      {/* <Fillters></Fillters> */}
       
    </div>
    <div className="right-part">


      

    <div>
    
       
      <h1 className='h'>Products</h1>
     
     
  
   
      
      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} className="product-image" />
            </Link>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              {/* <p className="product-description">{product.description}</p> */}
             
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-brand">Stock: ({product.stock})</p>
              {/* <p className="product-category">Category: {product.category}</p> */}
              {/* <div className="product-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${product.id} Image ${index + 1}`}
                    className="product-secondary-image"
                  />
                ))}
              </div> */}
              <Rating rating={product.rating} /> {/* Use Rating component to display product rating */}

              {product.discountPercentage && (
                <p className="discount">Discount: {product.discountPercentage}%</p>
              )}

              
              <div className="product-buttons">
                <button className="product-button product-button-cart" onClick={() => addToCart(product)}>
                  {/* Add to Cart */}
                  +
                  <FaShoppingCart className="a" />
                </button>
                <button className="product-button product-button-wishlist" onClick={() => addToWishlist(product)}>
                  +
                <FaHeart className="a" />
  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination component */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="page-number">
            {index + 1}
          </button>
        ))}
      </div>
      {/* Toast Container for displaying messages */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
       
    </div>

    
</div>

  

 </div>


  );
};

export default HomePage;
