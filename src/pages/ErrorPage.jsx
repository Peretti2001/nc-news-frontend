// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ message }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Error</h1>
      <p style={{ color: "red" }}>{message || "Page not found"}</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
