import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../cartView';
import cartItems from '../../cartItems';

describe('CartView Component', () => {
  test('should display item with correct color, quantity, and size in the cart', () => {
    render(<Cart showMessage={true} closeCart={() => {}} />);
    
    // Assert that the empty cart message is not displayed
    const emptyCartMessage = screen.queryByTestId('cart-empty-message');
    expect(emptyCartMessage).not.toBeInTheDocument();
    
    // Assert that the items in the cart are displayed correctly
    const cartItemElements = screen.getAllByTestId('cart-item');
    expect(cartItemElements).toHaveLength(cartItems.length);

    cartItems.forEach((item, index) => {
      const cartItem = cartItemElements[index];
      
      // Assert the color and size
      const colorElement = cartItem.querySelector('.cart-color');
      const sizeElement = cartItem.querySelector('.cart-size');
      expect(colorElement).toHaveTextContent(item.selectedColor);
      expect(sizeElement).toHaveTextContent(item.selectedSize);
      
      // Assert the quantity
      const quantityElement = cartItem.querySelector('label');
      expect(quantityElement).toHaveTextContent(`Quantity: ${item.quantity}`);
    });
  });
});
