import React from 'react';

/*
  Creates the buttons for color and by selecting the button, the color will be set to the shirts background. 
*/
function CartColor({ color }) {

  return (
    <button
      style={{ backgroundColor: color }}
      className={"cart-color"}
      disabled
    ></button>
  );
}

export default CartColor;
