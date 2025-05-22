// src/pages/TopicPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export default function TopicPage() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ topic, sort_by, order });
    fetch(`${BASE_URL}/api/articles?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ articles }) => setArticles(articles))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [topic, sort_by, order]);

  const handleSortByChange = (e) => {
    setSearchParams({ topic, sort_by: e.target.value, order });
  };
  const handleOrderToggle = () => {
    setSearchParams({
      topic,
      sort_by,
      order: order === "asc" ? "desc" : "asc",
    });
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading articles…</p>;
  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/topics">← Back to Topics</Link>
      <h1 style={{ marginTop: "1rem" }}>Articles on “{topic}”</h1>

      <div style={{ margin: "1rem 0" }}>
        <label>
          Sort by:&nbsp;
          <select value={sort_by} onChange={handleSortByChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <button
          onClick={handleOrderToggle}
          style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem" }}
        >
          Order: {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p>No articles found for this topic.</p>
      )}
    </div>
  );
}
