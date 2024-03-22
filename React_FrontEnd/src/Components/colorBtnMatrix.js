import React, { useState, useEffect } from "react";
import BtnColor from "../Components/btnColor";
import Button from "react-bootstrap/Button";
import backupColor from "../colors";
import penImage from "../Assets/edit.png"; // Replace './pen.png' with the correct path to your image file

function ColorBtnMatrix({ addItemColor, selectedColor }) {
  const [colorInput, setColorInput] = useState("");
  const [canShowMessage, setCanShowMessage] = useState(false);
  const [colors, setColors] = useState([]);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  const [showAddColor, setAddColor] = useState(false);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/color`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
      const data = await response.json();
      const colorArray = data;
      setColors(colorArray);
    } catch (err) {
      setColors(backupColor);
      console.error("Error Fetching colors: ", err);
    }
  };

  const postColor = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/color`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ color: colorInput }),
        }
      );
      if (response.ok) {
        console.log("Color posted Successfully");
      } else {
        console.log("Error in posting Color");
      }
    } catch (err) {
      console.error("Error Posting Colors: ", err);
    }
  };

  const removeColorServer = async (color, indexToRemove) => {
    if (!color) {
      alert("Color is not selected! ");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/delete/color`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ color: color }),
        }
      );
      if (response.ok) {
        removeColor(indexToRemove);
        console.log("Color removed Successfully");
      } else {
        console.log("Error in removing Color");
      }
    } catch (err) {
      console.error("Error removing Colors: ", err);
    }
  };

  const handleColorInput = (event) => {
    setColorInput(event.target.value);
  };

  const addColor = () => {
    const newColor = "#" + colorInput;
    if (/^[0-9A-Fa-f]{6}$/.test(colorInput) && !colors.includes(newColor)) {
      setCanShowMessage(false);
      setColors((oldColors) => [...oldColors, newColor]);
      postColor();
      toggleAddColor();
      setColorInput("");
    } else {
      setCanShowMessage(true);
    }
  };

  const removeColor = (color, indexToRemove) => {
    const updatedColors = [...colors];
    updatedColors.splice(indexToRemove, 1);
    setColors(updatedColors);
    removeColorServer(color, indexToRemove);
  };

  const toggleRemoveButtons = () => {
    setShowRemoveButtons(!showRemoveButtons);
    if (showAddColor) {
      toggleAddColor();
    }
  };

  const toggleAddColor = () => {
    setAddColor(!showAddColor);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {colors.map((color, index) => (
          <div key={index} style={{ marginRight: "10px" }}>
            <BtnColor
              color={color}
              selectedColor={selectedColor}
              addItemColor={addItemColor}
            />
            <br></br>
            {showRemoveButtons && (
              <button
                className="remove-color"
                onClick={() => removeColor(color, index)}
              >
                <strong style={{ fontSize: 15 }}>remove</strong>
              </button>
            )}
          </div>
        ))}
        {showRemoveButtons && (
          <Button className="btn-size addColor" onClick={toggleAddColor}>
            +
          </Button>
        )}
        <Button className="btn-size addColor" onClick={toggleRemoveButtons}>
          <img
            src={penImage}
            alt="Pen Icon"
            style={{ height: "100%", width: "100%", marginRight: "5px" }}
          />
        </Button>
      </div>

      <br />
      {showAddColor && (
        <div className="color-form">
          <h3 style={{ textAlign: "center" }}>Enter the Hex Code</h3>
          <text style={{ fontSize: 44, fontWeight: "bolder" }}>#&nbsp;</text>
          <input
            className="add-color-input"
            type="text"
            value={colorInput}
            onChange={handleColorInput}
          />
          <br></br>
          {canShowMessage && (
            <p className="errormessage">
              The hex code is incorrect or the color already exists
            </p>
          )}
          <div className="inline">
            <button
              className="btn-secondary"
              onClick={() => {
                toggleAddColor();
                setCanShowMessage(false);
              }}
            >
              Cancel
            </button>
            <button className="btn-primary" onClick={addColor}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorBtnMatrix;
