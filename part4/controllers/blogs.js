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

    if (!user) {
        return response.status(401).json({ error: 'Unauthorized' });
    }

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

    let savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    savedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 });
    response.status(201).json(savedBlog);
}
);

// DELETE, delete a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'User is not owner of the blog.' });
    }

    await blog.deleteOne();
    response.status(204).end();
});

// PUT, update a blog
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;

    const blog = {
        user: body.user.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    try {
        let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
        updatedBlog = await Blog.findById(updatedBlog._id).populate('user', { username: 1, name: 1 });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
}
);

module.exports = blogsRouter;