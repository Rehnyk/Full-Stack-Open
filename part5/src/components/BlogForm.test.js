import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm.jsx';

test('BlogForm calls the event handler with the right details when a new blog is created.', async () => {
    const createBlogMock = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlogMock} />);

    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    const sendButton = screen.getByText('Add');


    await user.type(titleInput, 'Test Blog');
    await user.type(authorInput, 'Test Author');
    await user.type(urlInput, 'testurl.com');

    await user.click(sendButton);

    expect(createBlogMock.mock.calls).toHaveLength(1);

    expect(createBlogMock).toHaveBeenCalledWith({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'testurl.com',
    });

});

