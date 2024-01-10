import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog.jsx';

describe('Blog', () => {
    let container;

    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5,
        user: {
            username: 'testuser',
            name: 'Test User',
        },
    };

    const addLikeMock = jest.fn();
    const deleteBlogMock = jest.fn();
    const user = userEvent.setup();


    const loggedUser = {
        username: 'testuser',
        name: 'Test User',
    };

    beforeEach(() => {
        container = render(
            <Blog
                blog={blog}
                addLike={addLikeMock}
                loggedUser={loggedUser}
                deleteBlog={deleteBlogMock}
            />).container;
    });


    test('renders title and author by default, not url and likes', () => {
        expect(container).toHaveTextContent(`${blog.title} by ${blog.author}`);
        expect(container).not.toHaveTextContent(blog.url);
        expect(container).not.toHaveTextContent(`Likes: ${blog.likes}`);
    });

    test('shows url and likes after Vies button is clicked', async () => {
        const viewButton = screen.getByText('View');
        await user.click(viewButton);

        expect(container).toHaveTextContent(blog.url);
        expect(container).toHaveTextContent(`Likes: ${blog.likes}`);

    });

    test('calls addLike handler twice when like button is clicked twice', async () => {
        const viewButton = screen.getByText('View');
        await user.click(viewButton);

        const likeButton = screen.getByText('Like');
        await user.click(likeButton);
        await user.click(likeButton);

        expect(addLikeMock).toHaveBeenCalledTimes(2);
    });


});