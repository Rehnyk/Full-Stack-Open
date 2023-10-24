const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/blog.js');

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
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
});

afterAll(async () => {
    await mongoose.connection.close();
});