// src/components/CommentCard.jsx
import React, { useState } from "react";

export default function CommentCard({ comment, onDeleteComment }) {
  const { comment_id, author, body, votes, created_at } = comment;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);
    setIsDeleting(true);
    try {
      await fetch(`/api/comments/${comment_id}`, { method: "DELETE" });
      onDeleteComment(comment_id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete – please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        position: "relative",
      }}
      aria-labelledby={`comment-${comment_id}`}
    >
      <h3 id={`comment-${comment_id}`} style={{ margin: 0, fontSize: "1rem" }}>
        {author}{" "}
        <span style={{ fontSize: "0.8rem", color: "#666" }}>
          • {new Date(created_at).toLocaleString()}
        </span>
      </h3>

      <p style={{ margin: "8px 0" }}>{body}</p>
      <div style={{ fontSize: "0.9rem", color: "#333" }}>👍 {votes}</div>

      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: "0.25rem 0.5rem",
          cursor: isDeleting ? "not-allowed" : "pointer",
        }}
      >
        {isDeleting ? "Deleting…" : "Delete"}
      </button>
    </article>
  );
}
