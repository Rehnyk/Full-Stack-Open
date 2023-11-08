import { useState } from 'react';

const Blog = ({ blog, user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

     let userName = user.name;

        if (!blog.user) {
            userName =  '';
        } else if (blog.user.name) {
             userName = blog.user.name;
        }


    return (
        <div className="blog-container">
            <div>
                {showDetails ? (
                    <div>
                        {blog.title} by {blog.author} <button onClick={toggleDetails}>Hide</button> <br/>
                        {blog.url} <br/>
                        Likes: {blog.likes} <button>Like</button> <br/>
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