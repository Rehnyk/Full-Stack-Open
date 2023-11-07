import {useState, useEffect} from 'react';
import Blog from './components/Blog.jsx';
import blogService from './services/blogs.js';
import loginService from './services/login.js'

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null)

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
            console.log(`login failed`)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        setUser(null);
    }


    const loginForm = () => (
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
)

    return (
        <div>

            {user === null && loginForm()}
            {user !== null && (
                <div>
                    <h2>Blogs</h2>
                    <div>{user.name} logged in
                        <button onClick={handleLogout}>Log out</button></div>
                    <br/>
                    {blogs.map(blog => (
                        <Blog key={blog.id} blog={blog}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;