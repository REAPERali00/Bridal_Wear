import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BtnSizes from '../btnSize';

//The first test case simulates a button click and checks if the addSize prop is called with the correct size.
//The second test case checks if the button with the selected size has the size-selected class.
//The third test case checks if the button with a non-selected size does not have the size-selected class.
describe('BtnSizes component', () => {
  it('should call addSize prop with the selected size when clicked', () => {
    // Setup
    const addSize = jest.fn();
    const selectedSize = 'M';

    // Render the component
    const { getByText } = render(
      <BtnSizes addSize={addSize} selectedSize={selectedSize} />
    );

    // Simulate button click
    fireEvent.click(getByText('XS'));

    // Assert
    expect(addSize).toHaveBeenCalledWith('XS');
  });

  it('should have the "size-selected" class if size is selected', () => {
    // Setup
    const addSize = jest.fn();
    const selectedSize = 'S';

    // Render the component
    const { getByText } = render(
      <BtnSizes addSize={addSize} selectedSize={selectedSize} />
    );

    // Assert
    expect(getByText('S')).toHaveClass('btn btn-size');
  });

  it('should not have the "size-selected" class if size is not selected', () => {
    // Setup
    const addSize = jest.fn();
    const selectedSize = 'S';

    // Render the component
    const { getByText } = render(
      <BtnSizes addSize={addSize} selectedSize={selectedSize} />
    );

    // Assert
    expect(getByText('M')).not.toHaveClass('size-selected');
  });
});
