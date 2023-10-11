import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

import ProductImg from "./homepage-productImg";

const ProductGrid = () => {
  const products = [
    { id: 0, name: <h2 className="nav-item">White Long Sleeve PJ Set</h2>, imageComponent: <ProductImg id={0} /> },
    { id: 1, name: <h2 className="nav-item">Forever Starts Today Hoodie</h2>, imageComponent: <ProductImg id={1} /> },
    { id: 2, name: <h2 className="nav-item">The "Adella" Tie-Back Sash Charmeuse Mermaid Gown</h2>, imageComponent: <ProductImg id={2} /> },
    { id: 3, name: <h2 className="nav-item">Plain T Shirt</h2>, imageComponent: <ProductImg id={3} /> },
    { id: 4, name: <h2 className="nav-item">Personalized Throw Pillow</h2>, imageComponent: <ProductImg id={4} /> },
    { id: 5, name: <h2 className="nav-item">Plain Sweatshirt</h2>, imageComponent: <ProductImg id={5} /> },
    { id: 6, name: <h2 className="nav-item">Bride/Howdy Tote Bags</h2>, imageComponent: <ProductImg id={6} /> },
    { id: 7, name: <h2 className="nav-item">Plain No Ugly Crying Handkerchief</h2>, imageComponent: <ProductImg id={7} /> },
    { id: 8, name: <h2 className="nav-item">Plain Hoodie</h2>, imageComponent: <ProductImg id={8} /> },
  ];
  
  return (
    <div className="product-container">
      <section className="product-grid">
        {Array.from({ length: 9 }, (_, index) => {
          const product = products[index % products.length];
          return (
            
            <div className="product-image" key={index}>
              <Link to={`/App?imageId=${product.id}`} className="product-title">
              <div class="frontpage-image">{product.imageComponent}</div>
              {product.name}
              </Link>
            </div>
            
            
          );
        })}
      </section>
    </div>
  );
};

export default ProductGrid;
