import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "./Assets/NKIN.png";
import BtnSizes from "./Components/btnSize";
import ColorBtnMatrix from "./Components/colorBtnMatrix";
import ProductImg from "./Components/productImg";
import InputQuantity from "./Components/inputQuantity";
import { Button } from "react-bootstrap";
import Cart from "./Components/cartView";
import cartItems from "./cartItems";
import AddImage from "./Components/importImage";
import CommentSection from "./Components/commentSection";
import cartLogo from "./Assets/cart-logo.png";
import { Link } from "react-router-dom";

function App() {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(false);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(12);
  const [quantityValid, setQuantityValid] = useState(false);
  const [cartRefreshCount, setCartRefreshCount] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState(null); // New state to store the selected image ID

  useEffect(() => {
    document.title = "NKIN"; // Set the new title here
  }, []);

  // Use useEffect to parse the URL parameter and store the image ID in the state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const imageId = searchParams.get("imageId");
    setSelectedImageId(imageId);
  }, [location]);

  // const postCart = async (newItem) => {
  //   try {
  //     const response = await fetch("/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newItem),
  //     });
  //     if (response.ok) {
  //       console.log("Item posted Successfully");
  //     } else {
  //       console.log("Error in posting Item");
  //     }
  //   } catch (err) {
  //     console.error("Error Posting Items: ", err);
  //   }
  // };

  function addToCart() {
    console.log(quantityValid);
    if (!selectedSize) {
      alert("Size of the product is not selected");
    } else if (!selectedColor) {
      alert("Color of the product is not selected");
    } else if (quantityValid) {
      alert("Quantity of the product is not set");
    } else {
      handleCartRefresh();
      openCart();
      let selectedProductName;
      switch (selectedImageId) {
        case "0":
          selectedProductName = "Long Sleeve PJ Set";
          break;
        case "1":
          selectedProductName = "Forever Starts Today Hoodie";
          break;
        case "2":
          selectedProductName =
            'The "Adella" Tie-Back Sash Charmeuse Mermaid Gown';
          break;
        case "3":
          selectedProductName = "Plain T Shirt";
          break;
        case "4":
          selectedProductName = "Personalized Throw Pillow";
          break;
        case "5":
          selectedProductName = "Plain Sweatshirt";
          break;
        case "6":
          selectedProductName = "Bride/Howdy Tote Bags";
          break;
        case "7":
          selectedProductName = "Plain No Ugly Crying Handkerchief";
          break;
        case "8":
          selectedProductName = "Plain Hoodie";
          break;
        default:
          selectedProductName = "Unknown Product";
          break;
      }

      const newCartItem = {
        id: selectedImageId, // Add the selectedImageId to the newCartItem object
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        quantity: quantity,
        note: note,
        productName: selectedProductName,
      };

      let storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      storedCartItems.push(newCartItem);

      localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
      // postCart(newCartItem);
      // Check if there are stored cart items in localStorage
      if (storedCartItems && Array.isArray(storedCartItems)) {
        // Loop through each stored cart item and add it to the cartItems array
        for (const item of storedCartItems) {
          cartItems.push(item);
        }
      }
      setShowMessage(true);
    }
  }

  function closeCart() {
    setShowMessage(false);
  }

  function openCart() {
    setShowMessage(true);
  }

  function addSize(size) {
    setSelectedSize(size);
    setShowMessage(false);
  }

  function addItemColor(color) {
    setSelectedColor(color);
  }

  function addQuantity(quantity) {
    setQuantity(quantity);
  }

  function addNote(note) {
    setNote(note);
  }

  const handleCartRefresh = () => {
    setCartRefreshCount(cartRefreshCount + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <nav className="nav-item">
          <p>Never Knew I Needed</p>
        </nav>
        <button className="cart-button" onClick={openCart}>
          <img src={cartLogo} className="cart-icon" alt="cart-icon" />
        </button>
      </header>
      <div className="main">
        <div className="left-column">
          {selectedImageId !== null && (
            <>
              {selectedImageId === "0" && (
                <h2 className="nav-item">White Long Sleeve PJ Set</h2>
              )}
              {selectedImageId === "1" && (
                <h2 className="nav-item">Forever Starts Today Hoodie</h2>
              )}
              {selectedImageId === "2" && (
                <h2 className="nav-item">
                  The "Adella" Tie-Back Sash Charmeuse Mermaid Gown
                </h2>
              )}
              {selectedImageId === "3" && (
                <h2 className="nav-item">Plain T Shirt</h2>
              )}
              {selectedImageId === "4" && (
                <h2 className="nav-item">Personalized throw Pillow</h2>
              )}
              {selectedImageId === "5" && (
                <h2 className="nav-item">Plain Sweatshirt</h2>
              )}
              {selectedImageId === "6" && (
                <h2 className="nav-item">Bride/Howdy Tote Bags</h2>
              )}
              {selectedImageId === "7" && (
                <h2 className="nav-item">Plain No Ugly Crying Handkerchief</h2>
              )}
              {selectedImageId === "8" && (
                <h2 className="nav-item">Plain Hoodie</h2>
              )}
            </>
          )}
          <div class="app-image">
            {selectedImageId !== null && (
              <>
                {selectedImageId === "0" && <ProductImg id={0} />}
                {selectedImageId === "1" && <ProductImg id={1} />}
                {selectedImageId === "2" && <ProductImg id={2} />}
                {selectedImageId === "3" && <ProductImg id={3} />}
                {selectedImageId === "4" && <ProductImg id={4} />}
                {selectedImageId === "5" && <ProductImg id={5} />}
                {selectedImageId === "6" && <ProductImg id={6} />}
                {selectedImageId === "7" && <ProductImg id={7} />}
                {selectedImageId === "8" && <ProductImg id={8} />}
              </>
            )}
          </div>
        </div>
        <div className="right-column">
          <nav className="nav-item">
            <p style={{ fontSize: 32 }}>
              <strong>Customization</strong>
            </p>
          </nav>

          <p>Size</p>
          <BtnSizes
            addSize={addSize}
            selectedSize={selectedSize}
            setValid={setQuantityValid}
          />

          <p>Color</p>
          <ColorBtnMatrix
            addItemColor={addItemColor}
            selectedColor={selectedColor}
          />

          <p>Import</p>
          <AddImage />

          <p>Quantity</p>
          <InputQuantity
            quantity={quantity}
            addQuantity={addQuantity}
            setValid={setQuantityValid}
          />
          <p>Add Notes</p>
          <CommentSection addNote={addNote} note={note} />
          <Button
            className="btn-primary"
            onClick={() => {
              addToCart();
            }}
          >
            Add to Cart
          </Button>
        </div>

        <div className={`addToCart column ${showMessage ? "cart-show" : ""}`}>
          <Cart
            key={cartRefreshCount}
            showMessage={showMessage}
            quantity={quantity}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            note={note}
            closeCart={closeCart}
          />
        </div>
      </div>
      <footer className="footer">&copy; 2023 NKIN. All rights reserved.</footer>
    </div>
  );
}

export default App;
