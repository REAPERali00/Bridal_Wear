import React, { useState, useEffect } from "react";
import ProductImg2 from "./productImg2";
import CartColor from "./cartColor";
import logo from "../Assets/NKIN.png";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

function CheckoutPage(showMessage, closeCart) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [isEmailSentSuccess, setIsEmailSentSuccess] = useState(false);
  const tohandleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const tohandleLastName = (event) => {
    setLastName(event.target.value);
  };
  const tohandleCountry = (event) => {
    setCountry(event.target.value);
  };
  const tohandleAddress = (event) => {
    setAddress(event.target.value);
  };
  const tohandleCity = (event) => {
    setCity(event.target.value);
  };
  const tohandleProvince = (event) => {
    setProvince(event.target.value);
  };
  const tohandlePostalCode = (event) => {
    setPostalCode(event.target.value);
  };
  const tohandlePhone = (event) => {
    setPhone(event.target.value);
  };
  const tohandleDeliveryMethod = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const imageDataToBase64 = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = () => {
        reject(new Error("Error loading image"));
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const isFormValid = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      country !== "" &&
      address !== "" &&
      city !== "" &&
      province !== "" &&
      postalCode !== "" &&
      phone !== "" &&
      deliveryMethod !== ""
    );
  };
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedItems);
  }, []);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);

    // Update the localStorage with the updated newItems array
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };
  const handleCheckout = async (event) => {
    event.preventDefault();

    try {
      const emailTemplateParams = {
        from_name: `${firstName} ${lastName}`, // Replace with the sender's name or leave empty
        to_name: "Abby GreenBerg", // Replace with the recipient's name or leave empty
        subject: "Order Details", // Subject of the email
        message: `
       Order Details:
          First Name: ${firstName}
          Last Name: ${lastName}
          Country: ${country}
          Address: ${address}
          City: ${city}
          Province: ${province}
          Postal Code: ${postalCode}
          Phone: ${phone}
          Delivery Method: ${deliveryMethod}
          ${items
            .map(
              (item) => `
              
              Product Name: ${item.productName}
                Size: ${item.selectedSize}
              Color: ${item.selectedColor}
                Quantity: ${item.quantity}
                Image: ${
                  item.selectedImageId === "0"
                    ? "ProductImg2"
                    : item.selectedImageId === "1"
                    ? "ProductImg2Hoodie"
                    : item.selectedImageId === "2"
                    ? "ProductImg2WhiteT"
                    : item.selectedImageId === "3"
                    ? "ProductImg2Sweats"
                    : item.selectedImageId === "4"
                    ? " ProductImg2Crewneck "
                    : item.selectedImageId === "5"
                    ? "ProductImg2Dress"
                    : item.selectedImageId === "6"
                    ? "ProductImg2Pants"
                    : item.selectedImageId === "7"
                    ? " ProductImg2Tank "
                    : item.selectedImageId === "8"
                    ? "ProductImg2Shorts "
                    : ""
                }              
                     
            `
            )
            .join("")}
        `,

        attachments: items.map(async (item) => {
          if (item.selectedImage) {
            try {
              const base64Data = await imageDataToBase64(item.selectedImage);
              return {
                name: `${item.productName}.png`,
                data: base64Data,
              };
            } catch (error) {
              console.error("Error converting image to base64:", error);
              return null;
            }
          } else {
            return null;
          }
        }),
      };

      const emailResult = await emailjs.send(
        "service_nfuk2t9",
        "template_x2tpjpi",
        emailTemplateParams,
        "50tSA0u7l9eWS4DbX"
      );

      console.log("Email sent successfully!", emailResult);

      setIsEmailSentSuccess(true);

      setItems([]);
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <nav className="nav-item">
          <p>Never Knew I Needed</p>
        </nav>
        <button className="cart-button"></button>
      </header>
      <div className="main">
        <div className="left-column">
          {items.length === 0 && !isEmailSentSuccess ? (
            <div className="checkout-message">
              <p></p>
            </div>
          ) : isEmailSentSuccess ? (
            <div className="checkout-message">
              <p></p>
            </div>
          ) : (
            <div className="checkouts">
              <h2 class="checkout-header">Checkout</h2>
              <form className="checkout-info" onSubmit={handleCheckout}>
                <div className="form-group">
                  <div className="name-fields input-group">
                    <div className="input-group-item">
                      <label htmlFor="first-name">First Name:</label>
                      <input
                        type="text"
                        name="first-name"
                        value={firstName}
                        onChange={tohandleFirstName}
                        required
                      />
                    </div>
                    &emsp;
                    <div className="input-group-item">
                      <label htmlFor="last-name">Last Name:</label>
                      <input
                        type="text"
                        name="last-name"
                        value={lastName}
                        onChange={tohandleLastName}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country:</label>
                  <select
                    name="country"
                    value={country}
                    onChange={tohandleCountry}
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                    {/* to add more countries*/}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={tohandleAddress}
                    required
                  />
                  <div className="form-group">
                    <div className="address-fields input-group">
                      <div className="input-group-item">
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          name="city"
                          value={city}
                          onChange={tohandleCity}
                          required
                        />
                      </div>
                      &emsp;
                      <div className="input-group-item">
                        <label htmlFor="province">Province:</label>
                        <input
                          type="text"
                          name="province"
                          value={province}
                          onChange={tohandleProvince}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <label htmlFor="postal-code">Postal Code:</label>
                  <input
                    type="text"
                    name="postal-code"
                    value={postalCode}
                    onChange={tohandlePostalCode}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={tohandlePhone}
                    required
                  />
                </div>
                <div className="delivery-method">
                  <label>Delivery method:</label>
                  &emsp;
                  <input
                    type="radio"
                    name="delivery-method"
                    checked={deliveryMethod === "Ship"}
                    value="Ship"
                    onChange={tohandleDeliveryMethod}
                    required
                  />
                  Ship &emsp;
                  <input
                    type="radio"
                    name="delivery-method"
                    checked={deliveryMethod === "Pick up"}
                    value="Pick up"
                    onChange={tohandleDeliveryMethod}
                    required
                  />
                  Pick up
                </div>
                <br />
                <div className="form-group">
                  <button
                    className="checkout-button"
                    type="submit"
                    onClick={handleCheckout}
                    disabled={!isFormValid() || items.length === 0}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="checkout-right-column">
          <div class="cart-view">
            <div className="checkout-cart-header inline">
              <h2>Cart Items</h2>
            </div>
            {items.length === 0 && !isEmailSentSuccess ? (
              <div className="checkout-message">
                <p>
                  You have no items in your cart. Please add some items to
                  proceed to checkout.
                </p>
              </div>
            ) : isEmailSentSuccess ? (
              <div className="checkout-message">
                <p>Email sent successfully! Thank you for your order.</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={index} className="cart-card">
                  <div className="inline">
                    <div className="cart-img">
                      <ProductImg2 id={item.id} color={item.selectedColor} />
                    </div>
                    <div className="product-name">
                      &emsp; <strong>{item.productName}</strong>
                      {/* Replace "Placeholder Product name" with the actual product name */}
                    </div>
                    <div className="card-content">
                      <div className="details-row">
                        Size: &nbsp;<strong>{item.selectedSize}</strong>
                        &emsp;&emsp; Color:{" "}
                        <CartColor color={item.selectedColor} />
                        <span>
                          &emsp;&emsp; Quantity:{" "}
                          <strong>{item.quantity}</strong>
                        </span>
                      </div>
                    </div>
                    <button
                      className="remove-cart"
                      onClick={() => removeItem(index)}
                    >
                      <strong style={{ fontSize: 15 }}>x</strong>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <footer className="footer">&copy; 2023 NKIN. All rights reserved.</footer>
    </div>
  );
}

export default CheckoutPage;
