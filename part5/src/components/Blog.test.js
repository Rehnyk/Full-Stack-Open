import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog.jsx';

describe('<Blog />', () => {
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

    const loggedUser = {
        username: 'testuser',
        name: 'Test User',
    };

    test('renders title and author by default, not url and likes', () => {
        const component = render(<Blog blog={blog} addLike={addLikeMock} loggedUser={loggedUser} deleteBlog={deleteBlogMock} />);

        expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`);
        expect(component.container).not.toHaveTextContent(blog.url);
        expect(component.container).not.toHaveTextContent(`Likes: ${blog.likes}`);
    });

});