const BlogForm = ({ blogPost, setBlogPost, handleSubmitPost }) => {
  return (
    <div>
      <h2>Create a new blog post</h2>
      <form onSubmit={handleSubmitPost}>
        <div>
          title:
          <input
            type="text"
            value={blogPost.title}
            name="title"
            onChange={({ target }) =>
              setBlogPost((prevState) => ({
                ...prevState,
                title: target.value,
              }))
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogPost.author}
            name="author"
            onChange={({ target }) =>
              setBlogPost((prevState) => ({
                ...prevState,
                author: target.value,
              }))
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogPost.url}
            name="url"
            onChange={({ target }) =>
              setBlogPost((prevState) => ({
                ...prevState,
                url: target.value,
              }))
            }
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
