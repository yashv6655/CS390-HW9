import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3001/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);

  const handleDelete = async (id) => {
    const headers = { "content-type": "application/json" };
    await fetch(`http://localhost:3001/blog/${id}`, {
      method: "DELETE",
      headers,
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    window.location.reload();
  };

  const handleEdit = async (id) => {
    if (password !== "123") {
      setDisplayError(true);
      return;
    }
    setDisplayError(false);
    const requestData = JSON.stringify({ title, content });
    const headers = { "content-type": "application/json" };
    await fetch(`http://localhost:3001/blog/${id}`, {
      method: "PUT",
      headers,
      body: requestData,
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    window.location.reload();
  };

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post, index) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
            key={index}
          >
            <h2 style={{ margin: "0.2rem" }}>{post.title}</h2>
            <div>{post.content}</div>
            <button
              style={{ marginTop: "1rem" }}
              onClick={() => handleEdit(post._id)}
            >
              Edit
            </button>
            <button
              style={{ marginTop: "1rem" }}
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </div>
        ))}
        <div>
          Title:
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <div>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            ></textarea>
          </div>
          <div>
            Password:
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {displayError && <p>Error. Incorrect password</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
