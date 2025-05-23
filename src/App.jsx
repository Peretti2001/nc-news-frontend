// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import TopicPage from "./pages/TopicPage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<TopicPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage message="Page not found" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
