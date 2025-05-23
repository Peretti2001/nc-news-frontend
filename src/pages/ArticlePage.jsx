import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import VoteControls from "../components/VoteControls";
import ErrorPage from "./ErrorPage";

import { getSingleArticle, getComments, postComment } from "../utils/api";

export default function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  const [errorA, setErrorA] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [errorC, setErrorC] = useState(null);

  useEffect(() => {
    getSingleArticle(article_id)
      .then(({ article }) => setArticle(article))
      .catch((err) => setErrorA(err.message))
      .finally(() => setLoadingA(false));
  }, [article_id]);

  useEffect(() => {
    getComments(article_id)
      .then(({ comments }) => setComments(comments))
      .catch((err) => setErrorC(err.message))
      .finally(() => setLoadingC(false));
  }, [article_id]);

  const handleAddComment = (newComment) =>
    setComments((curr) => [newComment, ...curr]);

  if (loadingA) return <p>Loading article…</p>;
  if (errorA) return <ErrorPage message={errorA} />;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/">← Back to Home</Link>
      <article style={{ marginTop: "1rem" }}>
        <h1>{article.title}</h1>
        <p style={{ color: "#666" }}>
          By {article.author} on{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p>{article.body}</p>
        <VoteControls upCount={0} downCount={0} />
      </article>

      {loadingC && <p>Loading comments…</p>}
      {errorC && <p style={{ color: "red" }}>{errorC}</p>}
      {!loadingC && !errorC && (
        <CommentList comments={comments} onAddComment={handleAddComment} />
      )}

      <CommentForm articleId={article_id} onAddComment={handleAddComment} />
    </div>
  );
}
