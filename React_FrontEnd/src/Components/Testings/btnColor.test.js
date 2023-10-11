import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BtnColor from "../btnColor"

const mockAddItemColor = jest.fn();

//In this test case, we check if the button is rendered with the correct background color. 
//We access the button element using querySelector and then assert the backgroundColor style property.
describe('BtnColor component', () => {
    test('renders button with correct background color', () => {
      const { container } = render(<BtnColor color="red" />);
      const button = container.querySelector('button');
      expect(button.style.backgroundColor).toBe('red');
    });
    test('executes "handleClick" function correctly', () => {
      const { container } = render(
        <>
          <div id="testdiv"></div>
          <BtnColor color="red" addItemColor={mockAddItemColor} />
        </>
      );
      const button = container.querySelector('button');
      fireEvent.click(button);
      expect(mockAddItemColor).toBeCalledWith('red');
    });
});
  