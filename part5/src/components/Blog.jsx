import { useState } from 'react';

const Blog = ({ blog}) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="blog-container">
            <div>
                {showDetails ? (
                    <div>
                        {blog.title} by {blog.author} <button onClick={toggleDetails}>Hide</button> <br/>
                        {blog.url} <br/>
                        Likes: {blog.likes} <button>Like</button>
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