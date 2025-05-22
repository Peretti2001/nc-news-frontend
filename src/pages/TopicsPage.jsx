import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/topics`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(({ topics }) => setTopics(topics))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
