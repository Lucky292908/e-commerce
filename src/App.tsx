import React, { FC } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

import Wishlist from './components/Wishlist';
import About from './components/About';
import Cart from './components/Cart';
import HomePage from './components/Home';
import Products from './components/Products';
 import Address from './components/Address';
import Nave from './components/Nave';

import Payment from './components/Payment'; // Import Payment component

import ProductDetail from './components/ProductDetail'; // Import ProductDetail component
const App: FC = () => {
  
  return (
    <Provider store={store}>
      <div className="App">
     <Router>
       <Nave />
       <Routes>
         <Route path="/" element={< HomePage/>} />
          <Route path="/about" element={<About />} />
         <Route path="/address" element={<Address />} />
         
         <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products" element={<Products />} />
         
        <Route path="/payment" element={<Payment></Payment>} />
          <Route path="/products/:productId" element={<ProductDetail />} /> {/* Dynamic route for ProductDetail */}
          {/* Define more routes here */}
        </Routes>
    </Router>
    </div>
    </Provider>
  );
};

export default App;




















// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Nave from './components/Nave';
// import Home from './components/Home';
// import About from './components/About';
// import Address from './components/Address';
// import Cart from './components/Cart';
// import Wishlist from './components/Wishlist';
// import Products from './components/Products';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Nave />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/address" element={<Address />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/products" element={<Products />} />
//           {/* Define more routes here */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
