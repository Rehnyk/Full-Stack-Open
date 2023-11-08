import { useState } from 'react';

const Blog = ({ blog, user, addLike }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

 let userName = (blog.user && blog.user.name) ? blog.user.name : user.name;




    return (
        <div className="blog-container">
            <div>
                {showDetails ? (
                    <div>
                        {blog.title} by {blog.author} <button onClick={toggleDetails}>Hide</button> <br/>
                        {blog.url} <br/>
                        Likes: {blog.likes} <button onClick={() => addLike(blog)}>Like</button> <br/>
                        {userName}
                    </div>
                ) : (
                    <div>
                        {blog.title} by {blog.author} <button onClick={toggleDetails}>View</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Blog