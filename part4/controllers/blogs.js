const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const middleware = require('../utils/middleware.js');

// GET, show all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

// POST, add a new blog
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body;
    const user = request.user;

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

// DELETE, delete a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    console.log(`DELETE USER:`, blog.user)
    if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'User is not owner of the blog.' });
    }

    await blog.deleteOne();
    response.status(204).end();
});

// PUT, update a blog
blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog);
        })
        .catch(error => next(error));
});

module.exports = blogsRouter;