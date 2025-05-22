import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import VoteControls from "../components/VoteControls";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export default function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  const [errorA, setErrorA] = useState(null);
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [errorC, setErrorC] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ article }) => setArticle(article))
      .catch(() => setErrorA("Failed to load article"))
      .finally(() => setLoadingA(false));
  }, [article_id]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/articles/${article_id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ comments }) => setComments(comments))
      .catch(() => setErrorC("Failed to load comments"))
      .finally(() => setLoadingC(false));
  }, [article_id]);

  const handleUpvote = () => {
    setUpCount((u) => u + 1);
    fetch(`${BASE_URL}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: 1 }),
    }).catch(() => {
      setUpCount((u) => u - 1);
      setErrorA("Failed to update vote");
    });
  };

  const handleDownvote = () => {
    setDownCount((d) => d + 1);
    fetch(`${BASE_URL}/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: -1 }),
    }).catch(() => {
      setDownCount((d) => d - 1);
      setErrorA("Failed to update vote");
    });
  };

  const handleAddComment = (newComment) =>
    setComments((c) => [newComment, ...c]);

  if (loadingA) return <p>Loading article…</p>;
  if (errorA) return <p style={{ color: "red" }}>{errorA}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/">← Back to Home</Link>
      <article style={{ marginTop: "1rem" }}>
        <h1>{article.title}</h1>
        <div style={{ color: "#666", marginTop: "0.5rem" }}>
          By {article.author} on{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </div>
        <p style={{ marginTop: "1rem" }}>{article.body}</p>
        <div style={{ color: "#666", marginTop: "0.5rem" }}>
          Total votes: {article.votes + upCount - downCount}
        </div>
        <VoteControls
          upCount={upCount}
          downCount={downCount}
          onUp={handleUpvote}
          onDown={handleDownvote}
        />
      </article>

      {loadingC && <p>Loading comments…</p>}
      {errorC && <p style={{ color: "red" }}>{errorC}</p>}
      {!loadingC && !errorC && <CommentList comments={comments} />}

      <CommentForm articleId={article_id} onAddComment={handleAddComment} />
    </div>
  );
}
