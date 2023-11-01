const Blog = require ('../models/blog.js');
const User = require('../models/user.js');

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


const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};


module.exports = {
    initialBlogs, blogsInDb, usersInDb,
};
