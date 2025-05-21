import React from "react";
import CommentCard from "./CommentCard";

export default function CommentList({
  comments,
  currentUser,
  onDeleteComment,
}) {
  if (comments.length === 0) {
    return <p style={{ padding: "1rem" }}>No comments yet.</p>;
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Comments</h2>
      {comments.map((c) => (
        <CommentCard
          key={c.comment_id}
          comment={c}
          currentUser={currentUser}
          onDelete={onDeleteComment}
        />
      ))}
    </section>
  );
}
