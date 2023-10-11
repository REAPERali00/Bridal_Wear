import React, { useEffect } from 'react';
import pj from '../Assets/PJs.png';
import pjbg from '../Assets/Background-PJs.png';
import hoodie2 from '../Assets/Hoodie2.png'
import hoodie2bg from '../Assets/Background-Hoodie2.png'
import dress from '../Assets/Dress.png';
import dress2 from '../Assets/Background-Dress.png';
import tshirt from '../Assets/T.png';
import tshirtbg from '../Assets/Background-T.png';
import pillow from '../Assets/Pillow.png';
import pillowbg from '../Assets/Background-Pillow.png';
import sweatshirt from '../Assets/Sweatshirt.png';
import sweatshirtbg from '../Assets/Background-Sweatshirt.png';
import bags from '../Assets/Bags.png';
import bagsbg from '../Assets/Background-Bags.png';
import hank from '../Assets/Hank.png';
import hankbg from '../Assets/Background-Hank.png';
import hoodie from '../Assets/Hoodie.png';
import hoodiebg from '../Assets/Background-Hoodie.png';

import transbg from '../Assets/Transparent.png';

function ProductImg({ id }) {

  var product;
  var bg;

  switch (id) {
    case 0:
      product = pj;
      bg = pjbg;
      break;
    case 1:
      product = hoodie2;
      bg = hoodie2bg;
      break;
    case 2:
      product = dress;
      bg = dress2;
      break;
    case 3:
      product = tshirt;
      bg = tshirtbg;
      break;
    case 4:
      product = pillow;
      bg = pillowbg;
      break;
    case 5:
      product = sweatshirt;
      bg = sweatshirtbg;
      break;
    case 6:
      product = bags;
      bg = bagsbg;
      break;
    case 7:
      product = hank;
      bg = hankbg;
      break;
    case 8:
      product = hoodie;
      bg = hoodiebg;
      break;
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  useEffect(() => {
    const displayImage = document.querySelector("#display_image");

    // Drag and drop functionality
    displayImage.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    displayImage.addEventListener("drop", (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          displayImage.style.backgroundImage = `url(${reader.result})`;
        });
        reader.readAsDataURL(file);
      }
    });

    let isResizing = false;
    let originalWidth = 0;
    let originalHeight = 0;
    let originalMouseX = 0;
    let originalMouseY = 0;

    dragElement(displayImage);

    function dragElement(elmnt) {
      let originalLeft = 0;
      let originalTop = 0;

      elmnt.onmousedown = function (e) {
        if (isResizing) return;
        e.preventDefault();
        originalMouseX = e.clientX;
        originalMouseY = e.clientY;
        originalLeft = elmnt.offsetLeft;
        originalTop = elmnt.offsetTop;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };

      function elementDrag(e) {
        e.preventDefault();
        if (isResizing) {
          const width = clamp(originalWidth + (e.clientX - originalMouseX), 100, 400);
          const height = clamp(originalHeight + (e.clientY - originalMouseY), 100, 400);
          elmnt.style.width = `${width}px`;
          elmnt.style.height = `${height}px`;
        } else {
          const offsetX = e.clientX - originalMouseX;
          const offsetY = e.clientY - originalMouseY;
          const left = clamp(originalLeft + offsetX, 0, 820 - elmnt.offsetWidth);
          const top = clamp(originalTop + offsetY, 0, 820 - elmnt.offsetHeight);
          elmnt.style.left = `${left}px`;
          elmnt.style.top = `${top}px`;
        }
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        isResizing = false;
      }
    }

    displayImage.addEventListener("mousedown", (e) => {
      const rect = displayImage.getBoundingClientRect();
      originalWidth = rect.width;
      originalHeight = rect.height;
      isResizing =
        e.clientX >= rect.right - 8 && e.clientX <= rect.right &&
        e.clientY >= rect.bottom - 8 && e.clientY <= rect.bottom;
    });
  }, []);

  return (
    <div id="testdiv" className="product color">
      <img alt="img1" className="color product-image1" src={product} />
      <img alt="img2" className="product-image2" src={bg} />
      <div
        id="display_image"
        className="display_image"
        style={{ backgroundImage: `url(${transbg})`, width: '100px', height: '100px' }}
      />
    </div>
  );
}

export default ProductImg;