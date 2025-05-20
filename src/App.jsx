import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("> Now fetching articles…");
    fetch("/api/articles")
      .then((res) => {
        console.log("HTTP status:", res.status);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ articles }) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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

export default App;
