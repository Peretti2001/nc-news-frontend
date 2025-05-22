// src/components/CommentList.jsx
import React from "react";
import CommentCard from "./CommentCard";

export default function CommentList({ comments, onDeleteComment }) {
  if (comments.length === 0) {
    return <p style={{ padding: "1rem" }}>No comments yet.</p>;
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Comments</h2>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </section>
  );
}
