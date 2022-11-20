import { useState } from "react";
import { Link } from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({ title, content });
    const headers = { "content-type": "application/json" };

    await fetch("http://localhost:3001/blog/create-post", {
      method: "POST",
      headers,
      body: requestData,
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    console.log(requestData);
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
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <button>Post</button>
    </form>
  );
}
