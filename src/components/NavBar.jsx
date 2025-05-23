import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/topics">Topics</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Hello, {user}</span>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
