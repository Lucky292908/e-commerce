// Payment.tsx

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
const Payment: React.FC = () => {
  // Payment component logic...

  return (
    <div>
         <div className="path">
        <h3><FaShoppingCart /> Cart </h3>------------------<h3 >Address</h3> ------------------<h3 className='g'>Pay</h3>
      </div>
      <h2>Payment Details</h2>
      {/* Payment form fields go here... */}
      <button>Complete Order</button>
    </div>
  );
};

export default Payment;
