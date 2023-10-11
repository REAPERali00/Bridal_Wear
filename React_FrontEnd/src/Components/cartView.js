import React, { useState, useEffect } from "react";
import ProductImg2 from "./productImg2";
import CartColor from "./cartColor";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function CartItem({ item, index, removeItem, toggleShowNotes }) {
  return (
    <div className="cart-card">
      <div className="inline">
        <div className="cart-img">
          <ProductImg2 id={item.id} color={item.selectedColor} />
        </div>
        <div className="product-name">
          &emsp; <strong>{item.productName}</strong>
        </div>
        <div className="card-content">
          <div className="notes-row" style={{ display: item.showNotes ? "block" : "none" }}>
            {item.note ? item.note : "No notes"}
          </div>
          <div className="details-row" style={{ display: item.showNotes ? "none" : "block" }}>
            Size: &nbsp;<strong>{item.selectedSize}</strong>
            &emsp;&emsp;
            Color: <CartColor color={item.selectedColor} />
            <span>&emsp;&emsp; Quantity: <strong>{item.quantity}</strong></span>
          </div>
        </div>
        &emsp;
        <div>
          <button
            className="notes-cart"
            onMouseDown={() => toggleShowNotes(index)}
          >
            <strong style={{ fontSize: 15 }}>{item.showNotes ? "details" : "notes"}</strong>
          </button>
          &emsp;
          <button className="remove-cart" onClick={() => removeItem(index)}>
            <strong style={{ fontSize: 15 }}>x</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ showMessage, closeCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedItems.map(item => ({ ...item, showNotes: false })));
  }, []);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  const toggleShowNotes = (index) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], showNotes: !newItems[index].showNotes };
      return newItems;
    });
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF" }} className="cart-view">
      <div className="cart-header inline">
        <button className="cart-close-btn" onClick={() => closeCart()}>
          <span className="gt-angle">x</span>
        </button>
        <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      </div>
      {items.length === 0 ? (
        <p>&emsp;No items in your cart.&emsp;</p>
      ) : (
        <>
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              removeItem={removeItem}
              toggleShowNotes={toggleShowNotes}
            />
          ))}
          <br />
          <Link to="/checkout">
            <button className="checkout-button"><strong>Checkout</strong></button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
