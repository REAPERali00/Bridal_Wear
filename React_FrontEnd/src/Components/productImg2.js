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
   
function ProductImg2({id, color}) {

    var product;
    var bg;
  
    switch (id) {
      case '0':
        product = pj;
        bg = pjbg;
        break;
      case '1':
        product = hoodie2;
        bg = hoodie2bg;
        break;
      case '2':
        product = dress;
        bg = dress2;
        break;
      case '3':
        product = tshirt;
        bg = tshirtbg;
        break;
      case '4':
        product = pillow;
        bg = pillowbg;
        break;
      case '5':
        product = sweatshirt;
        bg = sweatshirtbg;
        break;
      case '6':
        product = bags;
        bg = bagsbg;
        break;
      case '7':
        product = hank;
        bg = hankbg;
        break;
      case '8':
        product = hoodie;
        bg = hoodiebg;
        break;
      default:
        // Set default values here when id does not match any case
        product = null;
        bg = null;
        break;
    }

  return (
    <div style={{backgroundColor: color}} className="color cart-img-container">
        <img alt="img1"  class="color cart-image1" src={product} />
        <img alt="img2" class="cart-image2" src={bg} />
        <img alt="img3" class="display_image" src={transbg} />
    </div>
  );
}
export default ProductImg2;

