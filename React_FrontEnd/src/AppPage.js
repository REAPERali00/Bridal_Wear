import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import App from './App';
import CheckoutPage from './Components/checkout';
// import CartPage from './Components/cartPage';

function AppPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />

        <Route path="/App" element={<App />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/cartPage" element={<CartPage/>} /> */}

      </Routes>
    </Router>
  );
}

export default AppPage;