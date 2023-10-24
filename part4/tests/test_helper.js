const Blog = require ('../models/blog.js');

const initialBlogs = [
    {
        title: 'Travel',
        author: 'Kate',
        url: 'travel.com',
        likes: 15
    },
    {
        title: 'Cars',
        author: 'John',
        url: 'cars.com',
        likes: 6
    },
    {
        title: 'Dogs',
        author: 'Amy',
        url: 'dogs.com',
        likes: 34
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ content: 'nothing' });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};


module.exports = {
    initialBlogs, nonExistingId, blogsInDb
};
