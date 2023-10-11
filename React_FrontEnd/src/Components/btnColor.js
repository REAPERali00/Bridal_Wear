import React, {useState } from 'react';

/*
  Creates the buttons for color and by selecting the button, the color will be set to the shirts background. 
*/
function BtnColor({ color , selectedColor, addItemColor }) {
  const isSelected = color === selectedColor; //Check if the color is currently selected. 

  //Handle the button clicks, sets the selected to true, and gets background from CSS and sets the color. 
  function handleClick(color) {
    const div = document.getElementById("testdiv");
    div.style.backgroundColor = color;
    addItemColor(color);
  }

  return (
    <button
      style={{ backgroundColor: color }}
      className={`btn btn-color ${isSelected ? 'color-selected' : ''}`}
      onClick={() => handleClick(color)}
    ></button>
  );
}

export default BtnColor;
