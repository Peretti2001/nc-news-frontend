// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
      }}
    >
      <Link to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/topics">Topics</Link>
    </nav>
  );
}
