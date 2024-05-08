// src/components/About.tsx
import React from 'react';
import './About.css'; // Import the CSS styles

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to [Your Company Name], your ultimate destination for premium online shopping. We are passionate about
        providing you with a curated selection of top-quality products across various categories, including electronics,
        fashion, beauty, home essentials, and much more.
      </p>
      <p>
        Our goal is to redefine your shopping experience by offering a seamless blend of convenience, affordability,
        and exceptional customer service. With a keen eye for trending items and timeless classics, we aim to cater to
        every style and preference.
      </p>
      <p>
        At [Your Company Name], we prioritize your satisfaction above all else. Our dedicated team is committed to
        ensuring that your shopping journey is enjoyable from start to finish. From our easy-to-navigate website to
        prompt order fulfillment and reliable delivery, we strive to exceed your expectations at every step.
      </p>
      <p>
        Whether you're shopping for yourself or searching for the perfect gift, we have something for everyone. Explore
        our extensive product catalog, discover exclusive deals and promotions, and indulge in the thrill of finding
        exactly what you need.
      </p>
      <p>
        We believe in building lasting relationships with our customers. Connect with us on social media to stay updated
        on the latest trends, new arrivals, and special offers. Your feedback and suggestions are invaluable to us as we
        continuously improve and evolve to meet your needs.
      </p>
      <p>
        Thank you for choosing [Your Company Name]. Join us on this exciting journey of discovery, style, and
        innovation. Happy shopping!
      </p>
    </div>
  );
};

export default About;
