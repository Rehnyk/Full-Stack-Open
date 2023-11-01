const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper.js');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/blog.js');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');


beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('when there are blogs saved initially', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
});

describe ('checking id properties of a blog', () => {
    test('unique identifier property is named "id" ', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body[0].id).toBeDefined();
    });

    test('likes default to 0, if property is missing from request', async () => {
        const newBlog = {
            title: 'Sports',
            author: 'Jake',
            url: 'sports.com'
        };

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201);

        const savedBlog = response.body;
        expect(savedBlog.likes).toBe(0);
    });
});

describe('adding new blog', () => {
    test('a valid blog can be added ', async () => {
        const newBlog =  {
            title: 'Coding',
            author: 'Tom',
            url: 'coding.com',
            likes: 7
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog));
    });

    test('if title or url is missing from request, respond with 400 status code', async () => {
        const noTitle = {
            author: 'Jake',
            url: 'sports.com',
            likes: 8
        };

        const noUrl = {
            title: 'Sports',
            author: 'Jake',
            likes: 8
        };

        await api
            .post('/api/blogs')
            .send(noTitle)
            .expect(400);

        await api
            .post('/api/blogs')
            .send(noUrl)
            .expect(400);
    });
});

describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        );

        expect(blogsAtEnd).not.toContainEqual(blogToDelete);
    });
});

describe('updating a blog', () => {
    test('succeeds with status code 200', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const blogToChange = {
            id: blogsAtStart[0].id,
            title: 'Movies',
            author: 'Michael',
            url: 'movies.com',
            likes: 6
        };

        const resultBlog = await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(blogToChange)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultBlog.body).toEqual(blogToChange);
    });
});

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('if password is invalid, respond with 403 status code', async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 's',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(403);
    });

    test('if username is invalid, respond with 403 status code', async () => {
        const newUser = {
            username: 'm',
            name: 'Matti Luukkainen',
            password: 'something',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(403);
    });

    test('if username already exists, respond with 403 status code', async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 's',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(403);
    });
});


afterAll(async () => {
    await mongoose.connection.close();
});