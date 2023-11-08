import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog.jsx';
import blogService from './services/blogs.js';
import loginService from './services/login.js'
import Notification from './components/Notification.jsx';
import Error from './components/Error.jsx';
import LoginForm from './components/LoginForm.jsx';
import BlogForm from "./components/BlogForm.jsx";
import Togglable from './components/Togglable.jsx';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(null);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setError('Username or password is wrong')
            setTimeout(() => {setError(null)}, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        setUser(null);
    }

    const addBlog = (newBlog) => {

        if (!newBlog.title || !newBlog.author || !newBlog.url) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 5000);
            return;
        }
        blogFormRef.current.toggleVisibility()

        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog));

                setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added.`);
                setTimeout(() => {setNotification(null);}, 5000);
            })
    }

    const addLike = (blog) => {
        console.log(`BLOG USER TOP:`, blog.user)
        const blogIndex = blogs.findIndex((currentBlog) => currentBlog.id === blog.id);

        const updatedBlog = { ...blog };
        updatedBlog.likes += 1;

        blogService
            .update(updatedBlog)
            .then(returnedBlog => {
                const updatedBlogs = [...blogs];
                updatedBlogs[blogIndex] = returnedBlog;
                setBlogs(updatedBlogs);
                console.log(`BLOG USER END:`, blog.user)
            })
    }

    const loginForm = () => (
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
        />
)
    const blogForm = () => (
        <Togglable viewButton='New Blog' hideButton='Cancel'  ref={blogFormRef}>
            <BlogForm createBlog={ addBlog } />
        </Togglable>
    )

    return (
        <div>
            <Error message={error} />
            <Notification message={notification} />
            {user === null && loginForm()}
            {user !== null && (
                <div>
                    <h2>Blogs</h2>
                    <div>{user.name} logged in
                        <button onClick={handleLogout}>Log out</button></div>
                    <br/>
                    {blogForm()}
                    <br/>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} addLike={addLike} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;