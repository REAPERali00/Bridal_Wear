import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from './Assets/NKIN.png';
import ProductGrid from "./Components/ProductGrid"; // Assuming you create the ProductGrid component
import Cart from "./Components/cartView";
import cartLogo from "./Assets/cart-logo.png";

function FrontPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(false);
  const [quantity, setQuantity] = useState(12);
  const [cartRefreshCount, setCartRefreshCount] = useState(0);

  function openCart() {
    setShowMessage(true);
  }

  function closeCart() {
    setShowMessage(false);
  }

  return (
    <div className="FrontPage">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        <nav className="nav-item">
          <p><strong>Never Knew I Needed</strong> </p>
        </nav>
        <button style={{marginRight: '8rem'}} className="cart-button cart-icon" /*onClick={openCart}*/>
          {/* <img src={cartLogo} className="cart-icon" alt="cart-icon" /> */}
        </button>
      </header>
      <div style={{margin: 0, padding: 0}} class="frontpage-container">
      <nav className="nav-item">
            <p style={{ fontSize: 27 }}>
              Featured Products 
            </p>
          </nav>
          </div>
      <div class="frontpage-container">
        <ProductGrid />
      </div>
      <div className={`addToCart column ${showMessage ? "cart-show" : ""}`}>
        <Cart
          key={cartRefreshCount}
          showMessage={showMessage}
          quantity={quantity}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          closeCart={closeCart}
        />
      </div>
    </div>
  );
}

export default FrontPage;
