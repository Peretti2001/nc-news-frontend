import React, { useState } from "react";

export default function CommentForm({ articleId, onAddComment }) {
  const currentUser = "butter_bridge";

  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!body.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setIsPosting(true);

    fetch(
      `${import.meta.env.VITE_API_URL}/api/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser, body }),
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ comment }) => {
        onAddComment(comment);
        setBody("");
        setSuccess(true);
      })
      .catch(() => {
        setError("Failed to post comment. Please try again.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h2>Add a Comment</h2>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 8 }}
        placeholder="Write your comment here..."
        disabled={isPosting}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Comment posted!</p>}
      <button
        type="submit"
        disabled={isPosting}
        style={{ marginTop: 8, padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        {isPosting ? "Posting…" : "Post Comment"}
      </button>
    </form>
  );
}
