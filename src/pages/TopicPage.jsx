import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import ErrorPage from "./ErrorPage";
import { getArticles } from "../utils/api";

export default function TopicPage() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticles({ topic })
      .then(({ articles }) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.error(err);
        setError(`Topic '${topic}' not found`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading articles…</p>;
  if (error) return <ErrorPage message={error} />;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/topics">← Back to Topics</Link>
      <h1 style={{ marginTop: "1rem" }}>Articles on “{topic}”</h1>
      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p style={{ marginTop: "1rem" }}>No articles found for this topic.</p>
      )}
    </div>
  );
}
