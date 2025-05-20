import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ article }) => setArticle(article))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [article_id]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading article…</p>;
  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
        ← Back to articles
      </Link>
      <h1>{article.title}</h1>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        {article.topic} · by {article.author} ·{" "}
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
    </div>
  );
}
