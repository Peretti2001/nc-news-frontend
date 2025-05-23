import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { getArticles } from "../utils/api";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    getArticles({ sort_by, order })
      .then(({ articles }) => setArticles(articles))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sort_by, order]);

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };
  const toggleOrder = () => {
    setSearchParams({ sort_by, order: order === "asc" ? "desc" : "asc" });
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading articles…</p>;
  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>All Articles</h1>

      <div style={{ margin: "1rem 0" }}>
        <label>
          Sort by:&nbsp;
          <select value={sort_by} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <button
          onClick={toggleOrder}
          style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem" }}
        >
          Order: {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}
