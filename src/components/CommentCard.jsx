import React, { useState } from "react";

export default function CommentCard({ comment, currentUser, onDelete }) {
  const { comment_id, author, body, votes, created_at } = comment;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("Delete this comment?")) return;
    setIsDeleting(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/comments/${comment_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        onDelete(comment_id);
      })
      .catch(() => {
        alert("Failed to delete comment. Please try again.");
        setIsDeleting(false);
      });
  };

  return (
    <article
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#333" }}>👍 {votes}</span>
        {author === currentUser && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "red",
            }}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </article>
  );
}
