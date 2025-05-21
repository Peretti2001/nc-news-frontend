import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import VoteControls from "../components/VoteControls";

const API = import.meta.env.VITE_API_URL;

export default function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  const [errorA, setErrorA] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [errorC, setErrorC] = useState(null);

  // Separate counters for upvotes and downvotes by this user
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
      })
      .catch((err) => setErrorA(err.message))
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
      .catch((err) => setErrorC(err.message))
      .finally(() => setLoadingC(false));
  }, [article_id]);

  // Handlers for upvote/downvote
  const handleUp = () => {
    setUpCount((prev) => prev + 1);
    fetch(`${API}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: 1 }),
    }).catch(() => {
      setUpCount((prev) => prev - 1);
      alert("Upvote failed. Please try again.");
    });
  };

  const handleDown = () => {
    setDownCount((prev) => prev + 1);
    fetch(`${API}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: -1 }),
    }).catch(() => {
      setDownCount((prev) => prev - 1);
      alert("Downvote failed. Please try again.");
    });
  };

  if (loadingA) return <p style={{ padding: "1rem" }}>Loading article…</p>;
  if (errorA)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {errorA}</p>;

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

        <div style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
          Total votes: {article.votes + upCount - downCount}
        </div>
      </article>

      {loadingC && <p>Loading comments…</p>}
      {errorC && (
        <p style={{ color: "red" }}>Error loading comments: {errorC}</p>
      )}
      {!loadingC && !errorC && <CommentList comments={comments} />}
    </div>
  );
}
