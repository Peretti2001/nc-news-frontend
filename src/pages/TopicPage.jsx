// src/pages/TopicPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import ErrorPage from "./ErrorPage";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export default function TopicPage() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/articles?topic=${topic}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Topic '${topic}' not found`);
        return res.json();
      })
      .then(({ articles }) => setArticles(articles))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [topic]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading…</p>;
  if (error) return <ErrorPage message={error} />;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/topics">← Back to Topics</Link>
      <h1 style={{ marginTop: "1rem" }}>Articles on “{topic}”</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
