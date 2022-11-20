import { useState } from "react";
import { Link } from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== "123") {
      setDisplayError(true);
      return;
    }
    setDisplayError(false);
    const requestData = JSON.stringify({ title, content });
    const headers = { "content-type": "application/json" };

    await fetch("http://localhost:3001/blog/create-post", {
      method: "POST",
      headers,
      body: requestData,
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    setDone(true);
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
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
      </div>
      <button>Post</button>
      {displayError && <p>Error. Incorrect password</p>}
      <br />
      <br />
      <Link to="/view">View</Link>
    </form>
  );
}
