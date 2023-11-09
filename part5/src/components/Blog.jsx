import {useState} from 'react';

const Blog = ({blog, addLike, loggedUser, deleteBlog}) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const canDelete = loggedUser && blog.user.username === loggedUser.username;

    return (
        <div className="blog-container">
            <div>
                {showDetails ? (
                    <div>
                        {blog.title} by {blog.author}
                        <button onClick={toggleDetails}>Hide</button>
                        <br/>
                        {blog.url} <br/>
                        Likes: {blog.likes}
                        <button onClick={() => addLike(blog)}>Like</button>
                        <br/>
                        {blog.user.name}
                        <br/>
                        {canDelete && <button onClick={() => deleteBlog(blog)} className="delete-btn">Delete</button>}
                    </div>
                ) : (
                    <div>
                        {blog.title} by {blog.author}
                        <button onClick={toggleDetails}>View</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Blog