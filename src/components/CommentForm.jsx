// src/components/CommentForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { postComment } from "../utils/api";

export default function CommentForm({ articleId, onAddComment }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!body.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setError(null);
    setPosting(true);
    try {
      const { comment } = await postComment(articleId, {
        username: user,
        body,
      });
      onAddComment(comment);
      setBody("");
    } catch (err) {
      setError("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h3>Post a Comment</h3>
      {!user && (
        <p style={{ color: "blue" }} onClick={() => navigate("/login")}>
          You must <strong>Sign In</strong> to post.
        </p>
      )}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ width: "100%", height: "80px" }}
        disabled={!user || posting}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        type="submit"
        disabled={!user || posting}
        style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}
      >
        {posting ? "Posting…" : "Post Comment"}
      </button>
    </form>
  );
}
