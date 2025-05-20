import React from "react";

export default function ArticleCard({ article }) {
  const { article_id, title, author, topic, created_at, votes, comment_count } =
    article;

  return (
    <article
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      aria-labelledby={`title-${article_id}`}
    >
      <header>
        <h2 id={`title-${article_id}`}>
          <a
            href={`/articles/${article_id}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            {title}
          </a>
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#555" }}>
          {topic} · by {author} · {new Date(created_at).toLocaleDateString()}
        </p>
      </header>
      <footer
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span role="img" aria-label="votes">
          {votes} 👍
        </span>
        <span role="img" aria-label="comments">
          {comment_count} 💬
        </span>
      </footer>
    </article>
  );
}
