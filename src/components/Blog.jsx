import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    try {
      blogService.setToken(user.token);
      await blogService.update(blog.id, {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
