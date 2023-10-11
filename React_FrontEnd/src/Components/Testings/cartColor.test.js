import React from 'react';
import { render } from '@testing-library/react';
import CartColor from '../cartColor';

//In this test case, I've added assertions to check if the CartColor component renders a button with the correct background color and is disabled.
describe('CartColor component', () => {
  it('should render a button with the correct background color and disabled', () => {
    // Setup
    const color = 'red';

    // Render the component
    const { getByRole } = render(<CartColor color={color} />);

    // Get the rendered button element
    const button = getByRole('button');

    // Assert
    expect(button).toHaveStyle('background-color: red');
    expect(button).toBeDisabled();
  });
});
