// src/components/CommentForm.jsx
import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export default function CommentForm({ articleId, onAddComment }) {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!username.trim() || !body.trim()) {
      setError("Both username and comment are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, body }),
        },
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { comment } = await res.json();
      onAddComment(comment);
      setUsername("");
      setBody("");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h3>Post a Comment</h3>

      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", width: "100%", margin: "0.5rem 0" }}
        />
      </label>

      <label>
        Comment
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            height: "80px",
            margin: "0.5rem 0",
          }}
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Comment posted!</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "0.5rem 1rem",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Posting…" : "Post Comment"}
      </button>
    </form>
  );
}
