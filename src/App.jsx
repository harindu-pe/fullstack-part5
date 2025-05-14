import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    try {
      blogService.setToken(user.token);
      const blog = await blogService.create(blogPost);
      setBlogPost({
        title: "",
        author: "",
        url: "",
        likes: 0,
      });
      console.log(blog);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
