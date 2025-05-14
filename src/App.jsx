import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

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
  const [notification, setNotification] = useState(null);

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
      // update error message
      setNotification({
        message: `${error.response.data.error}`,
        code: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
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
      // update success message
      setNotification({
        message: `a new blog ${blogPost.title} by ${blogPost.author} added`,
        code: "success",
      });
      setTimeout(() => {
        setNotification(null);
        window.location.reload();
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      // update error message
      setNotification({
        message: `${error.response.data.error}`,
        code: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        notification={notification}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification?.message}
        className={notification?.code}
      />
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />

      <Togglable buttonLabel="new blog post">
        <BlogForm
          blogPost={blogPost}
          setBlogPost={setBlogPost}
          handleSubmitPost={handleSubmitPost}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
