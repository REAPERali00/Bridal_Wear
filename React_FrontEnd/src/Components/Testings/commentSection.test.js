import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentSection from '../commentSection';

describe('CommentSection component', () => {
  it('should add a comment to the comments list when the submit button is clicked', () => {
    // Render the component
    const { getByText, getByRole } = render(<CommentSection />);

    // Get the textarea and submit button elements
    const textarea = getByRole('textbox');
    const submitButton = getByText('Submit');

    // Type a comment in the textarea
    fireEvent.change(textarea, { target: { value: 'This is a comment.' } });

    // Click the submit button
    fireEvent.click(submitButton);

    // Get the comments container element
    const commentsContainer = getByText('Comments').nextSibling;

    // Assert
    expect(commentsContainer.children.length).toBe(1);
    expect(commentsContainer.firstChild.textContent).toBe('This is a comment.');
  });
});
