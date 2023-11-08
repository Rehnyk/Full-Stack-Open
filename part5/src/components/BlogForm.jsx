
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
                Title <input type="text" name="title" /> <br />
                Author <input type="text" name="author" /> <br />
                URL <input type="text" name="url" /> <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default BlogForm;