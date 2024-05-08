// src/Slider.tsx

import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider: React.FC = () => {
  const images = [
    'https://helloyubo.com/wp-content/uploads/2022/10/creative_fashion-2.jpg',
    'https://helloyubo.com/wp-content/uploads/2022/09/IMG-20220913-WA0040.jpg',
    'https://landingi.com/wp-content/uploads/2020/05/cover_ecommerce1-960x504.webp',
    'https://www.asendiaoceania.com/hubfs/Asendia_Ecommerce_Calendar_2023.png',
    'https://www.giosg.com/hs-fs/hubfs/Interview%20Quote%20(2).jpg?width=1300&height=650&name=Interview%20Quote%20(2).jpg'
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // Change image every 1000 milliseconds (1 second)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image} // Use the image URL directly as src
          alt={`Image ${index + 1}`}
          className={index === currentIndex ? 'slide-active' : 'slide-hidden'}
        />
      ))}
    </div>
  );
};

export default Slider;
