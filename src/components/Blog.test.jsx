import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const post = {
    title: "Blog Post New",
    author: "admin",
    url: "http://example.com",
    likes: 0,
  };

  const user = {
    name: "admin",
    username: "Admin",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlkIjoiNjgyNGRlNzRlYzNkZTNjNzA0ZmQ5MTZhIiwiaWF0IjoxNzQ3MjQ2ODAzfQ.g6d2AnJQDmegJq-4bPozCezlS2FC3COtKhKkSq7t3Mk",
  };

  render(<Blog blog={post} user={user} />);

  // Title and author are visible
  const element1 = screen.getByText("Blog Post New");
  const element2 = screen.getByText("admin");
  expect(element1).toBeDefined();
  expect(element2).toBeDefined();

  // URL and likes should not be in the document
  const url = screen.queryByText("http://example.com");
  expect(url).toBeNull();

  const likes = screen.queryByText(/likes/i);
  expect(likes).toBeNull();
});
