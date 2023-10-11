import React, { useState } from "react";

function InputQuantity({ quantity, addQuantity, setValid }) {
  const [canShowMessage, setCanShowMessage] = useState("");
  const MIN = 12;
  const MAX = 100;
  function handleAdd() {
    if (quantity >= MAX) {
      quantity = MAX;
      setCanShowMessage(true);
    } else {
      quantity++;
      document.getElementById("quantity").value = quantity;
      setValid(false);
      setCanShowMessage(false);
    }
    addQuantity(quantity);
  }

  function handleSub() {
    if (quantity <= MIN) {
      quantity = MIN;
      setCanShowMessage(true);
    } else {
      quantity--;
      document.getElementById("quantity").value = quantity;
      setValid(false);
      setCanShowMessage(false);
    }
    addQuantity(quantity);
  }

  function validate(event) {
    const pattern = /^\d+$/;
    const value = parseInt(event.target.value);
    if (!pattern.test(value)) {
      setValid(true);
      setCanShowMessage(true);
    } else if (value < MIN || value > MAX) {
      setValid(true);
      setCanShowMessage(true);
    } else {
      setValid(false);
      addQuantity(value);
      setCanShowMessage(false);
    }
  }

  return (
    <div>
      <button onClick={handleSub} className="btn-quantity">
        -
      </button>
      <input
        class="count-input"
        id="quantity"
        defaultValue={quantity}
        onChange={validate}
      ></input>
      <button onClick={handleAdd} className="btn-quantity">
        +
      </button>

      <br></br>
      {canShowMessage && (
        <p className="errormessage">
          Cannot go below {MIN} or over {MAX}
        </p>
      )}
    </div>
  );
}

export default InputQuantity;
