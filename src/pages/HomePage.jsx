import React, { useState, useEffect } from "react";
import ArticleList from "../components/ArticleList";

const API = import.meta.env.VITE_API_URL; // ← picks up dev or prod URL

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/articles`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ articles }) => setArticles(articles))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading articles…</p>;
  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>All Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
