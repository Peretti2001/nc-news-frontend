import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then(({ topics }) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading topics…</p>;
  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Topics</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {topics.map((t) => (
          <li key={t.slug} style={{ margin: "0.5rem 0" }}>
            <Link to={`/topics/${t.slug}`}>{t.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
