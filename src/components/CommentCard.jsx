import React from "react";

export default function CommentCard({ comment }) {
  const { comment_id, author, body, votes, created_at } = comment;

  return (
    <article
      key={comment_id}
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "grey",
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
    </article>
  );
}
