import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}
