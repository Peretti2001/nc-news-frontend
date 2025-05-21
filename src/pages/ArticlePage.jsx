// src/pages/ArticlePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";

const API = import.meta.env.VITE_API_URL;

export default function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  const [errorA, setErrorA] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [errorC, setErrorC] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ article }) => setArticle(article))
      .catch((err) => setErrorA(err.message))
      .finally(() => setLoadingA(false));
  }, [article_id]);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 200,
          }}
        >
          <span role="img" aria-label="votes">
            {article.votes} 👍
          </span>
          <span role="img" aria-label="comments">
            {article.comment_count} 💬
          </span>
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
