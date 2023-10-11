import React from 'react';

function BtnSizes({ addSize, selectedSize}) {

  const handleSizeClick = (selectedSize) => {
    addSize(selectedSize);
  }
  
  return (
    <div>
      <button className={(selectedSize === "XS") ? 'btn btn-size size-selected' : 'btn btn-size'} onClick={() => handleSizeClick("XS")} class="btn btn-size">XS</button>
      <button className={(selectedSize === "S") ? 'btn btn-size size-selected' : 'btn btn-size'} onClick={() => handleSizeClick("S")} class="btn btn-size">S</button>
      <button className={(selectedSize === "M") ? 'btn btn-size size-selected' : 'btn btn-size'} onClick={() => handleSizeClick("M")} class="btn btn-size">M</button>
      <button className={(selectedSize === "L") ? 'btn btn-size size-selected' : 'btn btn-size'} onClick={() => handleSizeClick("L")} class="btn btn-size">L</button>
      <button className={(selectedSize === "XL") ? 'btn btn-size size-selected' : 'btn btn-size'} onClick={() => handleSizeClick("XL")} class="btn btn-size">XL</button>
    </div>
  )
}

export default BtnSizes
