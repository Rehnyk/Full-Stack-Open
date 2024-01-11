import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {

    const addBlog = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const newBlog = {
            title: formData.get('title'),
            author: formData.get('author'),
            url: formData.get('url'),
        };

        createBlog(newBlog);

        form.reset();
    };

    return (
        <div>
            <h2>Add new</h2>
            <form onSubmit={addBlog}>
                Title <input id="blog-title-field" type="text" name="title" placeholder='title'/> <br />
                Author <input id="blog-author-field" type="text" name="author"  placeholder='author'/> <br />
                URL <input id="blog-url-field" type="text" name="url"  placeholder='url'/> <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};
export default BlogForm;