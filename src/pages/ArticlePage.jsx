import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import VoteControls from "../components/VoteControls";

const API = import.meta.env.VITE_API_URL;

export default function ArticlePage() {
  const { article_id } = useParams();

  // Article state
  const [article, setArticle] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  const [errorA, setErrorA] = useState(null);

  // Comments state
  const [comments, setComments] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [errorC, setErrorC] = useState(null);

  // Voting state
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  // Fetch article
  useEffect(() => {
    fetch(`${API}/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ article }) => {
        setArticle(article);
        setUpCount(0);
        setDownCount(0);
      })
      .catch(() => setErrorA("Failed to load article"))
      .finally(() => setLoadingA(false));
  }, [article_id]);

  // Fetch comments
  useEffect(() => {
    fetch(`${API}/api/articles/${article_id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ comments }) => setComments(comments))
      .catch(() => setErrorC("Failed to load comments"))
      .finally(() => setLoadingC(false));
  }, [article_id]);

  // Voting handlers
  const handleUp = () => {
    setUpCount((u) => u + 1);
    fetch(`${API}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: 1 }),
    }).catch(() => {
      setUpCount((u) => u - 1);
      alert("Upvote failed. Please try again.");
    });
  };

  const handleDown = () => {
    setDownCount((d) => d + 1);
    fetch(`${API}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: -1 }),
    }).catch(() => {
      setDownCount((d) => d - 1);
      alert("Downvote failed. Please try again.");
    });
  };

  // New comment handler
  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (loadingA) return <p style={{ padding: "1rem" }}>Loading article…</p>;
  if (errorA) return <p style={{ padding: "1rem", color: "red" }}>{errorA}</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
        ← Back to articles
      </Link>

      <article style={{ marginBottom: "2rem" }}>
        <h1>{article.title}</h1>
        <p style={{ fontSize: "0.9rem", color: "#555" }}>
          {article.topic} • by {article.author} •{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <div style={{ margin: "1rem 0" }}>{article.body}</div>

        <VoteControls
          upCount={upCount}
          downCount={downCount}
          onUp={handleUp}
          onDown={handleDown}
        />

        <div style={{ color: "#666", marginTop: "0.5rem" }}>
          Total votes: {article.votes + upCount - downCount}
        </div>
      </article>

      {loadingC && <p>Loading comments…</p>}
      {errorC && <p style={{ color: "red" }}>{errorC}</p>}
      {!loadingC && !errorC && <CommentList comments={comments} />}

      <CommentForm articleId={article_id} onAddComment={handleAddComment} />
    </div>
  );
}
